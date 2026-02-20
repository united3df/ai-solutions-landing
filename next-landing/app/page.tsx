import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "AI Solutions | Practical AI for Real Business Work",
  description:
    "Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs. Built to support teams, reduce manual work, and fit existing processes.",
  openGraph: {
    title: "AI Solutions | Practical AI for Real Business Work",
    description:
      "Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs. Built to support teams, reduce manual work, and fit existing processes.",
  },
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Consulting & Implementation",
  description:
    "Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs. Built to support teams, reduce manual work, and fit existing processes.",
  provider: {
    "@type": "Organization",
    name: "AI Solutions",
  },
  areaServed: "Worldwide",
  serviceType: "AI Consulting",
  url: baseUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical implementations take 2–6 weeks depending on scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with our existing tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We integrate with your current stack whenever possible.",
      },
    },
    {
      "@type": "Question",
      name: "What about data security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We design with access control, data isolation, and security best practices.",
      },
    },
    {
      "@type": "Question",
      name: "Do we own the solution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You own the implementation and can extend it further.",
      },
    },
    {
      "@type": "Question",
      name: "Is this suitable for small teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many solutions are designed specifically for small and mid-size teams.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient />
    </>
  );
}
