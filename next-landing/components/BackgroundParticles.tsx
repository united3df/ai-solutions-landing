import { useState } from "react";

export function BackgroundParticles({ count = 30 }: { count?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ opacity: 0.15 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="ambient-particle absolute rounded-full bg-blue-400 blur-[1px]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes ambient-float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          25% {
            transform: translate(30px, -40px);
            opacity: 0.4;
          }
          50% {
            transform: translate(-20px, -80px);
            opacity: 0.6;
          }
          75% {
            transform: translate(40px, -60px);
            opacity: 0.3;
          }
        }

        .ambient-particle {
          animation: ambient-float linear infinite;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-particle {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
