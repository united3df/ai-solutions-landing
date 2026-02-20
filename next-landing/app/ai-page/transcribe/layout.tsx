import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Transcription",
  description:
    "Transcribe audio to text with AI. Convert speech to accurate text in real time.",
  openGraph: {
    title: "Audio Transcription | AI Solutions",
    description:
      "Transcribe audio to text with AI. Convert speech to accurate text in real time.",
  },
};

export default function TranscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
