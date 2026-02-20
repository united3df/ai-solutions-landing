const TICKER_ITEMS = [
  "React & Next.js 15",
  "AI-Powered MVPs",
  "Voice AI Agents",
  "RAG Pipelines",
  "OpenAI / LangChain",
  "React Native",
  "NestJS / Node",
  "Blockchain / Smart Contracts",
  "HIPAA Compliant",
  "Y Combinator Teams",
];

export function DevTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="border-t border-b border-dev-border py-3.5 overflow-hidden bg-dev-surface">
      <div className="flex animate-[dev-ticker_28s_linear_infinite] whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.08em] uppercase px-10 shrink-0"
          >
            <span className="text-dev-accent mr-2">→</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
