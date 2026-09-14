'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const TARGET_DATE = new Date('2026-12-12T00:00:00');

const calculateTimeLeft = (): TimeLeft => {
  const now = new Date().getTime();
  const target = TARGET_DATE.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    total: difference,
  };
};

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
      <span className="text-xl sm:text-2xl mb-1">{emoji}</span>
      <span
        className={`font-display font-bold text-white leading-none transition-all duration-300 ${
          animate ? 'scale-110 opacity-70' : 'scale-100 opacity-100'
        }`}
        style={{
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          textShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2 font-medium tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-2xl w-full mx-auto animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="countdown-card h-24 sm:h-32 md:h-40 opacity-50" />
        ))}
      </div>
    );
  }

  const isChristmas = timeLeft.total <= 0;

  // Calculate progress (from Jan 1 2026 to Dec 12 2026)
  const startDate = new Date('2026-01-01').getTime();
  const totalDuration = TARGET_DATE.getTime() - startDate;
  const elapsed = Date.now() - startDate;
  const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

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
            <CountdownUnit value={timeLeft.days} label="Hari" emoji="📅" />
            <CountdownUnit value={timeLeft.hours} label="Jam" emoji="🕐" />
            <CountdownUnit value={timeLeft.minutes} label="Menit" emoji="⏱️" />
            <CountdownUnit value={timeLeft.seconds} label="Detik" emoji="⚡" />
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-2xl px-2">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>1 Jan 2026</span>
              <span className="text-yellow-400 font-medium">
                {progress.toFixed(1)}% menuju Natal
              </span>
              <span>12 Des 2026</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="progress-bar h-full rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Countdown;
