"use client";

import Script from "next/script";
import { getUtmParams } from "@/lib/ads/url-params";
import { setClarityUtmTags } from "@/lib/ads/clarity-utm";

const FALLBACK_CLARITY_ID = "uiyrsokzzw";

const CLARITY_SCRIPT = (id: string) =>
  `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`;

export function ClarityInit() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? FALLBACK_CLARITY_ID;

  const handleLoad = () => {
    setClarityUtmTags(getUtmParams());
    console.log("[Clarity] integrated", { projectId: clarityId });
  };

  return (
    <Script
      id="microsoft-clarity-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: CLARITY_SCRIPT(clarityId) }}
      onLoad={handleLoad}
    />
  );
}