import type { Metadata } from "next";
import "./globals.css";
import { getDevAppOrigin } from "@/lib/site";

const baseUrl = getDevAppOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AI4B2B Dev & Blog",
    template: "%s | AI4B2B",
  },
  description: "Developer portfolio and articles.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
