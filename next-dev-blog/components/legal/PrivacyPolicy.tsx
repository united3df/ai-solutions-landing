import Link from "next/link";

export function PrivacyPolicy() {
  return (
    <div className="px-4 md:px-6 py-12 md:py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-dev-surface border border-dev-border p-8 md:p-12">
          <Link
            href="/"
            className="inline-flex items-center font-[var(--font-dev-mono)] text-xs text-dev-accent tracking-[0.06em] uppercase hover:text-white mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          <h1 className="font-[var(--font-dev-display)] text-[clamp(32px,6vw,48px)] leading-[0.95] tracking-[0.02em] text-dev-text mb-2">
            Privacy Policy
          </h1>
          <p className="font-[var(--font-dev-sans)] text-dev-muted mb-8">
            <strong className="text-dev-text">Last Updated: January 2026</strong>
          </p>

          <div className="space-y-6 font-[var(--font-dev-sans)] text-[15px] leading-relaxed">
            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                What Information We Collect
              </h2>

              <h3 className="font-semibold text-dev-text mt-6 mb-3">During Consultation:</h3>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Name and business email</li>
                <li>Company name and industry</li>
                <li>Use case description and business requirements</li>
              </ul>

              <h3 className="font-semibold text-dev-text mt-6 mb-3">During Service Delivery:</h3>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Business documents and data you share for AI training</li>
                <li>System integration details</li>
                <li>Usage metrics and feedback</li>
              </ul>

              <h3 className="font-semibold text-dev-text mt-6 mb-3">Website:</h3>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Basic analytics (page views, time on site)</li>
                <li>Contact form submissions</li>
                <li>No tracking cookies without consent</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>To understand your business needs</li>
                <li>To build and deliver AI solutions</li>
                <li>To provide support and maintenance</li>
                <li>To improve our services</li>
                <li>To communicate about projects</li>
              </ul>

              <h3 className="font-semibold text-dev-text mt-6 mb-3">We never:</h3>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Sell your data to third parties</li>
                <li>Use your business knowledge to train public AI models</li>
                <li>Share client information without permission</li>
                <li>Send unsolicited marketing (unless you opt in)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                Data Security
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Secure cloud storage with access controls</li>
                <li>Regular security reviews</li>
                <li>Confidentiality agreements with our team</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                Data Retention
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Project data: retained during engagement + reasonable archive period</li>
                <li>Contact information: until you request deletion</li>
                <li>You can request data export or deletion anytime</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                Third-Party Services
              </h2>
              <p className="text-dev-muted">We may use:</p>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted mt-2">
                <li>Cloud hosting providers (AWS, Google Cloud, Azure)</li>
                <li>Communication tools (email, video calls)</li>
                <li>AI platforms (OpenAI, Anthropic, etc.)</li>
              </ul>
              <p className="text-dev-muted mt-4">
                These services have their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                Your Rights
              </h2>
              <p className="text-dev-muted">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted mt-2">
                <li>Access your data</li>
                <li>Request corrections</li>
                <li>Request deletion</li>
                <li>Opt out of communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                GDPR Compliance
              </h2>
              <p className="text-dev-muted">For EU clients:</p>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted mt-2">
                <li>Lawful basis: contract performance and legitimate interest</li>
                <li>Data processing agreements available upon request</li>
                <li>Right to lodge complaints with supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                Changes to This Policy
              </h2>
              <p className="text-dev-muted">
                We&apos;ll notify you of significant changes via email or website notice.
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                Contact
              </h2>
              <p className="text-dev-muted">For privacy questions or data requests:</p>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted mt-2">
                <li>Email: [your email]</li>
                <li>Response time: within 5 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                Cookies and Advertising
              </h2>
              <p className="text-dev-muted">
                We use cookies and similar technologies for analytics and advertising when you
                consent.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted mt-4">
                <li>
                  <strong className="text-dev-text">Essential cookies:</strong> Required for
                  website functionality
                </li>
                <li>
                  <strong className="text-dev-text">Analytics cookies:</strong> Anonymous usage
                  statistics (optional, requires consent)
                </li>
                <li>
                  <strong className="text-dev-text">Advertising cookies:</strong> We may use
                  Google Ads, Meta (Facebook) Pixel, TikTok Pixel, LinkedIn Insight Tag, and
                  Microsoft UET for conversion tracking and ad optimization. These run only after
                  you accept our cookie banner.
                </li>
              </ul>
              <p className="text-dev-muted mt-4">
                You can accept or reject non-essential cookies via our consent banner. You can also
                manage cookie preferences in your browser settings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
