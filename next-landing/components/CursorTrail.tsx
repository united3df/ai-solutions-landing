import { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
  id: number;
}

export function CursorTrail() {
  const [points, setPoints] = useState<Point[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    queueMicrotask(() => setPrefersReducedMotion(mediaQuery.matches));
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastTime = Date.now();
    const throttleDelay = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      
      setPoints((prev) => {
        const updated = [...prev, newPoint];
        return updated.slice(-15); // Keep last 15 points
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      {points.map((point, index) => {
        const opacity = index / points.length;
        const scale = opacity;
        return (
          <div
            key={point.id}
            className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 transition-opacity duration-500"
            style={{
              left: point.x,
              top: point.y,
              opacity: opacity * 0.3,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          />
        );
      })}
    </div>
  );
}
