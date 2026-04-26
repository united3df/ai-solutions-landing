import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</sitemap.xml>; rel="sitemap"; type="application/xml"',
              '</blog>; rel="collection"; title="Blog"',
            ].join(", "),
          },
          // Inform caches that the response varies by Accept header (markdown vs HTML)
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        // Content-Signal per draft-romm-aipref-contentsignals (Section 3.2)
        source: "/robots.txt",
        headers: [
          { key: "Content-Signal", value: "ai-train=no, search=yes, ai-input=no" },
        ],
      },
    ];
  },
};

export default nextConfig;
