import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Generator",
  description:
    "Generate CSV data with AI. Describe what you need and get structured data ready for spreadsheets.",
  openGraph: {
    title: "CSV Generator | AI Solutions",
    description:
      "Generate CSV data with AI. Describe what you need and get structured data ready for spreadsheets.",
  },
};

export default function CSVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
