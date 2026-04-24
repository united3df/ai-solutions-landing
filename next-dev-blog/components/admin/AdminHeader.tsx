"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { devAppPath } from "@/lib/site";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return null;
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-dev-border bg-dev-bg/90 px-6 py-4 backdrop-blur-xl md:px-12">
      <div className="flex flex-wrap items-center gap-6">
        <Link
          href="/admin"
          className="font-[var(--font-dev-mono)] text-xs tracking-[0.12em] text-dev-accent uppercase"
        >
          Admin
        </Link>
        <Link
          href={devAppPath("/blog")}
          className="font-[var(--font-dev-mono)] text-[11px] tracking-[0.06em] text-dev-muted uppercase hover:text-dev-text"
        >
          View blog
        </Link>
      </div>
      <button
        type="button"
        onClick={() => void logout()}
        className="font-[var(--font-dev-mono)] cursor-pointer text-[11px] tracking-[0.06em] text-dev-muted uppercase hover:text-dev-accent"
      >
        Log out
      </button>
    </header>
  );
}
