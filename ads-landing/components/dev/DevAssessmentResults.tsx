"use client";

import { RefreshCcw } from "lucide-react";
import { useAssessmentStore } from "@/lib/assessment/assessment-store";
import { DIMENSION_NAMES } from "@/lib/assessment/assessment-data";
import { OPEN_HERO_AUDIT_EVENT } from "./hero-audit";

export function DevAssessmentResults() {
  const results = useAssessmentStore((s) => s.results);
  const retakeAssessment = useAssessmentStore((s) => s.retakeAssessment);

  if (!results) return null;

  const { overallScore, dimensionScores, tierLabel, advice } = results;

  const tierEmoji =
    overallScore >= 75 ? "🟢" : overallScore >= 60 ? "🟡" : overallScore >= 45 ? "🟠" : "🔵";

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
        Your results
      </p>
      <h3 className="mb-8 font-[var(--font-dev-display)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.98] tracking-[0.03em] text-dev-text">
        Readiness score
      </h3>

      <div className="mx-auto mb-7 flex h-40 w-40 flex-col items-center justify-center rounded-full border-[6px] border-dev-accent shadow-[0_0_28px_rgba(198,241,53,0.2)]">
        <span className="font-[var(--font-dev-display)] text-6xl font-extrabold tracking-[0.02em] text-dev-accent">
          {overallScore}
        </span>
        <span className="text-lg text-dev-muted">/ 100</span>
      </div>

      <p className="mb-1 text-2xl" aria-hidden>
        {tierEmoji}
      </p>
      <h4 className="mb-4 font-[var(--font-dev-display)] text-2xl font-bold tracking-[0.02em] text-dev-text">
        {tierLabel}
      </h4>

      <p className="mx-auto mb-12 max-w-lg text-[0.95rem] font-light leading-relaxed text-dev-muted">
        {advice}
      </p>

      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(dimensionScores)
          .filter(([key]) => key !== "size")
          .map(([dimension, score]) => (
            <div
              key={dimension}
              className="rounded-[var(--radius-dev)] border border-[color:var(--color-dev-border-strong)] bg-dev-s3 p-5 text-center"
            >
              <p className="mb-2 text-[0.65rem] uppercase tracking-wider text-dev-dim">
                {DIMENSION_NAMES[dimension] ?? dimension}
              </p>
              <p className="font-[var(--font-dev-display)] text-3xl font-bold text-dev-accent">
                {score}%
              </p>
            </div>
          ))}
      </div>

      <div className="rounded-[var(--radius-dev-lg)] border border-[color:var(--color-dev-border-strong)] bg-dev-s2 px-6 py-8 md:px-10">
        <p className="mb-4 text-[0.95rem] font-light text-dev-muted">
          Want a tailored AI automation plan for your stack? Book a free audit and we&apos;ll map
          the fastest wins.
        </p>
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent(OPEN_HERO_AUDIT_EVENT));
          }}
          className="mb-4 inline-flex w-full items-center justify-center rounded-md bg-dev-accent py-3.5 text-[0.95rem] font-bold text-[#080809] transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
        >
          Book free AI audit →
        </button>
      </div>

      <div className="pt-8">
        <button
          type="button"
          onClick={retakeAssessment}
          className="inline-flex items-center gap-2 text-[0.9rem] text-dev-muted transition-colors hover:text-dev-accent"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden />
          Retake assessment
        </button>
      </div>
    </div>
  );
}
