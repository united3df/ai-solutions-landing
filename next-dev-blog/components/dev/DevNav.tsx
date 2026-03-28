import Link from "next/link";
import { devAppPath, mainSitePath } from "@/lib/site";

export function DevNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5 border-b border-dev-border bg-[#0a0a08]/90 backdrop-blur-xl">
      <Link
        href={mainSitePath("/")}
        className="font-[var(--font-dev-mono)] text-[13px] text-dev-accent tracking-[0.08em] uppercase hover:text-white transition-colors"
      >
        {`// AI4B2B · Dev`}
      </Link>
      <ul className="hidden md:flex gap-10 list-none">
        <li>
          <Link href="#about" className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="#services" className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
            Services
          </Link>
        </li>
        <li>
          <Link href="#stack" className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
            Stack
          </Link>
        </li>
        <li>
          <Link href="#outcomes" className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
            Results
          </Link>
        </li>
        <li>
          <Link href="#process" className="font-[var(--font-dev-mono)] text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
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
        <Link
          href="#contact"
          className="font-[var(--font-dev-mono)] text-xs py-2.5 px-5 bg-dev-accent text-black tracking-[0.06em] uppercase font-medium hover:bg-white hover:-translate-y-0.5 transition-all"
        >
          Ship Your MVP →
        </Link>
      </div>
    </nav>
  );
}
