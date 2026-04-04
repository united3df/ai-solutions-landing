"use client";

import { Calendar } from "lucide-react";
import { openCalendlyPopup } from "@/lib/utils/calendly";
import { trackLead } from "@/lib/ads/events";

export function BlogCalendlyCta() {
  return (
    <div
      className="not-prose my-12 flex flex-col items-center gap-4 rounded-lg border border-dev-border bg-dev-surface/60 px-6 py-8"
      role="region"
      aria-label="Book a meeting"
    >
      <p className="text-center font-[var(--font-dev-mono)] text-[11px] uppercase tracking-[0.12em] text-dev-muted">
        Ready to talk?
      </p>
      <button
        type="button"
        onClick={() => {
          trackLead({ source: "calendly_click" });
          openCalendlyPopup();
        }}
        className="inline-flex items-center gap-2 rounded-md border border-dev-accent bg-dev-accent/10 px-6 py-3 font-[var(--font-dev-mono)] text-sm text-dev-accent transition-colors hover:bg-dev-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dev-accent"
      >
        <Calendar className="h-4 w-4 shrink-0" aria-hidden />
        Book a 15-minute call
      </button>
    </div>
  );
}
