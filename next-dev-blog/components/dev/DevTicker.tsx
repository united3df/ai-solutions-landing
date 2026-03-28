const TICKER_ITEMS = [
  "Voice AI inbound agent",
  "RAG knowledge base",
  "AI client onboarding flow",
  "Slack reporting bot",
  "GPT-4 SaaS copilot",
  "Smart contract automation",
  "AI support triage",
  "Semantic search engine",
  "n8n / Make automation flows",
  "Internal AI dashboard",
  "LangChain pipeline",
  "HIPAA-compliant AI system",
];

export function DevTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="border-t border-b border-dev-border bg-dev-surface py-3.5 overflow-hidden">
      <div className="flex animate-[dev-ticker_28s_linear_infinite] whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] px-8 md:px-10 shrink-0 inline-flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-dev-accent" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
