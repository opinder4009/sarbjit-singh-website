'use client';

import { useEffect, useRef, useState } from 'react';
import { brand } from '@/lib/brand';
import Reveal from './Reveal';

const GALLERY = [
  {
    num: '01',
    place: 'Glen Abbey · 2019',
    title: 'Flight Champion',
    caption: "Men's B Flight Champion",
    image: '/photos/lifestyle/glen-abbey-b-flight-champion-2019.jpg',
    alt: "Glen Abbey 2019 Men's B Flight Champion award",
  },
  {
    num: '02',
    place: 'Glen Abbey · 2020',
    title: 'Flight Champion',
    caption: "Men's B Flight Champion",
    image: '/photos/lifestyle/glen-abbey-flight-champion-2020.jpg',
    alt: "Glen Abbey 2020 Men's B Flight Champion award",
  },
  {
    num: '03',
    place: 'Glen Abbey · 2020',
    title: 'Hole in One',
    caption: 'Hole in one · Hole #7, 155 yards · September 6',
    image: '/photos/lifestyle/glen-abbey-hole-in-one-2020.jpg',
    alt: 'Glen Abbey 2020 hole in one commemorative flag',
  },
  {
    num: '04',
    place: 'Glencairn · 2022',
    title: 'One Remarkable Shot',
    caption: 'Hole in one · September 16',
    image: '/photos/lifestyle/glencairn-hole-in-one-2022.jpg',
    alt: 'Glencairn 2022 hole in one framed keepsake',
  },
  {
    num: '05',
    place: 'Glen Abbey',
    title: 'A Flight Champion',
    caption: "Men's A Flight Match Play Champion",
    image: '/photos/lifestyle/glen-abbey-a-flight-champion.jpg',
    alt: "Glen Abbey Men's A Flight Match Play Champion award",
  },
  {
    num: '06',
    place: 'Glen Abbey · 2024',
    title: 'Match Play Champion',
    caption: "Men's Match Play Champion",
    image: '/photos/lifestyle/glen-abbey-match-play-champion-2024.jpg',
    alt: "Glen Abbey 2024 Men's Match Play Champion award",
  },
  {
    num: '07',
    place: 'Glen Abbey · 2024',
    title: 'Member / Member',
    caption: "Men's Member / Member Champions",
    image: '/photos/lifestyle/glen-abbey-member-member-2024.jpg',
    alt: 'Glen Abbey 2024 Member/Member Champions award',
  },
];

const MINI_STATS = [
  { year: '2019', label: 'Flight Champion' },
  { year: '2022', label: 'Hole in One' },
  { year: '2024', label: 'Club Achievements' },
];

