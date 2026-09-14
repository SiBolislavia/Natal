'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import ChristmasTree from '@/components/ChristmasTree';
import ChristmasLights from '@/components/ChristmasLights';
import Countdown from '@/components/Countdown';

const SnowEffect = dynamic(() => import('@/components/SnowEffect'), { ssr: false });
const StarBackground = dynamic(() => import('@/components/StarBackground'), { ssr: false });
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), { ssr: false });

// Snow mounds heights (deterministic — no Math.random to avoid hydration mismatch)
const SNOW_MOUND_HEIGHTS = [25, 18, 30, 22, 28, 16, 32, 20, 26, 19, 24, 21];

// ── Tema & Ayat Natal ─────────────────────────────────────────────────────────
// Ubah isi di bawah ini untuk mengganti tema dan ayat natal
const CHRISTMAS_THEME = "";
const CHRISTMAS_VERSE  = "";
const VERSE_REFERENCE  = "";
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const wishes = [
    { emoji: '🎁', text: 'Semoga Natal membawa kebahagiaan dan kedamaian' },
    { emoji: '❤️', text: 'Cinta dan kehangatan untuk orang-orang terkasih' },
    { emoji: '✨', text: 'Berkah dan rezeki yang melimpah di tahun baru' },
    { emoji: '🕊️', text: 'Damai sejahtera untuk seluruh dunia' },
  ];

  const galleryImages = [
    { src: '/namaposo-photo.png', caption: 'Kebersamaan Namaposo GKPS KP. Durian' },
    { src: '/namaposo-photo.png', caption: 'Momen Spesial Bersama' },
    { src: '/namaposo-photo.png', caption: 'Sukacita Natal Kita' },
  ];

  return (
    <main
      className="relative min-h-screen bg-christmas-gradient overflow-hidden"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      {/* Gradient overlays */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(22, 91, 51, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(196, 30, 58, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 70%, rgba(22, 91, 51, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      <StarBackground />
      <SnowEffect />

      {/* Christmas Lights — top */}
      <div className="relative z-20 pt-2">
        <ChristmasLights />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center px-4 pb-32">

        {/* ── Header ────────────────────────────────────────────── */}
        <header className="text-center mt-8 sm:mt-12 mb-6 sm:mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <span className="text-2xl sm:text-3xl" style={{ animation: 'bellSwing 2s ease-in-out infinite', display: 'inline-block', transformOrigin: 'top center' }}>🔔</span>
            <span className="text-2xl sm:text-3xl">🦌</span>
            <span className="text-2xl sm:text-3xl" style={{ animation: 'bellSwing 2s ease-in-out infinite 0.5s', display: 'inline-block', transformOrigin: 'top center' }}>🔔</span>
          </div>

          <h1
            className="font-display font-bold mb-3 leading-tight"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4.5rem)',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FFD700 60%, #FFF8DC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))',
            }}
          >
            🎄 Selamat Natal 2026
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            Menghitung waktu menuju momen paling magis di tahun ini
          </p>

          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-xs text-gray-400 tracking-wide">Live Countdown</span>
          </div>
        </header>

        {/* ── Target Date Banner ────────────────────────────────── */}
        <div
          className="glass-card px-5 py-3 mb-8 sm:mb-10 flex items-center gap-3"
          style={{ border: '1px solid rgba(255, 215, 0, 0.25)' }}
        >
          <span className="text-xl">📅</span>
          <div>
            <p className="text-white font-semibold text-sm sm:text-base">Sabtu, 12 Desember 2026</p>
          </div>
        </div>

        {/* ── Countdown ─────────────────────────────────────────── */}
        <section aria-label="Christmas countdown" className="w-full max-w-2xl mb-12 sm:mb-16 px-2">
          <Countdown />
        </section>

        {/* ── Tema Natal ────────────────────────────────────────── */}
        <section
          aria-label="Tema Natal"
          className="w-full max-w-3xl mb-12 sm:mb-16 px-2"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(196,30,58,0.25) 0%, rgba(22,91,51,0.25) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.35)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Decorative corner ornaments */}
            <span className="absolute top-3 left-4 text-2xl opacity-50">🎄</span>
            <span className="absolute top-3 right-4 text-2xl opacity-50">🎄</span>
            <span className="absolute bottom-3 left-4 text-xl opacity-40">⭐</span>
            <span className="absolute bottom-3 right-4 text-xl opacity-40">⭐</span>

            <p className="text-xs text-yellow-400 uppercase tracking-[0.2em] mb-2 font-medium">
              Tema Natal 2026
            </p>
            <h2
              className="font-display font-bold mb-6 leading-snug"
              style={{
                fontSize: 'clamp(1.3rem, 4vw, 2.2rem)',
                background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {CHRISTMAS_THEME}
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5 px-4">
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.4))' }} />
              <span className="text-yellow-500 text-lg">✝</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(255,215,0,0.4))' }} />
            </div>

            {/* Ayat */}
            <blockquote className="text-gray-200 text-sm sm:text-base leading-relaxed italic mb-3 max-w-xl mx-auto">
              {CHRISTMAS_VERSE}
            </blockquote>
            <p className="text-yellow-400 text-sm font-semibold">{VERSE_REFERENCE}</p>
          </div>
        </section>

        {/* ── Foto Kebersamaan Namaposo ──────────────────────────── */}
        <section
          aria-label="Foto Kebersamaan Namaposo GKPS KP. Durian"
          className="w-full max-w-5xl mb-12 sm:mb-16 px-2"
        >
          <div className="text-center mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-1">Foto Kebersamaan</p>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              📸 Namaposo GKPS KP. Durian
            </h2>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  aspectRatio: '4/3',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
                >
                  <p className="text-white text-xs font-medium">{img.caption}</p>
                </div>
                {/* Add photo hint for slots 2 and 3 */}
                {i > 0 && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-60"
                    style={{ background: 'rgba(0,0,0,0.4)' }}
                  >
                    <span className="text-3xl">📷</span>
                    <p className="text-white text-xs text-center px-2">Tambahkan foto di sini</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Upload hint */}
          <p className="text-center text-gray-500 text-xs mt-3">
            💡 Ganti file <code className="text-gray-400 bg-white/5 px-1 rounded">public/namaposo-photo.png</code> dengan foto asli, atau tambah lebih banyak foto di array <code className="text-gray-400 bg-white/5 px-1 rounded">galleryImages</code>
          </p>
        </section>

        {/* ── Tree + Scene ───────────────────────────────────────── */}
        <section className="w-full max-w-5xl mb-12 sm:mb-16" aria-label="Christmas scene">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="glass-card p-5 sm:p-6 max-w-xs w-full text-center order-2 md:order-1">
              <div className="text-3xl mb-3">🎅</div>
              <h3 className="text-white font-display font-semibold text-lg mb-2">Ho Ho Ho!</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Santa Claus sedang mempersiapkan hadiah terbaik untuk semua anak yang baik di seluruh dunia! 🎁
              </p>
              <div className="mt-3 flex justify-center gap-1 text-lg">🦌 🦌 🦌</div>
            </div>

            <div className="order-1 md:order-2 flex-shrink-0">
              <ChristmasTree />
            </div>

            <div className="glass-card p-5 sm:p-6 max-w-xs w-full text-center order-3">
              <div className="text-3xl mb-3">⛄</div>
              <h3 className="text-white font-display font-semibold text-lg mb-2">Suasana Salju</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Nikmati keindahan salju yang turun perlahan dan menciptakan suasana Natal yang ajaib! ❄️
              </p>
              <div className="mt-3 flex justify-center gap-1 text-lg">❄️ ❄️ ❄️</div>
            </div>
          </div>
        </section>

        {/* ── Ucapan Natal ──────────────────────────────────────── */}
        <section className="w-full max-w-2xl mb-12 sm:mb-16 px-2" aria-label="Christmas wishes">
          <h2
            className="text-center font-display font-bold text-xl sm:text-2xl mb-6"
            style={{
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ✨ Ucapan Natal ✨
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {wishes.map((wish, i) => (
              <div
                key={i}
                className="glass-card p-4 flex items-start gap-3 hover:scale-105 transition-transform duration-300"
                style={{ border: '1px solid rgba(255, 215, 0, 0.15)' }}
              >
                <span className="text-2xl flex-shrink-0">{wish.emoji}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{wish.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────── */}
        <footer className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>by Namaposo GKPS KP. Durian · Christmas 2026</span>
          </div>
          <p className="text-gray-600 text-xs mt-1">🎄 Selamat Merayakan Natal bersama keluarga tercinta 🎄</p>
        </footer>
      </div>

      {/* Snow ground */}
      <div
        className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(200, 220, 255, 0.12), transparent)',
          borderTop: '1px solid rgba(200, 220, 255, 0.15)',
        }}
      >
        <div className="flex items-end h-full px-4 gap-1">
          {SNOW_MOUND_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-full"
              style={{ height: `${h}px`, background: 'rgba(210, 230, 255, 0.15)', filter: 'blur(2px)' }}
            />
          ))}
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  );
}
