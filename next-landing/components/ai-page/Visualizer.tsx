import React, { useEffect, useState } from "react";

interface VisualizerProps {
  isActive: boolean;
  isModelTalking: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({
  isActive,
  isModelTalking,
}) => {
  const [bars, setBars] = useState<number[]>(new Array(12).fill(10));

  useEffect(() => {
    if (!isActive) {
      setBars(new Array(12).fill(10));
      return;
    }

    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map(() => 10 + Math.random() * (isModelTalking ? 60 : 30))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isModelTalking]);

  return (
    <div className="flex items-center justify-center gap-1 h-24">
      {bars.map((height, i) => (
        <div
          key={i}
          className={`w-2 rounded-full transition-all duration-100 ${
            isModelTalking ? "bg-lime-400" : "bg-slate-500"
          }`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};

export default Visualizer;
