const VS_NO = [
  "Slow agency retainers",
  "Overpriced consultants",
  "Junior freelancers",
  "Lock-in SaaS tools",
];

export function DevPositionStrip() {
  return (
    <div className="relative z-[1] border-y border-dev-border bg-dev-surface px-6 py-16 text-center md:px-10 md:py-20">
      <h2 className="font-[var(--font-dev-display)] text-[clamp(1.75rem,3.5vw,2.35rem)] leading-tight tracking-[0.02em] mb-6">
        We implement AI workflows in your business —{" "}
        <em className="italic text-dev-accent">weekly.</em>
      </h2>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        {VS_NO.map((t) => (
          <span
            key={t}
            className="rounded-full border border-dev-border px-3 py-1 text-[0.8rem] text-dev-muted/70 line-through decoration-red-500/80"
          >
            {t}
          </span>
        ))}
        <span className="rounded-full border border-dev-accent/30 bg-dev-accent/5 px-3 py-1 text-[0.8rem] text-dev-accent">
          → Pre-trained AI specialists, embedded in your team
        </span>
      </div>
      <p className="mx-auto max-w-[600px] text-[0.92rem] font-light leading-[1.75] text-dev-muted">
        Think of us as your AI department: we scope, build, and ship production-grade automations and
        internal tools — then hand you the keys. No vendor lock-in. No black boxes. Full data
        ownership.
      </p>
    </div>
  );
}
