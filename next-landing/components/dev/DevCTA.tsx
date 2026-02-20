"use client";

import { useRef, useEffect } from "react";

export function DevCTA() {
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
      id="contact"
      className="opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out border-t border-dev-border text-center py-32 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,255,71,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
          <span className="w-6 h-px bg-dev-accent" />
          Ready to Ship
        </div>
        <h2 className="font-[var(--font-dev-display)] text-[clamp(48px,6vw,80px)] leading-none mb-5">
          Let&apos;s Build
          <br />
          Your MVP.
        </h2>
        <p className="text-base text-dev-muted max-w-[560px] mx-auto font-light leading-[1.7] mb-12">
          Thinking about AI but want a clear answer on what&apos;s realistic and worth building first? Message me — I respond fast.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:nazar3bio@gmail.com"
            className="font-[var(--font-dev-mono)] text-[13px] py-4 px-8 bg-dev-accent text-black tracking-[0.05em] uppercase font-medium hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,255,71,0.2)] transition-all"
          >
            🚀 Start the Conversation
          </a>
          <a
            href="#services"
            className="font-[var(--font-dev-mono)] text-[13px] py-4 px-8 bg-transparent text-dev-text border border-dev-border tracking-[0.05em] uppercase hover:border-dev-accent hover:text-dev-accent transition-all"
          >
            See Examples First
          </a>
        </div>
        <p className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted mt-8 tracking-[0.06em]">
          ⭐️ BONUS: Pitch prep &amp; early bird outreach help included
        </p>
      </div>
    </section>
  );
}
