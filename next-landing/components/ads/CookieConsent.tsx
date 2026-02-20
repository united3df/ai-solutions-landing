"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ads_cookie_consent";

type ConsentStatus = "accepted" | "rejected" | null;

function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
    return null;
  } catch {
    return null;
  }
}

function updateConsentMode(granted: boolean) {
  if (typeof window === "undefined") return;
  const run = () => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
      });
    }
  };
  run();
  if (typeof window.gtag !== "function") {
    setTimeout(run, 500);
  }
}

export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setStatus(stored);
    setMounted(true);
    if (stored === "accepted") {
      updateConsentMode(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setStatus("accepted");
    updateConsentMode(true);
  };

  const handleReject = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "rejected");
    } catch {
      // ignore
    }
    setStatus("rejected");
    updateConsentMode(false);
  };

  if (!mounted || status !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:p-6">
        <p className="mb-4 text-sm text-slate-700">
          We use cookies and similar technologies for analytics and advertising.
          By clicking &quot;Accept&quot;, you consent to this use. See our{" "}
          <a
            href="/privacy"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAccept}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
