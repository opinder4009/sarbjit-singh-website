import type { ReactNode } from 'react';

const PATHS: Record<string, ReactNode> = {
  'home-mortgage': (
    <>
      <path d="M3.5 11.2 12 4l8.5 7.2" />
      <path d="M5.5 9.6V20h13V9.6" />
      <path d="M9.8 20v-5.2h4.4V20" />
    </>
  ),
  'first-time-home-buyer': (
    <>
      <circle cx="9" cy="9" r="5.2" />
      <path d="m13 13 7 7" />
      <path d="M8 9h2M9 8v2" />
    </>
  ),
  'refinancing-equity': (
    <>
      <path d="M4 8a8 8 0 0 1 13.6-5.7L20 4.6" />
      <path d="M20 2v4.6h-4.6" />
      <path d="M20 16a8 8 0 0 1-13.6 5.7L4 19.4" />
      <path d="M4 22v-4.6h4.6" />
    </>
  ),
  'mortgage-pre-approval': (
    <>
      <path d="M12 3.2 5 6v6c0 4.6 3 7.7 7 8.8 4-1.1 7-4.2 7-8.8V6Z" />
      <path d="m9 12 2.2 2.2L15.5 9.8" />
    </>
  ),
  'debt-consolidation': (
    <>
      <rect x="3.5" y="4.5" width="17" height="4.4" rx="1" />
      <rect x="3.5" y="10.2" width="17" height="4.4" rx="1" />
      <rect x="3.5" y="15.9" width="17" height="4.4" rx="1" />
    </>
  ),
  'line-of-credit': (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 9.8h19" />
      <path d="M6 14.3h4" />
    </>
  ),
  'commercial-mortgages': (
    <>
      <path d="M5 21V5.5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1V21" />
      <path d="M14 10.5h4a1 1 0 0 1 1 1V21" />
      <path d="M8 8.5h.01M11 8.5h.01M8 12h.01M11 12h.01M8 15.5h.01M11 15.5h.01" />
    </>
  ),
  'construction-financing': (
    <>
      <path d="M4 21 14 11" />
      <path d="m12.5 9.5 2-2 4 4-2 2" />
      <path d="M4 21v-3.5L7.5 14" />
      <circle cx="18.5" cy="5.5" r="2" />
    </>
  ),
};

export default function MortgageServiceIcon({
  slug,
  size = 24,
}: {
  slug: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {PATHS[slug] ?? null}
      </g>
    </svg>
  );
}
