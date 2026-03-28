/**
 * URL of the separate Next app (dev + blog) on dev.ai4b2b.site.
 * Override with NEXT_PUBLIC_DEV_BLOG_SITE_URL (e.g. http://localhost:3001 for local).
 */

const DEFAULT_DEV_BLOG_ORIGIN = "https://dev.ai4b2b.site";

export function getDevBlogSiteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_DEV_BLOG_SITE_URL?.replace(/\/$/, "") ??
    DEFAULT_DEV_BLOG_ORIGIN;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
