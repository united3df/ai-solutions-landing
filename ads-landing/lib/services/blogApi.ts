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
