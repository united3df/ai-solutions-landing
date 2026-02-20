import Link from "next/link";

export function DevFooter() {
  return (
    <footer className="border-t border-dev-border py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5 bg-dev-surface">
      <div className="font-[var(--font-dev-mono)] text-xs text-dev-accent tracking-[0.08em] uppercase">
        // AI4B2B · Dev · 2026
      </div>
      <ul className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 list-none">
        <li>
          <Link href="/" className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
            ← Back to Home
          </Link>
        </li>
        <li>
          <a
            href="https://www.upwork.com/freelancers/~0137c6a13e1b92ed62"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Upwork Profile
          </a>
        </li>
        <li>
          <a
            href="https://clutch.co/profile/ai4b2b"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Clutch Profile
          </a>
        </li>
        <li>
          <Link href="/terms" className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
            Terms
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors">
            Privacy
          </Link>
        </li>
      </ul>
      <div className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted">© 2026 — All rights reserved</div>
    </footer>
  );
}
