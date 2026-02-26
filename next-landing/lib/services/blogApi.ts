const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

export interface PostFull extends PostListItem {
  content: string;
  metaTitle: string;
  metaDesc: string;
  keyword: string | null;
}

export interface PostListItemAdmin extends PostListItem {
  status: string;
  score: number | null;
}

export interface Topic {
  id: number;
  title: string;
  keyword: string | null;
  intent: string | null;
  priority: number;
  used: boolean;
  created_at: string;
}

export interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  unusedTopics: number;
}

export interface GenerateResponse {
  success: boolean;
  slug: string;
  id: number;
  score: number | null;
}

export async function getPublishedPosts(): Promise<PostListItem[]> {
  const res = await fetch(`${getBaseUrl()}/blog/posts`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<PostFull | null> {
  const res = await fetch(
    `${getBaseUrl()}/blog/posts/${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

function adminHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    "x-admin-token": token,
  };
}

export function adminApi(token: string) {
  const base = getBaseUrl();
  const headers = () => adminHeaders(token);

  return {
    async listPosts(): Promise<PostListItemAdmin[]> {
      const res = await fetch(`${base}/admin/posts`, { headers: headers() });
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },

    async getPost(id: number): Promise<PostFull | null> {
      const res = await fetch(`${base}/admin/posts/${id}`, {
        headers: headers(),
      });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },

    async updatePost(
      id: number,
      body: Partial<{
        title: string;
        content: string;
        excerpt: string;
        status: string;
        meta_title: string;
        meta_desc: string;
        metaTitle: string;
        metaDesc: string;
      }> = {}
    ): Promise<void> {
      const res = await fetch(`${base}/admin/posts/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update post");
    },

    async deletePost(id: number): Promise<void> {
      const res = await fetch(`${base}/admin/posts/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      if (!res.ok) throw new Error("Failed to delete post");
    },

    async publishPost(id: number): Promise<void> {
      const res = await fetch(`${base}/admin/posts/${id}/publish`, {
        method: "POST",
        headers: headers(),
      });
      if (!res.ok) throw new Error("Failed to publish post");
    },

    async draftPost(id: number): Promise<void> {
      const res = await fetch(`${base}/admin/posts/${id}/draft`, {
        method: "POST",
        headers: headers(),
      });
      if (!res.ok) throw new Error("Failed to set draft");
    },

    async listTopics(): Promise<Topic[]> {
      const res = await fetch(`${base}/admin/topics`, { headers: headers() });
      if (!res.ok) throw new Error("Failed to fetch topics");
      return res.json();
    },

    async addTopic(body: {
      title: string;
      keyword?: string;
      priority?: number;
    }): Promise<{ success: boolean; id: number }> {
      const res = await fetch(`${base}/admin/topics`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to add topic");
      return res.json();
    },

    async deleteTopic(id: number): Promise<void> {
      const res = await fetch(`${base}/admin/topics/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      if (!res.ok) throw new Error("Failed to delete topic");
    },

    async generate(): Promise<GenerateResponse> {
      const res = await fetch(`${base}/admin/generate`, {
        method: "POST",
        headers: headers(),
      });
      if (!res.ok) throw new Error("Failed to generate post");
      return res.json();
    },

    async getStats(): Promise<Stats> {
      const res = await fetch(`${base}/admin/stats`, { headers: headers() });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  };
}
