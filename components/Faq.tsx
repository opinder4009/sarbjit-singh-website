'use client';
import { useState } from 'react';
import { brand } from '@/lib/brand';
import Reveal from './Reveal';

type FaqItem = { question: string; answer: string };

export default function Faq({
  eyebrow = brand.faqEyebrow,
  heading = brand.faqHeading,
  items = brand.faq,
}: {
  eyebrow?: string;
  heading?: string;
  items?: readonly FaqItem[];
} = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      style={{
        background: 'var(--panel)',
        padding: 'clamp(72px, 12vh, 140px) var(--edge)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 680 }}>
          <p className="eyebrow" style={{ margin: 0 }}>{eyebrow}</p>
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
            maxWidth: 680,
          }}
        >
          {heading}
        </h2>
      </Reveal>

      <div style={{ marginTop: 48, maxWidth: 820, borderTop: '1px solid var(--line-strong)' }}>
        {items.map((item, i) => {
          const expanded = open === i;
          return (
            <div key={item.question} style={{ borderBottom: '1px solid var(--line)' }}>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  padding: '22px 4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: expanded ? 'var(--gold)' : 'var(--paper)',
                  }}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: 1,
                      background: 'var(--gold)',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: '50%',
                      width: 1,
                      background: 'var(--gold)',
                      transform: `translateX(-50%) scaleY(${expanded ? 0 : 1})`,
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </span>
              </button>
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: expanded ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.3s ease',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <p
                    style={{
                      paddingBottom: 22,
                      color: 'var(--paper-dim)',
                      fontSize: '1rem',
                      lineHeight: 1.65,
                      maxWidth: 680,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
