'use client';
import { useEffect, useState } from 'react';
import { brand } from '@/lib/brand';

export default function SiteMark() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > window.innerHeight * 1.6);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px var(--edge)',
        pointerEvents: show ? 'auto' : 'none',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        background: 'linear-gradient(rgba(10,10,12,0.88), transparent)',
      }}
    >
      <span style={{ color: 'var(--paper)', fontWeight: 500, fontSize: '0.9375rem' }}>
        {brand.name}
      </span>
      <a
        href="#contact"
        style={{
          color: 'var(--brass)',
          fontSize: '0.875rem',
          textDecoration: 'none',
          borderBottom: '1px solid var(--brass)',
          paddingBottom: 2,
        }}
      >
        Start a file
      </a>
    </div>
  );
}
