import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { TermsOfService } from "@/components/legal/TermsOfService";
import { getDevAppOrigin } from "@/lib/site";

const baseUrl = getDevAppOrigin();

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for AI Solutions. Read our service agreement and usage terms.",
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
  openGraph: {
    url: `${baseUrl}/terms`,
    title: "Terms of Service | AI4B2B",
  },
};

export default function TermsPage() {
  return (
    <LegalPageShell>
      <TermsOfService />
    </LegalPageShell>
  );
}
