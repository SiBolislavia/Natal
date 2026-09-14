'use client';

import { useEffect, useRef, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
}

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 640 ? 40 : 80;
    const flakes: Snowflake[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.3,
      blur: Math.random() * 1.5,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="snow-container" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            opacity: flake.opacity,
            filter: `blur(${flake.blur}px)`,
            boxShadow: `0 0 ${flake.size * 2}px rgba(200, 220, 255, 0.8)`,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
