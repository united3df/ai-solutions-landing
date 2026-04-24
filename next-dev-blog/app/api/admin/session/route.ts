import { NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  signAdminSession,
} from "@/lib/admin/session-core";
import { getBlogAdminPassword, getBlogAdminSessionSecret } from "@/lib/admin/env";
import { verifyAdminPassword } from "@/lib/admin/session-password";

export async function POST(req: Request) {
  const expected = getBlogAdminPassword();
  const secret = getBlogAdminSessionSecret();
  if (!expected || !secret) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";
  if (!verifyAdminPassword(password, expected)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = await signAdminSession(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
