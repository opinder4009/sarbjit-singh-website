import Link from 'next/link';
import { brand } from '@/lib/brand';

const exploreLinks = [
  { href: '/mortgage-services', label: 'Mortgage Services' },
  { href: '/mortgage-guide', label: 'Mortgage Guide' },
  { href: '/lifestyle', label: 'Lifestyle' },
  { href: '/my-journey', label: 'My Journey' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/#contact', label: 'Book Appointment' },
];

function AllianceBadge({ compact }: { compact?: boolean }) {
  return (
    <a
      href="https://www.mortgagealliance.com/en/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Mortgage Alliance member — opens mortgagealliance.com"
      className="alliance-badge"
      style={{ height: compact ? 26 : 30 }}
    >
      <img src="/images/mortgage-alliance-logo.svg" alt="Mortgage Alliance" />
    </a>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, var(--ink) 0%, #000828 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 55% 60% at 50% 0%, rgba(201,162,74,0.1) 0%, rgba(201,162,74,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, var(--gold-dim) 50%, transparent 100%)',
        }}
      />

      <div
        className="footer-grid"
        style={{
          position: 'relative',
          padding: 'clamp(48px, 7vh, 72px) var(--edge) 0',
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 1.3fr) minmax(140px, 0.8fr) minmax(200px, 1fr) minmax(220px, 1.2fr)',
          gap: 'clamp(28px, 4vw, 48px)',
        }}
      >
        <div>
          <img
            src="/images/logo-ss-shield.webp"
            alt={brand.name}
            style={{ height: 64, width: 'auto', display: 'block' }}
          />
          <p style={{ marginTop: 16, color: 'var(--paper)', fontSize: '0.9375rem', fontWeight: 600 }}>
            {brand.fullName}
          </p>
          <p style={{ marginTop: 4, color: 'var(--gold)', fontSize: '0.8125rem', fontWeight: 600 }}>
            {brand.footerTagline}
          </p>
          <p style={{ marginTop: 6, color: 'var(--steel)', fontSize: '0.75rem', lineHeight: 1.6 }}>
            {brand.footerStatLine}
          </p>

          <div style={{ marginTop: 24 }}>
            <p style={{ color: 'var(--steel)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Proud Member Of
            </p>
            <AllianceBadge />
          </div>
        </div>

        <div className="footer-col">
          <p style={{ color: 'var(--steel)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            Explore
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link"
                style={{ color: 'var(--paper-dim)', fontSize: '0.8125rem', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-col" style={{ color: 'var(--paper-dim)', fontSize: '0.8125rem', lineHeight: 1.9 }}>
          <p>{brand.title}</p>
          <p>{brand.license}</p>
          <p>{brand.officeAddress}</p>
          <p style={{ marginTop: 4 }}>
            <a href={`tel:+1${brand.phone.replace(/\D/g, '')}`} className="footer-link" style={{ color: 'var(--paper-dim)', textDecoration: 'none' }}>
              {brand.phone}
            </a>
            {' · '}
            <a href={`mailto:${brand.email}`} className="footer-link" style={{ color: 'var(--paper-dim)', textDecoration: 'none' }}>
              {brand.email}
            </a>
          </p>
        </div>

        <div className="footer-col">
          <p style={{ color: 'var(--steel)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Areas Served
          </p>
          <p style={{ marginTop: 8, color: 'var(--paper-dim)', fontSize: '0.8125rem', lineHeight: 1.8 }}>
            {brand.serviceAreas.join(' · ')}
          </p>
        </div>
      </div>

      <div
        className="footer-bottom"
        style={{
          position: 'relative',
          marginTop: 'clamp(32px, 5vh, 48px)',
          borderTop: '1px solid var(--line)',
          padding: '22px var(--edge)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <p style={{ color: 'var(--steel)', fontSize: '0.75rem', letterSpacing: '0.04em', margin: 0 }}>
          © {year} {brand.name}. All rights reserved.
        </p>
        <a
          href="https://ardy.media/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          style={{ color: 'var(--steel)', fontSize: '0.75rem', letterSpacing: '0.04em', textDecoration: 'none' }}
        >
          Designed and developed by Ardy Media
        </a>
      </div>

      <style>{`
        .footer-col {
          border-left: 1px solid var(--line);
          padding-left: clamp(20px, 3vw, 32px);
        }
        .footer-link { transition: color 0.2s ease; }
        .footer-link:hover { color: var(--gold) !important; }
        .alliance-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          background: #fff;
          border-radius: 8px;
          line-height: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .alliance-badge:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,0.35); }
        .alliance-badge img { height: 100%; width: auto; display: block; }

        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-col { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--line); padding-top: 20px !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
