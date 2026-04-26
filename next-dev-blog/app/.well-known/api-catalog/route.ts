import { NextResponse } from "next/server";

const catalog = {
  title: "AI4B2B — API Catalog",
  description:
    "Resources and endpoints available at ai4b2b.site for agent and machine access.",
  apis: [
    {
      id: "blog-collection",
      title: "Blog",
      description:
        "Published articles on AI development, automation, RAG pipelines, and full-stack engineering.",
      humanURL: "https://ai4b2b.site/blog",
      formats: ["text/html", "text/markdown"],
    },
  ],
  contact: "https://ai4b2b.site",
};

export async function GET() {
  return NextResponse.json(catalog, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
