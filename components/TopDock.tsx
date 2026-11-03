'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createTopDockController, type TopDockOptions } from '@/lib/topDockController';
import { mortgageServices } from '@/lib/mortgageServices';

const DOCK_OPTIONS: TopDockOptions = {
  proximity: 110,
  spring: 0.2,
  damping: 0.72,
  widthGrowth: 12,
  heightGrowth: 10,
  drop: 2.5,
  axis: 'x',
};

const ITEMS = [
  {
    href: '/mortgage-services',
    label: 'Mortgage Services',
    dropdown: true,
    icon: (
      <>
        <path d="M2 9.6 8 5l6 4.6" />
        <circle cx="8" cy="9.4" r="2.6" />
      </>
    ),
  },
  {
    href: '/mortgage-guide',
    label: 'Mortgage Guide',
    icon: (
      <>
        <path d="M2.2 8.6 8 3.4l5.8 5.2" />
        <path d="M3.6 7.4V13h8.8V7.4" />
        <path d="M6.6 13V9.6h2.8V13" />
      </>
    ),
  },
  {
    href: '/lifestyle',
    label: 'Lifestyle',
    icon: (
      <>
        <circle cx="8" cy="8" r="5.4" />
        <path d="M9.9 6 8.6 8.6 6 9.9 7.3 7.3Z" />
      </>
    ),
  },
  {
    href: '/#loyalty',
    label: 'Partner Program',
    icon: (
      <>
        <circle cx="8" cy="5.8" r="3.1" />
        <path d="M6 8.3 4.7 13.6l3.3-1.7 3.3 1.7-1.3-5.3" />
      </>
    ),
  },
  {
    href: '/my-journey',
    label: 'My Journey',
    icon: (
      <>
        <path d="M2.6 12.4c1.6-4.4 2.9-8 5.4-8s3.8 3.6 5.4 8" />
        <circle cx="8" cy="4.2" r="1.1" />
      </>
    ),
  },
  {
    href: '/blogs',
    label: 'Blogs',
    icon: (
      <>
        <path d="M3 13V4h6.2" />
        <path d="m11.2 3 1.8 1.8-5 5-2.1.5.5-2.1Z" />
      </>
    ),
  },
];

export default function TopDock({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    return createTopDockController(root, () => DOCK_OPTIONS);
  }, []);

  return (
    <nav ref={rootRef} className="top-dock" aria-label="Primary" data-dock-state="idle" data-dock-max="0.00">
      {ITEMS.map((item) => {
        const active = item.dropdown ? pathname.startsWith('/mortgage-services') : pathname === item.href;
        const el = (
          <Link
            key={item.href}
            href={item.href}
            className="top-dock__item"
            data-dock-item
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
          >
            <span className="top-dock__icon" aria-hidden="true">
              <svg viewBox="0 0 16 16">{item.icon}</svg>
            </span>
            <span className="top-dock__label">{item.label}</span>
            {item.dropdown && (
              <svg className="top-dock__chevron" width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </Link>
        );

        if (!item.dropdown) return el;

        return (
          <div key={item.href} className="top-dock__group">
            {el}
            <div className="top-dock__dropdown">
              <Link href="/mortgage-services" onClick={onNavigate} className="top-dock__dropdown-all">
                All Mortgage Services
              </Link>
              {mortgageServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/mortgage-services/${service.slug}`}
                  onClick={onNavigate}
                  className="top-dock__dropdown-item"
                  aria-current={pathname === `/mortgage-services/${service.slug}` ? 'page' : undefined}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      <style>{`
        .top-dock {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 5px;
          border-radius: 999px;
          background: linear-gradient(180deg, #221c12 0%, #0d0b07 100%);
          border: 1px solid rgba(201, 162, 74, 0.16);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .top-dock__group { position: relative; }
        .top-dock__item {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 15px;
          border-radius: 999px;
          color: var(--paper-dim);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          white-space: nowrap;
          transform-origin: center bottom;
          transform: scale(var(--dock-scale-w, 1), var(--dock-scale-h, 1))
            translateY(calc(var(--dock-drop, 0) * -1px));
          transition: color 0.2s ease, background 0.2s ease;
        }
        .top-dock__item:hover {
          color: var(--gold-bright);
        }
        .top-dock__item[aria-current='page'] {
          color: var(--gold);
          background: rgba(201, 162, 74, 0.12);
        }
        .top-dock__icon svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.3;
          stroke-linecap: round;
          stroke-linejoin: round;
          display: block;
        }
        .top-dock__chevron { flex-shrink: 0; opacity: 0.75; transition: transform 0.2s ease; }
        .top-dock__group:hover .top-dock__chevron,
        .top-dock__group:focus-within .top-dock__chevron { transform: rotate(180deg); }

        .top-dock__dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          min-width: 240px;
          display: grid;
          gap: 2px;
          padding: 10px;
          background: #0d0b07;
          border: 1px solid rgba(201, 162, 74, 0.2);
          border-radius: 14px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.55);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
          z-index: 50;
        }
        .top-dock__group:hover .top-dock__dropdown,
        .top-dock__group:focus-within .top-dock__dropdown {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        .top-dock__dropdown-all {
          padding: 10px 14px;
          border-radius: 9px;
          color: var(--gold);
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid rgba(201, 162, 74, 0.16);
          margin-bottom: 4px;
          transition: background 0.2s ease;
        }
        .top-dock__dropdown-all:hover { background: rgba(201, 162, 74, 0.1); }
        .top-dock__dropdown-item {
          padding: 10px 14px;
          border-radius: 9px;
          color: var(--paper-dim);
          font-size: 0.8125rem;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .top-dock__dropdown-item:hover { background: rgba(201, 162, 74, 0.1); color: var(--gold-bright); }
        .top-dock__dropdown-item[aria-current='page'] { color: var(--gold); }

        @media (max-width: 980px) {
          .top-dock__label { display: none; }
          .top-dock__item { padding: 10px; }
          .top-dock__chevron { display: none; }
          .top-dock__dropdown { display: none; }
        }
      `}</style>
    </nav>
  );
}
