'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { brand } from '@/lib/brand';
import { mortgageServices } from '@/lib/mortgageServices';

const ICONS = ['⌂', '⚿', '↻', '✓', '▤', '▣', '▥', '⚒'];
const COUNT = mortgageServices.length;

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function MortgageServices3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<(i: number) => void>(() => {});
  const [current, setCurrent] = useState(0);
  const [supported, setSupported] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSupported(hasWebGL());
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!checked || !supported) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {}

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x051a5e, 0.014);
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 25, 49);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.7;

    scene.add(new THREE.HemisphereLight(0xe0b65c, 0x120d08, 1.8));
    const sun = new THREE.DirectionalLight(0xffd9a0, 3);
    sun.position.set(-25, 35, 22);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -55;
    sun.shadow.camera.right = 55;
    sun.shadow.camera.top = 55;
    sun.shadow.camera.bottom = -55;
    scene.add(sun);

    const geometries: THREE.BufferGeometry[] = [];
    const mat = (c: number, r = 0.6, m = 0.05) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
    const gold = mat(0xc9a24a, 0.3, 0.8);
    const dark = mat(0x14110c, 0.25, 0.7);
    const glass = mat(0xc9a24a, 0.12, 0.4);
    const white = mat(0xe9e5dc, 0.7);
    const roofMat = mat(0x241c12, 0.5);
    const green = mat(0x2b4530, 0.9);
    const ground = mat(0x29231a);
    const trunk = mat(0x5c422b);
    const site = mat(0x807463);
    const deck = mat(0x9c7248);
    const post = mat(0xb8894f);
    const warm = new THREE.MeshStandardMaterial({ color: 0xffcc87, emissive: 0xffa443, emissiveIntensity: 1.8 });
    const allMaterials: THREE.Material[] = [gold, dark, glass, white, roofMat, green, ground, trunk, site, deck, post, warm];

    function box(parent: THREE.Object3D, w: number, h: number, d: number, x: number, y: number, z: number, m: THREE.Material) {
      const geo = new THREE.BoxGeometry(w, h, d);
      geometries.push(geo);
      const o = new THREE.Mesh(geo, m);
      o.position.set(x, y, z);
      o.castShadow = true;
      o.receiveShadow = true;
      parent.add(o);
      return o;
    }
    function cyl(
      parent: THREE.Object3D,
      rt: number,
      rb: number,
      h: number,
      x: number,
      y: number,
      z: number,
      m: THREE.Material,
      n = 48
    ) {
      const geo = new THREE.CylinderGeometry(rt, rb, h, n);
      geometries.push(geo);
      const o = new THREE.Mesh(geo, m);
      o.position.set(x, y, z);
      o.castShadow = true;
      o.receiveShadow = true;
      parent.add(o);
      return o;
    }
    function tree(g: THREE.Object3D, x: number, z: number, s = 1) {
      cyl(g, 0.09 * s, 0.12 * s, 1.2 * s, x, 0.6 * s, z, trunk);
      const crownGeo = new THREE.IcosahedronGeometry(0.72 * s, 1);
      geometries.push(crownGeo);
      const crown = new THREE.Mesh(crownGeo, green);
      crown.position.set(x, 1.65 * s, z);
      g.add(crown);
    }
    function house(g: THREE.Object3D, scale = 1) {
      const q = new THREE.Group();
      q.scale.setScalar(scale);
      g.add(q);
      box(q, 5, 3.4, 4, 0, 2, 0, white);
      box(q, 5.6, 0.22, 4.6, 0, 3.8, 0, roofMat);
      box(q, 2.5, 2.4, 2, 1.5, 1.4, 2, white);
      box(q, 2.8, 0.18, 2.4, 1.5, 2.65, 2, roofMat);
      box(q, 1.1, 2, 0.08, -1.3, 1.25, 2.04, glass);
      box(q, 1.4, 1.3, 0.08, 1.4, 1.6, 3.04, warm);
      box(q, 1.4, 1.4, 0.08, -1.3, 2.1, -2.04, warm);
      box(q, 1, 0.16, 1.2, -1.3, 0.15, 2.8, gold);
      tree(q, -3.8, -2.2, 0.85);
      tree(q, 3.7, -2, 0.7);
      return q;
    }
    function tower(g: THREE.Object3D) {
      for (let j = 0; j < 3; j++) {
        const x = (j - 1) * 2.8;
        box(g, 2.4, 5 + j * 1.7, 3, x, (5 + j * 1.7) / 2, 0, dark);
        for (let r = 0; r < 5 + j * 2; r++) {
          for (let c = 0; c < 3; c++) {
            box(g, 0.52, 0.5, 0.035, x - 0.7 + c * 0.7, 0.7 + r * 0.85, 1.52, warm);
          }
        }
      }
    }
    function constructionSite(g: THREE.Object3D) {
      box(g, 6, 0.15, 5, 0, 0.15, 0, site);
      for (let x = -2.4; x <= 2.4; x += 1.2) {
        for (let z = -1.8; z <= 1.8; z += 1.2) {
          box(g, 0.12, 2.6, 0.12, x, 1.5, z, post);
        }
      }
      box(g, 6, 0.16, 5, 0, 2.8, 0, deck);
      box(g, 0.18, 7, 0.18, 3.2, 3.6, -2.5, gold);
      box(g, 6, 0.15, 0.15, 0.3, 6.7, -2.5, gold);
      box(g, 0.12, 1.6, 0.12, -2.5, 5.9, -2.5, gold);
    }
    function money(g: THREE.Object3D) {
      for (let j = 0; j < 4; j++) {
        const x = -2.3 + j * 1.55;
        for (let k = 0; k < 3 + (j % 3); k++) {
          cyl(g, 0.72, 0.72, 0.24, x, 0.32 + k * 0.25, 0, gold, 32);
        }
      }
    }
    function paperwork(g: THREE.Object3D) {
      box(g, 4.3, 0.2, 5, 0, 0.6, 0, white);
      for (let i = 0; i < 5; i++) box(g, 3, 0.035, 0.13, 0, 0.74, -1.5 + i * 0.65, dark);
      const check = new THREE.Group();
      g.add(check);
      box(check, 0.25, 0.12, 1.2, 0.2, 1.15, 0.5, gold);
      box(check, 0.25, 0.12, 2.2, 0.9, 1.15, 0.15, gold);
      check.rotation.y = -0.65;
    }
    function cards(g: THREE.Object3D) {
      for (let j = 0; j < 3; j++) {
        const b = box(g, 4, 0.1, 2.5, (j - 1) * 0.75, 0.5 + j * 0.32, (j - 1) * -0.35, j === 2 ? gold : dark);
        b.rotation.y = -0.18;
        box(g, 0.65, 0.06, 0.5, (j - 1) * 0.75 - 1.2, 0.59 + j * 0.32, (j - 1) * -0.35, white);
      }
    }

    function makeIsland(i: number) {
      const pivot = new THREE.Group();
      const a = (i * Math.PI * 2) / COUNT;
      const radius = 19;
      pivot.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
      pivot.rotation.y = a;
      cyl(pivot, 7, 7.25, 0.65, 0, -0.5, 0, dark, 64);
      const focusRing = cyl(pivot, 7.05, 7.05, 0.08, 0, -0.12, 0, gold, 64);
      cyl(pivot, 6.7, 6.7, 0.12, 0, 0, 0, ground, 64);
      const obj = new THREE.Group();
      pivot.add(obj);

      if (i === 0) house(obj, 1.25);
      if (i === 1) {
        house(obj, 0.9);
        const key = cyl(obj, 0.6, 0.6, 0.18, 3.5, 1.4, 2.5, gold);
        key.rotation.x = Math.PI / 2;
        box(obj, 0.25, 0.15, 2.1, 3.5, 1.3, 3.7, gold);
      }
      if (i === 2) {
        house(obj, 0.85);
        const moneyGroup = new THREE.Group();
        moneyGroup.position.z = 3;
        obj.add(moneyGroup);
        money(moneyGroup);
      }
      if (i === 3) {
        house(obj, 0.8);
        const paper = new THREE.Group();
        paper.position.set(3, 0, 1);
        paper.rotation.z = -0.2;
        obj.add(paper);
        paperwork(paper);
      }
      if (i === 4) {
        paperwork(obj);
        money(obj);
      }
      if (i === 5) {
        house(obj, 0.75);
        cards(obj);
      }
      if (i === 6) tower(obj);
      if (i === 7) constructionSite(obj);

      for (let k = 0; k < 3; k++) {
        const t = k * 2.09 + i;
        tree(pivot, Math.cos(t) * 5.7, Math.sin(t) * 5.7, 0.5);
      }
      scene.add(pivot);
      return { pivot, focusRing };
    }

    const islands = mortgageServices.map((_, i) => makeIsland(i));

    const ringGeo = new THREE.TorusGeometry(19, 0.13, 12, 150);
    geometries.push(ringGeo);
    const ringMesh = new THREE.Mesh(
      ringGeo,
      new THREE.MeshStandardMaterial({ color: 0xf4b86c, emissive: 0xff8d26, emissiveIntensity: 1.2, metalness: 0.8, roughness: 0.3 })
    );
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.65;
    scene.add(ringMesh);
    allMaterials.push(ringMesh.material as THREE.Material);

    const waterGeo = new THREE.PlaneGeometry(500, 500);
    geometries.push(waterGeo);
    const water = new THREE.Mesh(waterGeo, mat(0x051a5e, 0.2, 0.5));
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.1;
    scene.add(water);
    allMaterials.push(water.material as THREE.Material);

    const starsGeo = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    for (let i = 0; i < 450; i++) {
      starPositions.push((Math.random() - 0.5) * 200, Math.random() * 60 + 4, (Math.random() - 0.5) * 200);
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    geometries.push(starsGeo);
    const starsMaterial = new THREE.PointsMaterial({ color: 0xd8cdb0, size: 0.12 });
    scene.add(new THREE.Points(starsGeo, starsMaterial));
    allMaterials.push(starsMaterial);

    let target = 0;
    let activeIndex = 0;

    function updateScroll() {
      const max = section!.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (window.scrollY - section!.offsetTop) / Math.max(1, max)));
      target = progress * (COUNT - 1);
      const idx = Math.max(0, Math.min(COUNT - 1, Math.round(target)));
      if (idx !== activeIndex) {
        activeIndex = idx;
        setCurrent(idx);
      }
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    function jump(i: number) {
      const n = (i + COUNT) % COUNT;
      const max = section!.offsetHeight - window.innerHeight;
      window.scrollTo({ top: section!.offsetTop + (n / (COUNT - 1)) * max, behavior: 'smooth' });
    }
    jumpRef.current = jump;

    let smoothed = 0;
    let frameId = requestAnimationFrame(animate);
    function animate(now: number) {
      frameId = requestAnimationFrame(animate);
      smoothed += (target - smoothed) * 0.055;
      const angle = (smoothed * Math.PI) / 4;
      const bob = reduced ? 0 : Math.sin(now * 0.0003) * 0.35;
      camera.position.set(Math.sin(angle) * 37, 19 + bob, Math.cos(angle) * 37);
      camera.lookAt(Math.sin(angle) * 10, 1.5, Math.cos(angle) * 10);
      islands.forEach(({ focusRing }, i) => {
        const delta = Math.abs(i - smoothed);
        focusRing.position.y = -0.12 + Math.max(0, 1 - delta) * 0.45;
      });
      renderer.render(scene, camera);
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
      geometries.forEach((g) => g.dispose());
      allMaterials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [checked, supported]);

  if (checked && !supported) {
    return (
      <section className="m3d-fallback">
        <p className="eyebrow">{brand.servicesEyebrow}</p>
        <h1 className="m3d-fallback-h1">{brand.servicesHeading}</h1>
        <p className="m3d-fallback-p">{brand.servicesIntro}</p>
        <style>{`
          .m3d-fallback { background: var(--ink); padding: clamp(96px, 16vh, 150px) var(--edge) clamp(72px, 10vh, 110px); text-align: center; }
          .m3d-fallback-h1 { font-family: var(--font-editorial); font-style: italic; font-weight: 400; font-size: clamp(2.25rem, 4.6vw, 4rem); color: var(--paper); margin: 16px 0; }
          .m3d-fallback-p { color: var(--paper-dim); font-size: 1.0625rem; line-height: 1.65; max-width: 540px; margin: 0 auto; }
        `}</style>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="m3d-experience">
      <div className="m3d-stage">
        <canvas ref={canvasRef} className="m3d-canvas" />

        <header className="m3d-head">
          <p className="eyebrow">{brand.servicesEyebrow}</p>
          <h1 className="m3d-h1">{brand.servicesHeading}</h1>
        </header>

        <div className="m3d-arrows">
          <button type="button" aria-label="Previous service" onClick={() => jumpRef.current(current - 1)}>
            ‹
          </button>
          <button type="button" aria-label="Next service" onClick={() => jumpRef.current(current + 1)}>
            ›
          </button>
        </div>

        <div className="m3d-focus">
          <div className="m3d-counter">
            {String(current + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
          </div>
          <h2 className="m3d-focus-h2">{mortgageServices[current].label}</h2>
          <p className="m3d-focus-p">{mortgageServices[current].summary}</p>
          <Link className="m3d-cta" href={`/mortgage-services/${mortgageServices[current].slug}`}>
            Learn more <span>→</span>
          </Link>
        </div>

        <nav className="m3d-nav" aria-label="Mortgage services">
          {mortgageServices.map((service, i) => (
            <button
              key={service.slug}
              type="button"
              className={i === current ? 'active' : ''}
              aria-current={i === current}
              onClick={() => jumpRef.current(i)}
            >
              <span>{ICONS[i]}</span>
              {service.label}
            </button>
          ))}
        </nav>

        <p className="m3d-hint">SCROLL TO EXPLORE ↓</p>
      </div>

      <style>{`
        .m3d-experience { position: relative; height: 650vh; background: var(--ink); }
        .m3d-stage {
          position: sticky; top: 0; height: 100svh; overflow: hidden;
          background: radial-gradient(ellipse at 50% 70%, rgba(126,94,36,0.4) 0%, var(--panel) 55%, var(--ink) 100%);
        }
        .m3d-stage::before {
          content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(180deg, transparent 40%, rgba(5,4,3,0.72) 100%);
        }
        .m3d-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }

        .m3d-head { position: absolute; top: 46%; transform: translateY(-50%); width: 100%; z-index: 5; text-align: center; padding: 0 18px; pointer-events: none; }
        .m3d-h1 { font-family: var(--font-editorial); font-style: italic; font-weight: 400; font-size: clamp(2.1875rem, 5.4vw, 4.75rem); line-height: 1.13; margin: 12px 0; color: var(--paper); text-shadow: 0 4px 30px rgba(0,0,0,0.6); }

        .m3d-arrows { position: absolute; bottom: 31%; width: 100%; display: flex; justify-content: space-between; padding: 0 max(3%, calc((100vw - 1100px) / 2)); z-index: 7; pointer-events: none; }
        .m3d-arrows button {
          pointer-events: auto; border: 1px solid var(--gold); background: rgba(12,10,7,0.76); color: var(--gold-bright);
          width: 43px; height: 43px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; transition: background 0.2s ease;
        }
        .m3d-arrows button:hover { background: var(--gold); color: var(--ink); }

        .m3d-focus {
          position: absolute; bottom: 15%; left: 50%; transform: translateX(-50%); width: min(460px, 90vw); z-index: 6;
          text-align: center; background: linear-gradient(135deg, rgba(20,16,9,0.93), rgba(12,10,6,0.88));
          border: 1px solid rgba(201,162,74,0.5); border-radius: 18px; padding: 19px 23px 21px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.53); backdrop-filter: blur(15px);
        }
        .m3d-counter { color: var(--gold); font-size: 0.6875rem; letter-spacing: 0.3em; font-weight: 700; }
        .m3d-focus-h2 { font-family: var(--font-editorial); font-style: italic; font-weight: 400; font-size: clamp(1.375rem, 2.5vw, 2.125rem); margin: 7px 0; color: var(--paper); }
        .m3d-focus-p { color: var(--paper-dim); font-size: 0.8125rem; line-height: 1.5; margin: 0 auto 15px; max-width: 390px; }
        .m3d-cta {
          display: inline-flex; align-items: center; gap: 15px; color: var(--gold-bright); border: 1px solid var(--gold);
          border-radius: 50px; padding: 10px 23px; text-decoration: none; font-size: 0.8125rem; font-weight: 700; transition: background 0.2s ease, color 0.2s ease;
        }
        .m3d-cta:hover { background: var(--gold); color: var(--ink); }

        .m3d-nav { position: absolute; bottom: 3%; left: 50%; transform: translateX(-50%); z-index: 7; display: flex; align-items: center; gap: 8px; width: min(1100px, 96vw); justify-content: center; }
        .m3d-nav button {
          background: rgba(12,10,6,0.82); color: var(--paper-dim); border: 1px solid rgba(201,162,74,0.18); border-radius: 10px;
          padding: 10px 8px; flex: 1; min-width: 0; cursor: pointer; font-size: 0.625rem; font-weight: 600; transition: all 0.25s ease;
        }
        .m3d-nav button span { display: block; font-size: 1.3125rem; margin-bottom: 4px; }
        .m3d-nav button.active { border-color: var(--gold); color: var(--gold-bright); box-shadow: 0 0 22px rgba(217,155,77,0.33); background: rgba(201,162,74,0.14); }
        .m3d-nav button:hover { border-color: var(--gold-dim); }

        .m3d-hint { position: absolute; right: 25px; top: 50%; z-index: 7; writing-mode: vertical-rl; letter-spacing: 0.22em; font-size: 0.625rem; color: var(--gold); margin: 0; }

        @media (max-width: 700px) {
          .m3d-head { top: 34%; }
          .m3d-focus { bottom: 20%; padding: 15px; }
          .m3d-nav { bottom: 2%; overflow-x: auto; justify-content: flex-start; padding-bottom: 4px; }
          .m3d-nav button { min-width: 86px; flex: none; font-size: 0.5625rem; }
          .m3d-arrows { bottom: 44%; padding: 0 12px; }
          .m3d-hint { display: none; }
        }
      `}</style>
    </div>
  );
}
