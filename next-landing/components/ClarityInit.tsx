"use client";

import { useEffect } from "react";
import { clarity } from "react-microsoft-clarity";
import { getUtmParams } from "@/lib/ads/url-params";
import { setClarityUtmTags } from "@/lib/ads/clarity-utm";

const FALLBACK_CLARITY_ID = "uiyrsokzzw";

export function ClarityInit() {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? FALLBACK_CLARITY_ID;
    clarity.init(clarityId);
    setClarityUtmTags(getUtmParams());
    console.log("[Clarity] integrated",);
  }, []);
  return null;
}
