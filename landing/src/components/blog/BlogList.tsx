import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts, type PostListItem } from "@/lib/services/blogApi";

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

export function BlogList() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="px-6 md:px-12 py-24">
        <p className="font-dev-mono text-dev-muted text-sm">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 md:px-12 py-24">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 font-dev-mono text-[11px] text-dev-accent tracking-[0.12em] uppercase mb-8">
        <span className="w-6 h-px bg-dev-accent" />
        Blog
      </div>
      <h1 className="font-dev-display text-[clamp(40px,5vw,64px)] leading-none mb-12">
        Articles
      </h1>
      {posts.length === 0 ? (
        <p className="text-dev-muted">No posts yet.</p>
      ) : (
        <ul className="space-y-0 list-none">
          {posts.map((post, i) => (
            <li key={post.id} className="border-b border-dev-border last:border-b-0">
              <Link
                to={`/blog/${post.slug}`}
                className="block py-8 group hover:bg-dev-surface/30 transition-colors -mx-4 px-4 rounded"
              >
                <h2 className="font-dev-display text-2xl md:text-3xl text-dev-text group-hover:text-dev-accent transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-dev-muted text-sm leading-relaxed mb-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="font-dev-mono text-[11px] text-dev-muted tracking-[0.06em]">
                  {formatDate(post.createdAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
