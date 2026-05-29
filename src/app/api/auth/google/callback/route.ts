import { NextRequest, NextResponse } from "next/server";
import {
  createSessionCookie,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  sessionCookieOptions,
  type SessionUser,
} from "@/lib/auth/session";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";

type GoogleTokenResponse = {
  id_token?: string;
  error?: string;
};

type GoogleTokenInfo = {
  aud?: string;
  email?: string;
  email_verified?: string | boolean;
  exp?: string;
  name?: string;
  picture?: string;
  sub?: string;
};

function getRedirectUri(request: NextRequest) {
  const origin = process.env.AUTH_URL || request.nextUrl.origin;

  return `${origin}/api/auth/google/callback`;
}

function redirectWithError(request: NextRequest, error: string) {
  const url = new URL("/", request.nextUrl.origin);

  url.searchParams.set("auth_error", error);

  return NextResponse.redirect(url);
}

function clearOAuthCookies(response: NextResponse) {
  response.cookies.delete("palar_oauth_state");
  response.cookies.delete("palar_oauth_verifier");
}

async function exchangeCodeForToken(request: NextRequest, code: string, codeVerifier: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth environment variables are not configured.");
  }

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      code_verifier: codeVerifier,
      grant_type: "authorization_code",
      redirect_uri: getRedirectUri(request),
    }),
  });

  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

  if (!tokenResponse.ok || !tokenData.id_token) {
    throw new Error(tokenData.error || "Google token exchange failed.");
  }

  return tokenData.id_token;
}

async function verifyGoogleIdToken(idToken: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const tokenInfoUrl = new URL(GOOGLE_TOKEN_INFO_URL);

  tokenInfoUrl.searchParams.set("id_token", idToken);

  const response = await fetch(tokenInfoUrl);
  const tokenInfo = (await response.json()) as GoogleTokenInfo;
  const isEmailVerified = tokenInfo.email_verified === true || tokenInfo.email_verified === "true";
  const expiresAt = Number(tokenInfo.exp || 0);

  if (
    !response.ok ||
    !tokenInfo.sub ||
    !tokenInfo.email ||
    tokenInfo.aud !== clientId ||
    !isEmailVerified ||
    expiresAt < Math.floor(Date.now() / 1000)
  ) {
    throw new Error("Google ID token verification failed.");
  }

  return {
    sub: tokenInfo.sub,
    email: tokenInfo.email,
    name: tokenInfo.name || tokenInfo.email,
    picture: tokenInfo.picture,
  } satisfies SessionUser;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const storedState = request.cookies.get("palar_oauth_state")?.value;
  const codeVerifier = request.cookies.get("palar_oauth_verifier")?.value;

  if (error) {
    const response = redirectWithError(request, error);

    clearOAuthCookies(response);

    return response;
  }

  if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
    const response = redirectWithError(request, "invalid_oauth_state");

    clearOAuthCookies(response);

    return response;
  }

  try {
    const idToken = await exchangeCodeForToken(request, code, codeVerifier);
    const user = await verifyGoogleIdToken(idToken);
    const response = NextResponse.redirect(new URL("/", request.nextUrl.origin));

    clearOAuthCookies(response);
    response.cookies.set(SESSION_COOKIE, createSessionCookie(user), {
      ...sessionCookieOptions,
      maxAge: SESSION_TTL_SECONDS,
    });

    return response;
  } catch {
    const response = redirectWithError(request, "oauth_failed");

    clearOAuthCookies(response);

    return response;
  }
}
