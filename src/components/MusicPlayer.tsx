'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Melody ──────────────────────────────────────────────────────────────────
// Notes for a simple Christmas melody (Jingle Bells snippet)
const NOTES = [
  { f: 329.63, s: 0,    d: 0.28 }, { f: 329.63, s: 0.33, d: 0.28 },
  { f: 329.63, s: 0.66, d: 0.55 }, { f: 329.63, s: 1.3,  d: 0.28 },
  { f: 329.63, s: 1.63, d: 0.28 }, { f: 329.63, s: 1.96, d: 0.55 },
  { f: 329.63, s: 2.6,  d: 0.28 }, { f: 392.0,  s: 2.93, d: 0.28 },
  { f: 261.63, s: 3.26, d: 0.28 }, { f: 293.66, s: 3.6,  d: 0.14 },
  { f: 329.63, s: 3.74, d: 0.82 }, { f: 349.23, s: 4.7,  d: 0.28 },
  { f: 349.23, s: 5.03, d: 0.28 }, { f: 349.23, s: 5.36, d: 0.42 },
  { f: 349.23, s: 5.9,  d: 0.28 }, { f: 329.63, s: 6.23, d: 0.28 },
  { f: 329.63, s: 6.56, d: 0.28 }, { f: 293.66, s: 6.9,  d: 0.28 },
  { f: 293.66, s: 7.2,  d: 0.14 }, { f: 329.63, s: 7.34, d: 0.55 },
];

const buildMelody = (ctx: AudioContext): AudioBufferSourceNode => {
  const sr  = ctx.sampleRate;
  const dur = 8;
  const buf = ctx.createBuffer(1, sr * dur, sr); // mono — lighter on mobile
  const ch  = buf.getChannelData(0);

  NOTES.forEach(({ f, s, d }) => {
    const s0 = Math.floor(s * sr);
    const s1 = Math.min(Math.floor((s + d) * sr), ch.length);
    for (let i = s0; i < s1; i++) {
      const t   = (i - s0) / sr;
      const env = Math.min(t * 12, 1) * Math.min((d - t) * 12, 1);
      ch[i] += 0.15 * env * (
        Math.sin(2 * Math.PI * f * t) +
        0.4 * Math.sin(2 * Math.PI * f * 2 * t)
      );
    }
  });

  // Soft background pad
  for (let i = 0; i < ch.length; i++) {
    const t = i / sr;
    ch[i] += 0.025 * Math.sin(2 * Math.PI * 261.63 * t * 0.5);
  }

  const src = ctx.createBufferSource();
  src.buffer  = buf;
  src.loop    = true;
  return src;
};

