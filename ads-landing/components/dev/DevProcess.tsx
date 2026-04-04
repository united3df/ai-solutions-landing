"use client";

import { useRef, useEffect } from "react";

const STEPS = [
  {
    num: "01",
    title: "Pain Mapping",
    desc: "We map what's manual, what's painful, and what AI can realistically fix in your business this week.",
  },
  {
    num: "02",
    title: "Scope & Define",
    desc: "Clear boundaries. Measurable goals. We define exactly what gets built — no scope creep, no surprises.",
  },
  {
    num: "03",
    title: "Build & Integrate",
    desc: "AI integrated into your existing stack. No vendor lock-in. Clean architecture you can maintain forever.",
  },
  {
    num: "04",
    title: "Ship & Iterate",
    desc: "Real usage drives what we improve next. Post-launch support included. You own every line of code.",
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
      className="relative z-[1] scroll-mt-24 opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-[color:var(--color-dev-border)] py-24 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
          Process
        </div>
        <h2 className="font-[var(--font-dev-display)] text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.96] tracking-[0.03em] mb-4">
          HOW WE
          <br />
          EMBED & SHIP.
        </h2>
        <p className="mb-12 max-w-[540px] text-[0.95rem] font-light leading-[1.75] text-dev-muted">
          Four steps. First automation ships within days of kickoff, not months.
        </p>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-dev)] bg-[color:var(--color-dev-border)] sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="bg-dev-s1 p-8 transition-colors hover:bg-dev-s2 md:px-6 md:py-8"
            >
              <span className="font-[var(--font-dev-display)] text-[2rem] leading-none tracking-[0.05em] text-dev-accent">
                {s.num}
              </span>
              <div className="mb-2 mt-3 text-[0.92rem] font-semibold">{s.title}</div>
              <p className="text-[0.8rem] font-light leading-relaxed text-dev-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
