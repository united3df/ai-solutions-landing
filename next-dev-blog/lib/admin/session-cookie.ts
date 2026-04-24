import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  verifyAdminSession,
} from "./session-core";

export async function verifyCookieSession(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE_NAME)?.value;
  const secret = process.env.BLOG_ADMIN_SESSION_SECRET;
  if (!raw || !secret) return false;
  return verifyAdminSession(raw, secret);
}
