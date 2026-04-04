/**
 * Main marketing site origin for cross-links when this app is deployed on a subdomain.
 */

/** Canonical host for this app (dev portfolio + blog). Override with NEXT_PUBLIC_SITE_URL. */
export const DEFAULT_DEV_APP_ORIGIN = "https://ai4b2b.site";

export function getDevAppOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return DEFAULT_DEV_APP_ORIGIN;
}

/** Absolute URL on this app (portfolio / blog), always on dev.ai4b2b.site or NEXT_PUBLIC_SITE_URL. */
export function devAppPath(path: string): string {
  const base = getDevAppOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function getMainSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_MAIN_SITE_URL?.trim() || "";
  if (!raw) return "";
  return raw.replace(/\/$/, "");
}

/** Absolute URL to a path on the main site, or same-origin path if NEXT_PUBLIC_MAIN_SITE_URL is unset. */
export function mainSitePath(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = getMainSiteOrigin();
  if (!base) return p;
  return `${base}${p}`;
}
