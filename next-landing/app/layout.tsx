import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClarityInit } from "@/components/ClarityInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AI Solutions | Practical AI for Real Business Work",
    template: "%s | AI Solutions",
  },
  description:
    "Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs. Built to support teams, reduce manual work, and fit existing processes.",
  keywords: [
    "AI consulting",
    "voice AI",
    "knowledge base",
    "prompt engineering",
    "AI MVP",
    "business automation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "AI Solutions",
    title: "AI Solutions | Practical AI for Real Business Work",
    description:
      "Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs. Built to support teams, reduce manual work, and fit existing processes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions | Practical AI for Real Business Work",
    description:
      "Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs. Built to support teams, reduce manual work, and fit existing processes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Solutions",
  description:
    "Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs. Built to support teams, reduce manual work, and fit existing processes.",
  url: baseUrl,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AI Solutions",
  url: baseUrl,
  description:
    "Practical AI for Real Business Work. Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClarityInit />
        {children}
      </body>
    </html>
  );
}
