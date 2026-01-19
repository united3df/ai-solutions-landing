import React from "react";
import { Mic, BookOpen, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const capabilities = [
  {
    icon: Mic,
    title: "AI Voice Agents",
    subtitle: "For customer-facing and internal conversations",
    description: "AI voice assistants that help teams:",
    points: [
      "Handle repetitive calls",
      "Support sales and support operators",
      "Generate structured call summaries",
      "Trigger actions in internal systems"
    ],
    note: "Used as assistants — not replacements.",
    cta: "View voice AI examples"
  },
  {
    icon: BookOpen,
    title: "AI Knowledge Bases",
    subtitle: "Your company knowledge, actually usable",
    description: "AI assistants trained on:",
    points: [
      "Documents, PDFs, SOPs",
      "CRMs, help desks, internal tools",
      "Product and operational knowledge"
    ],
    results: {
      title: "Results:",
      items: [
        "Faster answers",
        "Better onboarding",
        "Reduced dependency on key people"
      ]
    },
    cta: "See knowledge base demos"
  },
  {
    icon: Sparkles,
    title: "Prompt Engineering",
    subtitle: "Make AI reliable and repeatable",
    description: "We design structured prompt systems that:",
    points: [
      "Reduce random outputs",
      "Follow business rules and tone",
      "Produce consistent results across teams"
    ],
    note: "Ideal if AI is already in use but results are unstable.",
    cta: "Improve AI outputs"
  },
  {
    icon: Rocket,
    title: "AI MVP Development",
    subtitle: "From idea to working product",
    description: "We help teams:",
    points: [
      "Build AI MVPs quickly",
      "Validate real usage",
      "Avoid costly rebuilds later"
    ],
    note: "This is not a demo — it's a usable foundation.",
    cta: "Build an AI MVP"
  }
];

export function CoreCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const isVisible = useIntersectionObserver(sectionRef);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            Core Capabilities
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const isHovered = hoveredCard === index;
            return (
              <div
                key={index}
                className={`capability-card bg-white rounded-lg p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  transform: isHovered ? 'translateY(-12px) scale(1.03)' : '',
                  willChange: 'transform'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated gradient border */}
                <div className="gradient-border" />

                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className={`p-3 rounded-lg bg-blue-50 transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
                    <Icon className={`w-6 h-6 text-blue-600 transition-all duration-500 ${isHovered ? 'rotate-360' : ''}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl md:text-2xl mb-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: `${index * 150 + 200}ms` }}>
                      {capability.title}
                    </h3>
                    <p className={`text-sm text-slate-600 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${index * 150 + 400}ms` }}>
                      {capability.subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <p className="text-slate-700">{capability.description}</p>
                  <ul className="space-y-2">
                    {capability.points.map((point, i) => (
                      <li key={i} className="text-slate-600 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {capability.results && (
                    <div>
                      <p className="text-slate-700 mb-2">{capability.results.title}</p>
                      <ul className="space-y-2">
                        {capability.results.items.map((item, i) => (
                          <li key={i} className="text-slate-600 flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {capability.note && (
                    <p className="text-sm text-slate-600 italic pt-2">
                      {capability.note}
                    </p>
                  )}

                  <Button
                    variant="link"
                    className="gap-2 px-0 text-blue-600 group"
                    onClick={() => navigate("/ai-page/voice-agent")}
                  >
                    {capability.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes rotate-360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }


        .capability-card {
          animation: float 3s ease-in-out infinite;
          will-change: transform;
        }

        .capability-card:nth-child(1) { animation-delay: 0s; }
        .capability-card:nth-child(2) { animation-delay: 0.5s; }
        .capability-card:nth-child(3) { animation-delay: 1s; }
        .capability-card:nth-child(4) { animation-delay: 1.5s; }

        .rotate-360 {
          animation: rotate-360 0.5s ease-out;
        }

        .gradient-border {
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6);
          background-size: 300% 300%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }

        .capability-card:hover .gradient-border {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .capability-card {
            animation: none;
          }
          .rotate-360,
          .gradient-border {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}