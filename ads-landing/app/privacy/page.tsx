import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";
import { getDevAppOrigin } from "@/lib/site";

const baseUrl = getDevAppOrigin();

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for AI Solutions. Learn how we collect, use, and protect your data.",
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
  openGraph: {
    url: `${baseUrl}/privacy`,
    title: "Privacy Policy | AI4B2B",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell>
      <PrivacyPolicy />
    </LegalPageShell>
  );
}
