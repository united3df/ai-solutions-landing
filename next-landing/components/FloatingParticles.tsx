import { useState } from "react";

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle absolute rounded-full bg-blue-400/30 blur-sm"
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
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-15px, -50px) scale(0.9);
            opacity: 0.7;
          }
          75% {
            transform: translate(30px, -20px) scale(1.05);
            opacity: 0.4;
          }
        }

        .floating-particle {
          animation: float linear infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
