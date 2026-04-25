import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBlogAdminSessionSecret } from "@/lib/admin/env";
import {
  SESSION_COOKIE_NAME,
  verifyAdminSession,
} from "@/lib/admin/session-core";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  const secret = getBlogAdminSessionSecret();
  console.log(`[middleware] path=${pathname} secret_defined=${!!secret}`);
  if (!secret) {
    // BLOG_ADMIN_SESSION_SECRET is not set — misconfiguration, deny access
    console.log("[middleware] REDIRECT misconfigured — BLOG_ADMIN_SESSION_SECRET missing");
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    url.searchParams.set("error", "misconfigured");
    return NextResponse.redirect(url);
  }
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  console.log(`[middleware] token_defined=${!!token} token_length=${token?.length ?? 0}`);
  if (!token) {
    console.log("[middleware] REDIRECT — no session cookie");
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  const valid = await verifyAdminSession(token, secret);
  console.log(`[middleware] token_valid=${valid}`);
  if (!valid) {
    console.log("[middleware] REDIRECT — token verification failed");
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
