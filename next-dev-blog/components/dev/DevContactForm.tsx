"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

// Same HubSpot form as next-landing: set NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_FORM_GUID.
const HUBSPOT_API = "https://api.hsforms.com/submissions/v3/integration/submit";

function getHutk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
}

export function DevContactForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const payload = {
      fields: [
        { name: "firstname", value: firstName.trim() },
        { name: "email", value: email.trim() },
        ...(company.trim() ? [{ name: "company", value: company.trim() }] : []),
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

      window.location.href = "/thank-you";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 bg-dev-bg border border-dev-border rounded-lg text-dev-text placeholder:text-dev-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-dev-accent/50 focus-visible:border-dev-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const inputError = "!border-red-500 focus-visible:!ring-red-500/40 focus-visible:!border-red-500";

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-dev-border bg-dev-surface/40 py-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-3 font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-4">
          <span className="w-6 h-px bg-dev-accent" />
          Contact
        </div>
        <h2 className="font-[var(--font-dev-display)] text-[clamp(36px,5vw,52px)] leading-none text-center mb-10">
          Contact us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div
            className="absolute -left-[9999px] w-1 h-1 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="website_url_dev">Website</label>
            <input
              type="text"
              id="website_url_dev"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="firstname_dev"
              className="block font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.08em] uppercase mb-2"
            >
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="firstname_dev"
              name="firstname"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isSubmitting}
              className={`${inputBase} ${error === "First name is required." ? inputError : ""}`}
              placeholder="First name"
            />
          </div>

          <div>
            <label
              htmlFor="email_dev"
              className="block font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.08em] uppercase mb-2"
            >
              Work Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email_dev"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className={`${inputBase} ${error && error !== "First name is required." ? inputError : ""}`}
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="company_dev"
              className="block font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.08em] uppercase mb-2"
            >
              Company or website <span className="text-dev-muted/70">(optional)</span>
            </label>
            <input
              type="text"
              id="company_dev"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={isSubmitting}
              className={inputBase}
              placeholder="Company or website"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-[var(--font-dev-sans)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 bg-dev-accent text-black font-[var(--font-dev-mono)] text-[13px] tracking-[0.05em] uppercase font-medium rounded-lg hover:bg-white active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
