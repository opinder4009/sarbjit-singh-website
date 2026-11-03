import { brand } from '@/lib/brand';
import Reveal from './Reveal';

export default function About() {
  return (
    <section
      className="about-grid"
      style={{
        background: 'var(--ink)',
        padding: 'clamp(72px, 12vh, 140px) var(--edge)',
        borderTop: '1px solid var(--line)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 7fr) minmax(260px, 5fr)',
        gap: 'clamp(40px, 6vw, 88px)',
      }}
    >
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <p className="eyebrow" style={{ margin: 0 }}>{brand.aboutEyebrow}</p>
          <span style={{ flex: 1, height: 1, background: 'var(--gold-dim)', opacity: 0.4 }} />
        </div>

        <p
          style={{
            marginTop: 18,
            color: 'var(--steel)',
            fontSize: '0.9375rem',
            fontStyle: 'italic',
          }}
        >
          {brand.aboutTagline}
        </p>

        <p
          style={{
            marginTop: 12,
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.1rem, 3.6vw, 3.75rem)',
            lineHeight: 1.12,
            color: 'var(--paper)',
            maxWidth: 700,
          }}
        >
          {brand.aboutHeading}
        </p>

        <p
          className="about-intro"
          style={{
            marginTop: 32,
            maxWidth: 560,
            color: 'var(--paper-dim)',
            fontSize: '1.0625rem',
            lineHeight: 1.7,
          }}
        >
          {brand.aboutIntro}
        </p>
        <p
          style={{
            marginTop: 16,
            maxWidth: 560,
            color: 'var(--paper-dim)',
            fontSize: '1.0625rem',
            lineHeight: 1.7,
          }}
        >
          {brand.aboutBody}
        </p>
      </Reveal>

      <Reveal>
        <div
          className="about-sidebar"
          style={{
            borderLeft: '1px solid var(--line-strong)',
            paddingLeft: 'clamp(24px, 3vw, 40px)',
            marginTop: 'clamp(8px, 4vw, 48px)',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid var(--gold-dim)',
              position: 'relative',
            }}
          >
            <img
              src="/photos/hero-seated.jpg"
              alt={brand.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
              }}
            />
          </div>

          <p
            style={{
              marginTop: 24,
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              lineHeight: 1.55,
              color: 'var(--gold)',
            }}
          >
            {brand.credentialLine}
          </p>
          <p
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--line)',
              color: 'var(--steel)',
              fontSize: '0.9375rem',
              letterSpacing: '0.02em',
            }}
          >
            — {brand.name}
          </p>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
            <p style={{ color: 'var(--steel)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Speaks
            </p>
            <p style={{ marginTop: 8, color: 'var(--paper-dim)', fontSize: '0.875rem' }}>
              {brand.languages.join(' · ')}
            </p>
          </div>
        </div>
      </Reveal>

      <style>{`
        .about-intro::first-letter {
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 3.75em;
          font-weight: 500;
          color: var(--gold);
          float: left;
          line-height: 0.8;
          margin: 0.03em 0.1em 0 0;
        }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-sidebar { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--line); padding-top: 32px !important; margin-top: 40px !important; }
        }
      `}</style>
    </section>
  );
}
