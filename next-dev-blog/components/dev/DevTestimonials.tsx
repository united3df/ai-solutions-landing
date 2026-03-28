"use client";

import { useRef, useEffect } from "react";

const TESTIMONIALS = [
  {
    stars: "★★★★½",
    text: '"AI4B2B has created a good development team. They delivered exactly what was needed, on time and without issues."',
    author: "Founder, NFT Marketplace",
    role: "Web & Mobile App Development · Clutch.co",
  },
  {
    stars: "★★★★★",
    text: '"They understood our project and contributed their own ideas. The team went beyond just executing — they truly engaged with the problem."',
    author: "Thomas Faulhaber, CEO",
    role: "IT Consulting & SI · Clutch.co",
  },
  {
    stars: "★★★★½",
    text: '"They were very professional and easy to work with. Communication was smooth and the output quality exceeded our expectations."',
    author: "Owner, SaaS Company",
    role: "Staff Augmentation · Clutch.co",
  },
];

export function DevTestimonials() {
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
      id="reviews"
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border py-24 px-6 md:px-12"
    >
      <div className="flex items-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
        <span className="w-6 h-px bg-dev-accent" />
        Social Proof
      </div>
      <h2 className="font-[var(--font-dev-display)] text-[clamp(40px,5vw,64px)] leading-none mb-6">What Clients Say</h2>
      <p className="text-base text-dev-muted max-w-[560px] font-light leading-[1.7] mb-16">
        Verified reviews from real clients on Clutch.co and Upwork.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dev-border border border-dev-border">
        {TESTIMONIALS.map((t) => (
          <div key={t.author} className="bg-dev-surface p-9 flex flex-col gap-4">
            <div className="text-dev-accent text-sm tracking-[2px]">{t.stars}</div>
            <p className="text-[15px] text-dev-text font-light leading-[1.7] italic">{t.text}</p>
            <div className="mt-auto pt-4 border-t border-dev-border">
              <div className="font-[var(--font-dev-mono)] text-xs text-dev-accent tracking-[0.06em] uppercase">{t.author}</div>
              <div className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted mt-0.5">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
