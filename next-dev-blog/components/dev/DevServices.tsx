"use client";

import { useRef, useEffect } from "react";
import { Bot, Brain, Rocket, Smartphone } from "lucide-react";

const SERVICES = [
  {
    icon: Bot,
    title: "AI Voice Agents",
    desc: "Customer-facing and internal voice assistants that handle repetitive calls, support operators, and trigger actions in your systems.",
    items: ["Handle repetitive inbound calls", "Support sales & support teams", "Generate structured call summaries", "Trigger actions in internal systems"],
  },
  {
    icon: Brain,
    title: "AI Knowledge Bases",
    desc: "AI assistants trained on your company knowledge — documents, SOPs, CRMs — making information instantly accessible.",
    items: ["Documents, PDFs & SOPs", "CRM & help desk integration", "Faster onboarding (3 weeks → 7 days)", "Reduced key-person dependency"],
  },
  {
    icon: Rocket,
    title: "AI MVP Development",
    desc: "From idea to working, usable product — fast. Built with React, Firebase, Node.js, and GPT-4 to validate real usage without costly rebuilds.",
    items: ["AI-powered SaaS products", "Chatbots & AI copilots", "ChatGPT, Make, n8n automations", "⭐️ Investor pitch prep — BONUS"],
  },
  {
    icon: Smartphone,
    title: "Full-Stack & Mobile",
    desc: "Cross-platform mobile apps and robust full-stack builds with CI/CD pipelines, analytics, and post-launch support.",
    items: ["React Native, Swift, Kotlin", "REST APIs & GraphQL", "Blockchain & smart contracts", "HIPAA compliant systems"],
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
        Services
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">What I Build</h2>
      <p className="text-base text-dev-muted max-w-[560px] font-light leading-[1.7] mb-16">
        Practical AI and full-stack solutions that integrate into how your business already works — not theoretical demos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dev-border border border-dev-border">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="bg-dev-surface p-10 md:p-11 transition-colors hover:bg-[#161614]">
              <Icon className="w-7 h-7 text-dev-accent mb-5" strokeWidth={1.5} />
              <div className="font-[var(--font-dev-display)] text-[28px] tracking-[0.03em] mb-3.5">{s.title}</div>
              <p className="text-sm text-dev-muted font-light leading-[1.7] mb-6">{s.desc}</p>
              <ul className="space-y-2 list-none">
                {s.items.map((item) => (
                  <li key={item} className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.04em] flex items-center gap-2">
                    <span className="text-dev-accent">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
