'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '@/lib/brand';
import AnimatedButton from './AnimatedButton';

const CHAPTERS = brand.heroChapters;
const N = CHAPTERS.length;

export default function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (wrap.current) wrap.current.style.height = `${N * 76}vh`;

      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage.current,
        anticipatePin: 1,
        onUpdate: (self: { progress: number }) => {
          const p = self.progress;

          if (video.current) {
            video.current.style.transform = `scale(${1 + p * 0.07})`;
          }
          if (shade.current) {
            shade.current.style.opacity = String(0.3 + p * 0.15);
          }
          if (bar.current) {
            bar.current.style.width = `${p * 100}%`;
          }
          if (cue.current) {
            cue.current.style.opacity = String(1 - Math.min(1, p / 0.06));
          }

          const t = Math.min(1, Math.max(0, (p - 0.04) / 0.96));
          const raw = 0.5 + t * (N - 1);

          chapterRefs.current.forEach((el, i) => {
            if (!el) return;
            const d = Math.abs(raw - (i + 0.5));
            const opacity = Math.min(1, Math.max(0, 1 - Math.max(0, d - 0.03) / 0.5));
            const y = (i + 0.5 - raw) * 20;
            el.style.opacity = String(opacity);
            el.style.transform = `translateY(${y}px)`;
            el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
          });
        },
      });

      ScrollTrigger.refresh();

      return () => st.kill();
    }, wrap);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const v = video.current;
    const el = wrap.current;
    if (!v || !el) return;

    const FADE_BEFORE_END = 1.1;
    const fadingRef = { current: false };

    const onTimeUpdate = () => {
      if (!fadingRef.current && v.duration && v.currentTime >= v.duration - FADE_BEFORE_END) {
        fadingRef.current = true;
        gsap.to(v, { opacity: 0, duration: FADE_BEFORE_END, ease: 'power1.out' });
      }
    };

    const restart = () => {
      gsap.killTweensOf(v);
      fadingRef.current = false;
      v.style.opacity = '1';
      v.currentTime = 0;
      v.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) restart();
        });
      },
      { threshold: 0.15 }
    );

    v.addEventListener('timeupdate', onTimeUpdate);
    io.observe(el);

    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={wrap} style={{ position: 'relative', height: '100vh', background: 'var(--ink)' }}>
      <div
        ref={stage}
        className="hero-stage"
        style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--ink)' }}
      >
        <video
          ref={video}
          className="hero-video-bg"
          src="/video/hero-entrance.mp4"
          poster="/video/hero-entrance-poster.jpg"
          aria-label={`${brand.name}, ${brand.title}`}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div ref={shade} className="hero-media-shade" style={{ opacity: 0.3 }} />

        <div className="hero-copy-col">
          <h1
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            {brand.seoHeading}
          </h1>
          <div className="hero-copy-stack">
            {CHAPTERS.map((c, i) => (
              <div
                key={c.heading}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
                className="hero-chapter"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p
                  className="eyebrow"
                  style={{
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.9)',
                  }}
                >
                  {c.eyebrow}
                </p>
                <p className="hero-heading">{c.heading}</p>
                <p
                  style={{
                    marginTop: 18,
                    maxWidth: 460,
                    color: 'var(--paper)',
                    fontWeight: 600,
                    fontSize: '1.0625rem',
                    lineHeight: 1.6,
                    textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 1px 20px rgba(0,0,0,0.7)',
                  }}
                >
                  {c.body}
                </p>
                {'cta' in c && c.cta && (
                  <div style={{ marginTop: 28 }}>
                    <AnimatedButton href="/#contact">Book Appointment</AnimatedButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div ref={cue} className="hero-cue">
          Scroll
          <svg width="11" height="16" viewBox="0 0 11 16" fill="none" aria-hidden="true">
            <path d="M5.5 0v14.5M1 10l4.5 4.5L10 10" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </div>

        <div className="hero-progress-track">
          <div ref={bar} className="hero-progress-bar" />
        </div>
      </div>

      <style>{`
        .hero-video-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 38%;
          z-index: 1;
          will-change: transform;
        }
        .hero-media-shade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(1, 12, 58, 0.55) 0%, rgba(1, 12, 58, 0.15) 22%, rgba(1, 12, 58, 0.2) 55%, rgba(1, 12, 58, 0.8) 100%);
        }
        .hero-copy-col {
          position: relative;
          z-index: 3;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 clamp(24px, 5vw, 72px);
        }
        .hero-copy-stack {
          position: relative;
          width: 100%;
          max-width: 560px;
          margin: 0;
          min-height: clamp(260px, 32vw, 360px);
        }
        .hero-chapter {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .hero-heading {
          margin-top: 14px;
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 700;
          font-size: clamp(2.4rem, 3vw + 2vh, 4.75rem);
          line-height: 1;
          letter-spacing: 0.01em;
          background: linear-gradient(100deg, #fff 0%, #fff 35%, #fff6d8 46%, #ffffff 54%, #fff 65%, #fff 100%);
          background-size: 260% auto;
          background-position: 0% center;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.9)) drop-shadow(0 6px 34px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 46px rgba(255, 244, 214, 0.22));
          animation: hero-shine 5.5s ease-in-out infinite;
        }
        @keyframes hero-shine {
          0% { background-position: 0% center; }
          45% { background-position: 100% center; }
          100% { background-position: 100% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-heading { animation: none; }
        }
        .hero-cue {
          position: absolute;
          right: var(--edge);
          bottom: 36px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--paper-dim);
          font-size: 0.8125rem;
          z-index: 3;
        }
        .hero-progress-track {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: var(--line);
          z-index: 3;
        }
        .hero-progress-bar {
          height: 100%;
          width: 0%;
          background: var(--gold);
        }

        @media (max-width: 880px) {
          .hero-video-bg {
            object-position: center 30%;
          }
          .hero-media-shade {
            background: linear-gradient(180deg, rgba(1, 12, 58, 0.5) 0%, rgba(1, 12, 58, 0.1) 20%, rgba(1, 12, 58, 0.35) 60%, rgba(1, 12, 58, 0.92) 100%);
          }
          .hero-copy-col {
            padding: 0 var(--edge);
            align-items: flex-end;
            justify-content: center;
            text-align: center;
            padding-bottom: 14vh;
          }
          .hero-copy-stack {
            max-width: none;
            min-height: clamp(220px, 40vh, 320px);
          }
          .hero-chapter {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
