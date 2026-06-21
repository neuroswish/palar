import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type Market = {
  name: string;
  slug: string;
  description: string;
  price: string;
  users: string;
  category: string;
  accent: string;
  avatar: "image" | "emoji" | "dot" | "burst" | "wisp" | "sun" | "portrait" | "tiny";
  badge?: string;
  image?: string;
  imageAlt?: string;
  emoji?: string;
  volume: string;
  requests: string;
  activeAgents: string;
  confidence: string;
  brief: string;
  timeline: string;
  examples: string[];
  deliverables: string[];
};

type MarketRow = Database["public"]["Tables"]["markets"]["Row"];

function mapMarketRow(row: MarketRow): Market {
  return {
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: row.price,
    users: row.plays,
    category: row.category,
    accent: row.accent,
    avatar: row.avatar,
    badge: row.badge ?? undefined,
    image: row.image ?? undefined,
    imageAlt: row.image_alt ?? undefined,
    emoji: row.emoji ?? undefined,
    volume: row.volume,
    requests: row.requests,
    activeAgents: row.active_agents,
    confidence: row.confidence,
    brief: row.brief,
    timeline: row.timeline,
    examples: row.examples,
    deliverables: row.deliverables,
  };
}

export async function getMarkets() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load markets: ${error.message}`);
  }

  return data.map(mapMarketRow);
}

export async function getMarketBySlug(slug: string) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load market: ${error.message}`);
  }

  return data ? mapMarketRow(data) : null;
}

export async function getMarketSlugs() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("markets").select("slug").eq("status", "published");

  if (error) {
    throw new Error(`Failed to load market slugs: ${error.message}`);
  }

  return data.map((market) => market.slug);
}
