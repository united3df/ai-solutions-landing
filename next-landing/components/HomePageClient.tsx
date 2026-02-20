"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Credentials } from "@/components/Credentials";
import { WhatWeDo } from "@/components/WhatWeDo";
import { CoreCapabilities } from "@/components/CoreCapabilities";
import { Industries } from "@/components/Industries";
import { HowItWorks } from "@/components/HowItWorks";
import { Examples } from "@/components/Examples";
import { BusinessOutcomes } from "@/components/BusinessOutcomes";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorTrail } from "@/components/CursorTrail";
import { BackgroundParticles } from "@/components/BackgroundParticles";

export function HomePageClient() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsLoaded(true));
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <CursorTrail />
      <BackgroundParticles count={30} />

      <div className={`page-curtain ${isLoaded ? "curtain-open" : ""}`}>
        <div className="curtain-content">
          <div className="loading-spinner" />
        </div>
      </div>

      <div className={`page-content ${isLoaded ? "content-visible" : "content-hidden"}`}>
        <Hero />
        <Credentials />
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
