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
    "Full-Stack & AI developer with 8+ years experience. Building for Y Combinator, Techstars-backed teams, and Fortune 500s. Scaled to $2M+ ARR.",
  url: `${baseUrl}/dev`,
  jobTitle: "Full-Stack & AI Developer",
  knowsAbout: ["Full-Stack Development", "AI", "MVP Development", "B2B Software"],
};

export default function DevPage() {
  return (
    <div className="min-h-screen bg-dev-bg text-dev-text text-base leading-relaxed">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
