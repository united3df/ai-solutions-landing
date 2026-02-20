import React from "react";
import Link from "next/link";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-600 mb-8">
            <strong>Last Updated: January 2026</strong>
          </p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">What Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">During Consultation:</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Name and business email</li>
                <li>Company name and industry</li>
                <li>Use case description and business requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">During Service Delivery:</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Business documents and data you share for AI training</li>
                <li>System integration details</li>
                <li>Usage metrics and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Website:</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Basic analytics (page views, time on site)</li>
                <li>Contact form submissions</li>
                <li>No tracking cookies without consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>To understand your business needs</li>
                <li>To build and deliver AI solutions</li>
                <li>To provide support and maintenance</li>
                <li>To improve our services</li>
                <li>To communicate about projects</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">We never:</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Sell your data to third parties</li>
                <li>Use your business knowledge to train public AI models</li>
                <li>Share client information without permission</li>
                <li>Send unsolicited marketing (unless you opt in)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Data Security</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Secure cloud storage with access controls</li>
                <li>Regular security reviews</li>
                <li>Confidentiality agreements with our team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Project data: retained during engagement + reasonable archive period</li>
                <li>Contact information: until you request deletion</li>
                <li>You can request data export or deletion anytime</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Third-Party Services</h2>
              <p className="text-slate-700 leading-relaxed">
                We may use:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Cloud hosting providers (AWS, Google Cloud, Azure)</li>
                <li>Communication tools (email, video calls)</li>
                <li>AI platforms (OpenAI, Anthropic, etc.)</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                These services have their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Your Rights</h2>
              <p className="text-slate-700 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Access your data</li>
                <li>Request corrections</li>
                <li>Request deletion</li>
                <li>Opt out of communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">GDPR Compliance</h2>
              <p className="text-slate-700 leading-relaxed">
                For EU clients:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Lawful basis: contract performance and legitimate interest</li>
                <li>Data processing agreements available upon request</li>
                <li>Right to lodge complaints with supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Changes to This Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                We'll notify you of significant changes via email or website notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Contact</h2>
              <p className="text-slate-700 leading-relaxed">
                For privacy questions or data requests:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Email: [your email]</li>
                <li>Response time: within 5 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">Cookies and Advertising</h2>
              <p className="text-slate-700 leading-relaxed">
                We use cookies and similar technologies for analytics and advertising when you consent.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 mt-4">
                <li><strong>Essential cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics cookies:</strong> Anonymous usage statistics (optional, requires consent)</li>
                <li><strong>Advertising cookies:</strong> We may use Google Ads, Meta (Facebook) Pixel, TikTok Pixel, LinkedIn Insight Tag, and Microsoft UET for conversion tracking and ad optimization. These run only after you accept our cookie banner.</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                You can accept or reject non-essential cookies via our consent banner. You can also manage cookie preferences in your browser settings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
