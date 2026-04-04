import Link from "next/link";
import { devAppPath, mainSitePath } from "@/lib/site";

export function DevNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[300] flex h-[58px] items-center justify-between gap-4 border-b border-b-[color:var(--color-dev-border)] bg-[#080809]/92 px-6 backdrop-blur-[20px] md:px-10">
      <div className="flex min-w-0 flex-1 items-center gap-6 lg:gap-10">
        <Link
          href={mainSitePath("/")}
          className="font-[var(--font-dev-display)] shrink-0 text-[1.4rem] leading-none tracking-[0.08em] text-dev-text no-underline hover:opacity-90 transition-opacity"
        >
          AI4B2B<span className="text-dev-accent">.</span>
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="#services"
            className="text-[0.72rem] text-dev-muted hover:text-dev-text transition-colors"
          >
            Services
          </Link>
          <Link href="#cases" className="text-[0.72rem] text-dev-muted hover:text-dev-text transition-colors">
            Cases
          </Link>
          <Link
            href="#outcomes"
            className="text-[0.72rem] text-dev-muted hover:text-dev-text transition-colors"
          >
            Results
          </Link>
          <Link href="#process" className="text-[0.72rem] text-dev-muted hover:text-dev-text transition-colors">
            Process
          </Link>
        </div>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <span className="flex items-center gap-1.5 text-[0.72rem] text-dev-muted">
          <span className="text-dev-accent">★</span> Top 2% Upwork · 100% JSS
        </span>
        <span className="text-[0.72rem] text-dev-muted">4,400+ hrs delivered</span>
      </div>

      <div className="flex shrink-0 items-center gap-3 md:gap-5">
        <Link
          href={devAppPath("/blog")}
          className="hidden text-[0.82rem] text-dev-muted hover:text-dev-text transition-colors sm:inline"
        >
          Blog
        </Link>
        <a
          href="#get-framework"
          className="rounded px-4 py-2 text-[0.82rem] font-bold tracking-[0.02em] bg-dev-accent text-[#080809] no-underline transition-colors hover:opacity-90 hover:-translate-y-px md:px-5"
        >
          Get Free Framework ↓
        </a>
      </div>
    </nav>
  );
}
