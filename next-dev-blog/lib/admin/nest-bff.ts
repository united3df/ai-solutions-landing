import { NextResponse } from "next/server";
import { verifyCookieSession } from "./session-cookie";

export function getBlogApiBaseUrl(): string {
  const raw =
    process.env.BLOG_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:3001";
  return raw.replace(/\/$/, "");
}

export function assertAdminTokenIsAscii(token: string): void {
  for (let i = 0; i < token.length; i++) {
    const c = token.charCodeAt(i);
    if (c > 0xff) {
      throw new Error(
        "ADMIN_TOKEN must be ASCII-only (no Cyrillic or emoji). " +
        "Regenerate a secret, e.g. `openssl rand -hex 32`, and set the same value in backend-service and next-dev-blog.",
      );
    }
  }
}

export async function forwardToNest(
  path: string,
  init?: RequestInit,
): Promise<NextResponse> {
  const ok = await verifyCookieSession();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = process.env.ADMIN_TOKEN?.trim();
  if (!token) {
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }
  try {
    assertAdminTokenIsAscii(token);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid ADMIN_TOKEN";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
  const base = getBlogApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const hasBody = init?.body !== undefined && init?.body !== null;
  const res = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init?.headers as Record<string, string> | undefined),
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      "x-admin-token": token,
    },
  });
  const text = await res.text();
  const ct = res.headers.get("content-type") ?? "application/json";
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": ct },
  });
}
