import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/terms`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/ai-page`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/ai-page/csv`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ai-page/transcribe`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ai-page/voice-agent`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/dev`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
