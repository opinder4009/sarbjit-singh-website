'use client';
import { useState } from 'react';
import { brand } from '@/lib/brand';

const PROPERTY_TYPES = ['Single-family home or condo', 'Second home or cottage', 'Duplex', 'Triplex', 'Fourplex', 'Multi-unit or commercial'];

const PROVINCES = [
  'Ontario',
  'British Columbia',
  'Alberta',
  'Quebec',
  'Manitoba',
  'Saskatchewan',
  'Nova Scotia',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Prince Edward Island',
  'Northwest Territories',
  'Yukon',
  'Nunavut',
];

const STEP_WORDS = ['One', 'Two', 'Three', 'Four', 'Five'];
const TOTAL_STEPS = 5;

type Answers = {
  ownProperty: '' | 'Yes' | 'No';
  propertyType: string;
  propertyValue: string;
  amountNeeded: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  province: string;
};

const INITIAL_ANSWERS: Answers = {
  ownProperty: '',
  propertyType: '',
  propertyValue: '',
  amountNeeded: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  province: '',
};

function formatCurrency(raw: string) {
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('en-CA');
}

export default function GetRatesQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function close() {
    setOpen(false);
    window.setTimeout(() => {
      setStep(1);
      setAnswers(INITIAL_ANSWERS);
      setStatus('idle');
    }, 300);
  }

  const canAdvance =
    step === 1
      ? answers.ownProperty !== ''
      : step === 2
        ? answers.propertyType !== ''
        : step === 3
          ? Number(answers.propertyValue.replace(/\D/g, '')) > 0
          : step === 4
            ? Number(answers.amountNeeded.replace(/\D/g, '')) > 0
            : answers.firstName.trim() !== '' &&
              answers.lastName.trim() !== '' &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email) &&
              answers.phone.trim() !== '' &&
              answers.province !== '';

  async function handlePrimary() {
    if (!canAdvance || status === 'sending') return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/get-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const summaryItems = [
    { label: 'Own property', value: answers.ownProperty || 'Not provided' },
    { label: 'Property type', value: answers.propertyType || 'Not provided' },
    { label: 'Property value', value: answers.propertyValue ? `$${answers.propertyValue}` : 'Not provided' },
    { label: 'Amount needed', value: answers.amountNeeded ? `$${answers.amountNeeded}` : 'Not provided' },
  ];

  return (
    <>
      <button type="button" className="rq-trigger" onClick={() => setOpen(true)}>
        Get Your Rates
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="rq-overlay" role="dialog" aria-modal="true" aria-label="Get your rates">
          <div className="rq-modal">
            <button type="button" className="rq-close" onClick={close} aria-label="Close">
              CLOSE ×
            </button>

            {status === 'sent' ? (
              <div className="rq-sent">
                <span className="rq-sent-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5 10 17.5 19.5 7" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3>Got it — your file is started.</h3>
                <p>Expect a reply from {brand.email} with your rates shortly. No credit check, no obligation.</p>
                <button type="button" className="rq-primary" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="rq-step-count">
                  {STEP_WORDS[step - 1]} / Five
                </p>

                {step === 1 && (
                  <div className="rq-step">
                    <p className="eyebrow">Own Property</p>
                    <h3>Do you own the property?</h3>
                    <p className="rq-help">
                      This tells us whether we&rsquo;re pricing a purchase or a private mortgage against something you already own.
                    </p>
                    <div className="rq-options">
                      {(['Yes', 'No'] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          className={`rq-option${answers.ownProperty === v ? ' is-active' : ''}`}
                          onClick={() => update('ownProperty', v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="rq-step">
                    <p className="eyebrow">Property Type</p>
                    <h3>What type of property is it?</h3>
                    <p className="rq-help">Pick whichever is closest — it shapes which lenders and rates make sense.</p>
                    <div className="rq-options rq-options--stack">
                      {PROPERTY_TYPES.map((v) => (
                        <button
                          key={v}
                          type="button"
                          className={`rq-option${answers.propertyType === v ? ' is-active' : ''}`}
                          onClick={() => update('propertyType', v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="rq-step">
                    <p className="eyebrow">Property Value</p>
                    <h3>What&rsquo;s it roughly worth?</h3>
                    <p className="rq-help">A ballpark figure is fine — we&rsquo;ll confirm with an appraisal later.</p>
                    <label className="rq-input-wrap">
                      <span>$</span>
                      <input
                        inputMode="numeric"
                        placeholder="Property value"
                        value={answers.propertyValue}
                        onChange={(e) => update('propertyValue', formatCurrency(e.target.value))}
                      />
                    </label>
                  </div>
                )}

                {step === 4 && (
                  <div className="rq-step">
                    <p className="eyebrow">Amount Needed</p>
                    <h3>How much are you looking to borrow?</h3>
                    <p className="rq-help">Move the slider or type an amount — this is just a starting point for your quote.</p>
                    <input
                      type="range"
                      min={0}
                      max={2000000}
                      step={5000}
                      value={Number(answers.amountNeeded.replace(/\D/g, '')) || 0}
                      onChange={(e) => update('amountNeeded', formatCurrency(e.target.value))}
                      className="rq-slider"
                    />
                    <label className="rq-input-wrap">
                      <span>$</span>
                      <input
                        inputMode="numeric"
                        placeholder="Amount needed"
                        value={answers.amountNeeded}
                        onChange={(e) => update('amountNeeded', formatCurrency(e.target.value))}
                      />
                    </label>
                  </div>
                )}

                {step === 5 && (
                  <div className="rq-step">
                    <p className="eyebrow">Contact Details</p>
                    <h3>Where should we send your rates?</h3>
                    <p className="rq-help">We use this only to follow up on your rate request. No credit check, no obligation.</p>
                    <div className="rq-fields">
                      <label className="rq-field">
                        <span>First name</span>
                        <input value={answers.firstName} onChange={(e) => update('firstName', e.target.value)} autoComplete="given-name" />
                      </label>
                      <label className="rq-field">
                        <span>Last name</span>
                        <input value={answers.lastName} onChange={(e) => update('lastName', e.target.value)} autoComplete="family-name" />
                      </label>
                      <label className="rq-field">
                        <span>Email</span>
                        <input type="email" value={answers.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
                      </label>
                      <label className="rq-field">
                        <span>Phone</span>
                        <input type="tel" value={answers.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
                      </label>
                      <label className="rq-field rq-field--full">
                        <span>Province</span>
                        <select value={answers.province} onChange={(e) => update('province', e.target.value)}>
                          <option value="">Select your province</option>
                          {PROVINCES.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <p className="rq-direct">
                      Prefer direct contact? Reach me at{' '}
                      <a href={`mailto:${brand.email}`}>{brand.email}</a> or call/text{' '}
                      <a href={`tel:+1${brand.phone.replace(/\D/g, '')}`}>{brand.phone}</a>.
                    </p>
                  </div>
                )}

                {step > 1 && (
                  <div className="rq-summary">
                    <p className="rq-summary-title">Your quote details so far</p>
                    <ul>
                      {summaryItems.map((it) => (
                        <li key={it.label}>
                          <span>{it.label}:</span> {it.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {status === 'error' && <p className="rq-error">Something went wrong — try again, or email {brand.email} directly.</p>}

                <div className="rq-footer">
                  {step > 1 && (
                    <button type="button" className="rq-back" onClick={() => setStep((s) => s - 1)}>
                      Back
                    </button>
                  )}
                  <button type="button" className="rq-primary" disabled={!canAdvance || status === 'sending'} onClick={handlePrimary}>
                    {status === 'sending' ? 'Sending…' : 'Get Your Rates'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .rq-trigger {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: 999px;
          padding: 13px 28px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
          cursor: pointer;
          border: 0;
          background: linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          color: var(--ink);
          box-shadow: 0 0 20px rgba(201, 162, 74, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }
        .rq-trigger:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(201, 162, 74, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8); }

        .rq-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(1, 6, 26, 0.86);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .rq-modal {
          position: relative;
          width: min(560px, 100%);
          max-height: 88vh;
          overflow-y: auto;
          background: var(--panel);
          border: 1px solid var(--line-strong);
          border-radius: 18px;
          padding: clamp(28px, 5vw, 44px);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.55);
        }
        .rq-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: 0;
          color: var(--paper-dim);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          cursor: pointer;
        }
        .rq-close:hover { color: var(--gold); }

        .rq-step-count {
          color: var(--gold);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .rq-step h3 {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: var(--paper);
          margin-top: 8px;
          line-height: 1.15;
        }
        .rq-help {
          margin-top: 12px;
          color: var(--paper-dim);
          font-size: 0.9375rem;
          line-height: 1.55;
          max-width: 420px;
        }

        .rq-options { display: flex; gap: 12px; margin-top: 24px; }
        .rq-options--stack { flex-direction: column; }
        .rq-option {
          flex: 1;
          text-align: left;
          padding: 14px 18px;
          border-radius: 10px;
          border: 1px solid var(--line-strong);
          background: transparent;
          color: var(--paper);
          font-size: 0.9375rem;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
        }
        .rq-option:hover { border-color: var(--gold-dim); }
        .rq-option.is-active { border-color: var(--gold); background: rgba(201, 162, 74, 0.1); color: var(--gold-bright); }

        .rq-input-wrap {
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--line-strong);
          padding-bottom: 10px;
          max-width: 280px;
        }
        .rq-input-wrap span { color: var(--gold); font-size: 1.125rem; }
        .rq-input-wrap input {
          flex: 1;
          background: transparent;
          border: 0;
          outline: none;
          color: var(--paper);
          font-size: 1.25rem;
        }
        .rq-slider {
          width: 100%;
          margin-top: 22px;
          accent-color: var(--gold);
        }

        .rq-fields { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .rq-field { display: block; }
        .rq-field--full { grid-column: 1 / -1; }
        .rq-field span {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--steel);
          margin-bottom: 8px;
        }
        .rq-field input, .rq-field select {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--line-strong);
          padding: 8px 2px;
          color: var(--paper);
          font-size: 1rem;
          outline: none;
        }
        .rq-field select { cursor: pointer; }
        .rq-field select option { color: #000; }

        .rq-direct { margin-top: 22px; color: var(--paper-dim); font-size: 0.8125rem; line-height: 1.5; }
        .rq-direct a { color: var(--gold); text-decoration: none; }
        .rq-direct a:hover { text-decoration: underline; }

        .rq-summary {
          margin-top: 28px;
          padding: 16px 18px;
          border-radius: 10px;
          background: var(--ink);
          border: 1px solid var(--line);
        }
        .rq-summary-title { font-size: 0.75rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--steel); }
        .rq-summary ul { margin: 10px 0 0; padding: 0; list-style: none; display: grid; gap: 6px; }
        .rq-summary li { font-size: 0.875rem; color: var(--paper-dim); }
        .rq-summary li span { color: var(--paper); }

        .rq-error { margin-top: 18px; color: #f0a0a0; font-size: 0.875rem; }

        .rq-footer { margin-top: 32px; display: flex; align-items: center; justify-content: flex-end; gap: 16px; }
        .rq-back {
          background: transparent;
          border: 0;
          color: var(--paper-dim);
          font-size: 0.875rem;
          cursor: pointer;
          margin-right: auto;
        }
        .rq-back:hover { color: var(--paper); }
        .rq-primary {
          border: 0;
          border-radius: 999px;
          padding: 13px 28px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          background: linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          color: var(--ink);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .rq-primary:hover:not(:disabled) { transform: translateY(-1px); }
        .rq-primary:disabled { opacity: 0.4; cursor: not-allowed; }

        .rq-sent { text-align: center; padding: 20px 0; }
        .rq-sent-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid var(--gold);
        }
        .rq-sent h3 { font-family: var(--font-editorial); font-style: italic; font-weight: 400; font-size: 1.75rem; color: var(--paper); margin-top: 20px; }
        .rq-sent p { margin-top: 10px; color: var(--paper-dim); max-width: 380px; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .rq-sent .rq-primary { margin-top: 24px; }

        @media (max-width: 520px) {
          .rq-fields { grid-template-columns: 1fr; }
          .rq-options { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
