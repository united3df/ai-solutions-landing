import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { ContactForm } from "./ContactForm";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const navigate = useNavigate();
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      navigate("/ai-page");
    }, 300);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 mesh-background opacity-40" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl wave-text transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {["Thinking", "About", "AI,", "But", "Want", "a", "Clear", "Answer?"].map((word, i) => (
              <span 
                key={i}
                className="inline-block wave-word"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  marginRight: i < 7 ? '0.3em' : '0'
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          <div className={`space-y-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
            <p className="text-lg text-slate-700">If you're unsure:</p>
            <ul className="space-y-2 text-slate-600">
              {["Where AI fits", "What's realistic", "Or what's worth building first"].map((item, i) => (
                <li 
                  key={i}
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${500 + i * 150}ms` }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className={`text-lg text-slate-700 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '900ms' }}>
            We'll walk through it honestly.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center pt-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1100ms' }}>
            <Button 
              size="lg" 
              className="gap-2 cta-primary-button relative overflow-hidden group"
              onClick={handleButtonClick}
            >
              {ripples.map(ripple => (
                <span
                  key={ripple.id}
                  className="ripple"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                  }}
                />
              ))}
              <span className="relative z-10">Book a no-pressure AI discussion</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pulse-glow-button" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="hover:scale-105 transition-transform duration-300"
              onClick={() => setIsContactFormOpen(true)}
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>

      <ContactForm open={isContactFormOpen} onOpenChange={setIsContactFormOpen} />

      <style jsx>{`
        @keyframes mesh-move {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes wave-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }

        @keyframes pulse-glow-button {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .mesh-background {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.2),
            rgba(147, 51, 234, 0.2),
            rgba(59, 130, 246, 0.2)
          );
          background-size: 400% 400%;
          animation: mesh-move 15s ease infinite;
        }

        .wave-word {
          animation: wave-float 2s ease-in-out infinite;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: ripple-expand 1s ease-out;
        }

        .pulse-glow-button {
          animation: pulse-glow-button 2s ease-in-out infinite;
        }

        :global(.cta-primary-button) {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .mesh-background,
          .wave-word,
          .ripple,
          .pulse-glow-button {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}