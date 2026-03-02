import { clarity } from "react-microsoft-clarity";
import type { UtmParams } from "./url-params";

/**
 * Passes UTM params to Clarity for session filtering in dashboard.
 * Call after clarity.init().
 */
export function setClarityUtmTags(utmParams: UtmParams): void {
  if (typeof window === "undefined") return;
  if (!clarity.hasStarted()) return;

  clarity.setTag("utm_source", utmParams.utm_source ?? "direct");
  clarity.setTag("utm_medium", utmParams.utm_medium ?? "none");
  clarity.setTag("utm_campaign", utmParams.utm_campaign ?? "none");
  clarity.setTag("utm_term", utmParams.utm_term ?? "none");
  clarity.setTag("utm_content", utmParams.utm_content ?? "none");
}
