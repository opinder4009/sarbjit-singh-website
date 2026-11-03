import Link from 'next/link';
import { brand } from '@/lib/brand';
import { getMortgageServiceBySlug } from '@/lib/mortgageServices';
import MortgageServiceIcon from './MortgageServiceIcon';
import Reveal from './Reveal';

export default function Specialties() {
  return (
    <section
      style={{
        background: 'var(--panel)',
        padding: 'clamp(72px, 12vh, 140px) var(--edge)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <Reveal>
        <div style={{ maxWidth: 640, marginBottom: 'clamp(48px, 7vh, 88px)' }}>
          <p className="eyebrow">{brand.specialtiesEyebrow}</p>
          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 3.6vw, 3.5rem)',
              lineHeight: 1.08,
              color: 'var(--paper)',
              marginTop: 16,
            }}
          >
            {brand.specialtiesHeading}
          </h2>
        </div>
      </Reveal>

      <div style={{ borderTop: '1px solid var(--line-strong)' }}>
        {brand.specialties.map((item) => (
          <div
            key={item.index}
            className="directory-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(180px, 320px) 1fr',
              gap: 'clamp(16px, 4vw, 56px)',
              padding: 'clamp(26px, 4vh, 36px) 0',
              borderBottom: '1px solid var(--line)',
              alignItems: 'baseline',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
                color: 'var(--paper)',
              }}
            >
              {item.title}
            </h3>
            <div>
              <p
                style={{
                  color: 'var(--paper-dim)',
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  maxWidth: 540,
                }}
              >
                {item.body}
              </p>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {item.services.map((slug) => {
                  const service = getMortgageServiceBySlug(slug);
                  if (!service) return null;
                  return (
                    <Link key={slug} href={`/mortgage-services/${slug}`} className="service-pill">
                      <MortgageServiceIcon slug={slug} size={14} />
                      {service.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 24px' }}>
        <Link href="/mortgage-guide" className="specialties-cta">
          See the full mortgage guide
        </Link>
        <span style={{ color: 'var(--line-strong)' }}>·</span>
        <Link href="/mortgage-services" className="specialties-cta">
          All mortgage services
        </Link>
      </div>

      <style>{`
        .specialties-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-size: 0.9375rem;
          font-weight: 600;
          text-decoration: none;
        }
        .service-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px 7px 10px;
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          color: var(--paper-dim);
          font-size: 0.8125rem;
          text-decoration: none;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .service-pill:hover {
          border-color: var(--gold-dim);
          color: var(--gold-bright);
          background: rgba(201,162,74,0.08);
        }
        @media (max-width: 640px) {
          .directory-row { grid-template-columns: 1fr !important; gap: 10px !important; }
        }
      `}</style>
    </section>
  );
}
