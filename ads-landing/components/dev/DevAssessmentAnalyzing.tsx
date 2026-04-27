"use client";

import { useEffect, useState } from "react";
import { BarChart3, Brain, FileSearch, Target, Zap } from "lucide-react";

const ANALYSIS_STEPS = [
  { icon: FileSearch, label: "Analyzing company profile" },
  { icon: Brain, label: "Processing assessment responses" },
  { icon: BarChart3, label: "Calculating automation potential" },
  { icon: Zap, label: "Identifying optimization opportunities" },
  { icon: Target, label: "Matching recommendations" },
];

export function DevAssessmentAnalyzing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 30);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-[rgba(198,241,53,0.15)]" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[rgba(198,241,53,0.3)] bg-dev-s3 shadow-[0_0_24px_rgba(198,241,53,0.12)]">
            <Brain className="h-12 w-12 animate-pulse text-dev-accent" aria-hidden />
          </div>
        </div>

        <h3 className="mb-2 font-[var(--font-dev-display)] text-2xl font-bold tracking-[0.02em] text-dev-text">
          Analyzing your answers
        </h3>
        <p className="mb-8 text-[0.95rem] font-light text-dev-muted">
          Turning your responses into a readiness snapshot
        </p>

        <div className="mb-8 w-full">
          <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--color-dev-border)]">
            <div
              className="h-full rounded-full bg-dev-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[0.8rem] text-dev-dim">{progress}%</p>
        </div>

        <div className="w-full space-y-3 text-left">
          {ANALYSIS_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <div
                key={step.label}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${
                  isActive
                    ? "border-[rgba(198,241,53,0.35)] bg-[rgba(198,241,53,0.06)]"
                    : "border-transparent"
                } ${isComplete ? "opacity-60" : ""}`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? "bg-dev-accent text-[#080809]"
                      : isComplete
                        ? "bg-dev-s3 text-dev-accent"
                        : "bg-dev-s2 text-dev-dim"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-dev-accent" : isComplete ? "text-dev-muted" : "text-dev-dim"
                  }`}
                >
                  {step.label}
                </span>
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-dev-accent"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-dev-accent"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-dev-accent"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
