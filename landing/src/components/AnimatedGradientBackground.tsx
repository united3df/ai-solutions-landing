export function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="gradient-mesh absolute inset-0 opacity-60" />
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            transform: translate(5%, -5%) scale(1.1);
          }
          66% {
            transform: translate(-5%, 5%) scale(1.05);
          }
        }

        .gradient-mesh {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.3) 0%,
            rgba(147, 51, 234, 0.3) 25%,
            rgba(59, 130, 246, 0.3) 50%,
            rgba(14, 165, 233, 0.3) 75%,
            rgba(59, 130, 246, 0.3) 100%
          );
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
