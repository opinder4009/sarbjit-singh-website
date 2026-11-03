import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  arrow?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

export default function Button({ href, children, variant = 'primary', arrow = true, style, onClick, target, rel }: ButtonProps) {
  return (
    <>
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`btn-${variant}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          borderRadius: 999,
          padding: '13px 28px',
          fontSize: '0.8125rem',
          fontWeight: 600,
          letterSpacing: '0.01em',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'all 0.4s ease',
          ...style,
        }}
      >
        {children}
        {variant === 'primary' && arrow && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Link>
      <style>{`
        .btn-primary {
          position: relative;
          background: linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 50%, var(--gold-deep) 100%);
          color: var(--ink);
          box-shadow: 0 0 20px rgba(201, 162, 74, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 30px rgba(201, 162, 74, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        .btn-outline {
          background: transparent;
          color: var(--gold);
          border: 1px solid var(--gold-dim);
        }
        .btn-outline:hover {
          transform: translateY(-1px);
          border-color: var(--gold);
          background: rgba(201, 162, 74, 0.08);
        }
      `}</style>
    </>
  );
}
