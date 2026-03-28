"use client";

import { useRef, useEffect } from "react";
import { Check } from "lucide-react";

const BADGES = [
  { label: "⭐ Top 2% Upwork", hi: true },
  { label: "🥇 Enterprise Partner", hi: true },
  { label: "Y Combinator", hi: false },
  { label: "Techstars", hi: false },
  { label: "Fortune 500", hi: false },
  { label: "Blockchain", hi: false },
];

export function DevAbout() {
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
      id="about"
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 border-t border-dev-border py-24 px-6 md:px-12"
    >
      <div className="lg:sticky lg:top-[120px]">
        <div className="flex items-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
          <span className="w-6 h-px bg-dev-accent" />
          About
        </div>
        <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">
          Founder-Friendly.
          <br />
          Product-Focused.
        </h2>
        <div className="flex flex-wrap gap-2.5 mt-8">
          {BADGES.map((b) => (
            <span
              key={b.label}
              className={`font-[var(--font-dev-mono)] text-[11px] py-1.5 px-3.5 tracking-[0.06em] uppercase transition-all ${
                b.hi
                  ? "border border-dev-accent/40 text-dev-accent bg-dev-accent/5"
                  : "border border-dev-border text-dev-muted hover:border-dev-accent hover:text-dev-accent"
              }`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-dev-muted text-base font-light leading-[1.8]">
          I&apos;m a Full-Stack Developer with deep expertise in <strong className="text-dev-text font-medium">blockchain and AI</strong>. I specialize in building dynamic web and mobile applications, integrating smart contracts, decentralized systems, and AI-driven solutions.
        </p>
        <p className="text-dev-muted text-base font-light leading-[1.8]">
          With a strong foundation across the entire stack — from pixel-perfect frontends to robust backend systems — I&apos;ve <strong className="text-dev-text font-medium">successfully delivered scalable, user-focused projects</strong> for startups, Fortune 500s, and everything in between.
        </p>
        <p className="text-dev-muted text-base font-light leading-[1.8]">
          I&apos;ve built AI tools for <strong className="text-dev-text font-medium">Meta partner agencies</strong>, scaled a US-based startup from <strong className="text-dev-text font-medium">$0 to $2M+ ARR</strong>, cut support time by <strong className="text-dev-text font-medium">40% with custom ChatGPT bots</strong>, and helped a blockchain platform capture <strong className="text-dev-text font-medium">25% of the US NFT market</strong> in the Broadcasting sector.
        </p>
        <p className="text-dev-muted text-base font-light leading-[1.8]">
          Beyond code: I also help founders <strong className="text-dev-text font-medium">prepare investor pitches and attract early birds</strong> — because shipping a product is just the beginning.
        </p>
        <div className="space-y-3 pt-2">
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-dev-accent shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <p className="font-[var(--font-dev-mono)] text-[13px] text-dev-accent tracking-[0.04em] mb-1">
                Structured flows / dashboards / AI
              </p>
              <p className="text-dev-muted text-base font-light leading-[1.8]">
                I&apos;ve built production SaaS platforms with structured multi-step journeys, milestone tracking, resume logic, and clean progress dashboards. I implement state-driven workflows, admin-controlled content systems, and scalable backend architecture. On the AI side, I&apos;ve delivered RAG-based assistants, semantic search with embeddings, and contextual AI embedded directly into user flows — not just chat, but AI tied to user progress and platform logic.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-dev-accent shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <p className="font-[var(--font-dev-mono)] text-[13px] text-dev-accent tracking-[0.04em] mb-1">
                AI workflow
              </p>
              <p className="text-dev-muted text-base font-light leading-[1.8]">
                I use AI tools daily to accelerate delivery — from turning specs into scoped tasks and scaffolding features with Cursor, Claude, OpenClaw to rapidly prototyping RAG pipelines (+MS stack), LLM integrations, and automation flows. AI helps me move from idea to working feature in a day or two, then I harden everything with strict typing, validation, testing, and clean architecture so speed never compromises production quality.
              </p>
            </div>
          </div>
        </div>
        <p className="font-[var(--font-dev-mono)] text-[13px] text-dev-accent tracking-[0.04em] pt-2">
          🇺🇸 U.S.-based. Fast response. Founder-friendly communication.
        </p>
      </div>
    </section>
  );
}
