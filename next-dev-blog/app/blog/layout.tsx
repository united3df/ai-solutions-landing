import type { Metadata } from "next";
import Link from "next/link";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";
import { devAppPath, getDevAppOrigin, mainSitePath } from "@/lib/site";

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

const baseUrl = getDevAppOrigin();
const blogUrl = `${baseUrl}/blog`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Blog | AI Solutions",
  description:
    "Articles on AI, voice agents, knowledge bases, and practical AI for business.",
  openGraph: {
    url: blogUrl,
    siteName: "AI Solutions",
    title: "Blog | AI Solutions",
  },
  alternates: {
    canonical: blogUrl,
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`dev-page min-h-screen bg-dev-bg text-dev-text ${bebasNeue.variable} ${dmMono.variable} ${dmSans.variable}`}
      style={{ fontFamily: "var(--font-dev-sans), sans-serif" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5 border-b border-dev-border bg-dev-bg/90 backdrop-blur-xl">
        <Link
          href={mainSitePath("/")}
          className="font-[var(--font-dev-mono)] text-[13px] text-dev-accent tracking-[0.08em] uppercase hover:text-white transition-colors"
        >
          {`// AI4B2B`}
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href={devAppPath("/dev")}
            className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href={devAppPath("/blog")}
            className="font-[var(--font-dev-mono)] text-xs text-dev-accent tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Blog
          </Link>
        </div>
      </nav>
      <main className="pt-[80px] pb-20">{children}</main>
      <footer className="border-t border-dev-border py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5 bg-dev-surface">
        <div className="font-[var(--font-dev-mono)] text-xs text-dev-accent tracking-[0.08em] uppercase">
          {`// AI4B2B · Blog`}
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
          <Link
            href={devAppPath("/dev")}
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Developer portfolio
          </Link>
          <Link
            href={devAppPath("/blog")}
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Blog
          </Link>
          <Link
            href={mainSitePath("/")}
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            ← Main site
          </Link>
          <Link
            href={mainSitePath("/terms")}
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Terms
          </Link>
          <Link
            href={mainSitePath("/privacy")}
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Privacy
          </Link>
        </div>
        <div className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted">
          © 2026 — All rights reserved
        </div>
      </footer>
    </div>
  );
}
