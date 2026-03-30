/**
 * Ads tracking configuration.
 * Set IDs via .env.local — scripts load only when IDs are present.
 */

export const adsConfig = {
  google: {
    gaId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "", // G-XXXXXXXX
    gtagId: process.env.NEXT_PUBLIC_GOOGLE_ADS_GTAG ?? "", // AW-XXXXXXXX
  },
  meta: {
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
  tiktok: {
    pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
  },
  linkedin: {
    partnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "",
  },
  microsoft: {
    uetId: process.env.NEXT_PUBLIC_MICROSOFT_UET_ID ?? "",
  },
} as const;

export const hasGoogleAds = Boolean(adsConfig.google.gtagId);
export const hasMetaPixel = Boolean(adsConfig.meta.pixelId);
export const hasTikTokPixel = Boolean(adsConfig.tiktok.pixelId);
export const hasLinkedInTag = Boolean(adsConfig.linkedin.partnerId);
export const hasMicrosoftUet = Boolean(adsConfig.microsoft.uetId);
