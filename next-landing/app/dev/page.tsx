import {
  DevNav,
  DevHero,
  DevTicker,
  DevAbout,
  DevServices,
  DevStack,
  DevOutcomes,
  DevTestimonials,
  DevPlatforms,
  DevProcess,
  DevCTA,
  DevFooter,
} from "@/components/dev";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "AI4B2B Dev",
  description:
    "Full-Stack & AI developer with 8+ years experience. Builds production SaaS with multi-step journeys, milestone tracking, RAG-based assistants, semantic search with embeddings. Uses Cursor, Claude, OpenClaw for rapid RAG pipelines and LLM integrations. Y Combinator, Techstars, Fortune 500. Scaled to $2M+ ARR.",
  url: `${baseUrl}/dev`,
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
    "AI Voice Agents, AI Knowledge Bases, RAG-based assistants, semantic search, MVP development. Production SaaS with structured multi-step journeys, milestone tracking, and contextual AI in user flows.",
  provider: {
    "@type": "Person",
    name: "AI4B2B Dev",
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
        text: "Yes. I deliver RAG-based assistants, semantic search with embeddings, and contextual AI embedded directly into user flows — not just chat, but AI tied to user progress and platform logic.",
      },
    },
    {
      "@type": "Question",
      name: "What AI tools do you use for development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I use Cursor, Claude, and OpenClaw daily to accelerate delivery — from specs to scoped tasks, scaffolding features, and rapidly prototyping RAG pipelines, LLM integrations, and automation flows.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build SaaS with multi-step workflows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. I build production SaaS platforms with structured multi-step journeys, milestone tracking, resume logic, clean progress dashboards, state-driven workflows, and admin-controlled content systems.",
      },
    },
  ],
};

export default function DevPage() {
  return (
    <div className="min-h-screen bg-dev-bg text-dev-text text-base leading-relaxed">
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
      <main>
        <DevHero />
        <DevTicker />
        <DevAbout />
        <DevServices />
        <DevStack />
        <DevOutcomes />
        <DevTestimonials />
        <DevPlatforms />
        <DevProcess />
        <DevCTA />
        <DevFooter />
      </main>
    </div>
  );
}
