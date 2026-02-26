import React from "react";
import { Link, Outlet } from "react-router-dom";

export function BlogLayout() {
  return (
    <div className="min-h-screen bg-dev-bg text-dev-text font-dev-sans">
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-5 border-b border-dev-border bg-dev-bg/90 backdrop-blur-xl">
        <Link
          to="/"
          className="font-dev-mono text-[13px] text-dev-accent tracking-[0.08em] uppercase hover:text-white transition-colors"
        >
          // AI4B2B
        </Link>
        <Link
          to="/blog"
          className="font-dev-mono text-xs text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
        >
          Blog
        </Link>
      </nav>
      <main className="pt-[80px] pb-20">
        <Outlet />
      </main>
      <footer className="border-t border-dev-border py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-5 bg-dev-surface">
        <div className="font-dev-mono text-xs text-dev-accent tracking-[0.08em] uppercase">
          // AI4B2B · Blog
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
          <Link
            to="/"
            className="font-dev-mono text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            to="/terms"
            className="font-dev-mono text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="font-dev-mono text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-text transition-colors"
          >
            Privacy
          </Link>
        </div>
        <div className="font-dev-mono text-[11px] text-dev-muted">© 2026 — All rights reserved</div>
      </footer>
    </div>
  );
}
