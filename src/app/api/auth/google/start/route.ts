import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const OAUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 10,
};

function encodeBase64Url(value: Buffer) {
  return value.toString("base64url");
}

function getRedirectUri(request: NextRequest) {
  const origin = process.env.AUTH_URL || request.nextUrl.origin;

  return `${origin}/api/auth/google/callback`;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json({ error: "GOOGLE_CLIENT_ID is not configured." }, { status: 500 });
  }

  const state = encodeBase64Url(randomBytes(32));
  const codeVerifier = encodeBase64Url(randomBytes(32));
  const codeChallenge = createHash("sha256").update(codeVerifier).digest("base64url");
  const authUrl = new URL(GOOGLE_AUTH_URL);

  authUrl.search = new URLSearchParams({
    client_id: clientId,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    redirect_uri: getRedirectUri(request),
    response_type: "code",
    scope: "openid email profile",
    state,
  }).toString();

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("palar_oauth_state", state, OAUTH_COOKIE_OPTIONS);
  response.cookies.set("palar_oauth_verifier", codeVerifier, OAUTH_COOKIE_OPTIONS);

  return response;
}
