"use client";

import { useRef, useEffect } from "react";

const OUTCOMES = [
  { before: "10 min", after: "4m", label: "Avg response time" },
  { before: "5% errors", after: "2%", label: "Error rate at scale" },
  { before: "3 weeks", after: "7d", label: "Onboarding time" },
  { before: "Manual ops", after: "−180h", label: "Hours/month reclaimed" },
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
        Business Outcomes
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">
        Metrics that actually
        <br />
        move the needle.
      </h2>
      <p className="text-base text-dev-muted max-w-[520px] font-light leading-[1.7] mb-16">
        Not vanity metrics. Operational improvements you&apos;ll see in the first 30 days.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dev-border border border-dev-border rounded-xl overflow-hidden mb-0">
        {OUTCOMES.map((o) => (
          <div key={o.label} className="bg-dev-surface p-8 md:p-10 text-center">
            <div className="font-[var(--font-dev-mono)] text-[0.9rem] text-dev-muted/70 line-through decoration-red-500/70 mb-1">
              {o.before}
            </div>
            <div className="font-[var(--font-dev-display)] text-[2.5rem] md:text-[2.6rem] text-dev-accent leading-none mb-2">
              {o.after}
            </div>
            <div className="text-[0.78rem] text-dev-muted font-light">{o.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
