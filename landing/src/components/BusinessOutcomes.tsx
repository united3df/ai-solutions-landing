import { Clock, MessageSquare, TrendingDown, Users, Sparkle } from "lucide-react";
import { useRef, useState, MouseEvent, useMemo } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const outcomes = [
  {
    icon: Clock,
    title: "Faster response times"
  },
  {
    icon: MessageSquare,
    title: "More consistent communication"
  },
  {
    icon: TrendingDown,
    title: "Lower operational load"
  },
  {
    icon: Users,
    title: "Better onboarding and knowledge sharing"
  }
];

export function BusinessOutcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            Business Outcomes
          </h2>
          <p className="text-lg text-slate-600">
            What Companies Usually Improve
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            const isHovered = hoveredCard === index;
            return (
              <OutcomeCard
                key={index}
                outcome={outcome}
                Icon={Icon}
                index={index}
                isHovered={isHovered}
                isVisible={isVisible}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              />
            );
          })}
        </div>

        <p className={`text-center text-sm text-slate-600 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
          Results vary by use case — we focus on what matters operationally.
        </p>
      </div>
    </section>
  );
}

function OutcomeCard({
  outcome,
  Icon,
  index,
  isHovered,
  isVisible,
  onMouseEnter,
  onMouseLeave
}: {
  outcome: typeof outcomes[0];
  Icon: any;
  index: number;
  isHovered: boolean;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  // Generate sparkle particles
  const sparkles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: (i * 60) * (Math.PI / 180),
      distance: 40,
    }));
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  return (
    <div 
      className={`outcome-card bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-sm text-center relative overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isHovered ? 'shadow-2xl -translate-y-2' : ''}`}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        willChange: 'transform',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glassmorphism blur effect */}
      <div className="glass-background" />
      
      {/* Spotlight effect following cursor */}
      {isHovered && (
        <div 
          className="spotlight"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
          }}
        />
      )}

      {/* Sparkle particles */}
      {isHovered && sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          className="sparkle-particle absolute w-3 h-3 text-yellow-400"
          style={{
            left: '50%',
            top: '30%',
            transform: `translate(-50%, -50%) translate(${Math.cos(sparkle.angle) * sparkle.distance}px, ${Math.sin(sparkle.angle) * sparkle.distance}px)`,
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="icon-orbit inline-flex p-3 rounded-lg bg-blue-50 mb-4 relative">
          {/* Rotating orbit animation */}
          {isHovered && (
            <div className="orbit-ring" />
          )}
          <Icon className={`w-6 h-6 text-blue-600 transition-transform duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`} />
        </div>
        <p className="text-slate-700">{outcome.title}</p>
      </div>

      <style>{`
        @keyframes shimmer-glass {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes orbit-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sparkle-twinkle {
          0%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .outcome-card {
          will-change: transform;
        }

        .glass-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          backdrop-filter: blur(10px);
        }

        .spotlight {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.2) 0%,
            transparent 70%
          );
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: left 0.2s ease, top 0.2s ease;
        }

        .orbit-ring {
          position: absolute;
          inset: -6px;
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: inherit;
          animation: orbit-rotate 3s linear infinite;
        }

        .sparkle-particle {
          animation: sparkle-twinkle 1s ease-in-out infinite;
          animation-delay: calc(var(--sparkle-delay, 0) * 0.1s);
        }

        .sparkle-particle:nth-child(1) { animation-delay: 0s; }
        .sparkle-particle:nth-child(2) { animation-delay: 0.1s; }
        .sparkle-particle:nth-child(3) { animation-delay: 0.2s; }
        .sparkle-particle:nth-child(4) { animation-delay: 0.3s; }
        .sparkle-particle:nth-child(5) { animation-delay: 0.4s; }
        .sparkle-particle:nth-child(6) { animation-delay: 0.5s; }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .sparkle-particle {
            animation: none;
          }
          .outcome-card {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}