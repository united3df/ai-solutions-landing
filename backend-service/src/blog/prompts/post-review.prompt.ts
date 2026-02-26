export function buildPostReviewPrompt(keyword: string, content: string): string {
  return `Review this blog post as an SEO editor.

Keyword: "${keyword}"

Post:
${content}

Check:
1. Keyword density (no spam, at least 1%)
2. Definition Block or direct answer in first paragraph
3. H2/H3 structure matches search queries
4. No AI patterns (em-dash, "leverage", "robust", "furthermore", etc.)
5. Meta description has keyword and is under 155 chars
6. FAQ block or self-contained paragraphs for AI citation
7. Length 900-1200 words

Respond ONLY with valid JSON, no markdown:
{
  "score": 1-10,
  "approved": true|false,
  "issues": ["list of issues if any"],
  "fixed_content": "corrected markdown if score < 7, else null"
}`;
}
