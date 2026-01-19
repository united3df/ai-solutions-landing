import { ShoppingBag, Code, DollarSign, Scale, GraduationCap, Settings } from "lucide-react";
import { useRef, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const industries = [
  {
    icon: ShoppingBag,
    title: "Retail & eCommerce",
    description: "Sales support, product knowledge, customer communication"
  },
  {
    icon: Code,
    title: "SaaS & Technology",
    description: "Internal AI assistants, support automation, product MVPs"
  },
  {
    icon: DollarSign,
    title: "Finance & Accounting",
    description: "Process support, knowledge bases, AI copilots (non-decision making)"
  },
  {
    icon: Scale,
    title: "Legal & Professional Services",
    description: "Document understanding, internal knowledge access, client support"
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    description: "Learning assistants, structured content access, staff enablement"
  },
  {
    icon: Settings,
    title: "Operations & Support Teams",
    description: "SOP guidance, onboarding, issue resolution"
  }
];

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We adapt AI to how industries actually operate.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isHovered = hoveredCard === index;
            return (
              <div 
                key={index} 
                className={`industry-card p-6 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-500 group relative overflow-hidden ${isVisible ? 'opacity-100 drop-in' : 'opacity-0 translate-y-[-20px]'}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: isHovered ? 'scale(1.05)' : '',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient overlay that slides up on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`} />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-lg transition-opacity duration-500 ${isHovered ? 'opacity-100 glow-effect' : 'opacity-0'}`} />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                    <Icon className={`w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-all duration-300 ${isHovered ? 'animate-pulse-icon' : ''}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg mb-2 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : ''}`}>
                      {industry.title}
                    </h3>
                    <p className={`text-sm text-slate-600 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : ''}`}>
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes drop-bounce {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          50% {
            transform: translateY(5px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse-icon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .drop-in {
          animation: drop-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .animate-pulse-icon {
          animation: pulse-icon 1s ease-in-out infinite;
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1);
        }

        @media (prefers-reduced-motion: reduce) {
          .drop-in,
          .animate-pulse-icon {
            animation: none;
          }
          .industry-card {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}