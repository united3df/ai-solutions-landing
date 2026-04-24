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
  if (!secret) {
    // BLOG_ADMIN_SESSION_SECRET is not set — misconfiguration, deny access
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    url.searchParams.set("error", "misconfigured");
    return NextResponse.redirect(url);
  }
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminSession(token, secret))) {
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
