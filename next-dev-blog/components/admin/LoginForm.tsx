"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password");
        return;
      }
      // Hard navigation so the new httpOnly cookie is always sent on the next request.
      // router.push can race before the browser applies Set-Cookie, so /admin middleware loops on login.
      const target =
        nextPath.startsWith("/admin") && nextPath !== "/admin/login"
          ? nextPath
          : "/admin";
      window.location.assign(target);
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="mx-auto flex w-full max-w-sm flex-col gap-6"
    >
      <div>
        <label
          htmlFor="admin-password"
          className="mb-2 block font-[var(--font-dev-mono)] text-[11px] tracking-[0.08em] text-dev-muted uppercase"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-dev-border bg-dev-surface px-4 py-3 text-dev-text outline-none focus:border-dev-accent"
          required
        />
      </div>
      {error ? (
        <p className="font-[var(--font-dev-mono)] text-sm text-red-400">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-dev-accent px-4 py-3 font-[var(--font-dev-mono)] text-sm font-medium tracking-wide text-dev-bg hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
