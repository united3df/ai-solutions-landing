import Link from "next/link";

export function DevFooter() {
  return (
    <footer className="relative z-[1] flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--color-dev-border)] px-6 py-7 md:px-10">
      <div className="font-[var(--font-dev-display)] text-[1.1rem] tracking-[0.08em] text-dev-text">
        AI4B2B<span className="text-dev-accent">.</span>DEV
      </div>
      <p className="text-[0.73rem] text-dev-dim">
        © 2026 · Top 2% Upwork · 100% JSS · 4,400+ hrs · U.S.-based
      </p>
      <div className="flex flex-wrap gap-6">
        <a
          href="https://www.upwork.com/freelancers/~0137c6a13e1b92ed62"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.73rem] text-dev-dim no-underline transition-colors hover:text-dev-accent"
        >
          Upwork
        </a>
        <a
          href="https://clutch.co/profile/ai4b2b"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.73rem] text-dev-dim no-underline transition-colors hover:text-dev-accent"
        >
          Clutch
        </a>
        <Link
          href="/privacy"
          className="text-[0.73rem] text-dev-dim no-underline transition-colors hover:text-dev-accent"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-[0.73rem] text-dev-dim no-underline transition-colors hover:text-dev-accent"
        >
          Terms
        </Link>
      </div>
    </footer>
  );
}
