import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice AI Agent",
  description:
    "Talk to an AI voice agent. Natural conversation with voice AI powered by advanced language models.",
  openGraph: {
    title: "Voice AI Agent | AI Solutions",
    description:
      "Talk to an AI voice agent. Natural conversation with voice AI powered by advanced language models.",
  },
};

export default function VoiceAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
