import React, { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { CheckCircle2 } from "lucide-react";

export function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-4xl mx-auto text-center space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl gradient-text-shimmer">
            AI Solutions Focused on Practical Outcomes
          </h2>

          <p className={`text-lg md:text-xl text-slate-700 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            We don't sell "AI ideas".
          </p>

          <p className={`text-base md:text-lg text-slate-600 max-w-3xl mx-auto transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            We design and build AI systems that integrate into how your business already works.
          </p>

          <div className={`pt-6 space-y-3 text-left transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-base text-slate-700">Our work focuses on:</p>
            <ul className="space-y-3 text-slate-600 max-w-xl">
              {["Clear scope and predictable behavior", "Maintainable architecture", "Measurable operational improvement"].map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${800 + i * 200}ms` }}
                >
                  <CheckCircle2 className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-all duration-500 ${isVisible ? 'rotate-0 scale-100' : 'rotate-180 scale-0'}`} style={{ transitionDelay: `${800 + i * 200}ms` }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .gradient-text-shimmer {
          background: linear-gradient(
            90deg,
            #1e293b 30%,
            #3b82f6 50%,
            #1e293b 70%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .gradient-text-shimmer {
            animation: none;
            background: #1e293b;
            background-clip: text;
            -webkit-background-clip: text;
          }
        }
      `}</style>
    </section>
  );
}
