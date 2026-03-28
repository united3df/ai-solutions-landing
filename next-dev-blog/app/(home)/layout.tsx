import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";
import { getDevAppOrigin } from "@/lib/site";

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

const baseUrl = getDevAppOrigin();

const seoDescription =
  "Your external AI team — pre-trained, ready to ship weekly. AI automations, internal tools, and AI products embedded in your business. Voice agents, RAG, SaaS MVPs. No lock-in. Full data ownership.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "AI4B2B · Your External AI Automation Team",
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
    url: baseUrl,
    siteName: "AI4B2B",
    title: "AI4B2B · Your External AI Automation Team",
    description: seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI4B2B · Your External AI Automation Team",
    description: seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function HomeLayout({
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
