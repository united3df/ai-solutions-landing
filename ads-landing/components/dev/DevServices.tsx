"use client";

import { useRef, useEffect } from "react";

const SERVICES = [
  {
    num: "01",
    icon: "🎙",
    title: "AI Voice Agents",
    desc: "Customer-facing and internal voice assistants that handle repetitive calls, qualify leads, and push structured data into your CRM — 24/7 with no extra headcount.",
    tags: ["80% call deflection", "CRM sync", "Lead qualification", "Custom voice"],
  },
  {
    num: "02",
    icon: "🧠",
    title: "AI Knowledge Bases & RAG",
    desc: "AI trained on your SOPs, docs, and CRM — making every piece of company knowledge instantly accessible. Onboarding drops from 3 weeks to 7 days.",
    tags: ["SOP ingestion", "Semantic search", "Your infra", "Zero lock-in"],
  },
  {
    num: "03",
    icon: "🚀",
    title: "AI MVP & SaaS Development",
    desc: "From validated idea to working product — fast. React, Next.js 15, GPT-4. Test with real users without costly rebuilds. Investor pitch prep included as a bonus.",
    tags: ["Next.js 15", "GPT-4", "Firebase", "Pitch prep bonus"],
  },
  {
    num: "04",
    icon: "⚙️",
    title: "Internal Tools & Automations",
    desc: "Custom dashboards, workflow automation, and internal AI that eliminates manual ops — returning 100–200 hours per month to your team. Built on your stack, owned by you.",
    tags: ["n8n / Make", "Slack bots", "HIPAA", "Full-stack"],
  },
];

export function DevServices() {
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
      id="services"
      className="relative z-[1] scroll-mt-24 opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-[color:var(--color-dev-border)] py-24 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
          What We Ship
        </div>
        <h2 className="font-[var(--font-dev-display)] text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.96] tracking-[0.03em] mb-4">
          FOUR WAYS WE
          <br />
          EMBED AI IN
          <br />
          YOUR BUSINESS.
        </h2>
        <p className="mb-12 max-w-[540px] text-[0.95rem] font-light leading-[1.75] text-dev-muted">
          Production systems integrated into how your business actually operates — not demos, not
          prototypes.
        </p>
        <div className="grid grid-cols-1 grid-rows-4 gap-px overflow-hidden rounded-[var(--radius-dev-lg)] bg-[color:var(--color-dev-border)] md:grid-cols-2 md:grid-rows-2">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="group relative overflow-hidden bg-dev-s1 p-9 transition-colors hover:bg-dev-s2"
            >
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-0 bg-[rgba(198,241,53,0.05)] transition-[height] duration-300 group-hover:h-full"
                aria-hidden
              />
              <span className="relative z-[1] font-[var(--font-dev-display)] text-[3.5rem] leading-none text-[rgba(198,241,53,0.08)]">
                {s.num}
              </span>
              <div className="relative z-[1] mb-3.5 mt-1 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[color:var(--color-dev-border)] bg-dev-s3 text-[0.95rem]">
                  {s.icon}
                </span>
                <span className="text-[0.98rem] font-semibold">{s.title}</span>
              </div>
              <p className="relative z-[1] mb-5 text-[0.83rem] font-light leading-[1.7] text-dev-muted">
                {s.desc}
              </p>
              <div className="relative z-[1] flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-[color:var(--color-dev-border)] px-2 py-0.5 text-[0.7rem] text-dev-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
