"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    _hsq?: unknown[][];
  }
}

export function ThankYouClient() {
  useEffect(() => {
    if (typeof window !== "undefined" && window._hsq) {
      window._hsq.push(["trackPageView"]);
    }
  }, []);

  return null;
}
