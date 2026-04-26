import { NextResponse } from "next/server";
import { getDevAppOrigin } from "@/lib/site";

export async function GET() {
  const base = getDevAppOrigin();

  const content = `# AI4B2B — External AI Automation Team

> Full-Stack & AI Developer delivering production-grade automations, internal tools, and AI products. Y Combinator, Fortune 500 experience. Data ownership, no lock-in.

## What We Build

- **AI Voice Agents** — conversational AI for customer interactions and support
- **RAG Knowledge Bases** — semantic search with embeddings, contextual AI tied to user flows
- **AI MVP & SaaS Platforms** — full-stack products with multi-step workflows, milestone tracking, and admin-controlled content systems
- **Internal Tools & Automations** — integrations, state-driven pipelines, B2B workflows

## Expertise

Full-Stack Development · AI · MVP Development · RAG Pipelines · Semantic Search · LLM Integrations · SaaS Platforms · Multi-step Workflows · B2B Software

## Blog

Latest articles on AI development, automation, and engineering:
[${base}/blog](${base}/blog)

## Contact

[${base}](${base}) · Worldwide
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
