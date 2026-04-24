import Link from "next/link";
import { redirect } from "next/navigation";
import { adminNestFetch } from "@/lib/admin/nest-server";
import type { AdminPostListItem } from "@/lib/admin/types";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function AdminHomePage() {
  const res = await adminNestFetch("/admin/posts");
  if (!res || !res.ok) {
    redirect("/admin/login");
  }
  const posts = (await res.json()) as AdminPostListItem[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[var(--font-dev-display)] text-4xl text-dev-text md:text-5xl">
            Posts
          </h1>
          <p className="mt-2 font-[var(--font-dev-mono)] text-sm text-dev-muted">
            {posts.length} total
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-dev-accent px-5 py-2.5 font-[var(--font-dev-mono)] text-xs font-medium tracking-wide text-dev-bg hover:opacity-90"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="font-[var(--font-dev-mono)] text-sm text-dev-muted">
          No posts yet. Create one to get started.
        </p>
      ) : (
        <ul className="space-y-0 list-none border-t border-dev-border">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-3 border-b border-dev-border py-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="font-[var(--font-dev-display)] text-xl text-dev-text hover:text-dev-accent md:text-2xl"
                >
                  {post.title}
                </Link>
                <p className="mt-1 truncate font-[var(--font-dev-mono)] text-[11px] text-dev-muted">
                  /blog/{post.slug}
                </p>
                <p className="mt-1 font-[var(--font-dev-mono)] text-[11px] text-dev-muted">
                  {formatDate(post.createdAt)}
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 font-[var(--font-dev-mono)] text-[10px] tracking-wider uppercase ${
                    post.status === "published"
                      ? "bg-dev-accent/15 text-dev-accent"
                      : "bg-dev-surface text-dev-muted"
                  }`}
                >
                  {post.status}
                </span>
                {post.status === "published" ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-[var(--font-dev-mono)] text-[11px] text-dev-accent hover:underline"
                  >
                    View
                  </Link>
                ) : null}
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="rounded-lg border border-dev-border px-3 py-1.5 font-[var(--font-dev-mono)] text-[11px] text-dev-text hover:border-dev-accent"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
