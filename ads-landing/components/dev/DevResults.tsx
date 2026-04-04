"use client";

import { useRef, useEffect } from "react";

const OUTCOMES = [
  { before: "10 min", after: "4m", label: "Avg Response Time" },
  { before: "5% errors", after: "2%", label: "Error Rate" },
  { before: "3 weeks", after: "7d", label: "Onboarding Time" },
  { before: "Manual ops", after: "−180h", label: "Hours/Month Saved" },
];

const TESTIMONIALS = [
  {
    stars: "★★★★½",
    text: '"They delivered exactly what was needed, on time and without issues. A rare team that actually ships what they promise."',
    initials: "NF",
    author: "NFT Marketplace Founder",
    role: "Web & Mobile Dev · Clutch.co",
  },
  {
    stars: "★★★★★",
    text: '"They understood our project and contributed their own ideas. Went beyond just executing — they engaged with the problem deeply."',
    initials: "TF",
    author: "Thomas Faulhaber, CEO",
    role: "IT Consulting · Clutch.co · Verified",
  },
  {
    stars: "★★★★½",
    text: '"Very professional and easy to work with. Output quality exceeded expectations. They treat every project like their own product."',
    initials: "SC",
    author: "SaaS Company Owner",
    role: "Staff Augmentation · Clutch.co",
  },
];

export function DevResults() {
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
    <div className="border-y border-[color:var(--color-dev-border)] bg-dev-s1">
      <section
        ref={sectionRef}
        id="outcomes"
        className="relative z-[1] scroll-mt-24 opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out py-24 px-6 md:px-10"
      >
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
            Business Outcomes
          </div>
          <h2 className="font-[var(--font-dev-display)] text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.96] tracking-[0.03em] mb-4">
            METRICS THAT
            <br />
            MOVE THE NEEDLE.
          </h2>
          <p className="mb-12 max-w-[540px] text-[0.95rem] font-light leading-[1.75] text-dev-muted">
            Operational improvements visible within the first 30 days. Not vanity numbers.
          </p>
          <div className="mb-16 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-dev)] bg-[color:var(--color-dev-border)] sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <div key={o.label} className="bg-dev-s1 px-6 py-8 text-center md:px-8">
                <span className="mb-1 block text-[0.85rem] text-dev-dim line-through decoration-red-500">
                  {o.before}
                </span>
                <span className="font-[var(--font-dev-display)] block text-[3.2rem] leading-none tracking-[0.03em] text-dev-accent">
                  {o.after}
                </span>
                <span className="mt-1 block text-[0.75rem] uppercase tracking-[0.05em] text-dev-dim">
                  {o.label}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="flex flex-col rounded-[var(--radius-dev)] border border-[color:var(--color-dev-border)] bg-dev-s2 p-7"
              >
                <div className="mb-4 text-[0.78rem] tracking-[0.12em] text-dev-accent">{t.stars}</div>
                <p className="mb-6 flex-1 text-[0.9rem] font-light italic leading-[1.7] text-dev-text">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 border-t border-[color:var(--color-dev-border)] pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-dev-border-strong)] bg-dev-s3 text-[0.68rem] font-bold text-dev-muted">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[0.82rem] font-medium">{t.author}</div>
                    <div className="text-[0.72rem] text-dev-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
