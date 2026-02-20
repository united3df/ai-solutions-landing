"use client";

import { MessageCircle, Target, Wrench, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState, MouseEvent } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { openCalendlyPopup } from "@/lib/utils/calendly";

const steps = [
  {
    number: "1",
    icon: MessageCircle,
    title: "Use Case Discussion",
    description: "We start with how your business works today."
  },
  {
    number: "2",
    icon: Target,
    title: "Feasibility & Scope Definition",
    description: "We define what AI should do — and what it shouldn't."
  },
  {
    number: "3",
    icon: Wrench,
    title: "Build & Integration",
    description: "Voice, chat, or system-level AI integrated into your stack."
  },
  {
    number: "4",
    icon: TrendingUp,
    title: "Launch & Iterate",
    description: "We improve based on real usage, not assumptions."
  }
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            A Simple, Transparent Process
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-[30px] top-0 bottom-24 w-[2px] bg-slate-200 hidden md:block">
            <div 
              className={`h-full bg-gradient-to-b from-blue-600 to-purple-600 origin-top transition-transform duration-2000 ${isVisible ? 'scale-y-100' : 'scale-y-0'}`}
              style={{ transitionDelay: '300ms' }}
            />
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isOdd = index % 2 === 0;
              const isHovered = hoveredStep === index;
              
              return (
                <StepCard
                  key={index}
                  step={step}
                  index={index}
                  Icon={Icon}
                  isOdd={isOdd}
                  isHovered={isHovered}
                  isVisible={isVisible}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                />
              );
            })}
          </div>

          <div className={`text-center mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1200ms' }}>
            <Button 
              size="lg" 
              className="gap-2 group"
              onClick={() => openCalendlyPopup()}
            >
              Schedule a use-case discussion
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ 
  step, 
  index, 
  Icon, 
  isOdd, 
  isHovered, 
  isVisible,
  onMouseEnter,
  onMouseLeave 
}: { 
  step: typeof steps[0]; 
  index: number; 
  Icon: any; 
  isOdd: boolean; 
  isHovered: boolean;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const count = useCountAnimation(parseInt(step.number), 1000, isVisible);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeaveCard = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    onMouseLeave();
  };

  return (
    <div 
      className={`flex items-start gap-6 bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 relative step-card ${isVisible ? 'opacity-100' : 'opacity-0'} ${isOdd ? 'slide-from-left' : 'slide-from-right'}`}
      style={{ 
        transitionDelay: `${index * 200 + 400}ms`,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        willChange: 'transform',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeaveCard}
      onMouseMove={handleMouseMove}
    >
      <div className="flex-shrink-0 relative">
        <div className="step-number-container w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl relative overflow-hidden">
          {/* Animated rotating gradient ring */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-spin-slow opacity-50" />
          <div className="absolute inset-0 rounded-full bg-blue-600" />
          <span className="relative z-10">{isVisible ? count : 0}</span>
        </div>
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-3 mb-2">
          <Icon className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`} />
          <h3 className="text-xl md:text-2xl">{step.title}</h3>
        </div>
        <p className="text-slate-600">{step.description}</p>
      </div>

      {/* Connecting arrow for visual flow */}
      {index < 3 && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 hidden md:block">
          <ArrowRight className={`w-6 h-6 text-blue-400 rotate-90 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: `${index * 200 + 600}ms` }} />
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .slide-from-left {
          animation: slide-left 0.8s ease-out forwards;
        }

        .slide-from-right {
          animation: slide-right 0.8s ease-out forwards;
        }

        .step-card {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow,
          .slide-from-left,
          .slide-from-right {
            animation: none;
          }
          .step-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}