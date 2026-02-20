export function DevHero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center pt-[140px] pb-20 px-6 md:px-12 gap-16 relative overflow-hidden">
      <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(232,255,71,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.1em] uppercase border border-dev-accent/30 py-1.5 px-3.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-dev-accent animate-[dev-pulse_2s_infinite]" />
          Top 2% on Upwork · 100% JSS · 4,400+ hrs
        </div>
        <h1 className="font-[var(--font-dev-display)] text-[clamp(56px,7vw,96px)] leading-[0.95] tracking-[0.02em] mb-7">
          MVPs.
          <br />
          <span className="text-dev-accent">AI.</span>
          <br />
          <span className="text-dev-muted">Built Fast</span>
          <br />
          &amp; Right.
        </h1>
        <p className="text-[17px] text-dev-muted max-w-[480px] leading-[1.7] mb-12 font-light">
          Full-Stack &amp; AI developer with <strong className="text-dev-text font-medium">8+ years</strong> experience, building for Y Combinator, Techstars-backed teams, and Fortune 500s. Scaled a startup from <strong className="text-dev-text font-medium">$0 → $2M+ ARR</strong>. Captured <strong className="text-dev-text font-medium">25% of the US NFT market</strong> in broadcasting.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="#contact" className="font-[var(--font-dev-mono)] text-[13px] py-4 px-8 bg-dev-accent text-black tracking-[0.05em] uppercase font-medium hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,255,71,0.2)] transition-all">
            🚀 Start Your Project
          </a>
          <a href="#services" className="font-[var(--font-dev-mono)] text-[13px] py-4 px-8 bg-transparent text-dev-text border border-dev-border tracking-[0.05em] uppercase hover:border-dev-accent hover:text-dev-accent transition-all">
            See What I Build
          </a>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-px bg-dev-border border border-dev-border relative z-10">
        {[
          { num: "8+", label: "Years Experience", desc: "Full-stack, AI & blockchain" },
          { num: "100%", label: "Job Success", desc: "Upwork verified score" },
          { num: "$2M+", label: "ARR Scaled", desc: "From zero to revenue" },
          { num: "40%", label: "Support Time Cut", desc: "With custom AI bots" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-dev-surface p-9 flex flex-col gap-2 relative overflow-hidden transition-colors hover:bg-[#161614] group"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-dev-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            <div className="font-[var(--font-dev-display)] text-5xl leading-none text-dev-accent">{stat.num}</div>
            <div className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.08em] uppercase">{stat.label}</div>
            <div className="text-[13px] text-dev-muted font-light mt-1">{stat.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
