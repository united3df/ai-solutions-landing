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

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "MVPs. AI. Built Fast & Right. | AI4B2B Dev",
  description:
    "Full-Stack & AI developer with 8+ years experience. Building for Y Combinator, Techstars-backed teams, and Fortune 500s. Scaled to $2M+ ARR.",
  keywords: [
    "full-stack developer",
    "AI developer",
    "MVP development",
    "Y Combinator",
    "Techstars",
    "B2B software",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: devUrl,
    siteName: "AI4B2B Dev",
    title: "MVPs. AI. Built Fast & Right. | AI4B2B Dev",
    description:
      "Full-Stack & AI developer with 8+ years experience. Building for Y Combinator, Techstars-backed teams, and Fortune 500s.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVPs. AI. Built Fast & Right. | AI4B2B Dev",
    description:
      "Full-Stack & AI developer with 8+ years experience. Building for Y Combinator, Techstars-backed teams, and Fortune 500s.",
  },
  robots: {
    index: true,
    follow: true,
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
