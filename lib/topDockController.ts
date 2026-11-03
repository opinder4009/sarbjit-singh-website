export type TopDockOptions = {
  proximity: number;
  spring: number;
  damping: number;
  widthGrowth: number;
  heightGrowth: number;
  drop: number;
  axis?: 'x' | 'y';
};

const SETTLE_EPSILON = 0.001;

/**
 * Drives a macOS-dock-style proximity magnify effect: items under
 * `root` tagged `[data-dock-item]` grow/lift as the pointer nears them,
 * animated with a simple spring-damper integrator (not CSS transitions,
 * so the motion stays fluid under fast pointer movement). Reads live
 * values from `getOptions()` each frame rather than closing over props,
 * so the host component can tune the feel without recreating the
 * controller.
 */
export function createTopDockController(root: HTMLElement, getOptions: () => TopDockOptions) {
  const current = new Map<HTMLElement, number>();
  const velocity = new Map<HTMLElement, number>();
  const target = new Map<HTMLElement, number>();

  let pointerActive = false;
  let pointerPos = 0;
  let frame = 0;

  const items = () => Array.from(root.querySelectorAll<HTMLElement>('[data-dock-item]'));

  function recomputeTargets() {
    const opts = getOptions();
    const axis = opts.axis ?? 'x';
    const rootRect = root.getBoundingClientRect();

    items().forEach((el) => {
      if (!pointerActive) {
        target.set(el, 0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const center =
        axis === 'x' ? rect.left + rect.width / 2 - rootRect.left : rect.top + rect.height / 2 - rootRect.top;
      const dist = Math.abs(pointerPos - center);
      const linear = Math.max(0, 1 - dist / Math.max(1, opts.proximity));
      target.set(el, linear * linear * (3 - 2 * linear));
    });
  }

  function tick() {
    const opts = getOptions();
    let maxT = 0;
    let settled = true;

    items().forEach((el) => {
      const t = target.get(el) ?? 0;
      let c = current.get(el) ?? 0;
      let v = velocity.get(el) ?? 0;

      v = (v + (t - c) * opts.spring) * opts.damping;
      c += v;

      if (Math.abs(v) > SETTLE_EPSILON || Math.abs(t - c) > SETTLE_EPSILON) settled = false;
      current.set(el, c);
      velocity.set(el, v);
      maxT = Math.max(maxT, c);

      const scaleW = 1 + (opts.widthGrowth / 100) * c;
      const scaleH = 1 + (opts.heightGrowth / 100) * c;
      el.style.setProperty('--dock-scale-w', scaleW.toFixed(4));
      el.style.setProperty('--dock-scale-h', scaleH.toFixed(4));
      el.style.setProperty('--dock-drop', (opts.drop * c).toFixed(3));
      el.style.setProperty('--dock-t', c.toFixed(4));
    });

    root.setAttribute('data-dock-state', pointerActive ? 'active' : 'idle');
    root.setAttribute('data-dock-max', maxT.toFixed(2));

    frame = settled && !pointerActive ? 0 : requestAnimationFrame(tick);
  }

  function wake() {
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function onPointerMove(event: PointerEvent) {
    const opts = getOptions();
    const axis = opts.axis ?? 'x';
    const rect = root.getBoundingClientRect();
    pointerPos = axis === 'x' ? event.clientX - rect.left : event.clientY - rect.top;
    pointerActive = true;
    recomputeTargets();
    wake();
  }

  function onPointerLeave() {
    pointerActive = false;
    recomputeTargets();
    wake();
  }

  root.addEventListener('pointermove', onPointerMove, { passive: true });
  root.addEventListener('pointerleave', onPointerLeave, { passive: true });

  return () => {
    root.removeEventListener('pointermove', onPointerMove);
    root.removeEventListener('pointerleave', onPointerLeave);
    if (frame) cancelAnimationFrame(frame);
  };
}
