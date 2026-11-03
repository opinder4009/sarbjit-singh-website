'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '@/lib/brand';

export default function RoyalEntrance() {
  const wrap = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const eyebrow = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const grain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const v = video.current;
    if (!v) return;

    const ctx = gsap.context(() => {
      let duration = 0;
      const onReady = () => {
        duration = v.duration || 0;
      };
      v.addEventListener('loadedmetadata', onReady);

      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage.current,
        anticipatePin: 1,
        onUpdate: (self: { progress: number }) => {
          const p = self.progress;
          if (duration > 0 && v.readyState >= 2) {
            v.currentTime = p * Math.max(0, duration - 0.04);
          }
          if (bar.current) bar.current.style.width = `${p * 100}%`;
        },
      });

      gsap.to(grain.current, { opacity: 0.22, scrollTrigger: { trigger: wrap.current, start: 'top top', end: '+=15%', scrub: true } });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: '+=25%',
            scrub: true,
          },
        })
        .fromTo([eyebrow.current, line.current], { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08 });

      gsap.to([eyebrow.current, line.current, cue.current], {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: wrap.current,
          start: '70% top',
          end: 'bottom top',
          scrub: true,
        },
      });

      return () => {
        v.removeEventListener('loadedmetadata', onReady);
        st.kill();
      };
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} style={{ position: 'relative', height: '600vh', background: 'var(--ink)' }}>
      <div
        ref={stage}
        style={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
          background: 'var(--ink)',
        }}
      >
        <video
          ref={video}
          src="/video/royal-entrance.mp4"
          poster="/video/royal-entrance-poster.png"
          muted
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.05) 30%, rgba(10,10,12,0.05) 65%, rgba(10,10,12,0.75) 100%)',
          }}
        />

        <div
          ref={grain}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            pointerEvents: 'none',
            background:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)',
            mixBlendMode: 'overlay',
          }}
        />

        <div
          ref={eyebrow}
          className="eyebrow"
          style={{
            position: 'absolute',
            top: '12%',
            left: 0,
            right: 0,
            textAlign: 'center',
            letterSpacing: '0.35em',
            fontSize: '0.8125rem',
            opacity: 0,
          }}
        >
          {brand.entranceEyebrow}
        </div>

        <div
          ref={line}
          style={{
            position: 'absolute',
            bottom: '16%',
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 4vw + 2vh, 6.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              color: 'var(--paper)',
              textTransform: 'uppercase',
              textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            }}
          >
            {brand.entranceLine}
          </h1>
        </div>

        <div
          ref={cue}
          style={{
            position: 'absolute',
            bottom: '6%',
            left: 0,
            right: 0,
            textAlign: 'center',
            letterSpacing: '0.3em',
            fontSize: '0.75rem',
            color: 'var(--paper-dim)',
          }}
        >
          {brand.entranceCue}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'var(--line)',
          }}
        >
          <div ref={bar} style={{ height: '100%', width: 0, background: 'var(--brass)' }} />
        </div>
      </div>
    </section>
  );
}
