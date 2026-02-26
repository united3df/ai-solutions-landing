"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  adminApi,
  type PostListItemAdmin,
  type Topic,
  type Stats,
} from "@/lib/services/blogApi";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [posts, setPosts] = useState<PostListItemAdmin[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicKeyword, setNewTopicKeyword] = useState("");

  const api = useMemo(
    () => (token ? adminApi(token) : null),
    [token]
  );

  const load = useCallback(async () => {
    if (!token) return;
    const a = adminApi(token);
    setLoading(true);
    setError(null);
    try {
      const [postsRes, topicsRes, statsRes] = await Promise.all([
        a.listPosts(),
        a.listTopics(),
        a.getStats(),
      ]);
      setPosts(postsRes);
      setTopics(topicsRes);
      setStats(statsRes);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setToken("");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      setToken(tokenInput.trim());
      setTokenInput("");
    }
  };

  const handleGenerate = async () => {
    if (!api) return;
    setGenerateLoading(true);
    setError(null);
    try {
      await api.generate();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generate failed");
    } finally {
      setGenerateLoading(false);
    }
  };

  const handlePublish = async (id: number) => {
    if (!api) return;
    try {
      await api.publishPost(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleDraft = async (id: number) => {
    if (!api) return;
    try {
      await api.draftPost(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!api || !window.confirm("Delete this post?")) return;
    try {
      await api.deletePost(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!api || !newTopicTitle.trim()) return;
    try {
      await api.addTopic({
        title: newTopicTitle.trim(),
        keyword: newTopicKeyword.trim() || undefined,
      });
      setNewTopicTitle("");
      setNewTopicKeyword("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleDeleteTopic = async (id: number) => {
    if (!api || !window.confirm("Delete this topic?")) return;
    try {
      await api.deleteTopic(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-dev-bg text-dev-text flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-[var(--font-dev-display)] text-2xl text-dev-accent mb-6">
            Admin
          </h1>
          <label className="block font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase tracking-wider mb-2">
            Admin token
          </label>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Enter token"
            className="w-full px-4 py-3 bg-dev-surface border border-dev-border rounded text-dev-text placeholder-dev-muted focus:outline-none focus:border-dev-accent"
          />
          <button
            type="submit"
            className="w-full py-3 bg-dev-accent text-black font-[var(--font-dev-mono)] text-sm uppercase tracking-wider font-medium hover:bg-white transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dev-bg text-dev-text">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-[var(--font-dev-display)] text-3xl text-dev-accent">
            Admin
          </h1>
          <button
            type="button"
            onClick={() => setToken("")}
            className="font-[var(--font-dev-mono)] text-xs text-dev-muted hover:text-dev-text"
          >
            Log out
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-dev-muted">Loading...</p>
        ) : (
          <>
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-dev-surface border border-dev-border rounded">
                  <div className="font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase mb-1">
                    Total
                  </div>
                  <div className="font-[var(--font-dev-display)] text-2xl text-dev-accent">
                    {stats.totalPosts}
                  </div>
                </div>
                <div className="p-4 bg-dev-surface border border-dev-border rounded">
                  <div className="font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase mb-1">
                    Published
                  </div>
                  <div className="font-[var(--font-dev-display)] text-2xl text-dev-accent">
                    {stats.publishedPosts}
                  </div>
                </div>
                <div className="p-4 bg-dev-surface border border-dev-border rounded">
                  <div className="font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase mb-1">
                    Drafts
                  </div>
                  <div className="font-[var(--font-dev-display)] text-2xl text-dev-accent">
                    {stats.draftPosts}
                  </div>
                </div>
                <div className="p-4 bg-dev-surface border border-dev-border rounded">
                  <div className="font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase mb-1">
                    Topics
                  </div>
                  <div className="font-[var(--font-dev-display)] text-2xl text-dev-accent">
                    {stats.unusedTopics}
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generateLoading}
                className="px-6 py-3 bg-dev-accent text-black font-[var(--font-dev-mono)] text-sm uppercase tracking-wider font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {generateLoading ? "Generating..." : "Generate post"}
              </button>
            </div>

            <section className="mb-12">
              <h2 className="font-[var(--font-dev-display)] text-xl text-dev-accent mb-4">
                Posts
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-dev-border">
                      <th className="text-left py-3 font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase">
                        Title
                      </th>
                      <th className="text-left py-3 font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase">
                        Status
                      </th>
                      <th className="text-left py-3 font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase">
                        Slug
                      </th>
                      <th className="text-left py-3 font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase">
                        Score
                      </th>
                      <th className="text-left py-3 font-[var(--font-dev-mono)] text-xs text-dev-muted uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((p) => (
                      <tr key={p.id} className="border-b border-dev-border">
                        <td className="py-3 text-dev-text">{p.title}</td>
                        <td className="py-3">
                          <span
                            className={`font-[var(--font-dev-mono)] text-xs ${
                              p.status === "published"
                                ? "text-dev-accent"
                                : "text-dev-muted"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 font-[var(--font-dev-mono)] text-xs text-dev-muted">
                          {p.slug}
                        </td>
                        <td className="py-3 font-[var(--font-dev-mono)] text-xs text-dev-muted">
                          {p.score ?? "-"}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            {p.status === "draft" ? (
                              <button
                                type="button"
                                onClick={() => handlePublish(p.id)}
                                className="font-[var(--font-dev-mono)] text-[11px] text-dev-accent hover:underline"
                              >
                                Publish
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleDraft(p.id)}
                                className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted hover:text-dev-text"
                              >
                                Draft
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeletePost(p.id)}
                              className="font-[var(--font-dev-mono)] text-[11px] text-red-400 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {posts.length === 0 && (
                <p className="py-8 text-dev-muted">No posts.</p>
              )}
            </section>

            <section>
              <h2 className="font-[var(--font-dev-display)] text-xl text-dev-accent mb-4">
                Topics
              </h2>
              <form onSubmit={handleAddTopic} className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Topic title"
                  className="flex-1 px-4 py-2 bg-dev-surface border border-dev-border rounded text-dev-text placeholder-dev-muted focus:outline-none focus:border-dev-accent"
                />
                <input
                  type="text"
                  value={newTopicKeyword}
                  onChange={(e) => setNewTopicKeyword(e.target.value)}
                  placeholder="Keyword (optional)"
                  className="w-40 px-4 py-2 bg-dev-surface border border-dev-border rounded text-dev-text placeholder-dev-muted focus:outline-none focus:border-dev-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-dev-accent text-black font-[var(--font-dev-mono)] text-xs uppercase font-medium hover:bg-white transition-colors"
                >
                  Add
                </button>
              </form>
              <ul className="space-y-2">
                {topics.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between py-2 border-b border-dev-border"
                  >
                    <div>
                      <span className="text-dev-text">{t.title}</span>
                      {t.keyword && (
                        <span className="ml-2 font-[var(--font-dev-mono)] text-xs text-dev-muted">
                          {t.keyword}
                        </span>
                      )}
                      <span
                        className={`ml-2 font-[var(--font-dev-mono)] text-[10px] ${
                          t.used ? "text-dev-muted" : "text-dev-accent"
                        }`}
                      >
                        {t.used ? "used" : "unused"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteTopic(t.id)}
                      className="font-[var(--font-dev-mono)] text-[11px] text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              {topics.length === 0 && (
                <p className="py-4 text-dev-muted">No topics.</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
