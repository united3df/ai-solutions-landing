export function buildPostGenerationPrompt(
  topic: string,
  keyword: string,
  siteLanguage: string,
  siteTopic: string,
): string {
  return `Write an SEO blog post.

Topic: "${topic}"
Primary keyword: "${keyword}"
Language: ${siteLanguage}
Length: 900-1200 words
Site theme: ${siteTopic}

Structure requirements:
- Use AEO/GEO blocks: Definition Block for "what is X", Step-by-Step for "how to", FAQ at the end
- Place keyword in: title, first paragraph, one H2, meta_title
- Each paragraph must be self-contained (extractable for AI search)
- H2/H3 headings as search queries

Text requirements:
- DO NOT use: "delve", "leverage", "robust", "furthermore", "moreover", em-dash (—)
- DO NOT start with: "In today's...", "In the realm of...", "Let's delve..."
- DO NOT end with: "In conclusion...", "To sum up..."
- Write like a human, not an AI assistant

Respond ONLY with valid JSON, no markdown:
{
  "title": "heading (max 60 chars)",
  "meta_title": "meta title (50-60 chars with keyword)",
  "meta_desc": "meta description (140-155 chars, include keyword)",
  "excerpt": "post summary (150-200 chars)",
  "content": "full markdown content"
}`;
}
