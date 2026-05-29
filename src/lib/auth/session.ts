import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "palar_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type SessionUser = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
};

type SessionPayload = SessionUser & {
  exp: number;
};

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET is required in production.");
  }

  return secret ?? "development-auth-secret-change-me";
}

function encodeBase64Url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function signaturesMatch(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionCookie(user: SessionUser) {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const body = encodeBase64Url(JSON.stringify(payload));

  return `${body}.${sign(body)}`;
}

export function readSessionCookie(cookieValue?: string) {
  if (!cookieValue) {
    return null;
  }

  const [body, signature] = cookieValue.split(".");

  if (!body || !signature || !signaturesMatch(signature, sign(body))) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(body)) as SessionPayload;

    if (!payload.sub || !payload.email || !payload.exp || payload.exp < Date.now() / 1000) {
      return null;
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name || payload.email,
      picture: payload.picture,
    } satisfies SessionUser;
  } catch {
    return null;
  }
}
