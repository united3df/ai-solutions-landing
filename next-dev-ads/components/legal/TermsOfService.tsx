import Link from "next/link";

export function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="font-[var(--font-dev-sans)] text-dev-muted mb-8">
            <strong className="text-dev-text">Last Updated: January 2026</strong>
          </p>

          <div className="space-y-6 font-[var(--font-dev-sans)] text-[15px] leading-relaxed">
            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                1. Services
              </h2>
              <p className="text-dev-muted">
                We provide AI consulting, development, and implementation services including voice
                AI agents, knowledge bases, prompt engineering, and AI MVP development.
              </p>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                2. Client Relationship
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Services are provided based on agreed scope and timeline</li>
                <li>We work collaboratively with your team</li>
                <li>Changes to scope require mutual agreement</li>
                <li>Payment terms are defined in individual contracts</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                3. Intellectual Property
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>You own all custom solutions we build for you</li>
                <li>You own your data and business knowledge</li>
                <li>We retain rights to our general methodologies and frameworks</li>
                <li>Third-party tools may have separate licensing terms</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                4. Data Usage
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>We use your data only to deliver agreed services</li>
                <li>Your business information remains confidential</li>
                <li>We don&apos;t share your data with third parties without consent</li>
                <li>
                  Data handling follows our{" "}
                  <Link href="/privacy" className="text-dev-accent hover:text-white underline-offset-2 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                5. Limitations
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>AI systems require proper training and maintenance</li>
                <li>Results depend on data quality and use case fit</li>
                <li>We don&apos;t guarantee specific business outcomes</li>
                <li>Human oversight is recommended for critical decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                6. Liability
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Our liability is limited to the fees paid for specific services</li>
                <li>We&apos;re not responsible for business decisions made using AI outputs</li>
                <li>Force majeure events excuse performance delays</li>
              </ul>
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl md:text-2xl text-dev-text mt-8 mb-4 tracking-[0.02em]">
                7. Termination
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-dev-muted">
                <li>Either party may terminate with written notice</li>
                <li>Outstanding payments remain due</li>
                <li>We&apos;ll assist with reasonable transition support</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
