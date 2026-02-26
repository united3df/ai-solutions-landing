export function buildTopicGenerationPrompt(siteTopic: string): string {
  return `Generate one SEO blog topic suitable for the site.

Site topic and audience: ${siteTopic}

Requirements:
- Topic must have real search intent (informational, commercial, or navigational)
- Not too competitive for a new site
- Must match the site theme

Respond ONLY with valid JSON, no markdown:
{
  "title": "topic title",
  "keyword": "main search keyword",
  "intent": "informational|commercial|navigational"
}`;
}
