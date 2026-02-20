import type { Metadata } from "next";
import { TermsOfService } from "@/components/TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for AI Solutions. Read our service agreement and usage terms.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <TermsOfService />;
}
