import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "../../../ai-page/src/components/Navigation";
import CSVGenerator from "../../../ai-page/src/features/CSVGenerator";
import TranscriptionTool from "../../../ai-page/src/features/TranscriptionTool";
import VoiceAgent from "../../../ai-page/src/features/VoiceAgent";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <div 
      key={location.pathname}
      className="ai-page-content animate-fade-in"
    >
      <Routes location={location}>
        <Route path="/" element={<Navigate to="csv" replace />} />
        <Route path="csv" element={<CSVGenerator />} />
        <Route path="transcribe" element={<TranscriptionTool />} />
        <Route path="voice-agent" element={<VoiceAgent />} />
      </Routes>
    </div>
  );
}

export function AIPageApp() {
  return (
    <div className="app ai-app-container">
      <Navigation />
      <div className="pt-16 ai-content-wrapper">
        <AnimatedRoutes />
      </div>
      
      <style>{`
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

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth transitions for route changes */
        .ai-page-content > * {
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        /* Enhanced background effects with animated gradients */
        .ai-app-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
          animation: shimmer 20s linear infinite;
          background-size: 200% 200%;
        }

        /* Subtle border glow effect */
        .ai-content-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.3),
            transparent
          );
          opacity: 0.5;
        }

        /* Enhanced scroll behavior */
        .ai-app-container {
          scroll-behavior: smooth;
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
          .ai-content-wrapper {
            padding-top: 0.5rem;
          }

          .ai-page-content {
            min-height: calc(100vh - 3.5rem);
          }
        }

        /* Large screens enhancement */
        @media (min-width: 1280px) {
          .ai-content-wrapper {
            max-width: 100%;
          }
        }

        /* Accessibility and performance */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
          
          .ai-page-content > * {
            transition: none;
          }

          .ai-app-container::before {
            animation: none;
          }
        }

        /* Dark mode support (if needed in future) */
        @media (prefers-color-scheme: dark) {
          .ai-app-container {
            background: linear-gradient(
              to bottom,
              #0f172a 0%,
              #1e293b 25%,
              #0f172a 50%,
              #1e293b 100%
            );
          }
        }
      `}</style>
    </div>
  );
}
