import React from "react";
import { Link } from "react-router-dom";

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-slate-600 mb-8">
            <strong>Last Updated: January 2026</strong>
          </p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">1. Services</h2>
              <p className="text-slate-700 leading-relaxed">
                We provide AI consulting, development, and implementation services including voice AI agents, knowledge bases, prompt engineering, and AI MVP development.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">2. Client Relationship</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Services are provided based on agreed scope and timeline</li>
                <li>We work collaboratively with your team</li>
                <li>Changes to scope require mutual agreement</li>
                <li>Payment terms are defined in individual contracts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">3. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>You own all custom solutions we build for you</li>
                <li>You own your data and business knowledge</li>
                <li>We retain rights to our general methodologies and frameworks</li>
                <li>Third-party tools may have separate licensing terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">4. Data Usage</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>We use your data only to deliver agreed services</li>
                <li>Your business information remains confidential</li>
                <li>We don't share your data with third parties without consent</li>
                <li>Data handling follows our Privacy Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">5. Limitations</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>AI systems require proper training and maintenance</li>
                <li>Results depend on data quality and use case fit</li>
                <li>We don't guarantee specific business outcomes</li>
                <li>Human oversight is recommended for critical decisions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">6. Liability</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Our liability is limited to the fees paid for specific services</li>
                <li>We're not responsible for business decisions made using AI outputs</li>
                <li>Force majeure events excuse performance delays</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">7. Termination</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Either party may terminate with written notice</li>
                <li>Outstanding payments remain due</li>
                <li>We'll assist with reasonable transition support</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
