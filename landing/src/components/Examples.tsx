import { Play, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const demos = [
  {
    title: "AI Voice Agent Demo",
    description: "Handling calls, summarizing conversations, supporting operators",
    cta: "Watch voice demo",
    gradient: "from-purple-900/90 to-blue-900/90"
  },
  {
    title: "AI Knowledge Base Demo",
    description: "Answering internal questions from real documents",
    cta: "Watch knowledge base demo",
    gradient: "from-blue-900/90 to-cyan-900/90"
  },
  {
    title: "AI MVP Demo",
    description: "A working AI product used by real users",
    cta: "Watch MVP demo",
    gradient: "from-cyan-900/90 to-teal-900/90"
  }
];

export function Examples() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const isVisible = useIntersectionObserver(sectionRef);
  const [hoveredDemo, setHoveredDemo] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            Examples & Demos
          </h2>
          <p className="text-lg text-slate-600">
            See Real AI in Action
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {demos.map((demo, index) => {
            const isHovered = hoveredDemo === index;
            return (
              <DemoCard
                key={index}
                demo={demo}
                index={index}
                isHovered={isHovered}
                isVisible={isVisible}
                onMouseEnter={() => setHoveredDemo(index)}
                onMouseLeave={() => setHoveredDemo(null)}
                navigate={navigate}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DemoCard({
  demo,
  index,
  isHovered,
  isVisible,
  onMouseEnter,
  onMouseLeave,
  navigate
}: {
  demo: typeof demos[0];
  index: number;
  isHovered: boolean;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  navigate: (path: string) => void;
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeaveCard = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    onMouseLeave();
  };

  return (
    <div 
      className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div 
        className="demo-video rounded-lg overflow-hidden shadow-lg bg-slate-900 aspect-video relative group cursor-pointer"
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.05)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={handleMouseLeaveCard}
      >
        {/* Animated wave gradient background */}
        <div className="absolute inset-0 gradient-wave-background" />
        
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${demo.gradient} backdrop-blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-100'}`}>
          <div className={`w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-white/20 scale-110' : ''}`}>
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping-ring" />
            <Play className={`w-8 h-8 text-white ml-1 relative z-10 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        </div>

        {/* Loading shimmer effect */}
        <div className="shimmer-overlay" />

        {/* Bottom description overlay on hover */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <p className="text-white text-sm">{demo.description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl">{demo.title}</h3>
        <p className="text-sm text-slate-600">{demo.description}</p>
        <Button 
          variant="link" 
          className="gap-2 px-0 text-blue-600 group"
          onClick={() => navigate("/ai-page")}
        >
          {demo.cta}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <style jsx>{`
        @keyframes ping-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes wave-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer-sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-ping-ring {
          animation: ping-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .gradient-wave-background {
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1),
            rgba(139, 92, 246, 0.1),
            rgba(59, 130, 246, 0.1)
          );
          background-size: 200% 200%;
          animation: wave-move 8s ease infinite;
        }

        .shimmer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: shimmer-sweep 3s ease-in-out infinite;
        }

        .demo-video {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-ping-ring,
          .gradient-wave-background,
          .shimmer-overlay {
            animation: none;
          }
          .demo-video {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}