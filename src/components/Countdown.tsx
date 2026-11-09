'use client';

import { useEffect, useRef, useState } from 'react';

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
}: {
  value: number;
  label: string;
}) => {
  return (
    <div className="countdown-card flex flex-col items-center justify-center py-3 px-2 sm:py-4 sm:px-4">
      <span className="font-mono font-semibold text-white leading-none tracking-tight text-2xl sm:text-4xl md:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-gray-400 text-[10px] sm:text-xs mt-1.5 font-normal tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
};

interface CountdownProps {
  onComplete?: () => void;
}

const Countdown = ({ onComplete }: CountdownProps) => {
  // Start with null — only calculate on the client to avoid hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const initial = calculateTimeLeft();
    setTimeLeft(initial);
    if (initial.total <= 0) {
      onCompleteRef.current?.();
      return;
    }

    const timer = setInterval(() => {
      const next = calculateTimeLeft();
      setTimeLeft(next);
      if (next.total <= 0) {
        clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show skeleton until client has calculated first value
  if (!timeLeft) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md w-full mx-auto">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="countdown-card flex flex-col items-center justify-center py-3 px-2 sm:py-4 sm:px-4 animate-pulse"
          >
            <div className="h-7 sm:h-10 w-10 sm:w-14 rounded bg-white/10 my-0.5" />
            <div className="h-2.5 w-8 sm:w-10 rounded bg-white/10 mt-1.5" />
          </div>
        ))}
      </div>
    );
  }

  const isChristmas = timeLeft.total <= 0;

  return (
    <div className="w-full flex flex-col items-center">
      {isChristmas ? (
        <div className="text-center">
          <h2 className="text-gold-gradient font-display text-2xl sm:text-4xl font-bold">
            Selamat Natal! 🎉
          </h2>
          <p className="text-gray-300 mt-1 text-sm sm:text-base">Hari yang ditunggu telah tiba!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md w-full mx-auto">
          <CountdownUnit value={timeLeft.days}    label="Hari" />
          <CountdownUnit value={timeLeft.hours}   label="Jam" />
          <CountdownUnit value={timeLeft.minutes} label="Menit" />
          <CountdownUnit value={timeLeft.seconds} label="Detik" />
        </div>
      )}
    </div>
  );
};

export default Countdown;
