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
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const secret = getBlogAdminSessionSecret();
  if (!token || !secret || !(await verifyAdminSession(token, secret))) {
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
