'use client';

import { useEffect, useRef, useState } from 'react';
import { brand } from '@/lib/brand';

function StatItem({
  stat,
  index,
}: {
  stat: { value: string; unit: string; label: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="stat-item"
      style={{
        borderLeft: index === 0 ? 'none' : '1px solid var(--line)',
        padding: '0 clamp(20px, 3vw, 40px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      <span className="stat-rule" />
      <div
        style={{
          fontFamily: 'var(--font-editorial)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(2.125rem, 3.4vw, 3rem)',
          color: 'var(--paper)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {stat.value}
        {stat.unit && (
          <sup style={{ fontSize: '0.46em', fontStyle: 'normal', fontWeight: 600, color: 'var(--gold)', marginLeft: 2 }}>
            {stat.unit}
          </sup>
        )}
      </div>
      <p style={{ marginTop: 12, fontSize: '0.875rem', color: 'var(--steel)', lineHeight: 1.5 }}>{stat.label}</p>
    </div>
  );
}

export default function StatTicker() {
  return (
    <div
      className="stat-rail"
      style={{
        position: 'relative',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--panel)',
        padding: 'clamp(40px, 6vh, 60px) var(--edge)',
        overflow: 'hidden',
      }}
    >
      <div className="stat-glow" aria-hidden="true" />
      {brand.stats.map((s, i) => (
        <StatItem key={i} stat={s} index={i} />
      ))}

      <style>{`
        .stat-rail {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .stat-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(60% 140% at 50% 0%, rgba(201, 162, 74, 0.07), transparent 70%);
        }
        .stat-item { position: relative; z-index: 1; }
        .stat-rule {
          display: block;
          width: 28px;
          height: 1px;
          background: var(--gold-dim);
          margin-bottom: 16px;
        }
        @media (max-width: 640px) {
          .stat-rail { grid-template-columns: 1fr; }
          .stat-item { border-left: none !important; border-top: 1px solid var(--line); padding-top: 24px !important; }
          .stat-item:first-of-type { border-top: none; padding-top: 0 !important; }
        }
      `}</style>
    </div>
  );
}
