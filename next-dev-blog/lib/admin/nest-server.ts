import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  verifyAdminSession,
} from "./session-core";
import { assertAdminTokenIsAscii, getBlogApiBaseUrl } from "./nest-bff";

/**
 * Authenticated server-side fetch to Nest (for RSC). Returns null if session invalid.
 */
export async function adminNestFetch(
  path: string,
  init?: RequestInit,
): Promise<Response | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE_NAME)?.value;
  const secret = process.env.BLOG_ADMIN_SESSION_SECRET;
  console.log(`[adminNestFetch] path=${path} cookie_defined=${!!raw} secret_defined=${!!secret}`);
  if (!raw || !secret) {
    console.log("[adminNestFetch] NULL — missing cookie or secret");
    return null;
  }
  const sessionValid = await verifyAdminSession(raw, secret);
  console.log(`[adminNestFetch] session_valid=${sessionValid}`);
  if (!sessionValid) {
    console.log("[adminNestFetch] NULL — session verification failed");
    return null;
  }
  const token = process.env.ADMIN_TOKEN?.trim();
  console.log(`[adminNestFetch] admin_token_defined=${!!token}`);
  if (!token) {
    console.log("[adminNestFetch] NULL — ADMIN_TOKEN not set");
    return null;
  }
  assertAdminTokenIsAscii(token);
  const base = getBlogApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  console.log(`[adminNestFetch] fetching url=${url}`);
  const hasBody = init?.body !== undefined && init?.body !== null;
  try {
    const res = await fetch(url, {
      ...init,
      cache: "no-store",
      headers: {
        ...(init?.headers as Record<string, string> | undefined),
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        "x-admin-token": token,
      },
    });
    console.log(`[adminNestFetch] response status=${res.status}`);
    return res;
  } catch (e) {
    console.log(`[adminNestFetch] fetch ERROR: ${e instanceof Error ? e.message : String(e)}`);
    return null;
  }
}
