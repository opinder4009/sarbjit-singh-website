import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { brand } from '@/lib/brand';
import NavBar from '@/components/NavBar';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

// Self-hosted (rather than next/font/google) because the Google Fonts
// build-time fetcher has a module-level cache race that intermittently
// crashes production builds with "Cannot read properties of null" when
// webpack compiles the server/edge/client bundles concurrently. These are
// the same Google-published variable font files, just fetched once up front
// instead of on every build.
const display = localFont({
  src: './fonts/big-shoulders-variable.woff2',
  weight: '500 800',
  variable: '--font-display',
  display: 'swap',
});

const body = localFont({
  src: './fonts/ibm-plex-sans-variable.woff2',
  weight: '400 600',
  variable: '--font-body',
  display: 'swap',
});

const editorial = localFont({
  src: [
    { path: './fonts/fraunces-normal-variable.woff2', weight: '400 600', style: 'normal' },
    { path: './fonts/fraunces-italic-variable.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-editorial',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.title}`,
  description: brand.aboutIntro,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${editorial.variable}`}>
      <body>
        <NavBar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
