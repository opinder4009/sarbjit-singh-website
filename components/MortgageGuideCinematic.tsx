'use client';

import { useRef, useState } from 'react';
import { brand } from '@/lib/brand';
import AnimatedButton from './AnimatedButton';
import CNTower from './CNTower';
import Reveal from './Reveal';

const DOC_META = [
  { tag: '01 / Identity' },
  { tag: '02 / Income' },
  { tag: '03 / Funds' },
  { tag: '04 / Existing loan' },
  { tag: '05 / Property' },
  { tag: '06 / Liabilities' },
];

export default function MortgageGuideCinematic() {
  const [selected, setSelected] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const active = brand.guideOptions[selected];

  function selectOption(i: number) {
    setSelected(i);
    if (typeof window !== 'undefined' && window.innerWidth < 951) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  return (
    <div className="mg-root">
      <div id="top">
        <CNTower>
          <div className="mg-hero-content">
            <Reveal>
              <p className="eyebrow">{brand.name} / The mortgage guide</p>
              <h1 className="mg-h1">
                Every path
                <br />
                <em>to the keys.</em>
              </h1>
              <p className="mg-hero-p">{brand.guideIntro}</p>
              <AnimatedButton href="#options" compact>
                EXPLORE YOUR OPTIONS ↓
              </AnimatedButton>
            </Reveal>
          </div>
        </CNTower>
      </div>

      <section className="mg-section" id="options">
        <Reveal>
          <div className="mg-section-head">
            <p className="eyebrow">01 / Mortgage options</p>
            <h2 className="mg-h2">
              Find your <em>situation.</em>
            </h2>
            <p className="mg-section-p">
              Fourteen different paths. One clear next step. Choose the situation that matches yours and see what I&apos;ll
              review first.
            </p>
          </div>
        </Reveal>

        <div className="mg-layout">
          <div className="mg-option-grid">
            {brand.guideOptions.map((option, i) => (
              <button
                key={option.title}
                type="button"
                className={`mg-option${i === selected ? ' is-active' : ''}`}
                aria-pressed={i === selected}
                onClick={() => selectOption(i)}
              >
                <strong>{option.title}</strong>
                <small>EXPLORE PATH ↗</small>
              </button>
            ))}
          </div>

          <aside className="mg-sticky" ref={detailRef}>
            <div className="mg-glass" aria-live="polite">
              <p className="eyebrow">Your selected mortgage path</p>
              <div className="mg-icon">{active.icon}</div>
              <h3 className="mg-h3">{active.title}</h3>
              <p>{active.summary}</p>
              <div className="mg-detail-list">
                <p className="eyebrow">What I&apos;ll review first</p>
                <p className="mg-requirements">{active.requirements}</p>
              </div>
            </div>
            <p className="mg-note">Requirements vary by lender, product and your individual circumstances.</p>
          </aside>
        </div>
      </section>

      <section className="mg-section" id="rates">
        <Reveal>
          <div className="mg-section-head">
            <p className="eyebrow">{brand.rateStructure.eyebrow}</p>
            <h2 className="mg-h2">
              Fixed vs. <em>Variable.</em>
            </h2>
            <p className="mg-section-p">
              There&apos;s no universal best rate structure. The right choice depends on your budget, your plans and your
              comfort with uncertainty.
            </p>
          </div>
        </Reveal>

        <div className="mg-split">
          {[brand.rateStructure.fixed, brand.rateStructure.variable].map((col) => (
            <Reveal key={col.title}>
              <article className="mg-compare">
                <h3 className="mg-h3">{col.title}</h3>
                <p>{col.body}</p>
                <ul>
                  {col.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mg-section" id="flexibility">
        <Reveal>
          <div className="mg-section-head">
            <p className="eyebrow">{brand.paymentFlexibility.eyebrow}</p>
            <h2 className="mg-h2">
              Open vs. <em>closed.</em>
            </h2>
            <p className="mg-section-p">{brand.paymentFlexibility.intro}</p>
          </div>
        </Reveal>

        <div className="mg-split">
          {[brand.paymentFlexibility.open, brand.paymentFlexibility.closed].map((col) => (
            <Reveal key={col.title}>
              <article className="mg-compare">
                <h3 className="mg-h3">{col.title}</h3>
                <p>{col.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mg-section" id="documents">
        <Reveal>
          <div className="mg-section-head">
            <p className="eyebrow">04 / Prepare your file</p>
            <h2 className="mg-h2">
              What to have <em>ready.</em>
            </h2>
            <p className="mg-section-p">
              A little preparation can make the mortgage process much smoother. Your exact checklist will depend on your
              file.
            </p>
          </div>
        </Reveal>

        <div className="mg-documents">
          {brand.documents.map((doc, i) => (
            <Reveal key={doc}>
              <div className="mg-doc">
                <b>{DOC_META[i]?.tag}</b>
                <p>{doc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mg-end">
        <Reveal>
          <p className="eyebrow">The next chapter starts here</p>
          <h2 className="mg-end-h2">
            Let&apos;s find your
            <br />
            <em>Dream Home or Business.</em>
          </h2>
          <p className="mg-end-p">
            Bring your questions. We&apos;ll work through your options together, one clear step at a time.
          </p>
          <AnimatedButton href="/#contact">REQUEST A CONSULTATION ↗</AnimatedButton>
        </Reveal>
      </section>

      <style>{`
        .mg-root { position: relative; background: var(--ink); color: var(--paper); }

        .mg-hero-content { position: relative; z-index: 3; max-width: 750px; }
        .mg-hero-p { max-width: 500px; font-size: 1.0625rem; color: var(--paper-dim); line-height: 1.75; margin: 18px 0 32px; }

        .mg-h1 {
          font-family: var(--font-editorial); font-weight: 400; font-style: italic; line-height: 1.02;
          font-size: clamp(3rem, 8.5vw, 8.5rem); letter-spacing: -0.02em; margin: 18px 0;
        }
        .mg-h1 em, .mg-h2 em, .mg-end-h2 em { font-style: italic; color: var(--gold); }

        .mg-section { padding: clamp(80px, 11vh, 150px) 7vw; border-top: 1px solid var(--line); position: relative; }
        .mg-section-head { max-width: 720px; margin-bottom: 52px; }
        .mg-h2 { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: clamp(2.25rem, 5vw, 4.5rem); letter-spacing: -0.015em; line-height: 1.05; margin: 16px 0; }
        .mg-section-p { color: var(--paper-dim); line-height: 1.75; font-size: 1.0625rem; }
        .mg-h3 { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: 1.6875rem; line-height: 1.1; margin: 12px 0; color: var(--paper); }

        .mg-layout { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 55px; align-items: start; }
        .mg-option-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .mg-option {
          min-height: 93px; text-align: left; padding: 19px; background: rgba(242,239,233,0.03);
          border: 1px solid var(--line); color: var(--paper); transition: background 0.25s, border-color 0.25s, transform 0.25s;
          font: inherit; cursor: pointer; border-radius: 4px;
        }
        .mg-option:hover, .mg-option.is-active { background: rgba(201,162,74,0.1); border-color: var(--gold); transform: translateY(-2px); }
        .mg-option strong { font-size: 0.875rem; display: block; margin-bottom: 10px; font-weight: 600; }
        .mg-option small { font-size: 0.6875rem; color: var(--paper-dim); letter-spacing: 0.04em; }
        .mg-option.is-active small { color: var(--gold); }

        .mg-sticky { position: sticky; top: 110px; }
        .mg-glass {
          background: linear-gradient(145deg, rgba(28,22,13,0.94), rgba(10,9,6,0.97));
          border: 1px solid rgba(201,162,74,0.22); box-shadow: 0 25px 70px rgba(0,0,0,0.5);
          padding: 38px; min-height: 380px; position: relative; overflow: hidden; border-radius: 6px;
        }
        .mg-glass::after {
          content: ''; position: absolute; right: -100px; top: -120px; width: 260px; height: 260px;
          border: 1px solid rgba(201,162,74,0.18); border-radius: 50%;
          box-shadow: 0 0 0 35px rgba(201,162,74,0.035), 0 0 0 70px rgba(201,162,74,0.02);
          pointer-events: none;
        }
        .mg-glass p { position: relative; }
        .mg-icon { position: relative; font-size: 3.375rem; color: var(--gold); margin: 22px 0; line-height: 1; }
        .mg-detail-list { position: relative; border-top: 1px solid var(--line); margin-top: 26px; padding-top: 20px; }
        .mg-requirements { margin-top: 12px; color: #e3e0d8; line-height: 1.8; font-size: 0.8125rem; }
        .mg-note { font-size: 0.6875rem; margin-top: 15px; color: var(--steel); }

        .mg-split { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .mg-compare { padding: 34px; background: linear-gradient(145deg, rgba(28,22,13,0.6), rgba(10,9,6,0.75)); border: 1px solid var(--line); transition: transform 0.3s; border-radius: 6px; height: 100%; }
        .mg-compare:hover { transform: translateY(-5px); }
        .mg-compare p { font-size: 0.9375rem; color: var(--paper-dim); line-height: 1.7; }
        .mg-compare ul { padding-left: 19px; color: var(--paper-dim); line-height: 1.9; font-size: 0.8125rem; margin-top: 16px; }

        .mg-documents { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .mg-doc { border: 1px solid var(--line); background: rgba(242,239,233,0.03); padding: 25px; min-height: 150px; border-radius: 6px; height: 100%; }
        .mg-doc b { color: var(--gold); font-size: 0.75rem; letter-spacing: 0.04em; display: block; margin-bottom: 10px; }
        .mg-doc p { font-size: 0.8125rem; color: var(--paper-dim); line-height: 1.6; margin: 0; }

        .mg-end { text-align: center; background: radial-gradient(ellipse at 50% 80%, rgba(90,68,28,0.3), var(--ink) 65%); padding: clamp(100px, 14vh, 160px) 20px; border-top: 1px solid var(--line); }
        .mg-end-h2 { font-family: var(--font-editorial); font-weight: 400; font-style: italic; font-size: clamp(2.75rem, 8vw, 6rem); line-height: 0.95; margin: 18px 0 26px; }
        .mg-end-p { max-width: 480px; margin: 0 auto 30px; color: var(--paper-dim); line-height: 1.75; }

        @media (max-width: 950px) {
          .mg-layout { grid-template-columns: 1fr; }
          .mg-sticky { position: relative; top: auto; }
          .mg-hero-content { max-width: 600px; }
          .mg-documents { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .mg-section { padding: 75px 22px; }
          .mg-option-grid, .mg-split, .mg-documents { grid-template-columns: 1fr; }
          .mg-glass { padding: 25px; min-height: 300px; }
        }
      `}</style>
    </div>
  );
}
