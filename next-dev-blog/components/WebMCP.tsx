"use client";

import { useEffect } from "react";

// WebMCP (https://webmachinelearning.github.io/webmcp/) — exposes site tools to AI agents in the browser.
// Gracefully no-ops in browsers that don't support navigator.modelContext.

interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

declare global {
  interface Navigator {
    modelContext?: {
      provideContext(descriptor: {
        tools: Array<{
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute(params: unknown): Promise<unknown>;
        }>;
      }): void;
    };
  }
}

export function WebMCP() {
  useEffect(() => {
    if (!navigator.modelContext?.provideContext) return;

    navigator.modelContext.provideContext({
      tools: [
        {
          name: "list_blog_posts",
          description:
            "Returns a list of published blog articles. Each item includes title, slug, excerpt, and publication date.",
          inputSchema: {
            type: "object",
            properties: {},
          },
          async execute() {
            const res = await fetch("/api/public/posts");
            if (!res.ok) return [];
            const posts = (await res.json()) as PostListItem[];
            return posts.map((p) => ({
              title: p.title,
              url: `/blog/${p.slug}`,
              excerpt: p.excerpt,
              publishedAt: p.createdAt,
            }));
          },
        },
        {
          name: "get_site_info",
          description:
            "Returns a structured overview of AI4B2B: services offered, expertise areas, and contact info.",
          inputSchema: {
            type: "object",
            properties: {},
          },
          async execute() {
            return {
              name: "AI4B2B",
              tagline:
                "External AI automation team — production-grade automations, internal tools, and AI products.",
              services: [
                "AI Voice Agents",
                "RAG Knowledge Bases",
                "AI MVP & SaaS Development",
                "Internal Tools & Automations",
                "LLM Integrations",
                "B2B Workflow Automation",
              ],
              expertise: [
                "Full-Stack Development",
                "RAG Pipelines",
                "Semantic Search",
                "Multi-step Workflows",
                "B2B Software",
              ],
              blog: "/blog",
              contact: "/",
              worldwide: true,
            };
          },
        },
      ],
    });
  }, []);

  return null;
}
