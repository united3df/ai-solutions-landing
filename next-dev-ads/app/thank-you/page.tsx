import type { Metadata } from "next";
import Link from "next/link";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-dev-display",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dev-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dev-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div
      className={`dev-page min-h-screen bg-dev-bg text-dev-text ${bebasNeue.variable} ${dmMono.variable} ${dmSans.variable}`}
      style={{ fontFamily: "var(--font-dev-sans), sans-serif" }}
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <p className="font-[var(--font-dev-mono)] text-[11px] text-dev-accent tracking-[0.14em] uppercase mb-6">
          Message sent
        </p>
        <h1 className="font-[var(--font-dev-display)] text-[clamp(40px,8vw,72px)] leading-[0.95] tracking-[0.02em] mb-4">
          Thanks for reaching out
        </h1>
        <p className="font-[var(--font-dev-sans)] text-base text-dev-muted max-w-md mb-12 leading-relaxed">
          We&apos;ll get back to you within 1 business day.
        </p>
        <Link
          href="/"
          className="font-[var(--font-dev-mono)] text-xs py-3 px-6 bg-dev-accent text-black tracking-[0.06em] uppercase font-medium hover:bg-white transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
