"use client";

import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedGradientBackground } from "./AnimatedGradientBackground";
import { FloatingParticles } from "./FloatingParticles";
import { use3DTilt } from "@/hooks/use3DTilt";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { openCalendlyPopup } from "@/lib/utils/calendly";

export function Hero() {
  const { tilt, handleMouseMove, handleMouseLeave } = use3DTilt(8);
  const router = useRouter();
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Practical AI for Real Business Work";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-32 overflow-hidden">
      <AnimatedGradientBackground />
      <FloatingParticles count={20} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Heading */}
          <div className="space-y-4 hero-content">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight typewriter-text">
              {typewriterText}
              <span className="typewriter-cursor">|</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto fade-in-up delay-300">
              Voice AI, Knowledge Bases, Prompt Engineering, and AI MVPs
            </p>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto fade-in-up delay-500">
              Built to support teams, reduce manual work, and fit existing processes.
            </p>
          </div>

          <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto fade-in-up delay-700">
            We help companies apply AI where it actually makes sense —<br />
            without disrupting operations or overengineering solutions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 fade-in-up delay-900">
            <Button 
              size="lg" 
              className="gap-2 cta-button-primary group relative overflow-hidden"
              onClick={() => openCalendlyPopup()}
            >
              <span className="relative z-10">Discuss a real use case</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 cta-button-secondary hover:scale-105 transition-transform duration-300"
              onClick={() => router.push("/ai-page")}
            >
              See example implementations
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 cta-button-secondary hover:scale-105 transition-transform duration-300"
              onClick={() => router.push("/dev")}
            >
              Developer portfolio
            </Button>
          </div>

          {/* Video Block */}
          <div className="pt-8 fade-in-scale delay-1100">
            <div 
              className="rounded-lg overflow-hidden shadow-2xl bg-slate-900 aspect-video relative group video-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <div className="absolute inset-0 video-gradient-animated">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/90 to-slate-900/90 backdrop-blur-sm">
                  <div className="play-button-container">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 cursor-pointer relative">
                      <div className="absolute inset-0 rounded-full animate-ping-slow bg-white/20" />
                      <Play className="w-10 h-10 text-white ml-1 relative z-10" />
                    </div>
                  </div>
                  <p className="text-white mt-6 text-lg">
                    How We Apply AI in Real Business Cases
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    60–90 sec: voice AI, knowledge base, MVP example
                  </p>
                </div>
              </div>
              <div className="glow-border" />
            </div>
          </div>

          {/* Credibility Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 max-w-3xl mx-auto credibility-strip">
            {["Designed for real workflows", "Built with security in mind", "No vendor lock-in", "Human + AI approach"].map((text, i) => (
              <div key={i} className="text-center fade-in-up" style={{ animationDelay: `${1300 + i * 100}ms` }}>
                <p className="text-sm text-slate-700">{text}</p>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 scroll-indicator">
            <ChevronDown className="w-6 h-6 mx-auto text-slate-400 animate-bounce-slow" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typewriter-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradient-wave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .typewriter-cursor {
          display: inline-block;
          animation: typewriter-blink 1s step-end infinite;
          margin-left: 2px;
        }

        .typewriter-text {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .fade-in-scale {
          animation: fade-in-scale 1s ease-out forwards;
          opacity: 0;
        }

        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1100 { animation-delay: 1100ms; }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .video-container {
          will-change: transform;
        }

        .glow-border {
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6);
          background-size: 300% 300%;
          animation: gradient-wave 4s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .video-container:hover .glow-border {
          opacity: 0.6;
        }

        @media (prefers-reduced-motion: reduce) {
          .typewriter-cursor,
          .animate-pulse-glow,
          .animate-ping-slow,
          .animate-bounce-slow,
          .fade-in-up,
          .fade-in-scale {
            animation: none;
          }
          
          .fade-in-up,
          .fade-in-scale {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
