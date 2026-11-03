'use client';
import { useState, type CSSProperties, type FormEvent } from 'react';
import { brand } from '@/lib/brand';
import Reveal from './Reveal';

const loanTypes = [
  'First-time buyer',
  'Renewal / Refinance',
  'Self-employed / Newcomer',
  'Investment / Commercial',
];

const labelWrapStyle: CSSProperties = { display: 'block' };

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--steel)',
  marginBottom: 10,
};

const fieldStyle: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--line-strong)',
  padding: '12px 2px',
  color: 'var(--paper)',
  fontSize: '1rem',
  outline: 'none',
};

const selectStyle: CSSProperties = {
  ...fieldStyle,
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  cursor: 'pointer',
  paddingRight: 22,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%23c9a24a' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 2px center',
  backgroundSize: '14px',
};

const contactRows = [
  {
    label: 'Call or text',
    value: brand.phone,
    href: `tel:+1${brand.phone.replace(/\D/g, '')}`,
    icon: (
      <path
        d="M6.6 10.8c1.2 2.5 3.1 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.3c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3.1.7-.2 1l-1.9 1.9Z"
        stroke="var(--gold)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Email',
    value: brand.email,
    href: `mailto:${brand.email}`,
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="1.4" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="m4 7 8 6 8-6" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: `https://www.instagram.com/${brand.instagram.replace('@', '')}/`,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="var(--gold)" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="4.2" stroke="var(--gold)" strokeWidth="1.4" />
        <circle cx="17" cy="7" r="1" fill="var(--gold)" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: brand.linkedin,
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="var(--gold)" strokeWidth="1.4" />
        <circle cx="8.3" cy="8.3" r="1.1" fill="var(--gold)" />
        <path d="M8.3 11v6" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M12 17v-3.6c0-1.4.9-2.4 2.2-2.4 1.3 0 2 .9 2 2.4V17"
          stroke="var(--gold)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 11v6" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
];

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      style={{
        background: 'var(--ink)',
        padding: 'clamp(72px, 12vh, 140px) var(--edge)',
        borderTop: '1px solid var(--line)',
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 420px) 1fr',
        gap: 'clamp(40px, 6vw, 96px)',
        alignItems: 'start',
      }}
      className="contact-grid"
    >
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <p className="eyebrow" style={{ margin: 0 }}>{brand.contactEyebrow}</p>
          <span style={{ flex: 1, height: 1, background: 'var(--gold-dim)', opacity: 0.4 }} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 3.4vw, 3.25rem)',
            lineHeight: 1.1,
            color: 'var(--paper)',
            marginTop: 20,
            maxWidth: 420,
          }}
        >
          {brand.contactHeading}
        </h2>
        <p
          style={{
            marginTop: 20,
            maxWidth: 420,
            color: 'var(--paper-dim)',
            fontSize: '1.0625rem',
            lineHeight: 1.65,
          }}
        >
          {brand.contactIntro}
        </p>

        <div className="contact-quote">
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true" className="contact-quote-mark">
            <path
              d="M11.1 0 7 9.3h4.4V20H0V9.9L4.3 0h6.8Zm14.6 0-4.1 9.3h4.4V20H14.6V9.9L18.9 0h6.8Z"
              fill="var(--gold)"
            />
          </svg>
          <p className="contact-quote-text">{brand.testimonial.quote}</p>
          <p className="contact-quote-name">— {brand.testimonial.name}</p>
        </div>

        <div style={{ marginTop: 32, maxWidth: 420, display: 'grid', gap: 12 }} className="contact-rows">
          {contactRows.map((row) => (
            <a key={row.label} href={row.href} target={row.label === 'Instagram' ? '_blank' : undefined} rel={row.label === 'Instagram' ? 'noopener noreferrer' : undefined} className="contact-row">
              <span className="contact-row-icon">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {row.icon}
                </svg>
              </span>
              <div>
                <p style={{ color: 'var(--steel)', fontSize: '0.75rem', letterSpacing: '0.06em' }}>{row.label}</p>
                <p style={{ marginTop: 2, color: 'var(--paper)', fontSize: '1.0625rem' }}>{row.value}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="contact-row-arrow">
                <path d="M7 17 17 7M9 7h8v8" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </div>

        <div className="contact-social" style={{ marginTop: 20, maxWidth: 420 }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="contact-social-icon"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="contact-card">
          {status === 'sent' ? (
            <div className="contact-sent">
              <span className="contact-sent-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12.5 10 17.5 19.5 7" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.75rem', color: 'var(--paper)', marginTop: 20 }}>
                Got it.
              </h3>
              <p style={{ marginTop: 10, color: 'var(--paper-dim)', maxWidth: 420, lineHeight: 1.6 }}>
                Your file is started. Expect a reply from {brand.email} today.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="contact-form" style={{ display: 'grid', gap: 26 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }} className="contact-row-pair">
                <label style={labelWrapStyle}>
                  <span style={labelStyle}>Name</span>
                  <input name="name" required style={fieldStyle} autoComplete="name" />
                </label>
                <label style={labelWrapStyle}>
                  <span style={labelStyle}>Email</span>
                  <input type="email" name="email" required style={fieldStyle} autoComplete="email" />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }} className="contact-row-pair">
                <label style={labelWrapStyle}>
                  <span style={labelStyle}>Phone (optional)</span>
                  <input type="tel" name="phone" style={fieldStyle} autoComplete="tel" />
                </label>
                <label style={labelWrapStyle}>
                  <span style={labelStyle}>Loan type</span>
                  <select name="loanType" style={selectStyle} defaultValue={loanTypes[0]}>
                    {loanTypes.map((t) => (
                      <option key={t} value={t} style={{ background: 'var(--panel)', color: 'var(--paper)' }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label style={labelWrapStyle}>
                <span style={labelStyle}>Timeline &amp; loan amount</span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="e.g. Offer accepted, closing in 30 days, $480,000 purchase"
                  style={{ ...fieldStyle, resize: 'vertical' }}
                />
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginTop: 4 }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="contact-submit"
                  style={{
                    padding: '14px 32px',
                    borderRadius: 999,
                    background: 'linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 50%, var(--gold-deep) 100%)',
                    color: 'var(--ink)',
                    border: 'none',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    boxShadow: '0 0 20px rgba(201, 162, 74, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                    cursor: status === 'sending' ? 'default' : 'pointer',
                    opacity: status === 'sending' ? 0.7 : 1,
                    transition: 'all 0.4s ease',
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send'}
                </button>

                {status === 'error' && (
                  <p className="contact-notice">
                    Something went wrong — email <a href={`mailto:${brand.email}`} style={{ color: 'var(--gold)' }}>{brand.email}</a> directly instead.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </Reveal>

      <style>{`
        .contact-quote {
          position: relative;
          margin-top: 28px;
          max-width: 420px;
          padding: 22px 22px 20px 26px;
          background: var(--panel);
          border: 1px solid var(--line-strong);
          border-left: 2px solid var(--gold);
          border-radius: 10px;
        }
        .contact-quote-mark { opacity: 0.85; display: block; }
        .contact-quote-text {
          margin-top: 10px;
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: var(--paper-dim);
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        .contact-quote-name { margin-top: 12px; color: var(--steel); font-size: 0.8125rem; }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 18px;
          background: var(--panel);
          border: 1px solid var(--line-strong);
          border-radius: 12px;
          text-decoration: none;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
        }
        .contact-row:hover {
          border-color: var(--gold-dim);
          transform: translateY(-2px);
          background: #0a2470;
        }
        .contact-row-icon {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: rgba(201,162,74,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease;
        }
        .contact-row:hover .contact-row-icon { background: rgba(201,162,74,0.18); }
        .contact-row-arrow {
          margin-left: auto;
          flex-shrink: 0;
          opacity: 0;
          transform: translate(-3px, 3px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .contact-row:hover .contact-row-arrow { opacity: 1; transform: translate(0, 0); }

        .contact-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .contact-social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--panel);
          border: 1px solid var(--line-strong);
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
        }
        .contact-social-icon:hover {
          border-color: var(--gold-dim);
          background: rgba(201,162,74,0.1);
          transform: translateY(-2px);
        }

        .contact-card {
          background: var(--panel);
          border: 1px solid var(--line-strong);
          border-radius: 18px;
          padding: clamp(28px, 3.4vw, 44px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
        }

        .contact-sent { padding: 20px 4px; }
        .contact-sent-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(201,162,74,0.12);
          border: 1px solid var(--gold-dim);
        }

        .contact-notice {
          color: var(--paper-dim);
          font-size: 0.875rem;
          line-height: 1.5;
          padding: 10px 14px;
          background: rgba(201,162,74,0.07);
          border: 1px solid var(--gold-dim);
          border-radius: 8px;
        }

        .contact-form input, .contact-form select, .contact-form textarea {
          transition: border-color 0.2s ease;
        }
        .contact-form input:focus, .contact-form select:focus, .contact-form textarea:focus {
          border-bottom-color: var(--gold);
        }
        .contact-form input::placeholder, .contact-form textarea::placeholder {
          color: var(--steel);
          opacity: 0.7;
        }
        .contact-submit:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 0 30px rgba(201, 162, 74, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-row-pair { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
