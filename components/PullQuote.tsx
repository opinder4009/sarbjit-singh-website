import { brand } from '@/lib/brand';
import Reveal from './Reveal';

export default function PullQuote() {
  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--ink)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: 'clamp(100px, 18vh, 220px) var(--edge)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'clamp(18px, 4vh, 48px)',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-editorial)',
          fontSize: 'clamp(7rem, 16vw, 13rem)',
          lineHeight: 1,
          color: 'var(--gold-deep)',
          opacity: 0.35,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        &ldquo;
      </span>

      <Reveal>
        <p
          style={{
            position: 'relative',
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4.6vw, 4rem)',
            lineHeight: 1.18,
            color: 'var(--paper)',
            maxWidth: 940,
            margin: '0 auto',
          }}
        >
          {brand.pullQuote.line}
        </p>
        <p
          style={{
            marginTop: 28,
            color: 'var(--gold)',
            fontSize: '0.875rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          {brand.pullQuote.attribution}
        </p>
      </Reveal>
    </section>
  );
}
