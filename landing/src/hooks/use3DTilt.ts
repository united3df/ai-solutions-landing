import { useState, MouseEvent } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
}

export function use3DTilt(maxTilt: number = 10) {
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = ((centerY - y) / centerY) * maxTilt;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return { tilt, handleMouseMove, handleMouseLeave };
}
