'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brand } from '@/lib/brand';
import { mortgageServices } from '@/lib/mortgageServices';
import AnimatedButton from './AnimatedButton';
import TopDock from './TopDock';

const links = [
  { href: '/mortgage-guide', label: 'Mortgage Guide' },
  { href: '/lifestyle', label: 'Lifestyle' },
  { href: '/#loyalty', label: 'Partner Program' },
  { href: '/my-journey', label: 'My Journey' },
  { href: '/blogs', label: 'Blogs' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const servicesActive = pathname.startsWith('/mortgage-services');

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(1, 12, 58, 0.45)',
        backdropFilter: 'blur(18px) saturate(160%)',
        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        borderBottom: '1px solid rgba(242, 239, 233, 0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px var(--edge)',
        }}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--paper)',
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/logo-ss-shield.webp"
            alt={brand.name}
            style={{ height: 'clamp(52px, 6vw, 76px)', width: 'auto', display: 'block' }}
          />
        </Link>

        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <TopDock />
          <AnimatedButton href={brand.applicationUrl} target="_blank" rel="noopener noreferrer" compact>
            Start Application
          </AnimatedButton>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="nav-toggle"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            padding: 6,
            cursor: 'pointer',
          }}
        >
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M1 1l16 16M17 1L1 17"
                stroke="var(--paper)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M0 1h24M0 9h24M0 17h24"
                stroke="var(--paper)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="nav-mobile"
          style={{
            display: 'none',
            flexDirection: 'column',
            padding: '4px var(--edge) 28px',
            gap: 4,
            borderTop: '1px solid var(--line)',
          }}
        >
          <div style={{ borderBottom: '1px solid var(--line)' }}>
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'transparent',
                border: 'none',
                color: servicesActive ? 'var(--gold)' : 'var(--paper)',
                fontSize: '1.0625rem',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              Mortgage Services
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
              >
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {servicesOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 12 }}>
                <Link
                  href="/mortgage-services"
                  onClick={() => setOpen(false)}
                  style={{ color: 'var(--gold)', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', padding: '8px 0' }}
                >
                  All Mortgage Services
                </Link>
                {mortgageServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/mortgage-services/${service.slug}`}
                    onClick={() => setOpen(false)}
                    style={{
                      color: pathname === `/mortgage-services/${service.slug}` ? 'var(--gold)' : 'var(--paper-dim)',
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                      padding: '8px 0 8px 14px',
                    }}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: pathname === link.href ? 'var(--gold)' : 'var(--paper)',
                fontSize: '1.0625rem',
                textDecoration: 'none',
                padding: '14px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <AnimatedButton
            href={brand.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            compact
            style={{ marginTop: 16, width: '100%' }}
          >
            Start Application
          </AnimatedButton>
        </nav>
      )}

      <style>{`
        @media (max-width: 760px) {
          .nav-links { display: none !important; }
          .nav-toggle { display: inline-flex !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
