import type { Metadata } from "next";
import Link from "next/link";
import { ThankYouClient } from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <ThankYouClient />
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Thanks for reaching out.
        </h1>
        <p className="text-lg text-slate-600">
          We&apos;ll get back to you within 1 business day.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