// ── Component ────────────────────────────────────────────────────────────────
const MusicPlayer = () => {
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [isExpanded,  setIsExpanded]  = useState(false);
  const [volume,      setVolume]      = useState(0.4);
  const [needsClick,  setNeedsClick]  = useState(false);

  const ctxRef    = useRef<AudioContext | null>(null);
  const gainRef   = useRef<GainNode   | null>(null);
  const srcRef    = useRef<AudioBufferSourceNode | null>(null);
  const startedRef = useRef(false);

  // ── helpers ──────────────────────────────────────────────────────────────
  const stopSrc = useCallback(() => {
    if (srcRef.current) {
      try { srcRef.current.stop(); } catch { /* already stopped */ }
      srcRef.current = null;
    }
  }, []);

  const ensureCtx = useCallback(async (): Promise<boolean> => {
    try {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext ?? (window as any).webkitAudioContext;
        if (!Ctx) return false;
        ctxRef.current = new Ctx();
        gainRef.current = ctxRef.current.createGain();
        gainRef.current.connect(ctxRef.current.destination);
        gainRef.current.gain.value = volume;
      }
      if (ctxRef.current.state === 'suspended') {
        await ctxRef.current.resume();
      }
      return ctxRef.current.state === 'running';
    } catch {
      return false;
    }
  }, [volume]);

  const play = useCallback(async (): Promise<boolean> => {
    const ok = await ensureCtx();
    if (!ok || !ctxRef.current) return false;
    try {
      if (!srcRef.current) {
        const src = buildMelody(ctxRef.current);
        src.connect(gainRef.current!);
        src.start();
        srcRef.current = src;
      }
      return true;
    } catch {
      return false;
    }
  }, [ensureCtx]);

  // ── Autoplay — try silently, fallback to click ────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (cancelled || startedRef.current) return;
      const ok = await play();
      if (cancelled) return;
      if (ok) {
        setIsPlaying(true);
        startedRef.current = true;
      } else {
        setNeedsClick(true); // show "click anywhere" hint
      }
    }, 1000);
    return () => { cancelled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── First-interaction fallback ────────────────────────────────────────────
  useEffect(() => {
    if (!needsClick) return;
    const handler = async () => {
      if (startedRef.current) return;
      const ok = await play();
      if (ok) {
        setIsPlaying(true);
        startedRef.current = true;
        setNeedsClick(false);
      }
    };
    window.addEventListener('click',      handler, { once: true });
    window.addEventListener('touchstart', handler, { once: true });
    return () => {
      window.removeEventListener('click',      handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [needsClick, play]);

  // ── Toggle ────────────────────────────────────────────────────────────────
  const toggle = useCallback(async () => {
    if (isPlaying) {
      stopSrc();
      try { await ctxRef.current?.suspend(); } catch { /* ok */ }
      setIsPlaying(false);
    } else {
      if (ctxRef.current?.state === 'suspended') {
        try { await ctxRef.current.resume(); setIsPlaying(true); } catch { /* ok */ }
      } else {
        const ok = await play();
        if (ok) setIsPlaying(true);
      }
    }
  }, [isPlaying, play, stopSrc]);

  // ── Volume ────────────────────────────────────────────────────────────────
  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.setTargetAtTime(v, ctxRef.current.currentTime, 0.02);
    }
  }, []);

  // ── Cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopSrc();
      try {
        if (ctxRef.current && ctxRef.current.state !== 'closed') {
          ctxRef.current.close();
        }
      } catch { /* ok */ }
    };
  }, [stopSrc]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Click-to-play hint for mobile */}
      {needsClick && (
        <div
          className="glass-card-dark px-4 py-2 text-xs text-yellow-300 flex items-center gap-2 max-w-[200px]"
          style={{ border: '1px solid rgba(255,215,0,0.35)' }}
        >
          <span>🔔</span>
          <span>Tap di mana saja untuk mulai musik</span>
        </div>
      )}

      {/* Expanded settings */}
      {isExpanded && (
        <div
          className="glass-card-dark p-4 w-60 sm:w-72"
          style={{ border: '1px solid rgba(255,215,0,0.3)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎵</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Jingle Bells</p>
              <p className="text-gray-400 text-xs">Melodi Natal</p>
            </div>
            {isPlaying && (
              <div className="music-wave flex-shrink-0">
                {[4, 8, 12, 8, 4].map((h, i) => (
                  <span key={i} style={{ height: `${h}px` }} />
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🔉</span>
            <input
              type="range" min="0" max="1" step="0.05" value={volume}
              onChange={handleVolume}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right,#FFD700 ${volume*100}%,rgba(255,255,255,0.2) ${volume*100}%)` }}
              aria-label="Volume"
            />
            <span className="text-xs text-gray-400 w-8 text-right">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}

      {/* Controls row */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(v => !v)}
          className="glass-card-dark px-3 py-2 text-xs text-gray-300 hover:text-white transition-colors rounded-full"
          style={{ border: '1px solid rgba(255,215,0,0.2)' }}
          aria-label="Musik settings"
        >
          {isExpanded ? '✕' : '🎶 Musik'}
        </button>
        <button
          onClick={toggle}
          className="music-player w-14 h-14 flex items-center justify-center rounded-full text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            boxShadow: isPlaying
              ? '0 0 20px rgba(255,215,0,0.5),0 0 40px rgba(196,30,58,0.3)'
              : '0 4px 20px rgba(196,30,58,0.3)',
          }}
          aria-label={isPlaying ? 'Pause' : 'Play musik natal'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
