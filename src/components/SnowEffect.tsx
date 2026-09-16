'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// Use fixed pre-seeded values so SSR and client always match
// (generated once offline, not with Math.random at runtime)
const SEED_DATA = [
  [10,4,8,0,0.7],[25,3,11,2,0.5],[42,5,7,4,0.8],[58,2,13,1,0.4],
  [73,4,9,6,0.6],[88,3,10,3,0.7],[5,5,12,5,0.5],[19,2,8,0,0.9],
  [34,4,11,2,0.6],[50,3,7,7,0.4],[67,5,13,1,0.8],[82,2,9,4,0.5],
  [95,4,10,6,0.7],[12,3,8,3,0.6],[28,5,12,0,0.4],[45,2,7,5,0.9],
  [60,4,11,2,0.5],[76,3,9,8,0.7],[90,5,13,1,0.6],[3,2,8,4,0.8],
  [16,4,10,6,0.4],[32,3,7,3,0.7],[48,5,12,0,0.5],[63,2,11,2,0.9],
  [79,4,8,5,0.6],[93,3,13,7,0.4],[7,5,9,1,0.8],[22,2,10,4,0.5],
  [38,4,7,6,0.7],[54,3,12,3,0.6],[70,5,8,0,0.4],[85,2,11,2,0.9],
  [1,4,13,5,0.5],[15,3,9,7,0.7],[30,5,7,1,0.6],[47,2,10,4,0.8],
  [62,4,12,6,0.4],[78,3,8,3,0.5],[92,5,11,0,0.9],[9,2,13,2,0.6],
  // mobile uses first 40, desktop uses all 80
  [20,4,7,5,0.7],[35,3,10,7,0.4],[52,5,12,1,0.8],[68,2,8,4,0.5],
  [83,4,13,6,0.6],[97,3,9,3,0.7],[4,5,7,0,0.4],[18,2,11,2,0.9],
  [33,4,10,5,0.5],[49,3,12,7,0.7],[65,5,8,1,0.6],[80,2,13,4,0.8],
  [94,4,7,6,0.4],[11,3,11,3,0.5],[27,5,9,0,0.9],[44,2,10,2,0.6],
  [59,4,12,5,0.7],[75,3,7,7,0.4],[89,5,13,1,0.8],[2,2,8,4,0.5],
  [14,4,11,6,0.6],[29,3,9,3,0.7],[46,5,10,0,0.4],[61,2,7,2,0.9],
  [77,4,12,5,0.5],[91,3,13,7,0.7],[6,5,8,1,0.6],[21,2,11,4,0.8],
  [37,4,9,6,0.4],[53,3,7,3,0.5],[69,5,10,0,0.9],[84,2,12,2,0.6],
  [98,4,13,5,0.7],[13,3,8,7,0.4],[26,5,11,1,0.8],[43,2,9,4,0.5],
  [57,4,7,6,0.6],[72,3,12,3,0.7],[87,5,10,0,0.4],[99,2,13,2,0.9],
];

const SnowEffect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Determine count based on screen size (client only)
    setCount(window.innerWidth < 640 ? 40 : 80);
  }, []);

  if (count === 0) return null;

  return (
    <>
      {/* Inline keyframes to avoid CSS class issues on mobile */}
      <style>{`
        @keyframes sf {
          0%   { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 0.9; }
          25%  { transform: translateY(25vh) translateX(18px) rotate(90deg); }
          50%  { transform: translateY(50vh) translateX(-10px) rotate(180deg); }
          75%  { transform: translateY(75vh) translateX(14px) rotate(270deg); }
          100% { transform: translateY(110vh) translateX(-5px) rotate(360deg); opacity: 0.2; }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 10, overflow: 'hidden',
        }}
      >
        {SEED_DATA.slice(0, count).map(([x, size, dur, delay, opacity], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-20px',
              left: `${x}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: 'white',
              opacity,
              // Full animation shorthand inline — duration + delay included
              animation: `sf ${dur}s ${delay}s linear infinite`,
              boxShadow: `0 0 ${(size as number) * 2}px rgba(200, 220, 255, 0.8)`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SnowEffect;
