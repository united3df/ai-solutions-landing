"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

const HUBSPOT_API = "https://api.hsforms.com/submissions/v3/integration/submit";

function getHutk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
}

const inputClass =
  "w-full rounded-md border border-[color:var(--color-dev-border-strong)] bg-dev-s3 px-3.5 py-2.5 text-[0.88rem] text-dev-text outline-none transition-[border-color,box-shadow] placeholder:text-dev-dim focus:border-dev-accent focus:shadow-[0_0_0_3px_rgba(198,241,53,0.08)] disabled:opacity-50";

export function DevLeadMagnet() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [pain, setPain] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID;

  const validate = (): boolean => {
    const trimmedFirst = firstName.trim();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedFirst) {
      setError("First name is required.");
      return false;
    }
    if (!trimmedEmail) {
      setError("Work email is required.");
      return false;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!role.trim()) {
      setError("Please select who you are.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    if (!portalId || !formGuid) {
      setError("Form is not configured. Please contact the site administrator.");
      return;
    }
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    const notes = [
      role.trim() && `Role: ${role.trim()}`,
      pain.trim() && `Pain: ${pain.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const companyValue = [company.trim(), notes].filter(Boolean).join("\n\n") || "—";

    const payload = {
      fields: [
        { name: "firstname", value: firstName.trim() },
        { name: "email", value: email.trim() },
        { name: "company", value: companyValue },
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        ...(getHutk() && { hutk: getHutk() }),
      },
    };

    try {
      const res = await fetch(`${HUBSPOT_API}/${portalId}/${formGuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <section
        id="get-framework"
        className="scroll-mt-24 border-y border-[color:var(--color-dev-border)] bg-dev-s1 py-24 px-6 md:px-10"
      >
        <div className="mx-auto max-w-[1240px] py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(198,241,53,0.25)] bg-[rgba(198,241,53,0.1)] text-lg text-dev-accent">
            ✓
          </div>
          <div className="mb-2 text-[1.1rem] font-bold">It&apos;s on its way.</div>
          <p className="mx-auto max-w-md text-[0.83rem] font-light leading-relaxed text-dev-muted">
            Check your inbox — framework arrives within minutes. Case study deep-dives follow on day
            2. I&apos;ll reach out personally based on what you shared.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="get-framework"
      className="scroll-mt-24 border-y border-[color:var(--color-dev-border)] bg-dev-s1 py-24 px-6 md:px-10"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
            Free Download
          </div>
          <h2 className="font-[var(--font-dev-display)] text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] tracking-[0.03em] mb-4">
            THE AI BUILD
            <br />
            FRAMEWORK.
          </h2>
          <p className="mb-8 max-w-[540px] text-[0.95rem] font-light leading-[1.75] text-dev-muted">
            The exact system we use to scope, build, and ship AI automations — plus 3 deep-dive case
            study breakdowns with full tech stacks and real metrics.
          </p>

          <div className="overflow-hidden rounded-[var(--radius-dev-lg)] border border-[color:var(--color-dev-border-strong)] bg-dev-bg">
            <div className="flex items-center gap-4 bg-dev-accent px-6 py-5">
              <span className="text-2xl" aria-hidden>
                📋
              </span>
              <div>
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#080809]/50">
                  AI4B2B · Internal Playbook
                </div>
                <div className="font-[var(--font-dev-display)] text-[1.3rem] tracking-[0.04em] text-[#080809]">
                  AI AGENT SKILLS & BUILD FRAMEWORK v2
                </div>
              </div>
            </div>
            <div className="space-y-6 p-6 md:p-7">
              <div>
                <div className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-dev-accent">
                  What&apos;s inside
                </div>
                {[
                  "Decision tree: Voice vs. RAG vs. Automation",
                  "Full software stack per use case",
                  "Scoping template (pain → spec → cost)",
                  "Evaluation criteria for AI systems",
                  "Data ownership & security checklist",
                ].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between gap-3 border-b border-[color:var(--color-dev-border)] py-2 text-[0.8rem] text-dev-muted last:border-b-0"
                  >
                    <span>{row}</span>
                    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-[rgba(198,241,53,0.25)] bg-[rgba(198,241,53,0.1)] text-[0.65rem] text-dev-accent">
                      ✓
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-dev-accent">
                  Bonus: 3 Case Study Deep-Dives
                </div>
                {[
                  "Voice agent — SMB support",
                  "RAG knowledge base — SaaS onboarding",
                  "AI copilot in SaaS product",
                ].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between gap-3 border-b border-[color:var(--color-dev-border)] py-2 text-[0.8rem] last:border-b-0"
                  >
                    <strong className="font-medium text-dev-text">{row}</strong>
                    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-[rgba(198,241,53,0.25)] bg-[rgba(198,241,53,0.1)] text-[0.65rem] text-dev-accent">
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-dev-accent">
            Step 1 — Free
          </div>
          <h3 className="font-[var(--font-dev-display)] text-[clamp(1.8rem,3vw,2.6rem)] leading-[0.96] tracking-[0.03em] mb-2">
            GET THE
            <br />
            FRAMEWORK.
          </h3>
          <p className="mb-8 max-w-[540px] text-[0.95rem] font-light leading-[1.75] text-dev-muted">
            Tell me what you&apos;re working on — I&apos;ll send it now and follow up personally.
          </p>

          <form onSubmit={handleSubmit} className="relative space-y-3.5">
            <div
              className="absolute -left-[9999px] h-px w-px overflow-hidden"
              aria-hidden
            >
              <label htmlFor="website_lm">Website</label>
              <input
                id="website_lm"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                  First name *
                </label>
                <input
                  className={inputClass}
                  placeholder="Alex"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                  Work email *
                </label>
                <input
                  className={inputClass}
                  type="email"
                  placeholder="alex@co.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">Company</label>
              <input
                className={inputClass}
                placeholder="Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                You are… *
              </label>
              <select
                className={`${inputClass} cursor-pointer`}
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select one</option>
                <option>SaaS founder / product team</option>
                <option>SMB owner wanting internal AI</option>
                <option>Startup building an AI MVP</option>
                <option>Operator automating manual work</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                Biggest manual pain right now?
              </label>
              <textarea
                className={`${inputClass} min-h-[72px] resize-y`}
                placeholder="e.g. 'We spend 15 hrs/week on reporting manually' — this helps me send you the most relevant case study"
                value={pain}
                onChange={(e) => setPain(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-dev-accent py-3.5 text-[0.95rem] font-bold text-[#080809] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                "Send Me the Framework →"
              )}
            </button>
            <p className="text-center text-[0.7rem] text-dev-dim">
              Instant delivery. No spam. Unsubscribe anytime. 3 emails over 5 days, then only
              what&apos;s relevant.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
