'use client';

import { useEffect, useRef } from 'react';
import { brand } from '@/lib/brand';
import Reveal from './Reveal';

const star = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" aria-hidden="true">
    <path d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.6 6.9L12 17.6l-6.2 3.6 1.6-6.9L2.1 9.6l7-.7L12 2.5Z" />
  </svg>
);

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

const COUNT = brand.reviews.length;

export default function Reviews() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const meterRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    let ticking = false;

    const render = () => {
      ticking = false;
      const stage = stageRef.current;
      if (!stage) return;

      const isDesktop = window.innerWidth > 800;

      if (!isDesktop || reduced) {
        cardRefs.current.forEach((card) => {
          if (!card) return;
          card.style.transform = '';
          card.style.opacity = '';
          card.style.zIndex = '';
          card.style.filter = '';
        });
        if (meterRef.current && trackRef.current) {
          const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
          meterRef.current.style.width = `${maxScroll ? (trackRef.current.scrollLeft / maxScroll) * 100 : 0}%`;
        }
        return;
      }

      const rect = stage.getBoundingClientRect();
      const range = stage.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, range)));
      const centerIndex = p * (COUNT - 1);
      const spacing = Math.max(240, Math.min(360, window.innerWidth * 0.24));

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const delta = i - centerIndex;
        const absDelta = Math.abs(delta);
        const focus = Math.exp(-(delta * delta) * 0.85);

        const x = delta * spacing;
        const y = absDelta * 12 - focus * 8;
        const z = -absDelta * 150 + focus * 40;
        const rotateY = -delta * 24;
        const scale = 0.7 + focus * 0.36;
        const opacity = Math.max(0.12, 1 - absDelta * 0.3);
        const blur = Math.max(0, absDelta - 0.65) * 2.6;

        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.opacity = String(opacity.toFixed(3));
        card.style.zIndex = String(Math.round(1000 - absDelta * 10));
        card.style.filter = `blur(${blur.toFixed(2)}px)`;
      });

      if (meterRef.current) meterRef.current.style.width = `${p * 100}%`;
      if (countRef.current) {
        const active = Math.min(COUNT, Math.floor(p * COUNT) + 1);
        countRef.current.textContent = `${String(active).padStart(2, '0')} / ${String(COUNT).padStart(2, '0')}`;
      }
    };

    const requestRender = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    trackRef.current?.addEventListener('scroll', requestRender, { passive: true });
    render();

    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      trackRef.current?.removeEventListener('scroll', requestRender);
    };
  }, []);

  return (
    <section
      style={{
        background: 'var(--ink)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div style={{ padding: 'clamp(72px, 12vh, 140px) var(--edge) clamp(40px, 6vh, 72px)' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 680 }}>
            <p className="eyebrow" style={{ margin: 0 }}>{brand.reviewsEyebrow}</p>
            <span style={{ flex: 1, height: 1, background: 'var(--gold-dim)', opacity: 0.4 }} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 3.6vw, 3.5rem)',
              lineHeight: 1.1,
              color: 'var(--paper)',
              marginTop: 20,
            }}
          >
            {brand.reviewsHeading}
          </h2>
        </Reveal>
      </div>

      <section ref={stageRef} className="rv-stage">
        <div className="rv-sticky">
          <div className="rv-bg" />
          <div className="rv-perspective">
            <div ref={trackRef} className="rv-track">
              {brand.reviews.map((review, i) => (
                <article
                  key={review.name}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="rv-card"
                >
                  <div className="rv-card-top">
                    <span className="rv-avatar">{initials(review.name)}</span>
                    <div className="rv-stars">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <span key={s}>{star}</span>
                      ))}
                    </div>
                  </div>
                  <p className="rv-quote">&ldquo;{review.quote}&rdquo;</p>
                  <div className="rv-foot">
                    <p className="rv-name">{review.name}</p>
                    <p className="rv-src">Google Review</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="rv-footer">
            <div className="rv-meter">
              <div ref={meterRef} />
            </div>
            <span ref={countRef} className="rv-count">01 / {String(COUNT).padStart(2, '0')}</span>
          </div>
        </div>
      </section>

      <style>{`
        .rv-stage { height: ${COUNT * 62}vh; position: relative; }
        .rv-sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; display: flex; align-items: center; }
        .rv-bg { position: absolute; inset: 0; background: radial-gradient(circle at 50% 42%, var(--panel) 0, var(--ink) 68%); }
        .rv-perspective { position: relative; width: 100%; height: 100%; perspective: 1400px; z-index: 1; }
        .rv-track { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; }

        .rv-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(340px, 78vw);
          height: 380px;
          display: flex;
          flex-direction: column;
          padding: clamp(22px, 2.4vw, 28px);
          background: var(--panel);
          border: 1px solid var(--line-strong);
          border-radius: 14px;
          box-shadow: 0 25px 90px rgba(0,0,0,0.5);
          will-change: transform, opacity, filter;
        }
        .rv-card-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .rv-avatar {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid var(--gold-dim);
          background: var(--ink);
          color: var(--gold);
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .rv-stars { display: flex; gap: 2px; }
        .rv-quote {
          margin-top: 18px;
          flex: 1;
          color: var(--paper-dim);
          font-size: 0.9375rem;
          line-height: 1.6;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 7;
        }
        .rv-foot { margin-top: 16px; border-top: 1px solid var(--line); padding-top: 14px; }
        .rv-name { color: var(--paper); font-size: 0.8125rem; font-weight: 600; }
        .rv-src { margin-top: 2px; color: var(--steel); font-size: 0.6875rem; letter-spacing: 0.06em; text-transform: uppercase; }

        .rv-footer { position: absolute; left: var(--edge); bottom: 6vh; right: var(--edge); display: flex; justify-content: space-between; align-items: center; z-index: 5; pointer-events: none; }
        .rv-meter { width: 150px; height: 2px; background: var(--line); }
        .rv-meter div { height: 100%; width: 0; background: var(--gold); }
        .rv-count { font-size: 0.75rem; letter-spacing: 0.18em; color: var(--paper-dim); }

        @media (max-width: 800px) {
          .rv-stage { height: auto; }
          .rv-sticky { height: auto; position: relative; overflow: visible; display: block; padding: 20px 0 64px; }
          .rv-perspective { perspective: none; }
          .rv-track {
            display: flex !important;
            position: relative !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 16px;
            padding: 0 var(--edge);
            transform: none !important;
            height: auto;
            scrollbar-width: none;
          }
          .rv-track::-webkit-scrollbar { display: none; }
          .rv-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            flex: 0 0 82vw;
            height: auto;
            min-height: 320px;
            scroll-snap-align: center;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
          .rv-footer { bottom: 22px; }
        }
      `}</style>
    </section>
  );
}
