"use client";

import React, { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

const HUBSPOT_API = "https://api.hsforms.com/submissions/v3/integration/submit";

function getHutk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
}

export function ContactSection() {
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
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 bg-black/30 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const inputError = "!border-red-400 focus:!border-red-400";

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-slate-100 to-slate-200 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 text-center mb-8">
            Contact us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot - hidden from users, bots fill it */}
            <div
              className="absolute -left-[9999px] w-1 h-1 overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="website_url">Website</label>
              <input
                type="text"
                id="website_url"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstname"
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
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
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
                htmlFor="company"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Company or website <span className="text-slate-400">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={isSubmitting}
                className={inputBase}
                placeholder="Company or website"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-white text-black font-medium rounded-lg hover:bg-slate-100 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