export default function LifestyleCinematic() {
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    let ticking = false;

    const render = () => {
      ticking = false;
      const scroll = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.width = `${max > 0 ? (scroll / max) * 100 : 0}%`;

      if (!reduced) {
        if (heroImageRef.current) {
          const hp = Math.min(1, Math.max(0, scroll / window.innerHeight));
          heroImageRef.current.style.transform = `scale(${1.12 + hp * 0.16}) translate3d(0, ${hp * 6}%, 0)`;
        }
        if (ringsRef.current) {
          ringsRef.current.style.transform = `rotate(${scroll * 0.018}deg) scale(${1 + Math.sin(scroll * 0.0007) * 0.08})`;
        }
      }

      if (stageRef.current && trackRef.current) {
        if (window.innerWidth > 800) {
          const rect = stageRef.current.getBoundingClientRect();
          const range = stageRef.current.offsetHeight - window.innerHeight;
          const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, range)));
          const travel = Math.max(0, trackRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
          trackRef.current.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
          if (meterRef.current) meterRef.current.style.width = `${p * 100}%`;
          if (countRef.current) {
            const n = GALLERY.length;
            countRef.current.textContent = `${String(Math.min(n, Math.floor(p * n) + 1)).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
          }
        } else {
          trackRef.current.style.transform = 'none';
          const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
          if (meterRef.current) meterRef.current.style.width = `${maxScroll ? (trackRef.current.scrollLeft / maxScroll) * 100 : 0}%`;
        }
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

    let glowHandler: ((e: PointerEvent) => void) | undefined;
    if (window.matchMedia('(pointer: fine)').matches && !reduced) {
      glowHandler = (e) => {
        if (glowRef.current) {
          glowRef.current.style.left = `${e.clientX}px`;
          glowRef.current.style.top = `${e.clientY}px`;
        }
      };
      document.addEventListener('pointermove', glowHandler, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      trackRef.current?.removeEventListener('scroll', requestRender);
      if (glowHandler) document.removeEventListener('pointermove', glowHandler);
    };
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
    <div className="lc-root">
      <div ref={progressRef} className="lc-progress" />
      <div className="lc-noise" aria-hidden="true" />
      <div ref={glowRef} className="lc-glow" aria-hidden="true" />

      <header className="lc-hero">
        <div ref={heroImageRef} className="lc-hero-image" />
        <div className="lc-hero-content">
          <p className="eyebrow lc-eyebrow-in">An editorial look at life off the desk</p>
          <h1 className="lc-hero-h1">
            <span className="lc-word-clip">
              <span>Beyond the</span>
            </span>
            <span className="lc-word-clip">
              <span className="lc-em">ordinary.</span>
            </span>
          </h1>
          <p className="lc-hero-desc lc-desc-in">
            Some achievements are measured in closings. Others are found in the moments that make the journey
            worthwhile.
          </p>
        </div>
        <div className="lc-hero-bottom lc-bottom-in">
          <div className="lc-scroll-cue">
            <div className="lc-scroll-icon" />
            Scroll to explore
          </div>
        </div>
      </header>

      <main>
        <section className="lc-intro">
          <div>
            <p className="eyebrow">01 / The person behind the profession</p>
            <Reveal>
              <h2 className="lc-intro-h2">
                A life of <i>passion</i> &amp; purpose.
              </h2>
            </Reveal>
            <Reveal>
              <div className="lc-rule" />
            </Reveal>
            <Reveal>
              <p className="lc-intro-p">
                Beyond the closing calls, there&apos;s a quieter story of discipline, focus, friendships and personal
                milestones. Golf is one of the places where those values come into view.
              </p>
            </Reveal>
            <Reveal>
              <p className="lc-intro-p" style={{ marginTop: 20 }}>
                A collection of meaningful moments on the course — preserved here as a glimpse of life beyond
                business.
              </p>
            </Reveal>
            <Reveal>
              <div className="lc-mini-stats">
                {MINI_STATS.map((s) => (
                  <div key={s.year}>
                    <b>{s.year}</b>
                    <small>{s.label}</small>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="lc-intro-image">
              <video
                src="/video/golf-tee-shot.mp4"
                poster="/photos/lifestyle/golf-tee-shot-poster.jpg"
                aria-label={`${brand.name} on the tee, mid-swing`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </Reveal>
        </section>

        <div className="lc-section-head" id="achievements">
          <div>
            <p className="eyebrow">02 / A collection of moments</p>
            <Reveal>
              <h2 className="lc-section-h2">
                On the <span style={{ color: 'var(--gold)' }}>course.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="lc-section-p">A visual journey through memorable rounds, championship moments and a remarkable shot.</p>
          </Reveal>
        </div>

        <section ref={stageRef} className="lc-gallery-stage">
          <div className="lc-gallery-sticky">
            <div className="lc-gallery-bg" />
            <div className="lc-gallery-overlay">
              <p className="eyebrow">The achievement collection</p>
            </div>
            <div ref={trackRef} className="lc-gallery-track">
              {GALLERY.map((card) => (
                <article key={card.num} className="lc-gallery-card">
                  <div className="lc-award-frame">
                    <img src={card.image} alt={card.alt} loading="lazy" />
                    <button
                      type="button"
                      className="lc-zoom"
                      aria-label={`Enlarge ${card.title}`}
                      onClick={() => setLightbox({ src: card.image, alt: card.alt })}
                    >
                      VIEW +
                    </button>
                    <span className="lc-card-num">{card.num} / {String(GALLERY.length).padStart(2, '0')}</span>
                  </div>
                  <div className="lc-card-text">
                    <p className="eyebrow" style={{ fontSize: '0.75rem' }}>{card.place}</p>
                    <h3>{card.title}</h3>
                    <p>{card.caption}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="lc-gallery-footer">
              <div className="lc-gallery-meter">
                <div ref={meterRef} />
              </div>
              <span ref={countRef} className="lc-gallery-count">{`01 / ${String(GALLERY.length).padStart(2, '0')}`}</span>
            </div>
          </div>
        </section>

        <section className="lc-chapter">
          <Reveal>
            <div className="lc-chapter-image">
              <img src="/photos/lifestyle/glencairn-hole-in-one-2022.jpg" alt="Hole in one at Glencairn Golf Club, September 16, 2022" loading="lazy" />
            </div>
          </Reveal>
          <div className="lc-chapter-copy">
            <p className="eyebrow">03 / The unforgettable moment</p>
            <Reveal>
              <h2 className="lc-chapter-h2">
                One shot.
                <br />
                <span>Forever.</span>
              </h2>
            </Reveal>
            <Reveal>
              <div className="lc-rule" />
            </Reveal>
            <Reveal>
              <p className="lc-chapter-p">
                September 16, 2022. Glencairn Golf Club. Hole 3, Speyside — 170 yards, 7 iron. The kind of moment
                golfers remember for a lifetime.
              </p>
            </Reveal>
            <Reveal>
              <strong className="lc-chapter-strong">Hole in one · Glencairn Golf Club</strong>
            </Reveal>
          </div>
        </section>

        <section className="lc-manifesto">
          <div ref={ringsRef} className="lc-rings" />
          <p className="eyebrow lc-manifesto-eyebrow">04 / The philosophy</p>
          <Reveal>
            <blockquote className="lc-manifesto-quote">
              It&apos;s not only about <span>where you arrive.</span> It&apos;s about the moments you{' '}
              <span>make along the way.</span>
            </blockquote>
          </Reveal>
          <p className="lc-manifesto-foot">
            — {brand.name}, {brand.title}
          </p>
        </section>

        <section className="lc-closing">
          <p className="eyebrow">05 / The story continues</p>
          <Reveal>
            <h2 className="lc-closing-h2">
              Stay <span style={{ color: 'var(--gold)' }}>inspired.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="lc-closing-p">
              More than a career. More than a game. A life shaped by the moments that matter most.
            </p>
          </Reveal>
          {brand.linkedin && (
            <Reveal>
              <a className="lc-cta" href={brand.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="lc-cta-label">
                  <svg className="lc-linkedin-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"
                    />
                  </svg>
                  Connect on LinkedIn
                </span>
                <span>↗</span>
              </a>
            </Reveal>
          )}
        </section>
      </main>

      {lightbox && (
        <div className="lc-lightbox open" role="dialog" aria-modal="true" aria-label="Award photograph" onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}>
          <button type="button" aria-label="Close image" onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}

      <style>{`
        .lc-root { position: relative; background: var(--ink); color: var(--paper); }
        .lc-progress { position: fixed; left: 0; top: 0; height: 2px; width: 0; background: var(--gold); z-index: 1000; }
        .lc-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 80; opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
        }
        .lc-glow {
          position: fixed; pointer-events: none; z-index: 1; width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,162,74,0.07), transparent 67%); transform: translate(-50%, -50%);
        }

        .lc-hero { height: 92svh; min-height: 620px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; }
        .lc-hero-image {
          position: absolute; inset: -10%;
          background-image:
            linear-gradient(90deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.12) 55%, rgba(10,10,10,0.58) 100%),
            linear-gradient(0deg, var(--ink) 1%, transparent 38%, rgba(10,10,10,0.28) 100%),
            url('/photos/lifestyle/golf-course-panorama.jpg');
          background-position: center, center, center 42%;
          background-size: cover;
          filter: brightness(0.62) saturate(0.9) contrast(1.05);
          transform: scale(1.12);
          will-change: transform;
        }
        .lc-hero::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 18%, rgba(10,10,10,0.82) 100%); pointer-events: none; }
        .lc-hero-content { position: relative; z-index: 2; width: min(100%, 1100px); padding: 70px 24px 0; }
        .lc-hero-h1 { font-family: var(--font-editorial); font-weight: 400; font-size: clamp(3rem, 9.5vw, 8rem); letter-spacing: -0.02em; line-height: 1.04; margin: 24px 0 0; }
        .lc-em { display: block; font-style: italic; color: var(--gold); font-size: 0.68em; letter-spacing: 0.01em; margin-top: 10px; }
        .lc-hero-desc { font-size: clamp(0.8125rem, 1.2vw, 1rem); font-weight: 300; line-height: 1.9; color: var(--paper-dim); max-width: 480px; margin: 32px auto 0; }
        .lc-hero-bottom {
          position: absolute; bottom: 28px; left: var(--edge); right: var(--edge); z-index: 4;
          display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper-dim);
        }
        .lc-scroll-cue { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .lc-scroll-icon { width: 22px; height: 38px; border: 1px solid rgba(242,239,233,0.4); border-radius: 16px; position: relative; }
        .lc-scroll-icon::after { content: ''; position: absolute; left: 9px; top: 7px; width: 2px; height: 8px; background: var(--gold); animation: lc-scroll-mouse 2s infinite; }
        @keyframes lc-scroll-mouse { to { transform: translateY(13px); opacity: 0; } }

        .lc-word-clip { overflow: hidden; display: block; padding-bottom: 0.18em; margin-bottom: -0.18em; }
        .lc-word-clip span { display: block; transform: translateY(115%); animation: lc-hero-in 1.1s cubic-bezier(.22,1,.36,1) forwards; }
        .lc-word-clip:nth-child(2) span { animation-delay: 0.22s; }
        @keyframes lc-hero-in { to { transform: translateY(0); } }

        .lc-eyebrow-in { opacity: 0; animation: lc-fade-up 0.9s ease 0.05s forwards; }
        .lc-desc-in { opacity: 0; animation: lc-fade-up 0.9s ease 0.95s forwards; }
        .lc-bottom-in { opacity: 0; animation: lc-fade-up 0.9s ease 1.2s forwards; }
        @keyframes lc-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        .lc-intro { padding: clamp(96px, 14vh, 150px) var(--edge); display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 6vw; align-items: center; border-top: 1px solid var(--line); }
        .lc-intro-image {
          position: relative; overflow: hidden; background: var(--panel); line-height: 0;
          box-shadow: 0 25px 80px rgba(0,0,0,0.5); border: 1px solid var(--line);
        }
        .lc-intro-image img, .lc-intro-image video { display: block; width: 100%; height: auto; max-height: 78vh; object-fit: contain; margin: 0 auto; }
        .lc-intro-h2 { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: clamp(2.25rem, 5vw, 4.25rem); line-height: 1.04; margin: 18px 0; }
        .lc-intro-h2 i { color: var(--gold); font-style: italic; }
        .lc-rule { width: 70px; height: 1px; background: var(--gold); margin: 26px 0; }
        .lc-intro-p { font-size: 1rem; line-height: 2; color: var(--paper-dim); max-width: 480px; }
        .lc-mini-stats { display: flex; gap: 40px; margin-top: 44px; flex-wrap: wrap; }
        .lc-mini-stats b { display: block; font-family: var(--font-editorial); font-size: 2.25rem; font-weight: 400; color: var(--paper); }
        .lc-mini-stats small { display: block; color: var(--paper-dim); font-size: 0.6875rem; letter-spacing: 0.13em; text-transform: uppercase; margin-top: 4px; }

        .lc-section-head { padding: 0 var(--edge) clamp(40px, 6vh, 56px); display: flex; justify-content: space-between; align-items: end; gap: 28px; flex-wrap: wrap; }
        .lc-section-h2 { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: clamp(2.25rem, 5.5vw, 4.5rem); margin: 10px 0 0; }
        .lc-section-p { color: var(--paper-dim); font-size: 0.875rem; line-height: 1.8; max-width: 280px; }

        .lc-gallery-stage { height: 400vh; position: relative; }
        .lc-gallery-sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; display: flex; align-items: center; }
        .lc-gallery-bg { position: absolute; inset: 0; background: radial-gradient(circle at 60% 50%, var(--panel) 0, var(--ink) 65%); }
        .lc-gallery-track { display: flex; gap: 4vw; padding: 0 var(--edge); align-items: center; position: relative; will-change: transform; }
        .lc-gallery-card { flex: 0 0 min(40vw, 420px); height: min(78vh, 720px); position: relative; overflow: hidden; display: flex; flex-direction: column; background: var(--panel); border: 1px solid var(--line); box-shadow: 0 25px 90px rgba(0,0,0,0.5); }
        .lc-gallery-card .lc-award-frame { position: relative; flex: 1 1 auto; min-height: 0; display: flex; align-items: center; justify-content: center; padding: 22px 22px 0; }
        .lc-gallery-card img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; transition: transform 0.6s cubic-bezier(.22,1,.36,1); }
        .lc-gallery-card:hover img { transform: scale(1.025); }
        .lc-gallery-card .lc-card-text { position: relative; z-index: 2; flex: 0 0 auto; padding: 18px 26px 24px; border-top: 1px solid var(--line); }
        .lc-card-text h3 { font-family: var(--font-editorial); font-size: clamp(1.375rem, 2.2vw, 2rem); font-weight: 400; font-style: italic; margin: 6px 0; color: var(--paper); }
        .lc-card-text p { font-size: 0.8125rem; color: var(--paper-dim); }
        .lc-card-num { position: absolute; right: 22px; top: 18px; z-index: 3; font-size: 0.6875rem; letter-spacing: 0.16em; color: var(--paper-dim); }
        .lc-gallery-overlay { position: absolute; left: var(--edge); top: 6vh; z-index: 5; pointer-events: none; }
        .lc-gallery-footer { position: absolute; left: var(--edge); bottom: 6vh; right: var(--edge); display: flex; justify-content: space-between; align-items: center; z-index: 5; pointer-events: none; }
        .lc-gallery-meter { width: 150px; height: 2px; background: var(--line); }
        .lc-gallery-meter div { height: 100%; width: 0; background: var(--gold); }
        .lc-gallery-count { font-size: 0.75rem; letter-spacing: 0.18em; color: var(--paper-dim); }
        .lc-zoom {
          position: absolute; z-index: 6; top: 22px; left: 22px; background: rgba(10,10,10,0.6); color: var(--paper);
          border: 1px solid var(--line-strong); padding: 10px 14px; font-size: 0.6875rem; letter-spacing: 0.1em; cursor: pointer; transition: background 0.3s, color 0.3s;
        }
        .lc-zoom:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); }

        .lc-chapter { min-height: 110vh; position: relative; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 6vw; padding: 12vh var(--edge); overflow: hidden; }
        .lc-chapter-image {
          position: relative; z-index: 2; height: min(66vh, 620px); overflow: hidden; transform: rotate(-2deg);
          background: var(--panel); display: flex; align-items: center; justify-content: center; padding: 28px;
          box-shadow: 20px 36px 70px rgba(0,0,0,0.55);
        }
        .lc-chapter-image img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }
        .lc-chapter-copy { position: relative; z-index: 2; }
        .lc-chapter-h2 { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: clamp(2.75rem, 6.5vw, 5.5rem); line-height: 0.95; margin: 18px 0 26px; }
        .lc-chapter-h2 span { color: var(--gold); }
        .lc-chapter-p { color: var(--paper-dim); font-size: 0.9375rem; line-height: 1.9; max-width: 440px; }
        .lc-chapter-strong { display: inline-block; margin-top: 28px; font-size: 0.6875rem; letter-spacing: 0.15em; font-weight: 600; text-transform: uppercase; color: var(--paper); }

        .lc-manifesto { min-height: 92svh; display: flex; align-items: center; justify-content: center; position: relative; text-align: center; padding: 100px var(--edge); overflow: hidden; }
        .lc-rings { position: absolute; width: min(78vw, 820px); aspect-ratio: 1; border: 1px solid rgba(201,162,74,0.14); border-radius: 50%; box-shadow: 0 0 0 100px rgba(201,162,74,0.03), 0 0 0 200px rgba(201,162,74,0.025); will-change: transform; }
        .lc-manifesto-quote { position: relative; font-family: var(--font-editorial); font-style: italic; font-weight: 400; font-size: clamp(1.75rem, 5.5vw, 3.75rem); line-height: 1.18; max-width: 1050px; margin: 0; }
        .lc-manifesto-quote span { color: var(--gold); }
        .lc-manifesto-eyebrow { position: absolute; top: 14%; left: 50%; transform: translateX(-50%); }
        .lc-manifesto-foot { position: absolute; bottom: 12%; font-size: 0.8125rem; letter-spacing: 0.1em; color: var(--gold); text-transform: uppercase; }

        .lc-closing {
          min-height: 92svh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
          position: relative; overflow: hidden; padding: 100px 24px;
        }
        .lc-closing-h2 { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: clamp(2.75rem, 8vw, 6rem); margin: 18px 0; }
        .lc-closing-p { color: var(--paper-dim); line-height: 1.9; max-width: 440px; }
        .lc-cta {
          display: inline-flex; gap: 48px; align-items: center; border: 1px solid var(--gold); padding: 18px 26px; margin-top: 28px;
          font-size: 0.6875rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); transition: background 0.35s, color 0.35s;
        }
        .lc-cta:hover { background: var(--gold); color: var(--ink); }
        .lc-cta-label { display: inline-flex; align-items: center; gap: 10px; }
        .lc-linkedin-icon { flex-shrink: 0; }

        .lc-lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 2000; display: none; align-items: center; justify-content: center; padding: 6vw; cursor: zoom-out; }
        .lc-lightbox.open { display: flex; }
        .lc-lightbox img { max-width: 100%; max-height: 90vh; object-fit: contain; box-shadow: 0 30px 90px rgba(0,0,0,0.6); }
        .lc-lightbox button {
          position: absolute; top: 20px; right: 24px; background: transparent; color: var(--paper); border: 1px solid var(--line-strong);
          border-radius: 50%; width: 42px; height: 42px; font-size: 1.25rem; cursor: pointer; line-height: 1;
        }
        .lc-lightbox button:hover { border-color: var(--gold); color: var(--gold); }

        @media (max-width: 800px) {
          .lc-hero { min-height: 560px; }
          .lc-hero-h1 { font-size: clamp(2.75rem, 13vw, 4.5rem); }
          .lc-hero-bottom { font-size: 0.5625rem; }
          .lc-intro { grid-template-columns: 1fr; padding: 90px var(--edge); gap: 18px; }
          .lc-intro-image { max-height: 60vh; order: -1; }
          .lc-mini-stats { gap: 28px; }
          .lc-section-head { display: block; }
          .lc-section-p { max-width: none; margin-top: 10px; }
          .lc-gallery-stage { height: auto; }
          .lc-gallery-sticky { height: auto; position: relative; overflow: visible; display: block; padding: 120px 0 80px; }
          .lc-gallery-overlay { top: 30px; }
          .lc-gallery-track { overflow-x: auto; scroll-snap-type: x mandatory; transform: none !important; padding: 0 var(--edge); gap: 16px; scrollbar-width: none; }
          .lc-gallery-track::-webkit-scrollbar { display: none; }
          .lc-gallery-card { flex-basis: 78vw; height: 64vh; min-height: 460px; scroll-snap-align: center; }
          .lc-gallery-footer { bottom: 26px; }
          .lc-chapter { grid-template-columns: 1fr; gap: 50px; padding: 90px var(--edge); }
          .lc-chapter-image { height: 60vh; max-height: 600px; transform: rotate(-1deg); }
          .lc-manifesto { min-height: 80vh; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lc-word-clip span { animation: none; transform: none; }
          .lc-scroll-icon::after { animation: none; }
        }
      `}</style>
    </div>
  );
}
