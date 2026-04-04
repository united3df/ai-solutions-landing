"use client";

import { useRef, useEffect, type ReactNode } from "react";

type CaseTag = "saas" | "smb";

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
    tagLabel: "SMB · Ops",
    metric: (
      <>
        −<span className="text-dev-accent">180h</span>
      </>
    ),
    title: "Slack bot replacing 3 hours of daily manual reporting",
    desc: "Pulls data from 4 tools, generates daily summaries, flags anomalies. Zero manual ops. Deployed in 6 days.",
    chips: ["Slack API", "OpenAI", "n8n", "PostgreSQL"],
  },
  {
    tag: "saas",
    tagLabel: "SaaS · Product",
    metric: (
      <>
        3wk→<span className="text-dev-accent">7d</span>
      </>
    ),
    title: "RAG assistant cutting client onboarding time by 65%",
    desc: "Trained on 200+ SOPs. New hires and clients self-serve answers instantly. Key-person dependency down 60%.",
    chips: ["LangChain", "Pinecone", "Next.js", "OpenAI"],
  },
  {
    tag: "smb",
    tagLabel: "SMB · Support",
    metric: <span className="text-dev-accent">80%</span>,
    title: "Voice agent deflecting 80% of inbound support calls",
    desc: "Resolves common issues, routes edge cases with context. Response time: 10 min → 4 min. No new headcount.",
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
    title: "AI-powered SaaS scaled from $0 to $2M+ ARR",
    desc: "Full-stack product with embedded AI copilot, structured user journeys, and admin content system. Y Combinator team.",
    chips: ["Next.js 15", "NestJS", "GPT-4", "Firebase"],
  },
  {
    tag: "saas",
    tagLabel: "SaaS · Internal AI",
    metric: (
      <>
        −<span className="text-dev-accent">40%</span>
      </>
    ),
    title: "GPT-4 copilot cutting support ticket volume by 40%",
    desc: "Embedded in the product dashboard, trained on user history and product knowledge. Surfaces answers before tickets open.",
    chips: ["OpenAI", "RAG", "React", "Webhooks"],
  },
  {
    tag: "smb",
    tagLabel: "SMB · Blockchain",
    metric: <span className="text-dev-accent">25%</span>,
    title: "Platform capturing 25% of US NFT Broadcasting market",
    desc: "Full-stack blockchain platform with smart contracts, real-time streaming, and marketplace infra. Market leader in 12 months.",
    chips: ["Solidity", "React", "Node.js", "Web3"],
  },
];

const tagClass: Record<CaseTag, string> = {
  smb: "bg-dev-amber/12 text-dev-amber",
  saas: "bg-dev-blue/12 text-dev-blue",
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
      className="relative z-[1] scroll-mt-24 opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out py-24 px-6 pt-0 md:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
          Relevant Builds
        </div>
        <h2 className="font-[var(--font-dev-display)] text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.96] tracking-[0.03em] mb-4">
          WHAT THIS LOOKS
          <br />
          LIKE IN PRACTICE.
        </h2>
        <p className="mb-12 max-w-[540px] text-[0.95rem] font-light leading-[1.75] text-dev-muted">
          Real builds with real numbers — the kind of thing you could ship in weeks, not quarters.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-[var(--radius-dev)] border border-[color:var(--color-dev-border)] bg-dev-s1 p-7 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-dev-border-strong)]"
            >
              <span
                className={`mb-5 inline-block w-fit rounded px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] ${tagClass[c.tag]}`}
              >
                {c.tagLabel}
              </span>
              <div className="font-[var(--font-dev-display)] text-[3rem] leading-none text-dev-text mb-1">
                {c.metric}
              </div>
              <h3 className="mb-2 text-[0.9rem] font-semibold leading-snug">{c.title}</h3>
              <p className="mb-auto flex-1 text-[0.8rem] font-light leading-relaxed text-dev-muted">
                {c.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-1 border-t border-[color:var(--color-dev-border)] pt-4">
                {c.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded border border-[color:var(--color-dev-border)] px-2 py-0.5 text-[0.68rem] text-dev-dim"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
