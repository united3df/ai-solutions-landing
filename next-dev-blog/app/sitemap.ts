import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/services/blogApi";
import { getDevAppOrigin } from "@/lib/site";

const baseUrl = getDevAppOrigin();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/dev`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    return staticEntries;
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
