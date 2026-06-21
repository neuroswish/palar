import { NextResponse } from "next/server";
import { verifyAccessToken } from "@privy-io/node";

import { getSupabaseServiceClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type MarketInsert = Database["public"]["Tables"]["markets"]["Insert"];

const defaultDeliverables = ["Clear recommendation", "Source links or proof", "Next action for the user"];

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim();
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return slug || "market";
}

function formatPlays(playCount: number) {
  if (playCount >= 1000) {
    const value = playCount / 1000;

    return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}K plays`;
  }

  return `${playCount} plays`;
}

async function createUniqueSlug(baseSlug: string) {
  const supabase = getSupabaseServiceClient();
  let candidate = baseSlug;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data, error } = await supabase.from("markets").select("slug").eq("slug", candidate).maybeSingle();

    if (error) {
      throw new Error(`Failed to check slug: ${error.message}`);
    }

    if (!data) {
      return candidate;
    }

    candidate = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;
  }

  return `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
}

async function verifyPrivyRequest(request: Request) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const verificationKey = process.env.PRIVY_VERIFICATION_KEY;
  const accessToken = getBearerToken(request);

  if (!appId || !verificationKey) {
    throw new Error("Privy server verification is not configured. Set NEXT_PUBLIC_PRIVY_APP_ID and PRIVY_VERIFICATION_KEY.");
  }

  if (!accessToken) {
    return null;
  }

  return verifyAccessToken({
    access_token: accessToken,
    app_id: appId,
    verification_key: verificationKey.replace(/\\n/g, "\n"),
  });
}

export async function POST(request: Request) {
  let verifiedUser: Awaited<ReturnType<typeof verifyPrivyRequest>>;

  try {
    verifiedUser = await verifyPrivyRequest(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify Privy access token.";

    return NextResponse.json({ error: message }, { status: message.includes("configured") ? 500 : 401 });
  }

  if (!verifiedUser) {
    return NextResponse.json({ error: "Missing Privy access token." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = readString(input.name);
  const description = readString(input.description);
  const category = readString(input.category);
  const price = readString(input.price) || "$0";
  const brief = readString(input.brief) || "Tell us what you want this agent to handle.";
  const creatorEmail = readString(input.creatorEmail) || null;

  if (name.length < 3 || name.length > 90) {
    return NextResponse.json({ error: "Market title must be between 3 and 90 characters." }, { status: 400 });
  }

  if (description.length < 10 || description.length > 280) {
    return NextResponse.json({ error: "Description must be between 10 and 280 characters." }, { status: 400 });
  }

  if (category.length < 2 || category.length > 40) {
    return NextResponse.json({ error: "Category must be between 2 and 40 characters." }, { status: 400 });
  }

  const slug = await createUniqueSlug(slugify(name));
  const market: MarketInsert = {
    creator_privy_user_id: verifiedUser.user_id,
    creator_email: creatorEmail,
    name,
    slug,
    description,
    category,
    price,
    plays: formatPlays(0),
    play_count: 0,
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "✨",
    volume: "$0",
    requests: "0",
    active_agents: "1",
    confidence: "-",
    brief,
    timeline: "on demand",
    examples: [brief],
    deliverables: defaultDeliverables,
    status: "published",
  };

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("markets").insert(market).select("slug").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slug: data.slug });
}
