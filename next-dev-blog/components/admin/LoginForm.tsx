"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
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
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password");
        return;
      }
      router.push(nextPath.startsWith("/admin") ? nextPath : "/admin");
      router.refresh();
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
