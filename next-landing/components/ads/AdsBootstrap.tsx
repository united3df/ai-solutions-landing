"use client";

import { useEffect } from "react";
import { persistAttributionParams } from "@/lib/ads/url-params";

/**
 * Persists UTM and click IDs to sessionStorage on page load for attribution passback.
 */
export function AdsBootstrap() {
  useEffect(() => {
    persistAttributionParams();
  }, []);
  return null;
}
