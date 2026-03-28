import Link from "next/link";
import { devAppPath, mainSitePath } from "@/lib/site";

export function DevNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-5 border-b border-dev-border bg-[#0a0a08]/90 backdrop-blur-xl">
      <Link
        href={mainSitePath("/")}
        className="font-[var(--font-dev-display)] text-xl tracking-[0.02em] text-dev-text no-underline flex items-baseline gap-0.5 hover:opacity-90 transition-opacity"
      >
        AI4B2B<span className="text-dev-accent text-2xl leading-none">·</span>
      </Link>
      <ul className="hidden md:flex gap-8 lg:gap-10 list-none items-center">
        <li>
          <Link
            href="#services"
            className="text-xs text-dev-muted hover:text-dev-text transition-colors"
          >
            Services
          </Link>
        </li>
        <li>
          <Link href="#cases" className="text-xs text-dev-muted hover:text-dev-text transition-colors">
            Cases
          </Link>
        </li>
        <li>
          <Link
            href="#outcomes"
            className="text-xs text-dev-muted hover:text-dev-text transition-colors"
          >
            Results
          </Link>
        </li>
        <li>
          <Link
            href="#process"
            className="text-xs text-dev-muted hover:text-dev-text transition-colors"
          >
            Process
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4 md:gap-5">
        <Link
          href={devAppPath("/blog")}
          className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-accent transition-colors"
        >
          Blog
        </Link>
        <a
          href="/#contact"
          className="font-[var(--font-dev-mono)] text-xs py-2.5 px-5 bg-dev-accent text-black tracking-[0.06em] uppercase font-medium hover:bg-white hover:-translate-y-0.5 transition-all rounded-full"
        >
          Ship Your MVP →
        </a>
      </div>
    </nav>
  );
}
