import type { NextConfig } from "next";

const devBlogBase =
  process.env.NEXT_PUBLIC_DEV_BLOG_SITE_URL?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  async redirects() {
    if (!devBlogBase) return [];
    return [
      { source: "/dev", destination: `${devBlogBase}/dev`, permanent: false },
      { source: "/blog", destination: `${devBlogBase}/blog`, permanent: false },
      {
        source: "/blog/:slug",
        destination: `${devBlogBase}/blog/:slug`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
