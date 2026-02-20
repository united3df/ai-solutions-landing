import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-dev-display",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dev-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dev-sans",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const devUrl = `${baseUrl}/dev`;

const seoDescription =
  "Full-Stack & AI developer with 8+ years experience. Production SaaS with multi-step journeys, RAG-based assistants, semantic search. RAG pipelines, LLM integrations, Cursor/Claude. Y Combinator, Techstars, Fortune 500. $2M+ ARR scaled.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "MVPs. AI. Built Fast & Right. | AI4B2B Dev",
  description: seoDescription,
  keywords: [
    "full-stack developer",
    "AI developer",
    "MVP development",
    "RAG pipelines",
    "semantic search",
    "LLM integration",
    "SaaS development",
    "multi-step workflows",
    "AI voice agents",
    "Y Combinator",
    "Techstars",
    "B2B software",
    "Cursor AI",
    "Claude AI",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: devUrl,
    siteName: "AI4B2B Dev",
    title: "MVPs. AI. Built Fast & Right. | AI4B2B Dev",
    description: seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "MVPs. AI. Built Fast & Right. | AI4B2B Dev",
    description: seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: devUrl,
  },
};

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`dev-page ${bebasNeue.variable} ${dmMono.variable} ${dmSans.variable}`}
      style={{
        fontFamily: "var(--font-dev-sans), sans-serif",
      }}
    >
      {children}
    </div>
  );
}
