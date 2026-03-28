"use client";

import { useRef, useEffect } from "react";

const STACK_CATEGORIES = [
  { label: "Frontend", tags: ["React", "Next.js 15", "TypeScript", "Tailwind", "Server Components", "FSD"] },
  { label: "Backend", tags: ["Node.js", "NestJS", "Express", "REST APIs", "GraphQL", "WebSockets"] },
  { label: "Mobile", tags: ["React Native", "Expo", "Offline-first", "Push Notifications"] },
  { label: "Databases", tags: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { label: "AI / ML", tags: ["OpenAI API", "LangChain", "Semantic Search", "RAG Pipelines"] },
  { label: "DevOps & Security", tags: ["Docker", "GitHub Actions", "Railway", "AWS", "nginx", "HIPAA", "HL7", "OAuth", "JWT"] },
];

export function DevStack() {
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
      id="stack"
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border py-24 px-6 md:px-12"
    >
      <div className="flex items-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
        <span className="w-6 h-px bg-dev-accent" />
        Tech Stack
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">Tools of the Trade</h2>
      <p className="text-base text-dev-muted max-w-[560px] font-light leading-[1.7] mb-16">
        Modern, production-tested technologies across every layer of the stack.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dev-border border border-dev-border">
        {STACK_CATEGORIES.map((cat) => (
          <div key={cat.label} className="bg-dev-surface p-8">
            <div className="font-[var(--font-dev-mono)] text-[10px] text-dev-accent tracking-[0.12em] uppercase mb-4 flex items-center gap-2">
              {cat.label}
              <span className="flex-1 h-px bg-dev-border" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[var(--font-dev-mono)] text-[11px] py-1 px-2.5 bg-dev-bg border border-dev-border text-dev-muted tracking-[0.04em] hover:border-dev-accent hover:text-dev-accent transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
