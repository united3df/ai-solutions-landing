"use client";

import Navigation from "@/components/ai-page/Navigation";

export default function AIPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ai-app-container min-h-screen">
      <Navigation />
      <div className="pt-16 ai-content-wrapper">{children}</div>
      <style jsx>{`
        .ai-app-container {
          min-height: 100vh;
          background: linear-gradient(
            to bottom,
            #f8fafc 0%,
            #f1f5f9 25%,
            #ffffff 50%,
            #f8fafc 100%
          );
          position: relative;
          overflow-x: hidden;
        }

        .ai-content-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .ai-app-container::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 50%,
              rgba(59, 130, 246, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(147, 51, 234, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 50% 20%,
              rgba(14, 165, 233, 0.05) 0%,
              transparent 50%
            );
          pointer-events: none;
          z-index: 0;
          animation: shimmer 20s linear infinite;
          background-size: 200% 200%;
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-app-container::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
