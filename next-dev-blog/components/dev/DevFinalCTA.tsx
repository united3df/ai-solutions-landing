"use client";

import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { openCalendlyPopup } from "@/lib/utils/calendly";
import { trackLead } from "@/lib/ads/events";

export function DevFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border text-center py-24 md:py-32 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,255,71,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <h2 className="font-[var(--font-dev-display)] text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[0.02em]">
          Thinking About AI,
          <br />
          But Want a Clear Answer?
        </h2>

        <div className="space-y-3 text-left max-w-md mx-auto">
          <p className="font-[var(--font-dev-sans)] text-base text-dev-muted">If you&apos;re unsure:</p>
          <ul className="space-y-2 font-[var(--font-dev-sans)] text-sm text-dev-text">
            {["Where AI fits", "What's realistic", "Or what's worth building first"].map((item) => (
              <li key={item} className="pl-4 border-l-2 border-dev-accent/40">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="font-[var(--font-dev-sans)] text-base text-dev-muted">
          We&apos;ll walk through it honestly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <button
            type="button"
            onClick={() => {
              trackLead({ source: "calendly_click" });
              openCalendlyPopup();
            }}
            className="group cursor-pointer inline-flex items-center justify-center gap-2 font-[var(--font-dev-mono)] text-[13px] py-4 px-8 bg-dev-accent text-black tracking-[0.05em] uppercase font-medium hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,255,71,0.2)] transition-all"
          >
            <span>Book a no-pressure AI discussion</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden />
          </button>
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-[var(--font-dev-mono)] text-[13px] py-4 px-8 bg-transparent text-dev-text border border-dev-border tracking-[0.05em] uppercase hover:border-dev-accent hover:text-dev-accent transition-all"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
