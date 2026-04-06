import {
  DevNav,
  DevProofBar,
  DevIntroVideo,
  DevHero,
  DevTicker,
  DevServices,
  DevCases,
  DevProcess,
  DevResults,
  DevPlatforms,
  DevLeadMagnet,
  DevFinalCTA,
  DevFooter,
} from "@/components/dev";
import { getDevAppOrigin } from "@/lib/site";

const baseUrl = getDevAppOrigin();

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "AI4B2B",
  description:
    "External AI automation team: production-grade automations, internal tools, and AI products shipped weekly. Voice agents, RAG, SaaS MVPs, integrations. Data ownership, no lock-in. Y Combinator, Fortune 500 experience.",
  url: baseUrl,
  jobTitle: "Full-Stack & AI Developer",
  knowsAbout: [
    "Full-Stack Development",
    "AI",
    "MVP Development",
    "RAG Pipelines",
    "Semantic Search",
    "LLM Integrations",
    "SaaS Platforms",
    "Multi-step Workflows",
    "State-driven Workflows",
    "B2B Software",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI & Full-Stack Development",
  description:
    "AI Voice Agents, RAG knowledge bases, AI MVP and SaaS development, internal tools and automations. Embedded partner delivering weekly — production systems integrated into your stack.",
  provider: {
    "@type": "Person",
    name: "AI4B2B",
  },
  areaServed: "Worldwide",
  serviceType: ["AI Development", "Full-Stack Development", "MVP Development", "RAG Pipelines"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you build RAG-based AI assistants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We deliver RAG-based assistants, semantic search with embeddings, and contextual AI embedded directly into user flows — not just chat, but AI tied to user progress and platform logic.",
      },
    },
    {
      "@type": "Question",
      name: "What AI tools do you use for development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use Cursor, Claude, and OpenClaw daily to accelerate delivery — from specs to scoped tasks, scaffolding features, and rapidly prototyping RAG pipelines, LLM integrations, and automation flows.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build SaaS with multi-step workflows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build production SaaS platforms with structured multi-step journeys, milestone tracking, resume logic, clean progress dashboards, state-driven workflows, and admin-controlled content systems.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-dev-bg text-dev-text text-base leading-relaxed">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DevNav />
      <main className="relative z-[1] flex flex-1 flex-col">
        <div className="flex-1">
          <DevProofBar />
          <DevHero />
          <DevIntroVideo />
          <DevTicker />
          <DevServices />
          <DevCases />
          <DevProcess />
          <DevResults />
          <DevPlatforms />
          <DevLeadMagnet />
          <DevFinalCTA />
        </div>
        <DevFooter />
      </main>
    </div>
  );
}
