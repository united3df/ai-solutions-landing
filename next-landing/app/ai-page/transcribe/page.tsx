"use client";

import TranscriptionTool from "@/components/ai-page/features/TranscriptionTool";

export default function TranscribePage() {
  return (
    <div className="ai-page-content animate-fade-in">
      <TranscriptionTool />
      <style jsx>{`
        .ai-page-content {
          width: 100%;
          min-height: calc(100vh - 4rem);
          position: relative;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
