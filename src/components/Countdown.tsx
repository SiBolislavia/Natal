'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

// Use explicit UTC midnight so server & browser parse the same timestamp
const TARGET_MS = Date.UTC(2026, 11, 12, 0, 0, 0); // Dec 12 2026 00:00 UTC

const calculateTimeLeft = (): TimeLeft => {
  const difference = TARGET_MS - Date.now();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  return {
    days:    Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    total:   difference,
  };
};

// ─── CountdownUnit ─────────────────────────────────────────────────────────────
const CountdownUnit = ({
  value,
  label,
  emoji,
}: {
  value: number;
  label: string;
  emoji: string;
}) => {
  const [prev, setPrev] = useState(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prev !== value) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 300);
      setPrev(value);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className="countdown-card flex flex-col items-center justify-center p-3 sm:p-5 md:p-6">
      <span className="text-lg sm:text-2xl mb-1">{emoji}</span>
      <span
        className={`font-display font-bold text-white leading-none transition-all duration-300 ${
          animate ? 'scale-110 opacity-70' : 'scale-100 opacity-100'
        }`}
        style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.6)' }}
      >
        {/* Responsive font size via Tailwind — no clamp() to avoid mobile quirks */}
        <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {String(value).padStart(2, '0')}
        </span>
      </span>
      <span className="text-gray-300 text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
};

const Countdown = () => {
  // Start with null — only calculate on the client to avoid hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // First tick immediately so numbers appear right away
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show skeleton until client has calculated first value
  if (!timeLeft) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 max-w-2xl w-full mx-auto">
        {['📅', '🕐', '⏱️', '⚡'].map((emoji, i) => (
          <div
            key={i}
            className="countdown-card flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 animate-pulse"
          >
            <span className="text-lg sm:text-2xl mb-1 opacity-50">{emoji}</span>
            <div className="h-9 sm:h-12 w-14 sm:w-20 rounded-lg bg-white/10 my-1" />
            <div className="h-2 sm:h-3 w-8 sm:w-12 rounded bg-white/10 mt-1" />
          </div>
        ))}
      </div>
    );
  }

  const isChristmas = timeLeft.total <= 0;

  const startMs       = Date.UTC(2026, 0, 1);  // Jan 1 2026
  const totalDuration = TARGET_MS - startMs;
  const elapsed       = Date.now() - startMs;
  const progress      = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  return (
    <div className="w-full flex flex-col items-center gap-6 sm:gap-8">
      {isChristmas ? (
        <div className="text-center">
          <div className="text-5xl sm:text-7xl mb-4 float-animate">🎄</div>
          <h2 className="text-gold-gradient font-display text-3xl sm:text-5xl font-bold">
            Selamat Natal! 🎉
          </h2>
          <p className="text-gray-300 mt-2 text-lg">Hari yang ditunggu telah tiba!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 max-w-2xl w-full mx-auto">
            <CountdownUnit value={timeLeft.days}    label="Hari"  emoji="📅" />
            <CountdownUnit value={timeLeft.hours}   label="Jam"   emoji="🕐" />
            <CountdownUnit value={timeLeft.minutes} label="Menit" emoji="⏱️" />
            <CountdownUnit value={timeLeft.seconds} label="Detik" emoji="⚡" />
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-2xl px-2">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>1 Jan 2026</span>
              <span className="font-medium" style={{ color: '#3DFFEC' }}>
                {progress.toFixed(1)}% Menuju Natal
              </span>
              <span>12 Des 2026</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="progress-bar h-full rounded-full transition-all duration-1000"
                style={{ width: `${progress}%`, backgroundColor: '#3DFFEC' }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown;
