"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useAssessmentStore } from "@/lib/assessment/assessment-store";
import type { CompanyInfo } from "@/lib/assessment/types";
import { DevAssessmentFlow } from "./DevAssessmentFlow";

const inputClass =
  "w-full rounded-md border border-[color:var(--color-dev-border-strong)] bg-dev-s3 px-3.5 py-2.5 text-[0.88rem] text-dev-text outline-none transition-[border-color,box-shadow] placeholder:text-dev-dim focus:border-dev-accent focus:shadow-[0_0_0_3px_rgba(198,241,53,0.08)] disabled:opacity-50";

export function DevAssessmentSection() {
  const companyInfo = useAssessmentStore((s) => s.companyInfo);
  const startAssessmentFromLead = useAssessmentStore((s) => s.startAssessmentFromLead);
  const flowRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<CompanyInfo>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [justStarted, setJustStarted] = useState(false);

  useEffect(() => {
    if (!justStarted) return;
    const id = window.setTimeout(() => {
      flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setJustStarted(false);
    }, 150);
    return () => clearTimeout(id);
  }, [justStarted]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.companyName.trim()
    ) {
      setError("Please fill in first name, last name, work email, and company.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    startAssessmentFromLead({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      companyName: formData.companyName.trim(),
      email: formData.email.trim(),
    });
    setJustStarted(true);
  };

  const showFlow = companyInfo !== null;

  return (
    <section
      id="rpa-assessment"
      className="scroll-mt-24 border-y border-[color:var(--color-dev-border)] bg-dev-s1 py-24 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        {!showFlow && (
          <div className="mx-auto max-w-2xl">
            <div className="mb-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
              Free · No download
            </div>
            <h2 className="mb-4 text-center font-[var(--font-dev-display)] text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] tracking-[0.03em]">
              AUTOMATION READINESS
              <br />
              <span className="text-dev-muted">SCORE.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-center text-[0.95rem] font-light leading-[1.75] text-dev-muted">
              Separate from the framework email list: a short scorecard for RPA / process automation
              fit. Takes a few minutes — you get an instant breakdown after the questions.
            </p>

            <div className="rounded-[var(--radius-dev-lg)] border border-[color:var(--color-dev-border-strong)] bg-dev-bg p-8 md:p-10">
              <p className="mb-6 text-center text-[0.75rem] font-medium uppercase tracking-[0.12em] text-dev-dim">
                Step 1 of 2 · Your details
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="assess-first-name"
                      className="mb-1 block text-[0.75rem] font-medium text-dev-muted"
                    >
                      First name *
                    </label>
                    <input
                      id="assess-first-name"
                      className={inputClass}
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="assess-last-name"
                      className="mb-1 block text-[0.75rem] font-medium text-dev-muted"
                    >
                      Last name *
                    </label>
                    <input
                      id="assess-last-name"
                      className={inputClass}
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="assess-email"
                    className="mb-1 block text-[0.75rem] font-medium text-dev-muted"
                  >
                    Work email *
                  </label>
                  <input
                    id="assess-email"
                    type="email"
                    className={inputClass}
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="assess-company"
                    className="mb-1 block text-[0.75rem] font-medium text-dev-muted"
                  >
                    Company *
                  </label>
                  <input
                    id="assess-company"
                    className={inputClass}
                    placeholder="Acme Inc."
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, companyName: e.target.value }))
                    }
                    autoComplete="organization"
                  />
                </div>

                {error && <p className="text-sm text-dev-red">{error}</p>}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-dev-accent py-3.5 text-[0.95rem] font-bold text-[#080809] transition-opacity hover:opacity-90"
                >
                  Start the assessment
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </div>
          </div>
        )}

        {showFlow && (
          <div ref={flowRef}>
            <DevAssessmentFlow />
          </div>
        )}
      </div>
    </section>
  );
}
