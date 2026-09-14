'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Generate Christmas melody using Web Audio API
const createChristmasMelody = (audioCtx: AudioContext): AudioBufferSourceNode => {
  const sampleRate = audioCtx.sampleRate;
  const duration = 8;
  const buffer = audioCtx.createBuffer(2, sampleRate * duration, sampleRate);

  const notes = [
    { freq: 329.63, start: 0, dur: 0.3 },
    { freq: 329.63, start: 0.35, dur: 0.3 },
    { freq: 329.63, start: 0.7, dur: 0.6 },
    { freq: 329.63, start: 1.35, dur: 0.3 },
    { freq: 329.63, start: 1.7, dur: 0.3 },
    { freq: 329.63, start: 2.05, dur: 0.6 },
    { freq: 329.63, start: 2.7, dur: 0.3 },
    { freq: 392.0,  start: 3.05, dur: 0.3 },
    { freq: 261.63, start: 3.4, dur: 0.3 },
    { freq: 293.66, start: 3.75, dur: 0.15 },
    { freq: 329.63, start: 3.95, dur: 0.9 },
    { freq: 349.23, start: 4.9, dur: 0.3 },
    { freq: 349.23, start: 5.25, dur: 0.3 },
    { freq: 349.23, start: 5.6, dur: 0.45 },
    { freq: 349.23, start: 6.1, dur: 0.3 },
    { freq: 329.63, start: 6.45, dur: 0.3 },
    { freq: 329.63, start: 6.8, dur: 0.3 },
    { freq: 293.66, start: 7.15, dur: 0.3 },
    { freq: 293.66, start: 7.5, dur: 0.15 },
    { freq: 329.63, start: 7.7, dur: 0.2 },
  ];

  for (let channel = 0; channel < 2; channel++) {
    const channelData = buffer.getChannelData(channel);
    notes.forEach(({ freq, start, dur }) => {
      const startSample = Math.floor(start * sampleRate);
      const endSample = Math.floor((start + dur) * sampleRate);
      for (let i = startSample; i < endSample && i < channelData.length; i++) {
        const t = (i - startSample) / sampleRate;
        const envelope = Math.min(t * 10, 1) * Math.min((dur - t) * 10, 1);
        channelData[i] += 0.12 * envelope * (
          Math.sin(2 * Math.PI * freq * t) +
          0.5 * Math.sin(2 * Math.PI * freq * 2 * t) +
          0.25 * Math.sin(2 * Math.PI * freq * 3 * t)
        );
      }
    });
    const chordFreqs = [261.63, 329.63, 392.0];
    chordFreqs.forEach(freq => {
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate;
        const envelope = 0.03 + 0.02 * Math.sin(2 * Math.PI * 0.5 * t);
        channelData[i] += envelope * Math.sin(2 * Math.PI * freq * t * 0.5);
      }
    });
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const hasStartedRef = useRef(false);

  const stopAudio = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch {}
      sourceRef.current = null;
    }
  }, []);

  const startAudio = useCallback(async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.connect(audioCtxRef.current.destination);
      gainNodeRef.current.gain.value = volume;
    }
    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
    if (!sourceRef.current) {
      const source = createChristmasMelody(audioCtxRef.current);
      source.connect(gainNodeRef.current!);
      source.start();
      sourceRef.current = source;
    }
  }, [volume]);

  // Autoplay on mount — try immediately, fallback to first user interaction
  useEffect(() => {
    const tryAutoplay = async () => {
      try {
        await startAudio();
        setIsPlaying(true);
        hasStartedRef.current = true;
      } catch {
        // Autoplay blocked by browser policy
        setAutoplayBlocked(true);
      }
    };

    // Small delay to let the page settle
    const timer = setTimeout(() => {
      tryAutoplay();
    }, 800);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fallback: start on first user click anywhere on the page
  useEffect(() => {
    if (!autoplayBlocked) return;

    const handleFirstInteraction = async () => {
      if (hasStartedRef.current) return;
      try {
        await startAudio();
        setIsPlaying(true);
        hasStartedRef.current = true;
        setAutoplayBlocked(false);
      } catch {}
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [autoplayBlocked, startAudio]);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      stopAudio();
      if (audioCtxRef.current) await audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current?.state === 'suspended') {
        await audioCtxRef.current.resume();
      } else {
        await startAudio();
      }
      setIsPlaying(true);
    }
  }, [isPlaying, startAudio, stopAudio]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(newVolume, audioCtxRef.current.currentTime, 0.01);
    }
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
      try {
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
      } catch {
        // Already closed — safe to ignore
      }
    };
  }, [stopAudio]);

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Autoplay blocked notice */}
      {autoplayBlocked && (
        <div
          className="glass-card-dark px-4 py-2 text-xs text-yellow-300 flex items-center gap-2"
          style={{ border: '1px solid rgba(255, 215, 0, 0.3)', maxWidth: '200px' }}
        >
          <span>🔔</span>
          <span>Klik di mana saja untuk mulai musik</span>
        </div>
      )}

      {/* Expanded panel */}
      {isExpanded && (
        <div
          className="glass-card-dark p-4 w-64 sm:w-72"
          style={{ border: '1px solid rgba(255, 215, 0, 0.3)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎵</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Jingle Bells</p>
              <p className="text-gray-400 text-xs">Melodi Natal</p>
            </div>
            {isPlaying && (
              <div className="music-wave flex-shrink-0">
                <span style={{ height: '4px' }} />
                <span style={{ height: '8px' }} />
                <span style={{ height: '12px' }} />
                <span style={{ height: '8px' }} />
                <span style={{ height: '4px' }} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🔉</span>
            <input
              type="range" min="0" max="1" step="0.05" value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, #FFD700 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)` }}
              aria-label="Volume control"
            />
            <span className="text-xs text-gray-400 w-8 text-right">{Math.round(volume * 100)}%</span>
          </div>
          <p className="text-gray-500 text-xs mt-3 text-center">🎄 Autoplay Aktif</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass-card-dark px-3 py-2 text-xs text-gray-300 hover:text-white transition-colors rounded-full"
          style={{ border: '1px solid rgba(255, 215, 0, 0.2)' }}
          aria-label="Toggle music settings"
        >
          {isExpanded ? '✕' : '🎶 Musik'}
        </button>
        <button
          onClick={togglePlay}
          className="music-player w-14 h-14 flex items-center justify-center rounded-full text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            boxShadow: isPlaying
              ? '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(196, 30, 58, 0.3)'
              : '0 4px 20px rgba(196, 30, 58, 0.3)',
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play Christmas music'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
