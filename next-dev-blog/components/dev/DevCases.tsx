"use client";

import { useRef, useEffect, type ReactNode } from "react";

type CaseTag = "smb" | "product" | "saas";

const CASES: {
  tag: CaseTag;
  tagLabel: string;
  metric: ReactNode;
  title: string;
  desc: string;
  chips: string[];
}[] = [
  {
    tag: "smb",
    tagLabel: "SMB · Operations",
    metric: (
      <>
        −<span className="text-dev-accent">180h</span>
      </>
    ),
    title: "Slack bot replacing 3 hours of daily manual reporting",
    desc: "Built a Slack AI agent that pulls data from 4 tools, generates daily standup summaries, and flags anomalies automatically. Zero manual work.",
    chips: ["Slack API", "OpenAI", "n8n", "PostgreSQL"],
  },
  {
    tag: "product",
    tagLabel: "Product Team · SaaS",
    metric: (
      <>
        3w → <span className="text-dev-accent">7d</span>
      </>
    ),
    title: "AI onboarding assistant cutting client ramp time in half",
    desc: "RAG-based assistant trained on 200+ SOPs and product docs. New hires and clients self-serve answers instantly — key-person dependency dropped by 60%.",
    chips: ["LangChain", "Pinecone", "Next.js", "OpenAI"],
  },
  {
    tag: "smb",
    tagLabel: "SMB · Customer Support",
    metric: <span className="text-dev-accent">80%</span>,
    title: "Voice agent handling 80% of inbound support calls",
    desc: "AI voice agent qualifies inbound calls, resolves common issues, and routes edge cases to humans with full context — response time dropped from 10 min to 4 min.",
    chips: ["ElevenLabs", "Twilio", "OpenAI", "CRM"],
  },
  {
    tag: "saas",
    tagLabel: "SaaS · Startup",
    metric: (
      <>
        $<span className="text-dev-accent">2M+</span>
      </>
    ),
    title: "AI-powered platform scaled from $0 to $2M+ ARR",
    desc: "Full-stack SaaS with structured user journeys, AI copilot embedded in product flows, and admin-controlled content system. Built for a Y Combinator-backed team.",
    chips: ["Next.js 15", "NestJS", "GPT-4", "Firebase"],
  },
  {
    tag: "product",
    tagLabel: "Product Team · Internal AI",
    metric: (
      <>
        −<span className="text-dev-accent">40%</span>
      </>
    ),
    title: "Custom ChatGPT bot cutting support time by 40%",
    desc: "Embedded AI copilot trained on product knowledge and user history. Surfaces answers inside the dashboard before users open a ticket — support volume dropped immediately.",
    chips: ["OpenAI", "RAG", "React", "Webhooks"],
  },
  {
    tag: "smb",
    tagLabel: "SMB · Blockchain",
    metric: <span className="text-dev-accent">25%</span>,
    title: "Captured 25% of US NFT Broadcasting market",
    desc: "Built a full-stack blockchain platform with smart contracts, real-time streaming, and marketplace infrastructure. Reached market dominance in under 12 months.",
    chips: ["Solidity", "React", "Node.js", "Web3"],
  },
];

const tagClass: Record<CaseTag, string> = {
  smb: "bg-[#FFB547]/12 text-[#FFB547]",
  product: "bg-[#5B9BFF]/12 text-[#5B9BFF]",
  saas: "bg-dev-accent/10 text-dev-accent",
};

export function DevCases() {
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
      id="cases"
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border py-24 px-6 md:px-12"
    >
      <div className="flex items-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
        <span className="w-6 h-px bg-dev-accent" />
        Relevant Builds
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">
        What this looks like
        <br />
        in practice.
      </h2>
      <p className="text-base text-dev-muted max-w-[560px] font-light leading-[1.7] mb-16">
        Real examples of what we build — the kind of thing you could ship in weeks, not quarters.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CASES.map((c) => (
          <article
            key={c.title}
            className="rounded-xl border border-dev-border bg-dev-surface p-7 transition-all hover:-translate-y-1 hover:border-dev-border/80"
          >
            <span
              className={`mb-5 inline-block rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${tagClass[c.tag]}`}
            >
              {c.tagLabel}
            </span>
            <div className="font-[var(--font-dev-display)] text-[2.25rem] leading-none text-dev-text mb-2 md:text-[2.4rem]">
              {c.metric}
            </div>
            <h3 className="text-[0.9rem] font-medium leading-snug text-dev-text mb-2">{c.title}</h3>
            <p className="text-[0.8rem] font-light leading-relaxed text-dev-muted mb-4">{c.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {c.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-dev-border px-2 py-0.5 text-[0.7rem] text-dev-muted/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
