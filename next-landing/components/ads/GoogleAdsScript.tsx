"use client";

import Script from "next/script";
import { hasGoogleAds } from "@/lib/ads/config";

const GTAG_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_GTAG;

export function GoogleAdsScript() {
  if (!hasGoogleAds || !GTAG_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
          });

          gtag('config', '${GTAG_ID}');
        `}
      </Script>
    </>
  );
}
