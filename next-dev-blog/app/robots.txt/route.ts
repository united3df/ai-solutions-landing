import { getDevAppOrigin } from "@/lib/site";

// Custom robots.txt handler — extends standard rules with Content-Signal directives
// (https://contentsignals.org/, draft-romm-aipref-contentsignals)
export function GET() {
  const base = getDevAppOrigin();

  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${base}/sitemap.xml`,
    "",
    // Declare AI content usage preferences per Content Signals spec
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
