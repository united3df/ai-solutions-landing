/**
 * UTM and click ID parsing for ad attribution.
 * Persists params to sessionStorage on first load for passback to conversions.
 */

const STORAGE_KEY = "ads_attribution_params";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface ClickIds {
  gclid?: string;
  fbclid?: string;
  ttclid?: string;
  li_fat_id?: string;
  msclkid?: string;
}

export interface AttributionParams {
  utm: UtmParams;
  clickIds: ClickIds;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const CLICK_ID_KEYS = ["gclid", "fbclid", "ttclid", "li_fat_id", "msclkid"] as const;

function getSearchParams(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export function getUtmParams(): UtmParams {
  const params = getSearchParams();
  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

export function getClickIds(): ClickIds {
  const params = getSearchParams();
  const clickIds: ClickIds = {};
  for (const key of CLICK_ID_KEYS) {
    const value = params.get(key);
    if (value) clickIds[key] = value;
  }
  return clickIds;
}

export function getAttributionParams(): AttributionParams {
  return {
    utm: getUtmParams(),
    clickIds: getClickIds(),
  };
}

export function persistAttributionParams(): void {
  if (typeof window === "undefined") return;
  const params = getAttributionParams();
  const hasAny =
    Object.keys(params.utm).length > 0 ||
    Object.keys(params.clickIds).length > 0;
  if (hasAny) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
    } catch {
      // ignore storage errors
    }
  }
}

export function getPersistedAttributionParams(): AttributionParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AttributionParams;
  } catch {
    return null;
  }
}

/**
 * Build query string from UTM + click IDs for passback (e.g. to Calendly).
 */
export function buildAttributionQueryString(): string {
  const persisted = getPersistedAttributionParams();
  const current = getAttributionParams();
  const source = persisted ?? current;

  const pairs: string[] = [];
  for (const [k, v] of Object.entries(source.utm)) {
    if (v) pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  }
  for (const [k, v] of Object.entries(source.clickIds)) {
    if (v) pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  }
  return pairs.length > 0 ? `?${pairs.join("&")}` : "";
}
