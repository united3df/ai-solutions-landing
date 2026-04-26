import { NextResponse } from "next/server";
import { getDevAppOrigin } from "@/lib/site";

// RFC 9727 — API Catalog via application/linkset+json (RFC 9264)
export async function GET() {
  const base = getDevAppOrigin();

  const linkset = {
    linkset: [
      {
        anchor: `${base}/blog`,
        "service-doc": [
          { href: `${base}/blog`, type: "text/html" },
        ],
        "describedby": [
          { href: `${base}/sitemap.xml`, type: "application/xml" },
        ],
      },
      {
        anchor: base,
        "service-doc": [
          { href: base, type: "text/html" },
          { href: `${base}/blog`, type: "text/html", title: "Blog" },
        ],
        "alternate": [
          { href: `${base}/api/page-md`, type: "text/markdown" },
        ],
      },
    ],
  };

  return NextResponse.json(linkset, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
