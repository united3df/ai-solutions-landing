const TICKER_ITEMS = [
  "Voice AI inbound agent",
  "RAG knowledge base",
  "AI onboarding flows",
  "Slack reporting bot",
  "GPT-4 SaaS copilot",
  "Smart contract automation",
  "AI support triage",
  "Semantic search engine",
  "n8n & Make workflows",
  "Internal AI dashboard",
  "LangChain pipeline",
  "HIPAA-compliant AI system",
  "OpenAI fine-tuning",
  "CRM AI enrichment",
];

export function DevTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative z-[1] overflow-hidden border-y border-[color:var(--color-dev-border)] bg-dev-s1 py-3.5">
      <div className="flex w-max animate-[dev-ticker_32s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 border-r border-[color:var(--color-dev-border)] px-10 text-[0.78rem] text-dev-muted"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-dev-accent" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
