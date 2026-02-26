export function buildTopicFilterPrompt(topic: string, siteTopic: string): string {
  return `Evaluate this topic for an SEO blog:

Criteria:
- Is there real search intent?
- Is competition too high for a new site?
- Does it match the site theme: ${siteTopic}

Topic: "${topic}"

Respond ONLY with valid JSON, no markdown:
{
  "score": 1-10,
  "keyword": "main keyword",
  "intent": "informational|commercial|navigational",
  "reason": "brief explanation",
  "approved": true|false
}`;
}
