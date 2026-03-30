"use client";

import { useRef, useEffect } from "react";
import { OPEN_HERO_AUDIT_EVENT } from "./hero-audit";

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
      className="relative z-[1] opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out px-6 py-24 text-center md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[860px]">
        <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
          Ready to Ship
        </div>
        <h2 className="font-[var(--font-dev-display)] text-[clamp(3rem,7vw,5.5rem)] leading-[0.96] tracking-[0.03em] mb-4">
          WANT TO SKIP
          <br />
          THE FRAMEWORK AND
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.5px var(--color-dev-text)" }}
          >
            JUST SHIP?
          </span>
        </h2>
        <p className="mx-auto mb-10 max-w-[500px] text-[1rem] font-light leading-[1.75] text-dev-muted">
          Tell me what you want to automate — I&apos;ll respond with exactly what I&apos;d build
          first, what it&apos;d cost, and when it&apos;d be live.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent(OPEN_HERO_AUDIT_EVENT));
            }}
            className="inline-flex items-center justify-center rounded bg-dev-accent px-9 py-4 text-[1rem] font-bold text-[#080809] transition-transform hover:opacity-90 hover:-translate-y-0.5"
          >
            Book Free AI Audit →
          </button>
          <a
            href="#get-framework"
            className="inline-flex items-center justify-center rounded border border-[color:var(--color-dev-border-strong)] px-9 py-4 text-[1rem] font-normal text-dev-text no-underline transition-colors hover:border-dev-accent hover:text-dev-accent hover:-translate-y-0.5"
          >
            Get the Framework First
          </a>
        </div>
        <p className="mt-6 text-[0.78rem] text-dev-dim">
          Bonus: investor pitch prep & early bird outreach help included for new MVP projects
        </p>
      </div>
    </section>
  );
}
