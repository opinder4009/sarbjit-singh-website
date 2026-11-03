'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function rng(i: number) {
  const x = Math.sin(i * 127.1 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export default function CNTower({ children }: { children?: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a2550, 0.0017);
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 4000);

    scene.add(new THREE.HemisphereLight(0x2c4a8f, 0x05081a, 2.6));
    const sun = new THREE.DirectionalLight(0xe0b65c, 3.2);
    sun.position.set(-260, 480, 320);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1536, 1536);
    sun.shadow.camera.near = 50;
    sun.shadow.camera.far = 1700;
    sun.shadow.camera.left = -700;
    sun.shadow.camera.right = 700;
    sun.shadow.camera.top = 700;
    sun.shadow.camera.bottom = -700;
    sun.shadow.bias = -0.0008;
    scene.add(sun);
    const fill = new THREE.PointLight(0x4f74c9, 170000);
    fill.position.set(160, 320, -160);
    scene.add(fill);

    const steel = new THREE.MeshStandardMaterial({ color: 0x5d6a98, roughness: 0.7, metalness: 0.3 });
    const metal = new THREE.MeshStandardMaterial({ color: 0xa3a6ad, metalness: 0.78, roughness: 0.28 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x051a5e, metalness: 0.82, roughness: 0.16 });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc9a24a,
      emissive: 0xa9833c,
      emissiveIntensity: 0.65,
      metalness: 0.8,
      roughness: 0.28,
    });
    const beaconMat = new THREE.MeshStandardMaterial({ color: 0xe0b65c, emissive: 0xe0b65c, emissiveIntensity: 2.4 });
    const towerMaterials = [steel, metal, glassMat, goldMat, beaconMat];

    const tower = new THREE.Group();
    scene.add(tower);

    function cylinder(rt: number, rb: number, h: number, y: number, mat: THREE.Material, n = 48) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, n), mat);
      m.position.y = y;
      m.castShadow = true;
      tower.add(m);
      return m;
    }
    function ring(r: number, t: number, y: number, mat: THREE.Material) {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 8, 96), mat);
      m.rotation.x = Math.PI / 2;
      m.position.y = y;
      m.castShadow = true;
      tower.add(m);
    }

    // Architectural stylization of the CN Tower, scaled in metres.
    cylinder(8, 27, 345, 172.5, steel, 3).rotation.y = Math.PI / 6;
    cylinder(7, 8, 92, 391, steel);
    cylinder(31, 22, 13, 347, metal);
    cylinder(34, 31, 11, 359, glassMat);
    cylinder(32, 34, 8, 369, metal);
    cylinder(22, 17, 12, 380, steel);
    [342, 352, 366, 373].forEach((y) => {
      const r = y === 342 ? 28 : y === 352 ? 31 : y === 366 ? 34 : 31;
      ring(r, 1.2, y, goldMat);
    });
    for (let i = 0; i < 28; i++) {
      const a = (i * Math.PI * 2) / 28;
      const strut = new THREE.Mesh(new THREE.BoxGeometry(1.1, 9, 1.2), goldMat);
      strut.position.set(Math.cos(a) * 33, 360, Math.sin(a) * 33);
      strut.rotation.y = -a;
      strut.castShadow = true;
      tower.add(strut);
    }
    cylinder(6.5, 7.5, 40, 447, steel);
    cylinder(3.5, 6.5, 45, 489, metal);
    cylinder(2.2, 3.5, 45, 534, metal);
    cylinder(1.2, 2.2, 40, 576, metal);
    [460, 492, 523, 548, 574, 592].forEach((y) => {
      ring(y > 540 ? 2.2 : 5, 0.45, y, beaconMat);
    });

    // Surrounding city — simplified skyline that casts shadows back onto the ground.
    const buildingMats = [0x14243a, 0x1b2a3f, 0x233449, 0x182e43].map(
      (c) => new THREE.MeshStandardMaterial({ color: c, metalness: 0.35, roughness: 0.6 })
    );
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xe0b65c, transparent: true, opacity: 0.55 });
    const buildings = new THREE.Group();
    scene.add(buildings);
    const buildingGeos: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 160; i++) {
      const a = rng(i + 2) * Math.PI * 2;
      const r = 100 + Math.sqrt(rng(i + 40)) * 900;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const w = 12 + rng(i + 81) * 26;
      const d = 12 + rng(i + 93) * 28;
      const h = 15 + Math.pow(rng(i + 20), 3) * 190;
      const geo = new THREE.BoxGeometry(w, h, d);
      buildingGeos.push(geo);
      const b = new THREE.Mesh(geo, buildingMats[i % buildingMats.length]);
      b.position.set(x, h / 2, z);
      b.castShadow = true;
      b.receiveShadow = true;
      buildings.add(b);
      if (i % 3 === 0) {
        const rows = Math.min(7, Math.floor(h / 11));
        for (let j = 0; j < rows; j++) {
          const winGeo = new THREE.BoxGeometry(w * 0.75, 0.65, 0.12);
          buildingGeos.push(winGeo);
          const win = new THREE.Mesh(winGeo, windowMat);
          win.position.set(x, 8 + j * 11, z + d / 2 + 0.1);
          buildings.add(win);
        }
      }
    }

    const groundGeo = new THREE.PlaneGeometry(2600, 2600);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x071233, roughness: 1 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    const glowGeo = new THREE.CircleGeometry(230, 48);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xc9a24a, transparent: true, opacity: 0.07 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -0.9;
    scene.add(glow);

    const starsGeo = new THREE.BufferGeometry();
    const starPos: number[] = [];
    for (let i = 0; i < 500; i++) {
      const a = rng(i + 800) * Math.PI * 2;
      const r = 900 + rng(i + 1200) * 1600;
      starPos.push(Math.cos(a) * r, 350 + rng(i + 1900) * 1000, Math.sin(a) * r);
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xaac8ff, size: 1.8, sizeAttenuation: true });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();

    // Scroll progress is local to this pinned section (0 at its top edge, 1 once fully scrolled through).
    let targetProgress = 0;
    let smoothedProgress = 0;
    const updateScrollProgress = () => {
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = -wrap.getBoundingClientRect().top;
      targetProgress = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
    };
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    const applyCamera = (p: number, wobble: number) => {
      const angle = -0.35 + p * Math.PI * 1.5;
      const dist = 680 - 470 * p;
      const camY = 150 + p * 420 + wobble;
      const lookY = 190 + p * 330;
      camera.position.set(Math.sin(angle) * dist, camY, Math.cos(angle) * dist);
      camera.lookAt(0, lookY, 0);
    };

    const applyOverlay = (p: number) => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const span = 0.32;
      const eased = Math.max(0, Math.min(1, 1 - p / span));
      const fadeOut = eased * eased * (3 - 2 * eased); // smoothstep
      const scale = 0.92 + 0.08 * fadeOut;
      const lift = (1 - fadeOut) * -70;
      overlay.style.opacity = String(fadeOut);
      overlay.style.transform = `translateY(${lift}px) scale(${scale})`;
      overlay.style.pointerEvents = fadeOut > 0.5 ? 'auto' : 'none';
    };

    let raf = 0;
    let t = 0;
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      t += 0.0016;
      smoothedProgress += (targetProgress - smoothedProgress) * 0.07;
      const wobble = reduced ? 0 : Math.sin(now * 0.00025) * 2.2;
      applyCamera(smoothedProgress, wobble);
      applyOverlay(smoothedProgress);
      tower.rotation.y = Math.sin(t * 0.35) * 0.012;
      renderer.render(scene, camera);
    };

    let cleanupReducedScroll: (() => void) | null = null;
    if (reduced) {
      const renderOnce = () => {
        applyCamera(targetProgress, 0);
        applyOverlay(targetProgress);
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
      tower.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry.dispose();
      });
      towerMaterials.forEach((m) => m.dispose());
      buildingGeos.forEach((g) => g.dispose());
      buildingMats.forEach((m) => m.dispose());
      windowMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();
    };
  }, [checked, supported]);

  if (checked && !supported) {
    return (
      <div className="cn-tower-fallback">
        {children}
        <style>{`
          .cn-tower-fallback {
            position: relative; min-height: 100svh; background: var(--ink);
            display: flex; align-items: center; padding: 120px 7vw 90px;
          }
          @media (max-width: 700px) {
            .cn-tower-fallback { padding: 120px 22px 80px; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="cn-tower-wrap">
      <div ref={mountRef} className="cn-tower-stage">
        <canvas ref={canvasRef} className="cn-tower-canvas" aria-hidden="true" />
        {children && (
          <div ref={overlayRef} className="cn-tower-overlay">
            {children}
          </div>
        )}
      </div>
      <style>{`
        .cn-tower-wrap { position: relative; height: 300vh; background: var(--ink); }
        .cn-tower-stage { position: sticky; top: 0; height: 100svh; overflow: hidden; }
        .cn-tower-canvas { display: block; width: 100%; height: 100%; }
        .cn-tower-overlay {
          position: absolute; inset: 0; z-index: 5;
          display: flex; align-items: center;
          padding: 120px 7vw 90px;
          transform-origin: left center;
          will-change: opacity, transform;
        }
        @media (max-width: 700px) {
          .cn-tower-wrap { height: 240vh; }
          .cn-tower-overlay { padding: 120px 22px 80px; transform-origin: center; }
        }
      `}</style>
    </div>
  );
}
