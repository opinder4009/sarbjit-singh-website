import { brand } from '@/lib/brand';
import Reveal from './Reveal';
import AnimatedButton from './AnimatedButton';

const TIER_ACCENT: Record<string, { badge: string; border: string }> = {
  Gold: { badge: 'linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 60%, var(--gold-deep) 100%)', border: 'var(--line-strong)' },
  Platinum: { badge: 'linear-gradient(135deg, #e8e8ea 0%, #b8b9bd 60%, #8c8c92 100%)', border: 'var(--line-strong)' },
  Diamond: { badge: 'linear-gradient(135deg, #fdf3df 0%, var(--gold-bright) 45%, var(--gold-deep) 100%)', border: 'var(--gold)' },
};

export default function LoyaltyProgram() {
  return (
    <section
      id="loyalty"
      style={{
        background: 'var(--ink)',
        padding: 'clamp(72px, 12vh, 140px) var(--edge)',
        borderTop: '1px solid var(--line)',
        scrollMarginTop: 96,
      }}
    >
      <Reveal>
        <div style={{ maxWidth: 640, marginBottom: 'clamp(48px, 7vh, 88px)' }}>
          <p className="eyebrow">{brand.loyaltyEyebrow}</p>
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
            {brand.loyaltyHeading}
          </h2>
          <p style={{ marginTop: 18, color: 'var(--paper-dim)', fontSize: '1.0625rem', lineHeight: 1.65, maxWidth: 560 }}>
            {brand.loyaltyIntro}
          </p>
        </div>
      </Reveal>

      <div className="loyalty-grid">
        {brand.loyaltyTiers.map((t) => {
          const accent = TIER_ACCENT[t.tier] ?? TIER_ACCENT.Gold;
          const featured = 'featured' in t && t.featured;
          return (
            <Reveal key={t.tier}>
              <div
                className="loyalty-card"
                style={{
                  border: `1px solid ${accent.border}`,
                  boxShadow: featured ? '0 0 0 1px var(--gold), 0 24px 60px rgba(201,162,74,0.12)' : 'none',
                }}
              >
                {featured && <span className="loyalty-featured">Top tier</span>}
                <span className="loyalty-badge" style={{ background: accent.badge }}>
                  {t.tier}
                </span>
                <p className="loyalty-unlock">{t.unlock}</p>
                <ul className="loyalty-perks">
                  {t.perks.map((perk) => (
                    <li key={perk}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <p className="loyalty-footnote">No referral fees, commissions, or cash of any kind change hands — status is earned purely through referrals sent, nothing more.</p>

      <div className="loyalty-cta">
        <AnimatedButton href={`mailto:${brand.email}?subject=${encodeURIComponent("Let's discuss a deal")}`}>
          Discuss A Deal With Me
        </AnimatedButton>
      </div>

      <style>{`
        .loyalty-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .loyalty-card {
          position: relative;
          height: 100%;
          background: var(--panel);
          border-radius: 14px;
          padding: clamp(24px, 2.6vw, 32px);
        }
        .loyalty-featured {
          position: absolute;
          top: -11px;
          left: 24px;
          background: var(--gold);
          color: var(--ink);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
        }
        .loyalty-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 0.02em;
          color: var(--ink);
          padding: 6px 18px;
          border-radius: 999px;
        }
        .loyalty-unlock {
          margin-top: 16px;
          color: var(--paper-dim);
          font-size: 0.875rem;
          line-height: 1.5;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--line);
        }
        .loyalty-perks {
          list-style: none;
          margin: 18px 0 0;
          padding: 0;
          display: grid;
          gap: 13px;
        }
        .loyalty-perks li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--paper);
          font-size: 0.9375rem;
          line-height: 1.5;
        }
        .loyalty-perks svg { flex-shrink: 0; margin-top: 2px; }
        .loyalty-footnote {
          margin-top: 28px;
          color: var(--paper-dim);
          font-size: 0.8125rem;
          opacity: 0.75;
          max-width: 640px;
        }
        .loyalty-cta {
          margin-top: 32px;
        }
        @media (max-width: 900px) {
          .loyalty-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
