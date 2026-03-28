"use client";

import { useRef, useEffect } from "react";

const SERVICES = [
  {
    num: "01 / 04",
    icon: "🎙",
    title: "AI Voice Agents",
    desc: "Customer-facing and internal voice assistants that handle repetitive calls, qualify leads, support operators, and push structured data into your CRM — 24/7 without headcount.",
    items: [
      "Handle 80%+ of inbound support calls automatically",
      "Structured call summaries + CRM triggers",
      "Sales qualification & warm transfer flows",
      "Custom voice, no generic bots",
    ],
  },
  {
    num: "02 / 04",
    icon: "🧠",
    title: "AI Knowledge Bases & RAG",
    desc: "AI assistants trained on your documents, SOPs, and CRM data — making internal knowledge instantly searchable and reducing dependency on key people.",
    items: [
      "Onboarding cut from 3 weeks → 7 days",
      "PDF, SOP, CRM & Notion ingestion",
      "Semantic search across all company knowledge",
      "Runs in your infra — your data stays yours",
    ],
  },
  {
    num: "03 / 04",
    icon: "🚀",
    title: "AI MVP & SaaS Development",
    desc: "From validated idea to working product fast. Built with React, Next.js 15, Node.js, and GPT-4 so you can test with real users — no costly rebuilds later.",
    items: [
      "AI-powered SaaS products & copilots",
      "ChatGPT, Make, n8n automation flows",
      "Embedded AI tied to user progress & logic",
      "Bonus: investor pitch prep included",
    ],
  },
  {
    num: "04 / 04",
    icon: "⚙️",
    title: "Internal Tools & Automations",
    desc: "Custom dashboards, workflow automations, and internal AI tools that eliminate manual ops — built on your stack, handing back 100–200 hours per month.",
    items: [
      "Slack bots, reporting pipelines, admin tools",
      "CI/CD pipelines + post-launch support",
      "HIPAA-compliant systems when needed",
      "Full-stack: React Native, NestJS, PostgreSQL",
    ],
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
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border py-24 px-6 md:px-12"
    >
      <div className="flex items-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
        <span className="w-6 h-px bg-dev-accent" />
        What We Ship
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">
        Four ways we embed
        <br />
        AI into your business.
      </h2>
      <p className="text-base text-dev-muted max-w-[520px] font-light leading-[1.7] mb-16">
        Production-grade systems — not demos. Integrated into how your business actually operates.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dev-border border border-dev-border rounded-[20px] overflow-hidden">
        {SERVICES.map((s) => (
          <div key={s.num} className="bg-dev-surface p-10 md:p-11 transition-colors hover:bg-[#161614]">
            <div className="font-[var(--font-dev-mono)] text-[0.7rem] text-dev-muted/80 font-semibold tracking-[0.1em] mb-5">
              {s.num}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg border border-dev-border bg-[#161614] text-lg"
                aria-hidden
              >
                {s.icon}
              </span>
              <div className="font-[var(--font-dev-display)] text-xl tracking-[0.02em] leading-tight">
                {s.title}
              </div>
            </div>
            <p className="text-sm text-dev-muted font-light leading-[1.7] mb-6">{s.desc}</p>
            <ul className="space-y-2 list-none">
              {s.items.map((item) => (
                <li key={item} className="text-[0.8rem] text-dev-muted font-light flex items-start gap-2">
                  <span className="text-dev-accent shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
