import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { WhatWeDo } from "./components/WhatWeDo";
import { CoreCapabilities } from "./components/CoreCapabilities";
import { Industries } from "./components/Industries";
import { HowItWorks } from "./components/HowItWorks";
import { Examples } from "./components/Examples";
import { BusinessOutcomes } from "./components/BusinessOutcomes";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorTrail } from "./components/CursorTrail";
import { BackgroundParticles } from "./components/BackgroundParticles";
import { AIPageApp } from "./components/AIPageApp";
import { TermsOfService } from "./components/TermsOfService";
import { PrivacyPolicy } from "./components/PrivacyPolicy";

function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page load curtain reveal animation
    setIsLoaded(true);

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Cursor trail effect */}
      <CursorTrail />

      {/* Background ambient particles */}
      <BackgroundParticles count={30} />

      {/* Page load curtain */}
      <div className={`page-curtain ${isLoaded ? 'curtain-open' : ''}`}>
        <div className="curtain-content">
          <div className="loading-spinner" />
        </div>
      </div>

      {/* Main content */}
      <div className={`page-content ${isLoaded ? 'content-visible' : 'content-hidden'}`}>
        <Hero />
        <WhatWeDo />
        <CoreCapabilities />
        <Industries />
        <HowItWorks />
        <Examples />
        <BusinessOutcomes />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>

      <style jsx>{`
        @keyframes curtain-reveal {
          0% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(0 0 0 100%);
          }
        }

        @keyframes spinner-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in-content {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .page-curtain {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: clip-path 1s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .curtain-open {
          animation: curtain-reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          pointer-events: none;
        }

        .curtain-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(59, 130, 246, 0.3);
          border-top-color: rgb(59, 130, 246);
          border-radius: 50%;
          animation: spinner-rotate 1s linear infinite;
        }

        .content-hidden {
          opacity: 0;
        }

        .content-visible {
          animation: fade-in-content 0.5s ease-out 0.5s forwards;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .page-curtain,
          .loading-spinner,
          .content-visible {
            animation: none;
          }
          .page-curtain {
            display: none;
          }
          .content-hidden,
          .content-visible {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ai-page/*" element={<AIPageApp />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}