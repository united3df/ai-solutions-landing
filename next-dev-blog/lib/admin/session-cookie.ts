import { cookies } from "next/headers";
import { getBlogAdminSessionSecret } from "./env";
import {
  SESSION_COOKIE_NAME,
  verifyAdminSession,
} from "./session-core";

export async function verifyCookieSession(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE_NAME)?.value;
  const secret = getBlogAdminSessionSecret();
  if (!raw || !secret) return false;
  return verifyAdminSession(raw, secret);
}
