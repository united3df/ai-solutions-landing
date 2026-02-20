"use client";

import { useRef, useEffect } from "react";

const OUTCOMES = [
  { before: "10 min", after: "4 min", label: "Avg Response Time\nReduced 2×+" },
  { before: "Error 5%", after: "2%", label: "Error Rate\nConsistent Quality" },
  { before: "Manual ops", after: "−180h", label: "Hours/Month Saved\nvia AI Automation" },
  { before: "3 weeks", after: "7d", label: "Onboarding Time\nFaster Knowledge Access" },
];

export function DevOutcomes() {
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
      id="outcomes"
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border py-24 px-6 md:px-12"
    >
      <div className="flex items-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
        <span className="w-6 h-px bg-dev-accent" />
        Results
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">Business Outcomes</h2>
      <p className="text-base text-dev-muted max-w-[560px] font-light leading-[1.7] mb-16">
        Measurable operational improvements — not just shipping code, but moving the metrics that matter.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dev-border border border-dev-border mb-16">
        {OUTCOMES.map((o) => (
          <div key={o.label} className="bg-dev-surface p-10">
            <div className="font-[var(--font-dev-mono)] text-[13px] text-dev-muted line-through mb-1">{o.before}</div>
            <div className="font-[var(--font-dev-display)] text-[44px] text-dev-accent leading-none mb-3">{o.after}</div>
            <div className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase leading-[1.5] whitespace-pre-line">
              {o.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
