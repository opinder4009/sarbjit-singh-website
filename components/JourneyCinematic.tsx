'use client';

import { useEffect, useRef, useState } from 'react';
import { brand } from '@/lib/brand';
import Reveal from './Reveal';

export default function JourneyCinematic() {
  const progressRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    try {
      reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    let ticking = false;
    const render = () => {
      ticking = false;
      const scroll = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.width = `${max > 0 ? (scroll / max) * 100 : 0}%`;
      if (heroImageRef.current && !reducedRef.current) {
        const hp = Math.min(1, Math.max(0, scroll / window.innerHeight));
        heroImageRef.current.style.transform = `scale(${1.12 + hp * 0.1})`;
      }
    };
    const requestRender = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };
    window.addEventListener('scroll', requestRender, { passive: true });
    render();
    return () => window.removeEventListener('scroll', requestRender);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <div className="jc-root">
      <div ref={progressRef} className="jc-progress" />

      <header className="jc-hero">
        <div ref={heroImageRef} className="jc-hero-image" />
        <div className="jc-hero-content">
          <h1 className="jc-hero-h1">
            <span className="jc-word-clip">
              <span>
                The <span className="jc-em">Journey.</span>
              </span>
            </span>
          </h1>
          <p className="jc-hero-desc jc-desc-in">Experience. Trust. A New Chapter.</p>
        </div>
        <div className="jc-hero-bottom jc-bottom-in">
          <div className="jc-scroll-cue">
            <div className="jc-scroll-icon" />
            Scroll to enter the story
          </div>
        </div>
      </header>

      <main>
        <section className="jc-section jc-lead">
          <div>
            <p className="eyebrow">01 / Experience, trust, a new chapter</p>
            <Reveal>
              <h2 className="jc-heading">
                Built on
                <br />
                <span style={{ color: 'var(--gold)' }}>experience.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <div className="jc-muted jc-lead-text">
              <p>
                Every meaningful journey is built on experience, relationships, and the confidence to keep moving
                forward. Mine has always been rooted in helping people make important financial decisions with
                clarity, care, and a long-term perspective.
              </p>
              <p>
                Over the years, my work with RBC shaped my approach to financing, strengthened my understanding of
                the industry, and allowed me to build relationships with clients whose goals extended far beyond a
                single transaction.
              </p>
              <p>
                Today, I&apos;m taking everything I&apos;ve learned into a new chapter — one built around my
                experience, my values, and my vision for what comes next.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="jc-section">
          <p className="eyebrow">02 / A career built on trust</p>
          <Reveal>
            <h2 className="jc-heading">
              A career built on
              <br />
              <span style={{ color: 'var(--gold)' }}>trust.</span>
            </h2>
          </Reveal>
          <div className="jc-muted jc-trust-text">
            <p>
              My years at RBC were defined by dedication, meaningful client relationships, and a commitment to
              finding the right solutions. Being recognized among Canada&apos;s top mortgage specialists was an
              important milestone, but the greatest reward has always been the trust clients placed in me.
            </p>
            <p>
              The experience I gained continues to shape how I approach every opportunity: thoughtfully,
              strategically, and with an understanding that every client&apos;s circumstances are different.
            </p>
          </div>
        </section>

        <section className="jc-section">
          <p className="eyebrow">03 / The milestones</p>
          <Reveal>
            <h2 className="jc-heading">
              The
              <br />
              <span style={{ color: 'var(--gold)' }}>milestones.</span>
            </h2>
          </Reveal>
          <div className="jc-milestones">
            {[
              {
                range: '2009–2020',
                title: 'A Standard of Excellence',
                body: "Years of dedication, client service, and professional achievement. Recognition through RBC's Chairman's Roundtable reflected a consistent commitment to performance and relationships.",
              },
              {
                range: '2021–2025',
                title: 'Experience in Motion',
                body: 'Continuing my work with RBC, I remained focused on helping clients navigate residential mortgage opportunities. Each transaction brought new perspectives, strengthened relationships, and valuable experience that continues to inform my approach.',
              },
              {
                range: '2026',
                title: 'A New Chapter',
                body: "With years of experience behind me and a clear vision ahead, I'm stepping into a new chapter of my professional journey. It's an opportunity to build on what I know, bring my own perspective to the table, and create something that reflects the way I believe clients should be served.",
              },
            ].map((m) => (
              <Reveal key={m.range}>
                <div className="jc-milestone">
                  <p className="eyebrow">
                    {m.range} | {m.title}
                  </p>
                  <p className="jc-muted">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="jc-pull">The foundation is established. The vision is taking shape. And this is only the beginning.</p>
        </section>

        <section className="jc-section">
          <p className="eyebrow">04 / What has never changed</p>
          <Reveal>
            <h2 className="jc-heading">
              What has never
              <br />
              <span style={{ color: 'var(--gold)' }}>changed.</span>
            </h2>
          </Reveal>
          <div className="jc-muted jc-trust-text">
            <p>Markets evolve. Opportunities change. Every financial situation brings its own complexities.</p>
            <p>
              What remains constant is my belief in thoughtful advice, honest communication, and solutions built
              around the person — not just the transaction.
            </p>
            <p>
              The next chapter is about bringing those principles forward with greater independence, purpose, and a
              long-term vision.
            </p>
          </div>
          <p className="jc-pull">The experience remains. The vision moves forward.</p>
        </section>

        <section className="jc-section jc-close">
          <Reveal>
            <h2 className="jc-heading">
              Let&apos;s begin a
              <br />
              <span style={{ color: 'var(--gold)' }}>conversation.</span>
            </h2>
          </Reveal>
          <p className="jc-muted">
            Every great relationship starts with a conversation. If you&apos;re considering your next move,
            I&apos;d welcome the opportunity to connect.
          </p>
        </section>

        <section className="jc-section" id="awards">
          <p className="eyebrow">05 / The archive</p>
          <Reveal>
            <h2 className="jc-heading">
              A legacy in
              <br />
              <span style={{ color: 'var(--gold)' }}>six frames.</span>
            </h2>
          </Reveal>
          <p className="jc-muted">
            A curated look at the actual framed memorabilia. Select a photograph to inspect it at a larger size.
            Drag or swipe the gallery to explore.
          </p>
          <div className="jc-gallery">
            {brand.journeyAwards.map((award) => (
              <div
                key={award.year}
                className="jc-award"
                tabIndex={0}
                role="button"
                aria-label={`Enlarge ${award.label}`}
                onClick={() => setLightbox({ src: award.image, alt: award.label })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setLightbox({ src: award.image, alt: award.label });
                }}
              >
                <img src={award.image} loading="lazy" alt={award.label} />
                <b>{award.label.toUpperCase()}</b>
              </div>
            ))}
          </div>
          <p className="eyebrow">← DRAG / SWIPE TO EXPLORE →</p>
        </section>
      </main>

      {lightbox && (
        <div
          className="jc-modal open"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged award photograph"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
        >
          <button type="button" className="jc-modal-close" onClick={() => setLightbox(null)}>
            CLOSE ×
          </button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}

      <style>{`
        .jc-root { position: relative; background: var(--ink); color: var(--paper); }
        .jc-progress { position: fixed; top: 0; left: 0; width: 0; height: 2px; background: var(--gold); z-index: 1000; }

        .jc-hero { height: 92svh; min-height: 620px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; }
        .jc-hero-image {
          position: absolute; inset: -10%;
          background-image:
            linear-gradient(0deg, var(--ink) 1%, transparent 40%, rgba(10,10,10,0.3) 100%),
            url('/photos/journey/sabbie-desk-portrait.jpg');
          background-position: center, center 30%;
          background-size: cover;
          filter: brightness(0.62) saturate(0.92) contrast(1.04);
          transform: scale(1.12);
          will-change: transform;
        }
        .jc-hero::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 18%, rgba(10,10,10,0.82) 100%); pointer-events: none; }
        .jc-hero-content { position: relative; z-index: 2; width: min(100%, 1100px); padding: 70px 24px 0; margin-top: 23vh; }
        .jc-hero-h1 { font-family: var(--font-editorial); font-weight: 400; font-size: clamp(2.5rem, 7vw, 6rem); letter-spacing: -0.02em; line-height: 1.04; margin: 24px 0 0; white-space: nowrap; }
        .jc-em { font-style: italic; color: var(--gold); letter-spacing: 0.01em; }
        .jc-hero-desc { font-size: clamp(0.8125rem, 1.2vw, 1rem); font-weight: 300; line-height: 1.9; color: var(--paper-dim); max-width: 480px; margin: 32px auto 0; }
        .jc-hero-bottom {
          position: absolute; bottom: 28px; left: var(--edge); right: var(--edge); z-index: 4;
          display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper-dim);
        }
        .jc-scroll-cue { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .jc-scroll-icon { width: 22px; height: 38px; border: 1px solid rgba(242,239,233,0.4); border-radius: 16px; position: relative; }
        .jc-scroll-icon::after { content: ''; position: absolute; left: 9px; top: 7px; width: 2px; height: 8px; background: var(--gold); animation: jc-scroll-mouse 2s infinite; }
        @keyframes jc-scroll-mouse { to { transform: translateY(13px); opacity: 0; } }

        .jc-word-clip { overflow: hidden; display: block; padding-bottom: 0.18em; margin-bottom: -0.18em; }
        .jc-word-clip > span { display: block; transform: translateY(115%); animation: jc-hero-in 1.1s cubic-bezier(.22,1,.36,1) forwards; }
        .jc-word-clip:nth-child(2) span { animation-delay: 0.22s; }
        @keyframes jc-hero-in { to { transform: translateY(0); } }

        .jc-eyebrow-in { opacity: 0; animation: jc-fade-up 0.9s ease 0.05s forwards; }
        .jc-desc-in { opacity: 0; animation: jc-fade-up 0.9s ease 0.95s forwards; }
        .jc-bottom-in { opacity: 0; animation: jc-fade-up 0.9s ease 1.2s forwards; }
        .jc-fade-in { opacity: 0; animation: jc-fade-up 1s ease 0.5s forwards; }
        @keyframes jc-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

        .jc-section { padding: clamp(80px, 11vh, 125px) var(--edge); }
        .jc-heading { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: clamp(2.25rem, 6vw, 4.75rem); line-height: 0.98; margin: 16px 0 30px; }
        .jc-muted { color: var(--paper-dim); line-height: 1.9; }
        .jc-lead { display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; align-items: center; border-top: 1px solid var(--line); }
        .jc-lead-text { font-size: 1.0625rem; }
        .jc-lead-text p, .jc-trust-text p { margin: 0 0 18px; }
        .jc-lead-text p:last-child, .jc-trust-text p:last-child { margin-bottom: 0; }
        .jc-trust-text { max-width: 720px; font-size: 1.0625rem; }
        .jc-rule { height: 1px; background: var(--line-strong); margin: 26px 0; }

        .jc-milestones { display: grid; gap: 14px; margin-top: 40px; max-width: 780px; }
        .jc-milestone { border-top: 1px solid var(--line); padding: 28px 0; }
        .jc-milestone .jc-muted { margin-top: 10px; max-width: 620px; }
        .jc-pull {
          font-family: var(--font-editorial); font-style: italic; font-weight: 400;
          font-size: clamp(1.125rem, 1.8vw, 1.5rem); color: var(--gold); line-height: 1.5;
          margin-top: 44px; max-width: 560px;
        }
        .jc-close { text-align: center; border-top: 1px solid var(--line); }
        .jc-close .jc-heading { margin-left: auto; margin-right: auto; }
        .jc-close .jc-muted { max-width: 480px; margin: 0 auto; font-size: 1.0625rem; }

        .jc-gallery { display: flex; gap: 20px; overflow: auto; scroll-snap-type: x mandatory; padding: 36px 0 20px; scrollbar-color: var(--gold) transparent; }
        .jc-award { position: relative; flex: 0 0 min(60vw, 700px); height: min(50vw, 480px); min-height: 320px; scroll-snap-align: center; overflow: hidden; background: var(--panel); border: 1px solid var(--line); cursor: zoom-in; }
        .jc-award img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.6s; background: var(--panel); }
        .jc-award:hover img { transform: scale(1.04); }
        .jc-award b { position: absolute; bottom: 0; left: 0; right: 0; padding: 44px 22px 20px; background: linear-gradient(transparent, rgba(0,0,0,0.85)); font-size: 0.6875rem; letter-spacing: 0.16em; font-weight: 500; }

        .jc-modal { position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.92); display: none; align-items: center; justify-content: center; padding: 5vw; cursor: zoom-out; }
        .jc-modal.open { display: flex; }
        .jc-modal img { max-width: 95vw; max-height: 86vh; object-fit: contain; box-shadow: 0 30px 90px rgba(0,0,0,0.6); }
        .jc-modal-close {
          position: absolute; top: 22px; right: 26px; background: rgba(30,30,30,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.4);
          padding: 10px 15px; font-size: 0.75rem; letter-spacing: 0.08em; cursor: pointer;
        }
        .jc-modal-close:hover { border-color: var(--gold); color: var(--gold); }

        @media (max-width: 760px) {
          .jc-hero { min-height: 560px; }
          .jc-hero-h1 { font-size: clamp(1.75rem, 10.5vw, 3rem); }
          .jc-hero-bottom { font-size: 0.5625rem; }
          .jc-section { padding: 80px 6vw; }
          .jc-lead { grid-template-columns: 1fr; gap: 24px; }
          .jc-award { flex-basis: 85vw; height: 340px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .jc-word-clip > span { animation: none; transform: none; }
        }
      `}</style>
    </div>
  );
}
