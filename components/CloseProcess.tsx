'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { brand } from '@/lib/brand';
import Reveal from './Reveal';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

const STEPS = brand.process;
const N = STEPS.length;

function Intro() {
  return (
    <div className="pj-intro">
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <p className="eyebrow" style={{ margin: 0, color: 'var(--gold)' }}>
            {brand.processEyebrow}
          </p>
          <span style={{ flex: 1, height: 1, background: 'var(--gold-dim)', opacity: 0.4 }} />
        </div>
        <h2 className="pj-h2">
          First call to keys, in <em>four steps.</em>
        </h2>
        <p className="pj-intro-p">{brand.processIntro}</p>
      </Reveal>
    </div>
  );
}

export default function CloseProcess() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [supported, setSupported] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSupported(hasWebGL());
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!checked || !supported) return;
    const wrap = wrapRef.current;
    const mount = mountRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !mount || !canvas) return;

    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010c3a, 0.025);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 2, 15);

    scene.add(new THREE.AmbientLight(0x9fb3e0, 1.3));
    const warm = new THREE.PointLight(0xe0b65c, 130, 35);
    warm.position.set(6, 8, 8);
    scene.add(warm);
    const cool = new THREE.PointLight(0x4f74c9, 95, 30);
    cool.position.set(-4, 2, -6);
    scene.add(cool);
    const rim = new THREE.PointLight(0xffffff, 55, 26);
    rim.position.set(0, 3, -9);
    scene.add(rim);

    const gold = new THREE.MeshStandardMaterial({ color: 0xc9a24a, metalness: 0.78, roughness: 0.24 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x0e1a3e, metalness: 0.45, roughness: 0.34 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x3f6fb8,
      metalness: 0.15,
      roughness: 0.12,
      transparent: true,
      opacity: 0.48,
      side: THREE.DoubleSide,
    });
    const paper = new THREE.MeshStandardMaterial({ color: 0xf2efe9, roughness: 0.8, side: THREE.DoubleSide });
    const bronze = new THREE.MeshStandardMaterial({ color: 0x7a5d22, roughness: 0.55, metalness: 0.4 });
    const sage = new THREE.MeshStandardMaterial({ color: 0x3f6b4f, roughness: 0.7, metalness: 0.1 });
    const beacon = new THREE.MeshStandardMaterial({ color: 0xffe3a6, emissive: 0xe0b65c, emissiveIntensity: 1.6 });
    const sharedMaterials = [gold, dark, glass, paper, bronze, sage, beacon];

    const stages: THREE.Group[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0
    ) {
      const geo = new THREE.BoxGeometry(w, h, d);
      geometries.push(geo);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    }
    function line(parent: THREE.Object3D, x: number, y: number, z: number, w: number, mat = gold) {
      box(parent, w, 0.025, 0.02, mat, x, y, z);
    }
    function ring(parent: THREE.Object3D, r: number, t: number, x: number, y: number, z: number, mat = gold) {
      const geo = new THREE.TorusGeometry(r, t, 16, 80);
      geometries.push(geo);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    }
    function cyl(
      parent: THREE.Object3D,
      rt: number,
      rb: number,
      h: number,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0,
      n = 20
    ) {
      const geo = new THREE.CylinderGeometry(rt, rb, h, n);
      geometries.push(geo);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    }
    function sphere(parent: THREE.Object3D, r: number, mat: THREE.Material, x = 0, y = 0, z = 0) {
      const geo = new THREE.SphereGeometry(r, 20, 16);
      geometries.push(geo);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    }
    function newStage() {
      const g = new THREE.Group();
      g.position.set(2.8, 0, 0);
      scene.add(g);
      stages.push(g);
      return g;
    }

    // 1: Free consultation — desk, laptop, phone, a coffee mug, notepad, and a warm conversational ring.
    {
      const g = newStage();
      box(g, 7, 0.24, 4, dark, 0, -1.7, 0);
      box(g, 2.4, 0.12, 1.5, dark, -1, -1.48, 0);
      box(g, 1.9, 0.09, 1.1, glass, -1, -1.37, 0.05);
      const phone = box(g, 1.15, 0.12, 2.1, dark, 1.55, -1.4, 0.3);
      phone.rotation.y = -0.35;
      const screen = box(g, 0.96, 0.02, 1.85, glass, 1.55, -1.32, 0.3);
      screen.rotation.y = -0.35;
      const conversationRing = ring(g, 0.55, 0.035, 1.5, 0.3, 0.2);
      conversationRing.rotation.x = 0.25;
      for (let i = 0; i < 3; i++) line(g, -1.7, -1.27, -0.1 + i * 0.27, 1.15);

      cyl(g, 0.26, 0.22, 0.4, dark, -2.5, -1.46, 1.1);
      const mugHandle = ring(g, 0.14, 0.03, -2.74, -1.46, 1.1);
      mugHandle.rotation.y = Math.PI / 2;
      box(g, 1.1, 0.03, 0.75, paper, -0.3, -1.42, 1.25);
      cyl(g, 0.016, 0.016, 0.5, gold, 0.1, -1.36, 1.25).rotation.z = 0.55;
    }

    // 2: Documents — a fanned stack of pages, a resting pen, and a wax seal.
    {
      const g = newStage();
      for (let i = 0; i < 6; i++) {
        const p = box(g, 2.7, 3.6, 0.035, i % 2 ? paper : glass, (i - 2.5) * 0.55, (i - 2.5) * 0.22, (i - 2.5) * -0.45);
        p.rotation.y = (i - 2.5) * 0.14;
        p.rotation.z = (i - 2.5) * -0.08;
        for (let j = 0; j < 6; j++) {
          line(g, (i - 2.5) * 0.55, (i - 2.5) * 0.22 + 1.1 - j * 0.35, (i - 2.5) * -0.45 + 0.05, 1.25, i % 2 ? dark : gold);
        }
      }
      ring(g, 0.68, 0.075, 1.8, -1, 2);
      sphere(g, 0.1, gold, 1.8, -1, 2.04);
      const pen = cyl(g, 0.022, 0.022, 1.9, gold, -0.4, 1.35, 0.35);
      pen.rotation.z = Math.PI / 2 - 0.3;
      pen.rotation.y = 0.2;
      cyl(g, 0.03, 0.022, 0.16, dark, 0.52, 1.6, 0.46).rotation.z = Math.PI / 2 - 0.3;
    }

    // 3: Your options — floating comparison cards with a mini rate bar beneath each.
    {
      const g = newStage();
      const barHeights = [0.5, 0.82, 0.64];
      for (let i = 0; i < 3; i++) {
        const card = new THREE.Group();
        card.position.set((i - 1) * 1.95, i === 1 ? 0.25 : -0.18, -Math.abs(i - 1) * 0.65);
        card.rotation.y = (1 - i) * 0.18;
        g.add(card);
        box(card, 1.8, 3.1, 0.12, dark);
        box(card, 1.7, 2.98, 0.025, glass, 0, 0, 0.08);
        line(card, 0, 0.95, 0.12, 1.15);
        for (let j = 0; j < 4; j++) line(card, 0, 0.3 - j * 0.38, 0.12, 1.25 - j * 0.1, paper);
        sphere(card, 0.24, gold, 0, -1.05, 0.22);

        const bh = barHeights[i];
        box(card, 0.3, bh, 0.1, i === 1 ? gold : bronze, -0.55, -1.75 + bh / 2, 0.14);
      }
      for (let i = 0; i < 2; i++) {
        const dotLine = new THREE.Group();
        dotLine.position.set(-0.98 + i * 1.95, 0.04, -0.3);
        g.add(dotLine);
        for (let k = 0; k < 5; k++) sphere(dotLine, 0.022, gold, k * 0.2, 0, 0);
      }
    }

    // 4: Closing — a stylized home with a door that opens, a porch light, and a planter.
    let door: THREE.Mesh | null = null;
    let porchLight: THREE.Mesh | null = null;
    {
      const g = newStage();
      box(g, 6, 3.6, 3.6, paper, 0, -0.25, -1);
      box(g, 6.4, 0.25, 4, dark, 0, 1.7, -1);
      box(g, 2.1, 3.1, 0.15, dark, 0.65, -0.5, 1);
      door = box(g, 1.8, 2.85, 0.12, bronze, 0.65, -0.55, 1.12);
      box(g, 0.12, 0.12, 0.18, gold, 1.3, -0.5, 1.25);
      for (let i = 0; i < 3; i++) box(g, 0.7, 1.5, 0.06, glass, -2.1 + i * 0.8, -0.1, 1);
      box(g, 8, 0.12, 5, dark, 0, -2.1, -0.2);
      box(g, 6.7, 0.2, 4.1, dark, 0, 1.85, -1);

      cyl(g, 0.03, 0.03, 0.45, dark, -0.55, 0.55, 1.2);
      porchLight = sphere(g, 0.1, beacon, -0.55, 0.3, 1.2);

      cyl(g, 0.3, 0.38, 0.46, dark, 1.9, -1.85, 1.5);
      for (let i = 0; i < 5; i++) {
        const a = (i / 4) * Math.PI * 2;
        cyl(g, 0.02, 0.05, 0.5 + (i % 2) * 0.18, sage, 1.9 + Math.cos(a) * 0.14, -1.55 + (i % 2) * 0.08, 1.5 + Math.sin(a) * 0.14).rotation.z = (Math.random() - 0.5) * 0.3;
      }

      box(g, 1.3, 0.04, 0.55, dark, 0.65, -2.12, 1.55);
    }

    // Shared floor and drifting gold particles tie the stages to one grounded scene.
    const floorGeo = new THREE.PlaneGeometry(50, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x08123a, metalness: 0.3, roughness: 0.65 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.15;
    scene.add(floor);

    const dustCount = 140;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 34;
      dustPos[i * 3 + 1] = Math.random() * 4.5 - 1.2;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xe0b65c, size: 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 720 ? 50 : 38;
      camera.updateProjectionMatrix();
    };
    resize();

    let targetProgress = 0;
    let smoothed = 0;
    let shown = -1;
    const updateScrollProgress = () => {
      const rect = wrap.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      targetProgress = span > 0 ? Math.max(0, Math.min(N - 1, (-rect.top / span) * (N - 1))) : 0;
    };
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    const applyStages = (smooth: number) => {
      const activeIdx = Math.min(N - 1, Math.round(smooth));
      if (activeIdx !== shown) {
        shown = activeIdx;
        setActive(activeIdx);
      }
      stages.forEach((g, i) => {
        const distance = Math.abs(smooth - i);
        const visible = Math.max(0, 1 - distance);
        g.visible = distance < 1.05;
        g.scale.setScalar(0.8 + visible * 0.2);
        g.position.x = 2.8 + (i - smooth) * 11;
        g.rotation.y = (smooth - i) * 0.48 + Math.sin(wobbleT * 0.0003 + i) * 0.035;
        g.rotation.x = Math.sin(wobbleT * 0.00035 + i) * 0.018;
      });
      if (door) door.rotation.y = -Math.max(0, smooth - (N - 1) + 0.35) * 1.8;
      if (porchLight) {
        const arrival = Math.max(0, Math.min(1, smooth - (N - 1) + 0.6));
        (porchLight.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.2 + arrival * 2.2;
      }
    };

    let raf = 0;
    let wobbleT = 0;
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      wobbleT = now;
      smoothed += (targetProgress - smoothed) * 0.055;
      applyStages(smoothed);
      dust.rotation.y = wobbleT * 0.000012;
      camera.position.x = Math.sin(wobbleT * 0.00018) * 0.15;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    let cleanupReducedScroll: (() => void) | null = null;
    if (reduced) {
      const renderOnce = () => {
        smoothed = targetProgress;
        applyStages(smoothed);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      window.addEventListener('scroll', renderOnce, { passive: true });
      renderOnce();
      cleanupReducedScroll = () => window.removeEventListener('scroll', renderOnce);
    } else {
      raf = requestAnimationFrame(animate);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
      cleanupReducedScroll?.();
      geometries.forEach((g) => g.dispose());
      sharedMaterials.forEach((m) => m.dispose());
      floorGeo.dispose();
      floorMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [checked, supported]);

  const step = STEPS[active];

  if (checked && !supported) {
    return (
      <section className="pj-root">
        <Intro />
        <div className="pj-fallback">
          {STEPS.map((s) => (
            <div key={s.index} className="pj-fallback-card">
              <span className="pj-fallback-index">{s.index}</span>
              <h3 className="pj-h3">{s.title}</h3>
              <p className="pj-p">{s.body}</p>
            </div>
          ))}
        </div>
        <style>{`
          .pj-fallback { padding: 0 var(--edge) clamp(72px, 12vh, 140px); display: grid; gap: 14px; max-width: 720px; }
          .pj-fallback-card { background: var(--panel); border: 1px solid var(--line-strong); border-radius: 12px; padding: 20px 24px; }
          .pj-fallback-index { color: var(--gold); font-size: 0.75rem; letter-spacing: 0.1em; }
        `}</style>
      </section>
    );
  }

  return (
    <section className="pj-root">
      <div ref={wrapRef} className="pj-wrap">
        <div ref={mountRef} className="pj-sticky">
          <canvas ref={canvasRef} className="pj-canvas" aria-hidden="true" />
          <div className="pj-shade" aria-hidden="true" />
          <div className="pj-content">
            <Reveal>
              <div className="pj-content-intro">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <p className="eyebrow" style={{ margin: 0, color: 'var(--gold)' }}>
                    {brand.processEyebrow}
                  </p>
                  <span style={{ flex: 1, height: 1, background: 'var(--gold-dim)', opacity: 0.4, maxWidth: 60 }} />
                </div>
                <h2 className="pj-h2">
                  First call to keys, in <em>four steps.</em>
                </h2>
                <p className="pj-intro-p">{brand.processIntro}</p>
              </div>
            </Reveal>
            <div className="pj-rule" />
            <div key={active} className="pj-step-text">
              <h3 className="pj-h3">{step.title}</h3>
              <p className="pj-p">{step.body}</p>
            </div>
          </div>
          <div className="pj-dots">
            {STEPS.map((s, i) => (
              <span key={s.index} className={`pj-dot${i <= active ? ' active' : ''}`} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .pj-root { background: var(--ink); }
        .pj-intro { padding: clamp(56px, 8vh, 96px) var(--edge) clamp(28px, 4vh, 44px); }
        .pj-h2 {
          font-family: var(--font-editorial); font-weight: 600; font-style: normal;
          font-size: clamp(2.25rem, 3.8vw, 3.75rem); line-height: 1.05; margin-top: 14px; max-width: 640px; color: var(--paper);
        }
        .pj-h2 em { font-style: italic; color: var(--gold); }
        .pj-intro-p { margin-top: 12px; max-width: 520px; color: var(--paper-dim); font-size: 1.0625rem; line-height: 1.65; }

        .pj-wrap { position: relative; height: 380vh; }
        .pj-sticky {
          position: sticky; top: 0; height: 100svh; overflow: hidden;
          background: radial-gradient(ellipse at 65% 50%, var(--panel) 0%, var(--ink) 55%, #000814 90%);
        }
        .pj-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .pj-shade {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(90deg, rgba(1,12,58,0.9), rgba(1,12,58,0.45) 42%, transparent 75%);
        }
        .pj-content { position: absolute; left: clamp(24px, 8vw, 150px); top: 11%; max-width: 480px; z-index: 2; }
        .pj-content-intro .pj-h2 {
          font-family: var(--font-body); font-style: normal; font-weight: 500;
          font-size: 0.9375rem; line-height: 1.55; letter-spacing: 0.01em;
          margin-top: 10px; max-width: 400px; color: var(--paper-dim); opacity: 1;
        }
        .pj-content-intro .pj-h2 em { font-style: normal; font-weight: 600; color: var(--gold); }
        .pj-content-intro .pj-intro-p { font-size: 0.875rem; margin-top: 10px; max-width: 420px; line-height: 1.6; opacity: 0.85; }
        .pj-rule { width: 40px; height: 1px; background: var(--gold-dim); opacity: 0.55; margin: 24px 0 18px; }
        .pj-step-text { animation: pj-step-in 0.55s cubic-bezier(.22,1,.36,1); }
        @keyframes pj-step-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .pj-h3 {
          font-family: var(--font-editorial); font-weight: 400; font-style: italic;
          font-size: clamp(2.25rem, 4.2vw, 3.75rem); line-height: 1.08; margin: 0 0 10px; color: var(--gold);
        }
        .pj-p { font-size: 1.0625rem; line-height: 1.75; color: var(--paper-dim); max-width: 420px; }
        .pj-dots { position: absolute; bottom: 8%; left: clamp(24px, 8vw, 150px); display: flex; gap: 10px; z-index: 3; }
        .pj-dot { width: 46px; height: 3px; background: var(--line-strong); transition: background 0.4s; }
        .pj-dot.active { background: var(--gold); }

        @media (max-width: 720px) {
          .pj-wrap { height: 300vh; }
          .pj-content { top: 8%; max-width: 92%; }
          .pj-content-intro .pj-h2 { font-size: 0.875rem; margin-top: 8px; }
          .pj-content-intro .pj-intro-p { display: none; }
          .pj-rule { margin: 16px 0 14px; }
          .pj-h3 { font-size: 2rem; margin: 0 0 8px; }
          .pj-p { font-size: 0.9375rem; }
          .pj-shade { background: linear-gradient(0deg, var(--ink) 8%, rgba(1,12,58,0.65) 42%, transparent 90%); }
          .pj-dots { bottom: 9%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pj-sticky { will-change: auto; }
          .pj-step-text { animation: none; }
        }
      `}</style>
    </section>
  );
}
