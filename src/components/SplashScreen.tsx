'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Countdown from '@/components/Countdown';
import TextType from '@/components/TextType';

const DriftWall = dynamic(() => import('@/components/DriftWall'), { ssr: false });

const DRIFT_ITEMS = [
  { image: '/foto studio.jpg', title: 'Foto Studio 1' },
  { image: '/foto studio 2.jpg', title: 'Foto Studio 2' },
  { image: '/foto studio 3.jpg', title: 'Foto Studio 3' },
  { image: '/foto sudio 4.jpg', title: 'Foto Studio 4' },
  { image: '/foto studio 5.jpg', title: 'Foto Studio 5' },
  { image: '/namaposo.jpeg', title: 'Namaposo' },
  { image: '/natal 2020.jpg', title: 'Natal 2020' },
  { image: '/natal 2021.jpg', title: 'Natal 2021' },
  { image: '/natal 2022.jpg', title: 'Natal 2022' },
  { image: '/pemuda.jpeg', title: 'Pemuda' },
];

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Small delay so the page fades in smoothly
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = useCallback(() => {
    setExiting(true);
    setTimeout(onEnter, 700);
  }, [onEnter]);

  return (
    <div
      id="splash-screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'linear-gradient(135deg, #050810 0%, #0A0E1A 40%, #0E1F12 70%, #050810 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        opacity: exiting ? 0 : mounted ? 1 : 0,
        transform: exiting ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {/* ── Drift Wall Background ─────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DriftWall
          items={DRIFT_ITEMS}
          columns={10}
          tileWidth={200}
          tileHeight={132}
          gap={18}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={120}
          speed={42}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.55}
          overlayColor="#060010"
        />
      </div>

      {/* ── Dark vignette overlay ─────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 70% at 50% 50%,
              rgba(5,8,16,0.65) 0%,
              rgba(5,8,16,0.85) 60%,
              rgba(5,8,16,0.97) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* ── Christmas light bar top ───────────────────────────────────── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2, pointerEvents: 'none' }}>
        <LightBar />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 720,
          padding: '0 1.5rem',
          textAlign: 'center',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,215,0,0.7)',
            marginBottom: '0.6rem',
            fontWeight: 500,
          }}
        >
          Namaposo GKPS KP. Durian
        </p>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 7vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '0.4rem',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 40%, #FFD700 70%, #FFF8DC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 24px rgba(255,215,0,0.35))',
            fontFamily: 'var(--font-playfair)',
          }}
        >
          <TextType
            text='"Sleeps until Christmas: too many, but worth every second."'
            typingSpeed={50}
            pauseDuration={2500}
            deletingSpeed={30}
            loop={true}
            showCursor={false}
            cursorClassName="text-amber-300"
          />
        </h1>

        <p
          style={{
            color: 'rgba(200,210,230,0.75)',
            fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)',
            marginBottom: '2.2rem',
            lineHeight: 1.6,
          }}
        >
          Sabtu, 12 Desember 2026
        </p>

        {/* Countdown */}
        <div style={{ marginBottom: '2.8rem' }}>
          <Countdown />
        </div>

        {/* Enter button */}
        {/* <button
          id="enter-site-btn"
          onClick={handleEnter}
          style={{
            background: 'linear-gradient(135deg, rgba(196,30,58,0.85), rgba(22,91,51,0.85))',
            border: '1px solid rgba(255,215,0,0.45)',
            borderRadius: 50,
            color: '#fff',
            padding: '0.75rem 2.5rem',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(196,30,58,0.35), 0 0 40px rgba(255,215,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.04)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 36px rgba(196,30,58,0.5), 0 0 60px rgba(255,215,0,0.2)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,215,0,0.8)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = '';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(196,30,58,0.35), 0 0 40px rgba(255,215,0,0.1)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,215,0,0.45)';
          }}
        >
          Masuk ke Website
        </button> */}
      </div>
    </div>
  );
}

// ── Simple decorative light bar ──────────────────────────────────────────────
function LightBar() {
  const COLORS = ['#ff3333','#33ff33','#ffcc00','#3399ff','#ff66cc','#ff9900','#66ffff'];
  const LIGHTS = 28;
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
      {/* Wire */}
      <div style={{ position: 'absolute', top: 10, left: 0, right: 0, height: 2, background: 'rgba(100,80,50,0.6)' }} />
      {Array.from({ length: LIGHTS }, (_, i) => {
        const color = COLORS[i % COLORS.length];
        const leftPct = `${(i / (LIGHTS - 1)) * 100}%`;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: leftPct,
              top: 6,
              transform: 'translateX(-50%)',
            }}
          >
            {/* Cap */}
            <div style={{ width: 6, height: 5, background: 'rgba(80,60,40,0.8)', borderRadius: 2, margin: '0 auto' }} />
            {/* Bulb */}
            <div
              style={{
                width: 12,
                height: 16,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                background: color,
                boxShadow: `0 0 8px ${color}, 0 0 16px ${color}80`,
                animation: `lightPulse ${1.2 + (i % 5) * 0.15}s ease-in-out infinite`,
                animationDelay: `${(i % 7) * 0.18}s`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
