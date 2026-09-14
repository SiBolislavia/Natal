'use client';

import { useEffect, useState } from 'react';

interface Light {
  id: number;
  color: string;
  delay: number;
  wireHeight: number;
}

const LIGHT_COLORS = [
  '#FF4444', '#FFD700', '#44FF44', '#4488FF', '#FF44FF',
  '#FF8844', '#44FFFF', '#FF4488',
];

// Pre-compute fixed heights so server and client always match
const WIRE_HEIGHTS = [
  18, 12, 22, 15, 25, 11, 20, 14, 24, 16,
  21, 13, 19, 23, 10, 17, 26, 12, 22, 15,
];

const ChristmasLights = () => {
  const [mounted, setMounted] = useState(false);

  // Only render lights after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const lights: Light[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: LIGHT_COLORS[i % LIGHT_COLORS.length],
    delay: (i * 0.2) % 3,
    wireHeight: WIRE_HEIGHTS[i],
  }));

  if (!mounted) {
    // Render a static placeholder that matches server output
    return (
      <div className="w-full overflow-hidden relative">
        <div
          className="w-full h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
        />
        <div className="h-8" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden relative" aria-hidden="true">
      {/* String wire */}
      <div
        className="w-full h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
      />
      {/* Lights */}
      <div className="flex justify-around items-start relative -mt-1">
        {lights.map((light) => (
          <div key={light.id} className="flex flex-col items-center">
            {/* Wire connector */}
            <div
              className="w-px opacity-40"
              style={{
                height: `${light.wireHeight}px`,
                background: 'rgba(255,255,255,0.4)',
              }}
            />
            {/* Bulb */}
            <div
              className="christmas-light"
              style={{
                width: '10px',
                height: '14px',
                borderRadius: '40% 40% 60% 60%',
                background: `radial-gradient(circle at 40% 35%, white, ${light.color})`,
                color: light.color,
                animationDelay: `${light.delay}s`,
                boxShadow: `0 0 8px ${light.color}, 0 0 15px ${light.color}44`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChristmasLights;
