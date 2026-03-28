"use client";

import { useRef, useEffect } from "react";

const STEPS = [
  {
    num: "01",
    title: "Pain Mapping",
    desc: "We map what's painful, what's manual, and what AI can realistically fix in your workflow this week.",
  },
  {
    num: "02",
    title: "Scope & Define",
    desc: "Clear boundaries. Predictable behavior. Measurable goals. We define what AI should do — and what it shouldn't.",
  },
  {
    num: "03",
    title: "Build & Integrate",
    desc: "Voice, chat, or system-level AI integrated into your existing stack. No vendor lock-in. Maintainable architecture.",
  },
  {
    num: "04",
    title: "Ship & Iterate",
    desc: "We improve based on real usage. Post-launch support included. Results tracked from day one. You own everything.",
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
        Process
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">
        Simple. Transparent.
        <br />
        No fluff.
      </h2>
      <p className="text-base text-dev-muted max-w-[560px] font-light leading-[1.7] mb-16">
        We start with how your business works today — what&apos;s painful, what&apos;s manual — then
        build from there.
      </p>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 lg:pt-2">
        <div
          className="pointer-events-none absolute left-[12%] right-[12%] top-[30px] hidden h-px bg-gradient-to-r from-transparent via-dev-border to-transparent lg:block"
          aria-hidden
        />
        {STEPS.map((s) => (
          <div key={s.num} className="group relative z-[1] text-center px-2">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-dev-border bg-dev-surface text-[0.82rem] font-semibold text-dev-muted transition-colors group-hover:border-dev-accent group-hover:bg-dev-accent/10 group-hover:text-dev-accent lg:mb-6">
              {s.num}
            </div>
            <div className="font-[var(--font-dev-mono)] text-[0.92rem] font-medium text-dev-text tracking-[0.02em] mb-2">
              {s.title}
            </div>
            <p className="text-[0.8rem] text-dev-muted font-light leading-[1.6]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
