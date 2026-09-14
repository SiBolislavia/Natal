import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "🎄 Selamat Natal 2026 | Christmas Countdown",
  description: "Rayakan momen spesial Natal bersama countdown menuju 12 Desember 2026. Nikmati suasana Natal yang hangat dan menyenangkan!",
  keywords: "natal, christmas, countdown, 2026, selamat natal",
  openGraph: {
    title: "🎄 Selamat Natal 2026",
    description: "Countdown menuju Hari Natal 12 Desember 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
