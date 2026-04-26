import { getDevAppOrigin } from "@/lib/site";

// Serves /robots.txt with Content-Signal directives (draft-romm-aipref-contentsignals)
// Routed via beforeFiles rewrite in next.config.ts (takes precedence over app/robots.ts metadata)
export function GET() {
  const base = getDevAppOrigin();

  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${base}/sitemap.xml`,
    "",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
