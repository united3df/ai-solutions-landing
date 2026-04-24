import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="font-[var(--font-dev-display)] text-4xl text-dev-text md:text-5xl">
          Blog admin
        </h1>
        <p className="mt-2 font-[var(--font-dev-mono)] text-sm text-dev-muted">
          Sign in to manage posts
        </p>
      </div>
      <Suspense
        fallback={
          <p className="font-[var(--font-dev-mono)] text-sm text-dev-muted">
            Loading…
          </p>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
