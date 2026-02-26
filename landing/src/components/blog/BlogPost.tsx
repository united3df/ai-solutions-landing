import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, type PostFull } from "@/lib/services/blogApi";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then(setPost)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="px-6 md:px-12 py-24">
        <p className="font-dev-mono text-dev-muted text-sm">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="px-6 md:px-12 py-24 max-w-3xl mx-auto">
        <p className="text-red-400 mb-4">{error ?? "Post not found"}</p>
        <Link to="/blog" className="font-dev-mono text-dev-accent hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="px-6 md:px-12 max-w-3xl mx-auto">
      <Link
        to="/blog"
        className="inline-block font-dev-mono text-[11px] text-dev-muted tracking-[0.06em] uppercase hover:text-dev-accent mb-8"
      >
        ← Back to Blog
      </Link>
      <header className="mb-12">
        <h1 className="font-dev-display text-[clamp(36px,5vw,56px)] leading-tight mb-4">
          {post.title}
        </h1>
        <time className="font-dev-mono text-[11px] text-dev-muted tracking-[0.06em]">
          {formatDate(post.createdAt)}
        </time>
      </header>
      <div className="blog-post-content prose prose-invert max-w-none [&_h1]:font-dev-display [&_h1]:text-3xl [&_h1]:mb-4 [&_h2]:font-dev-display [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-dev-mono [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-dev-text [&_p]:leading-[1.8] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:text-dev-text [&_li]:mb-1 [&_code]:bg-dev-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-dev-accent [&_code]:font-dev-mono [&_code]:text-sm [&_pre]:bg-dev-surface [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_blockquote]:border-l-4 [&_blockquote]:border-dev-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-dev-muted [&_a]:text-dev-accent [&_a]:hover:underline">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
