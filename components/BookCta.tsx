import { brand } from '@/lib/brand';
import GetRatesQuiz from './GetRatesQuiz';

export default function BookCta() {
  return (
    <section
      style={{
        background: 'var(--panel)',
        borderTop: '1px solid var(--line)',
        padding: 'clamp(56px, 9vh, 100px) var(--edge)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}
    >
      <div>
        <p className="eyebrow">{brand.contactEyebrow}</p>
        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
            lineHeight: 1.1,
            color: 'var(--paper)',
            marginTop: 10,
            maxWidth: 480,
          }}
        >
          Ready to talk about your mortgage?
        </h2>
      </div>
      <GetRatesQuiz />
    </section>
  );
}
