import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(footerRef);

  return (
    <footer ref={footerRef} className={`bg-slate-900 text-white py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <p className="text-lg footer-logo">Practical AI for Business</p>
          <p className="text-sm text-slate-400">
            © 2026 — All rights reserved
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gentle-rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        .footer-logo:hover {
          animation: gentle-rotate 0.5s ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-logo:hover {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}