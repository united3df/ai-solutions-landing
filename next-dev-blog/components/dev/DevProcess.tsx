"use client";

import { useRef, useEffect } from "react";

const STEPS = [
  {
    num: "01",
    title: "Use Case Discussion",
    desc: "We start with how your business works today — what's painful, what's manual, what AI could realistically improve.",
  },
  {
    num: "02",
    title: "Scope Definition",
    desc: "We define what AI should do — and what it shouldn't. Clear boundaries, predictable behavior, measurable goals.",
  },
  {
    num: "03",
    title: "Build & Integrate",
    desc: "Voice, chat, or system-level AI integrated into your existing stack. No vendor lock-in, maintainable architecture.",
  },
  {
    num: "04",
    title: "Launch & Iterate",
    desc: "We improve based on real usage, not assumptions. Post-launch support included. Results tracked from day one.",
  },
];

export function DevProcess() {
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
      id="process"
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border py-24 px-6 md:px-12"
    >
      <div className="flex items-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
        <span className="w-6 h-px bg-dev-accent" />
        How It Works
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">Simple. Transparent.</h2>
      <p className="text-base text-dev-muted max-w-[560px] font-light leading-[1.7] mb-16">
        No fluff. No overengineering. We start with how your business works and build from there.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dev-border border border-dev-border">
        {STEPS.map((s) => (
          <div key={s.num} className="bg-dev-surface p-10 group">
            <div className="font-[var(--font-dev-display)] text-[80px] text-dev-border leading-none mb-6 transition-colors group-hover:text-dev-accent/15">
              {s.num}
            </div>
            <div className="font-[var(--font-dev-mono)] text-[13px] text-dev-text tracking-[0.06em] uppercase mb-2.5">{s.title}</div>
            <p className="text-[13px] text-dev-muted font-light leading-[1.7]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
