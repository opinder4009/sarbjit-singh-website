'use client';
import { useRef, type PointerEvent, type ReactNode } from 'react';

export default function TiltCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    } catch {}
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform 80ms linear';
    el.style.transform = `perspective(900px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(6px)`;
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = '';
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}
