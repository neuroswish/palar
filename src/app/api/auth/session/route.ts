import { NextRequest, NextResponse } from "next/server";
import { readSessionCookie, SESSION_COOKIE } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const user = readSessionCookie(request.cookies.get(SESSION_COOKIE)?.value);

  return NextResponse.json({ user });
}
