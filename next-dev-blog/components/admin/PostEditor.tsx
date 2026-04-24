"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AdminPostFull } from "@/lib/admin/types";

type SaveState = "idle" | "saving" | "saved" | "error";

async function readErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const j = JSON.parse(text) as {
      message?: string | string[];
      error?: string;
    };
    if (Array.isArray(j.message)) return j.message.join(", ");
    if (typeof j.message === "string") return j.message;
    if (typeof j.error === "string") return j.error;
  } catch {
    /* use raw text */
  }
  return text.trim() || `Request failed (${res.status})`;
}

interface PostEditorProps {
  mode: "new" | "edit";
  initial?: AdminPostFull;
}

export function PostEditor({ mode, initial }: PostEditorProps) {
  const router = useRouter();
  const [id, setId] = useState<number | null>(initial?.id ?? null);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [metaTitle, setMetaTitle] = useState(initial?.metaTitle ?? "");
  const [metaDesc, setMetaDesc] = useState(initial?.metaDesc ?? "");
  const [status, setStatus] = useState(initial?.status ?? "draft");
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const isNew = mode === "new" && id === null;

  const persist = useCallback(async () => {
    setErrorMsg(null);
    setSaveState("saving");
    const body = {
      title: title.trim() || "Untitled",
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim(),
      content,
      metaTitle: metaTitle.trim(),
      metaDesc: metaDesc.trim(),
      status,
    };

    try {
      if (isNew) {
        const res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt || undefined,
            content: body.content,
            metaTitle: body.metaTitle,
            metaDesc: body.metaDesc,
            status: body.status,
          }),
        });
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!res.ok) {
          setSaveState("error");
          setErrorMsg(await readErrorMessage(res));
          return;
        }
        const data = (await res.json()) as { id: number };
        setId(data.id);
        setSaveState("saved");
        setSaveState("saved");
        router.replace(`/admin/posts/${data.id}`);
        router.refresh();
        return;
      }

      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: body.title,
          slug: body.slug,
          excerpt: body.excerpt,
          content: body.content,
          metaTitle: body.metaTitle,
          metaDesc: body.metaDesc,
          status: body.status,
        }),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.status === 409) {
        setErrorMsg("This slug is already used by another post.");
        setSaveState("error");
        return;
      }
      if (!res.ok) {
        throw new Error(await readErrorMessage(res));
      }
      setSaveState("saved");
      router.refresh();
    } catch (e) {
      setSaveState("error");
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
    }
  }, [
    content,
    excerpt,
    id,
    isNew,
    metaDesc,
    metaTitle,
    router,
    slug,
    status,
    title,
  ]);

  async function publish() {
    setErrorMsg(null);
    setSaveState("saving");

    let targetId = id;
    if (targetId == null) {
      const createRes = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim() || "Untitled",
          slug: slug.trim() || undefined,
          excerpt: excerpt.trim() || undefined,
          content,
          metaTitle: metaTitle.trim() || undefined,
          metaDesc: metaDesc.trim() || undefined,
          status: "draft",
        }),
      });
      if (createRes.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!createRes.ok) {
        setSaveState("error");
        setErrorMsg(await readErrorMessage(createRes));
        return;
      }
      const data = (await createRes.json()) as { id: number };
      targetId = data.id;
      setId(data.id);
    }

    const res = await fetch(`/api/admin/posts/${targetId}/publish`, {
      method: "POST",
    });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!res.ok) {
      setSaveState("error");
      setErrorMsg(await readErrorMessage(res));
      return;
    }
    setStatus("published");
    setSaveState("saved");
    if (mode === "new") {
      router.replace(`/admin/posts/${targetId}`);
    }
    router.refresh();
  }

  async function unpublish() {
    if (id == null) return;
    setErrorMsg(null);
    const res = await fetch(`/api/admin/posts/${id}/draft`, { method: "POST" });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!res.ok) {
      setErrorMsg("Could not move to draft");
      return;
    }
    setStatus("draft");
    router.refresh();
  }

  async function remove() {
    if (id == null) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (!res.ok) {
      setErrorMsg("Could not delete");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:px-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin"
          className="font-[var(--font-dev-mono)] text-[11px] tracking-[0.06em] text-dev-muted uppercase hover:text-dev-accent"
        >
          ← All posts
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted">
            {status === "published" ? "Published" : "Draft"}
          </span>
          {saveState === "saving" ? (
            <span className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted">
              Saving…
            </span>
          ) : null}
          {saveState === "saved" ? (
            <span className="font-[var(--font-dev-mono)] text-[11px] text-dev-accent">
              Saved
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => void persist()}
            className="rounded-lg border border-dev-border bg-dev-surface px-4 py-2 font-[var(--font-dev-mono)] text-xs text-dev-text hover:border-dev-accent"
          >
            Save
          </button>
          {status !== "published" ? (
            <button
              type="button"
              onClick={() => void publish()}
              className="rounded-lg bg-dev-accent px-4 py-2 font-[var(--font-dev-mono)] text-xs font-medium text-dev-bg hover:opacity-90"
            >
              Publish
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => void unpublish()}
                className="rounded-lg border border-dev-border px-4 py-2 font-[var(--font-dev-mono)] text-xs text-dev-muted hover:text-dev-text"
              >
                Unpublish
              </button>
              <Link
                href={`/blog/${slug}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-dev-accent/50 px-4 py-2 font-[var(--font-dev-mono)] text-xs text-dev-accent hover:bg-dev-accent/10"
              >
                Open on site
              </Link>
            </>
          )}
        </div>
      </div>

      {errorMsg ? (
        <p className="mb-6 font-[var(--font-dev-mono)] text-sm text-red-400">
          {errorMsg}
        </p>
      ) : null}

      <div className="mb-6 flex gap-2 border-b border-dev-border">
        <button
          type="button"
          onClick={() => setTab("edit")}
          className={`cursor-pointer border-b-2 px-3 py-2 font-[var(--font-dev-mono)] text-xs uppercase tracking-wider ${
            tab === "edit"
              ? "border-dev-accent text-dev-accent"
              : "border-transparent text-dev-muted hover:text-dev-text"
          }`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`cursor-pointer border-b-2 px-3 py-2 font-[var(--font-dev-mono)] text-xs uppercase tracking-wider ${
            tab === "preview"
              ? "border-dev-accent text-dev-accent"
              : "border-transparent text-dev-muted hover:text-dev-text"
          }`}
        >
          Preview
        </button>
      </div>

      {tab === "edit" ? (
        <div className="flex flex-col gap-6">
          <div>
            <label className="mb-1 block font-[var(--font-dev-mono)] text-[11px] text-dev-muted uppercase">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-dev-border bg-dev-surface px-4 py-3 font-[var(--font-dev-display)] text-2xl text-dev-text outline-none focus:border-dev-accent"
            />
          </div>
          <div>
            <label className="mb-1 block font-[var(--font-dev-mono)] text-[11px] text-dev-muted uppercase">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto from title if empty on create"
              className="w-full rounded-lg border border-dev-border bg-dev-surface px-4 py-2 font-[var(--font-dev-mono)] text-sm text-dev-text outline-none focus:border-dev-accent"
            />
            <p className="mt-1 font-[var(--font-dev-mono)] text-[11px] text-dev-muted">
              Changing the slug changes the public URL. Must stay unique.
            </p>
          </div>
          <div>
            <label className="mb-1 block font-[var(--font-dev-mono)] text-[11px] text-dev-muted uppercase">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full resize-y rounded-lg border border-dev-border bg-dev-surface px-4 py-3 text-sm text-dev-text outline-none focus:border-dev-accent"
            />
          </div>
          <div>
            <label className="mb-1 block font-[var(--font-dev-mono)] text-[11px] text-dev-muted uppercase">
              Content (Markdown)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full resize-y rounded-lg border border-dev-border bg-dev-surface px-4 py-3 font-[var(--font-dev-mono)] text-sm leading-relaxed text-dev-text outline-none focus:border-dev-accent"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-[var(--font-dev-mono)] text-[11px] text-dev-muted uppercase">
                Meta title
              </label>
              <input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full rounded-lg border border-dev-border bg-dev-surface px-4 py-2 text-sm text-dev-text outline-none focus:border-dev-accent"
              />
            </div>
            <div>
              <label className="mb-1 block font-[var(--font-dev-mono)] text-[11px] text-dev-muted uppercase">
                Meta description
              </label>
              <input
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                className="w-full rounded-lg border border-dev-border bg-dev-surface px-4 py-2 text-sm text-dev-text outline-none focus:border-dev-accent"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="blog-post-content prose prose-invert max-w-none rounded-lg border border-dev-border bg-dev-surface/50 p-6 [&_a]:text-dev-accent [&_code]:text-dev-accent">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "*Nothing yet*"}</ReactMarkdown>
        </div>
      )}

      {!isNew ? (
        <div className="mt-12 border-t border-dev-border pt-8">
          {!deleteConfirm ? (
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              className="font-[var(--font-dev-mono)] text-xs text-red-400/90 hover:text-red-400"
            >
              Delete post…
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-[var(--font-dev-mono)] text-sm text-dev-muted">
                Sure? This cannot be undone.
              </span>
              <button
                type="button"
                onClick={() => void remove()}
                className="rounded-lg bg-red-900/80 px-4 py-2 font-[var(--font-dev-mono)] text-xs text-white hover:bg-red-800"
              >
                Delete permanently
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirm(false)}
                className="font-[var(--font-dev-mono)] text-xs text-dev-muted hover:text-dev-text"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
