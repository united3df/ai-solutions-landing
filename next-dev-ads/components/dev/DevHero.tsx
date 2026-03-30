"use client";

import { useEffect, useState } from "react";
import { OPEN_HERO_AUDIT_EVENT } from "./hero-audit";

const PAIN_LINES: Record<string, string> = {
  saas:
    "No internal AI talent. Your experiments take months. Your competitors ship AI features in weeks and you're falling behind.",
  smb:
    "You want AI but you're not handing your data to a SaaS tool you don't control. You want to build it, own it, and run it internally.",
};

const HERO_STATS = [
  { num: "$2M+", label: "ARR Scaled" },
  { num: "−40%", label: "Support Time" },
  { num: "−180h", label: "Hrs/Mo Saved" },
  { num: "7d", label: "Avg First Ship" },
];

const LOGO_PILLS = ["Y Combinator", "Techstars", "Fortune 500", "Meta Partner Agencies"];

type FormTab = "framework" | "audit";

export function DevHero() {
  const [icp, setIcp] = useState<"saas" | "smb">("saas");
  const [painOpacity, setPainOpacity] = useState(1);
  const [formTab, setFormTab] = useState<FormTab>("framework");
  const [fwSuccess, setFwSuccess] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  useEffect(() => {
    const onOpenAudit = () => {
      setFormTab("audit");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener(OPEN_HERO_AUDIT_EVENT, onOpenAudit);
    return () => window.removeEventListener(OPEN_HERO_AUDIT_EVENT, onOpenAudit);
  }, []);

  const setIcpTab = (next: "saas" | "smb") => {
    if (next === icp) return;
    setPainOpacity(0);
    setTimeout(() => {
      setIcp(next);
      setPainOpacity(1);
    }, 200);
  };

  const onSubmitFramework = (e: React.FormEvent) => {
    e.preventDefault();
    setFwSuccess(true);
  };

  const onSubmitAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuditSuccess(true);
  };

  const fieldClass =
    "w-full rounded-md border border-[color:var(--color-dev-border-strong)] bg-dev-s3 px-3.5 py-2.5 text-[0.85rem] text-dev-text outline-none transition-[border-color,box-shadow] placeholder:text-dev-dim focus:border-dev-accent focus:shadow-[0_0_0_3px_rgba(198,241,53,0.08)]";

  return (
    <section className="relative z-[1] bg-dev-bg">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 30% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 30% 40%, black 20%, transparent 75%)",
        }}
      />
      <div className="relative z-[1] mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 pb-0 pt-20 lg:grid-cols-[1fr_420px] lg:gap-20 lg:pt-20">
        {/* LEFT */}
        <div className="pb-16 lg:pb-20">
          <div className="mb-10 inline-flex overflow-hidden rounded-md border border-[color:var(--color-dev-border-strong)]">
            <button
              type="button"
              onClick={() => setIcpTab("saas")}
              className={`border-0 px-[1.1rem] py-2 text-[0.78rem] font-medium tracking-wide transition-colors font-[var(--font-dev-sans)] ${
                icp === "saas"
                  ? "bg-dev-accent font-bold text-[#080809]"
                  : "bg-transparent text-dev-muted"
              }`}
            >
              SaaS / Product Teams
            </button>
            <button
              type="button"
              onClick={() => setIcpTab("smb")}
              className={`border-0 px-[1.1rem] py-2 text-[0.78rem] font-medium tracking-wide transition-colors font-[var(--font-dev-sans)] ${
                icp === "smb"
                  ? "bg-dev-accent font-bold text-[#080809]"
                  : "bg-transparent text-dev-muted"
              }`}
            >
              SMBs & Operators
            </button>
          </div>

          <p
            className="mb-8 min-h-[2.5rem] border-l-2 border-dev-accent pl-4 text-[0.9rem] font-light italic leading-relaxed text-dev-muted transition-opacity duration-300"
            style={{ opacity: painOpacity }}
          >
            {PAIN_LINES[icp]}
          </p>

          <h1 className="font-[var(--font-dev-display)] text-[clamp(4rem,8vw,7rem)] leading-[0.94] tracking-[0.02em] mb-7">
            YOUR
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px var(--color-dev-text)" }}
            >
              EXTERNAL
            </span>
            <br />
            <span className="text-dev-accent">AI TEAM.</span>
          </h1>

          <p className="mb-10 max-w-[500px] text-[1rem] font-light leading-[1.8] text-dev-muted">
            <strong className="font-medium text-dev-text">Not a freelancer. Not an agency.</strong> A
            productized AI development partner that embeds into your business — implementing
            automations, internal tools, and AI products <strong className="font-medium text-dev-text">every week.</strong>
          </p>

          <div className="mb-12 flex flex-wrap gap-10">
            {HERO_STATS.map(({ num, label }) => (
              <div key={label} className="text-center">
                <span className="font-[var(--font-dev-display)] block text-[2.4rem] leading-none tracking-[0.04em] text-dev-accent">
                  {num}
                </span>
                <span className="mt-1 block text-[0.72rem] font-normal uppercase tracking-[0.06em] text-dev-dim">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap gap-4">
            <a
              href="#get-framework"
              className="inline-flex items-center gap-2 rounded bg-dev-accent px-8 py-3.5 text-[0.92rem] font-bold tracking-wide text-[#080809] no-underline transition-transform hover:opacity-90 hover:-translate-y-0.5 font-[var(--font-dev-sans)]"
            >
              ↓ Get the Free AI Framework
            </a>
            <a
              href="#cases"
              className="inline-block rounded border border-[color:var(--color-dev-border-strong)] px-8 py-3.5 text-[0.92rem] font-normal text-dev-text no-underline transition-colors hover:border-dev-accent hover:text-dev-accent hover:-translate-y-0.5 font-[var(--font-dev-sans)]"
            >
              See What We Build →
            </a>
          </div>

          <div className="border-t border-[color:var(--color-dev-border)] pt-8 mt-12">
            <div className="mb-4 text-[0.7rem] uppercase tracking-[0.12em] text-dev-dim">
              Trusted by teams backed by
            </div>
            <div className="flex flex-wrap gap-3">
              {LOGO_PILLS.map((p) => (
                <span
                  key={p}
                  className="rounded border border-[color:var(--color-dev-border)] px-3 py-1 text-[0.78rem] font-medium text-dev-muted"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — sticky form */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div
            id="hero-form"
            className="relative overflow-hidden rounded-[var(--radius-dev-lg)] border border-[color:var(--color-dev-border-strong)] bg-dev-s1"
          >
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-dev-accent to-[rgba(198,241,53,0.3)]"
              aria-hidden
            />
            <div className="flex border-b border-[color:var(--color-dev-border)]">
              <button
                type="button"
                onClick={() => setFormTab("framework")}
                className={`flex-1 border-0 py-4 text-center text-[0.78rem] font-medium transition-colors font-[var(--font-dev-sans)] ${
                  formTab === "framework"
                    ? "border-b-2 border-b-dev-accent bg-dev-s2 text-dev-text"
                    : "border-b-2 border-b-transparent bg-transparent text-dev-dim"
                }`}
              >
                Get Framework
              </button>
              <button
                type="button"
                onClick={() => setFormTab("audit")}
                className={`flex-1 border-0 py-4 text-center text-[0.78rem] font-medium transition-colors font-[var(--font-dev-sans)] ${
                  formTab === "audit"
                    ? "border-b-2 border-b-dev-accent bg-dev-s2 text-dev-text"
                    : "border-b-2 border-b-transparent bg-transparent text-dev-dim"
                }`}
              >
                Book Free Audit
              </button>
            </div>

            <div className="p-7">
              {formTab === "framework" && !fwSuccess && (
                <div>
                  <div className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-dev-accent">
                    Free Download
                  </div>
                  <div className="mb-1 text-[1.05rem] font-bold leading-snug">
                    The AI Build Framework + Case Studies
                  </div>
                  <p className="mb-6 text-[0.8rem] font-light leading-relaxed text-dev-muted">
                    The exact framework we use to scope & ship AI systems — plus real case study
                    breakdowns with the full tech stack.
                  </p>
                  <form onSubmit={onSubmitFramework} className="space-y-3.5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                          First name *
                        </label>
                        <input className={fieldClass} placeholder="Alex" required />
                      </div>
                      <div>
                        <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                          Work email *
                        </label>
                        <input
                          className={fieldClass}
                          type="email"
                          placeholder="alex@co.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                        You are…
                      </label>
                      <select className={`${fieldClass} cursor-pointer`} defaultValue="">
                        <option value="" disabled>
                          Select one
                        </option>
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
                        className={`${fieldClass} min-h-[72px] resize-y`}
                        placeholder="e.g. 'We spend 15 hrs/week on manual reporting'"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md border-0 bg-dev-accent py-3.5 text-[0.9rem] font-bold text-[#080809] transition-transform hover:opacity-90 hover:-translate-y-px font-[var(--font-dev-sans)]"
                    >
                      Send Me the Framework →
                    </button>
                    <p className="text-center text-[0.7rem] text-dev-dim">
                      Instant delivery. No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              )}

              {formTab === "framework" && fwSuccess && (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(198,241,53,0.25)] bg-[rgba(198,241,53,0.1)] text-lg text-dev-accent">
                    ✓
                  </div>
                  <div className="mb-2 text-[1.1rem] font-bold">It&apos;s on its way.</div>
                  <p className="text-[0.83rem] font-light leading-relaxed text-dev-muted">
                    Check your inbox — framework landing within minutes. Case studies follow on day 2.
                    I&apos;ll also reach out personally.
                  </p>
                </div>
              )}

              {formTab === "audit" && !auditSuccess && (
                <div>
                  <div className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-dev-accent">
                    Free · 45 Min
                  </div>
                  <div className="mb-1 text-[1.05rem] font-bold leading-snug">
                    AI Audit Call — map your first automation
                  </div>
                  <p className="mb-6 text-[0.8rem] font-light leading-relaxed text-dev-muted">
                    We scope your most painful manual processes live and tell you exactly what
                    we&apos;d automate first, what it&apos;d cost, and how fast.
                  </p>
                  <form onSubmit={onSubmitAudit} className="space-y-3.5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                          First name *
                        </label>
                        <input className={fieldClass} placeholder="Alex" required />
                      </div>
                      <div>
                        <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                          Work email *
                        </label>
                        <input
                          className={fieldClass}
                          type="email"
                          placeholder="alex@co.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                        Company
                      </label>
                      <input className={fieldClass} placeholder="Acme Corp" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                        What are you trying to automate? *
                      </label>
                      <textarea
                        className={`${fieldClass} min-h-[72px] resize-y`}
                        placeholder="Brief description of the manual process you want to eliminate..."
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[0.75rem] font-medium text-dev-muted">
                        Rough monthly budget?
                      </label>
                      <select className={`${fieldClass} cursor-pointer`} defaultValue="">
                        <option value="" disabled>
                          Select range
                        </option>
                        <option>$1k–$3k / month</option>
                        <option>$3k–$7k / month</option>
                        <option>$7k–$15k / month</option>
                        <option>$15k+ / month</option>
                        <option>Project-based (one-time)</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md border-0 bg-dev-accent py-3.5 text-[0.9rem] font-bold text-[#080809] transition-transform hover:opacity-90 hover:-translate-y-px font-[var(--font-dev-sans)]"
                    >
                      Book the Free Audit →
                    </button>
                    <p className="text-center text-[0.7rem] text-dev-dim">
                      Bonus: pitch prep & early bird outreach help included.
                    </p>
                  </form>
                </div>
              )}

              {formTab === "audit" && auditSuccess && (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(198,241,53,0.25)] bg-[rgba(198,241,53,0.1)] text-lg text-dev-accent">
                    ✓
                  </div>
                  <div className="mb-2 text-[1.1rem] font-bold">Request received.</div>
                  <p className="text-[0.83rem] font-light leading-relaxed text-dev-muted">
                    I&apos;ll reply within a few hours with calendar availability. Looking forward to
                    mapping this out together.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
