import type { UtmParams } from "./url-params";

declare global {
  interface Window {
    clarity?: (cmd: string, key: string, value: string) => void;
  }
}

/**
 * Passes UTM params to Clarity for session filtering in dashboard.
 * Call after Clarity script has loaded.
 */
export function setClarityUtmTags(utmParams: UtmParams): void {
  if (typeof window === "undefined") return;
  const fn = window.clarity;
  if (!fn || typeof fn !== "function") return;

  fn("set", "utm_source", utmParams.utm_source ?? "direct");
  fn("set", "utm_medium", utmParams.utm_medium ?? "none");
  fn("set", "utm_campaign", utmParams.utm_campaign ?? "none");
  fn("set", "utm_term", utmParams.utm_term ?? "none");
  fn("set", "utm_content", utmParams.utm_content ?? "none");
}
