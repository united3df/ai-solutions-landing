/**
 * Unified conversion event tracking.
 * Sends to all configured platforms with event_id for deduplication.
 */

import {
  hasGoogleAds,
  hasMetaPixel,
  hasTikTokPixel,
} from "./config";
import { getPersistedAttributionParams } from "./url-params";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
    };
  }
}

function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export interface TrackLeadOptions {
  source: "contact_form" | "calendly_click";
  email?: string;
}

export function trackLead(options: TrackLeadOptions): void {
  const eventId = generateEventId();
  const attribution = getPersistedAttributionParams();

  if (hasGoogleAds && typeof window.gtag === "function") {
    const gtagId = process.env.NEXT_PUBLIC_GOOGLE_ADS_GTAG;
    if (gtagId) {
      window.gtag("event", "generate_lead", {
        send_to: gtagId,
        event_callback: undefined,
        event_id: eventId,
      });
    }
  }

  if (hasMetaPixel && typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: options.source,
      ...(options.email && { content_category: "contact" }),
    }, { eventID: eventId });
  }

  if (hasTikTokPixel && typeof window.ttq !== "undefined") {
    const params: Record<string, unknown> = {
      content_type: "lead",
      content_name: options.source,
    };
    if (attribution?.clickIds.ttclid) {
      params.ttclid = attribution.clickIds.ttclid;
    }
    window.ttq.track("SubmitForm", params);
  }
}

export function trackPageView(): void {
  if (hasGoogleAds && typeof window.gtag === "function") {
    window.gtag("event", "page_view");
  }

  if (hasMetaPixel && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}
