import Link from "next/link";
import { mainSitePath } from "@/lib/site";

export function DevFooter() {
  return (
    <footer className="border-t border-dev-border py-10 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5 bg-dev-surface flex-wrap">
      <div className="font-[var(--font-dev-display)] text-lg text-dev-text">
        AI4B2B<span className="text-dev-accent"> · </span>
      </div>
      <p className="text-[0.75rem] text-dev-muted/80 text-center md:text-left order-3 md:order-none">
        © 2026 · Top 2% Upwork · 4,400+ hours delivered · U.S.-based
      </p>
      <ul className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 list-none order-2 md:order-none">
        <li>

        </li>
        <li>
          <a
            href="https://www.upwork.com/freelancers/~0137c6a13e1b92ed62"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Upwork
          </a>
        </li>
        <li>
          <a
            href="https://clutch.co/profile/ai4b2b"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Clutch
          </a>
        </li>
        <li>
          <Link
            href="/terms"
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Terms
          </Link>
        </li>
        <li>
          <Link
            href="/privacy"
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Privacy
          </Link>
        </li>
      </ul>
    </footer>
  );
}
