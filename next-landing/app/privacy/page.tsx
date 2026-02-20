import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for AI Solutions. Learn how we collect, use, and protect your data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
