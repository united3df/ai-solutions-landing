import { Star, Shield, Clock, Users, Monitor } from "lucide-react";

const TRUST_ITEMS: { icon: typeof Star; label: string }[] = [
  { icon: Star, label: "Top 2% Upwork · 100% JSS" },
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Clock, label: "Ships in days, not months" },
  { icon: Users, label: "Y Combinator & Fortune 500 clients" },
  { icon: Monitor, label: "4,400+ hours delivered" },
];

export function DevHero() {
  return (
    <section className="relative z-[1] flex min-h-screen flex-col text-center overflow-hidden">
      {/* Grid background (matches ai4b2b-v2 hero mask) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90"
        style={{
          backgroundImage: `
            linear-gradient(rgb(30 30 26) 1px, transparent 1px),
            linear-gradient(90deg, rgb(30 30 26) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-[9rem] pb-12 md:px-10">
        <div className="mx-auto w-full max-w-[820px]">
          <div className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-dev-border bg-dev-surface py-1.5 pl-2 pr-4 text-left text-[0.75rem] text-dev-muted md:justify-start">
            <span className="rounded-full bg-dev-accent px-2.5 py-1 text-[0.7rem] font-semibold text-black">
              New
            </span>
            Your external AI team — pre-trained, ready to ship weekly
          </div>

          <h1 className="font-[var(--font-dev-display)] text-[clamp(2.5rem,6.5vw,4.25rem)] leading-[1.06] tracking-[0.02em] mb-6">
            We <em className="italic text-dev-accent">act</em> as your
            <br />
            AI automation team.
            <br />
            <span className="relative inline-block pb-0.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-sm after:bg-dev-accent">
              Ship weekly. Own everything.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-[560px] text-[1.05rem] font-light leading-[1.75] text-dev-muted">
            <strong className="font-medium text-dev-text">Not a freelancer. Not an agency.</strong> A
            productized AI development partner that embeds into your business and delivers working
            automations, internal tools, and AI products — every single week.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="font-[var(--font-dev-mono)] inline-flex items-center gap-2 rounded-full bg-dev-accent px-8 py-4 text-[13px] font-medium uppercase tracking-[0.05em] text-black transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_30px_rgba(232,255,71,0.2)]"
            >
              Start Your Project
            </a>
            <a
              href="#services"
              className="font-[var(--font-dev-mono)] inline-flex items-center rounded-full border border-dev-border bg-transparent px-8 py-4 text-[13px] font-normal uppercase tracking-[0.05em] text-dev-text transition-all hover:-translate-y-0.5 hover:border-dev-accent hover:text-dev-accent"
            >
              See What I Build
            </a>
          </div>

          <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-dev-border bg-dev-border md:grid-cols-2">
            <div className="group relative overflow-hidden bg-dev-surface p-6 text-left before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5 before:bg-[#5B9BFF] before:opacity-0 before:transition-opacity hover:before:opacity-100">
              <span className="mb-3 inline-block rounded-full bg-[#5B9BFF]/12 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#5B9BFF]">
                SaaS / Product teams
              </span>
              <h3 className="mb-1.5 text-[0.92rem] font-medium leading-snug text-dev-text">
                No internal AI talent. Experiments take months. Your competitors ship in weeks.
              </h3>
              <p className="text-[0.8rem] font-light leading-relaxed text-dev-muted">
                We give you senior AI engineers without the hiring risk — embedded, fast, and
                accountable.
              </p>
            </div>
            <div className="group relative overflow-hidden bg-dev-surface p-6 text-left before:absolute before:left-0 before:right-0 before:top-0 before:h-0.5 before:bg-[#FFB547] before:opacity-0 before:transition-opacity hover:before:opacity-100">
              <span className="mb-3 inline-block rounded-full bg-[#FFB547]/12 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#FFB547]">
                SMBs &amp; Operators
              </span>
              <h3 className="mb-1.5 text-[0.92rem] font-medium leading-snug text-dev-text">
                Want AI, but terrified of losing control of your data and processes.
              </h3>
              <p className="text-[0.8rem] font-light leading-relaxed text-dev-muted">
                We build on your stack, in your infra. You own the code, the data, and the results.
                Always.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 border-t border-dev-border px-6 py-6 text-[0.78rem] text-dev-muted md:gap-8">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-1.5 text-dev-muted/80">
            <Icon className="h-3.5 w-3.5 shrink-0 opacity-40" strokeWidth={2} aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
