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
  if (!raw || !secret || !(await verifyAdminSession(raw, secret))) {
    return null;
  }
  const token = process.env.ADMIN_TOKEN?.trim();
  if (!token) return null;
  assertAdminTokenIsAscii(token);
  const base = getBlogApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const hasBody = init?.body !== undefined && init?.body !== null;
  return fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init?.headers as Record<string, string> | undefined),
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      "x-admin-token": token,
    },
  });
}
