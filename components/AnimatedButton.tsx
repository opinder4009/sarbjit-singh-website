'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type AnimatedButtonProps = {
  href: string;
  children: ReactNode;
  /** Smaller padding/footprint for the nav bar. */
  compact?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

const VERTEX_SHADER = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

// Recolored from the original orange/white starfield to the site's gold palette
// (--gold #c9a24a, --gold-bright #e0b65c) so the shader reads as brand rather than sci-fi.
const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_warp;
uniform float u_flash;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.07+vec2(13.1,5.7); a*=0.5; }
  return v;
}
void main(){
  vec2 sc = gl_FragCoord.xy / u_res;
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float r = length(uv);
  float rr = max(r, 0.08);
  float a = atan(uv.y, uv.x);
  float t = u_time;
  vec3 col = vec3(0.035, 0.030, 0.022);
  float hz = fbm(uv * 2.6 + vec2(t * 0.35, 1.7));
  col += vec3(0.14, 0.105, 0.045) * hz * (0.7 + 0.6 * u_warp);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float ringN = 26.0 + fi * 9.0;
    vec2 spv = vec2((a / 6.28318 + 0.5) * ringN,
                   (0.3 + fi * 0.22) / rr + t * (2.0 + fi * 1.2));
    vec2 cell = floor(spv);
    vec2 f = fract(spv);
    float h = hash(cell + fi * 17.31);
    float on = step(0.68, h);
    vec2 c = vec2(0.2 + 0.6 * hash(cell + 4.7), 0.5);
    vec2 dlt = f - c;
    float sy = mix(130.0, 8.0, u_warp);
    float star = on * exp(-(dlt.x * dlt.x * 150.0 + dlt.y * dlt.y * sy));
    float tw = 0.7 + 0.3 * sin(h * 81.0 + t * 9.0);
    tw = mix(tw, 1.0, u_warp);
    vec3 sCol = mix(vec3(1.0, 0.97, 0.88), vec3(0.788, 0.635, 0.290), step(0.9, h));
    float fade = smoothstep(0.02, 0.25, r);
    col += sCol * star * tw * fade * (1.1 + 0.7 * u_warp);
  }
  col += vec3(0.878, 0.714, 0.361) * u_warp * 0.32 * exp(-r * 4.0);
  vec2 e = sc * (1.0 - sc);
  col *= 0.3 + 0.7 * pow(e.x * e.y * 16.0, 0.3);
  col = mix(col, vec3(1.0, 0.97, 0.9), clamp(u_flash, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export default function AnimatedButton({ href, children, compact = false, style, onClick, target, rel }: AnimatedButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const link = linkRef.current;
    if (!canvas || !link) return;
    const gl = canvas.getContext('webgl');
    // No WebGL available: leave the canvas transparent. The button's own
    // CSS gradient background still renders a clean, legible pill.
    if (!gl) return;

    // If the GPU context is ever lost (common in constrained/sandboxed
    // environments, or on some mobile GPUs), hide the canvas rather than
    // leave it mid-render — the solid CSS background behind it still looks
    // like a normal button either way.
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      canvas.style.display = 'none';
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      canvas.style.display = 'none';
      return () => canvas.removeEventListener('webglcontextlost', handleContextLost);
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // Shader failed to compile/link — bail out to the plain CSS button
      // instead of risking a half-drawn or garbled canvas.
      canvas.style.display = 'none';
      return () => canvas.removeEventListener('webglcontextlost', handleContextLost);
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const locP = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uWarp = gl.getUniformLocation(prog, 'u_warp');
    const uFlash = gl.getUniformLocation(prog, 'u_flash');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let warp = 0;
    let warpTarget = 0;
    let flash = 0;
    let z = 0;
    let last = performance.now();
    let frameId = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    function handleEnter() {
      warpTarget = 1;
    }
    function handleLeave() {
      warpTarget = 0;
    }
    function handleClick() {
      flash = 1;
      warp = 0;
      z = 0;
    }

    link.addEventListener('mouseenter', handleEnter);
    link.addEventListener('mouseleave', handleLeave);
    link.addEventListener('focus', handleEnter);
    link.addEventListener('blur', handleLeave);
    link.addEventListener('click', handleClick);
    window.addEventListener('resize', resize);
    resize();

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      warp += (warpTarget - warp) * Math.min(1, dt * 2.6);
      flash *= Math.exp(-4.5 * dt);
      z += dt * (0.05 + warp * 1.35);
      resize();
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, reduced ? 4.0 : z);
      gl!.uniform1f(uWarp, warp);
      gl!.uniform1f(uFlash, flash);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      if (!reduced) frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      link.removeEventListener('mouseenter', handleEnter);
      link.removeEventListener('mouseleave', handleLeave);
      link.removeEventListener('focus', handleEnter);
      link.removeEventListener('blur', handleLeave);
      link.removeEventListener('click', handleClick);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <>
      <Link
        ref={linkRef}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`ignite-btn${compact ? ' compact' : ''}`}
        style={style}
      >
        <span className="ignite-core">
          <canvas ref={canvasRef} className="ignite-canvas" aria-hidden="true" />
          <span className="ignite-label">{children}</span>
        </span>
      </Link>
      <style>{`
        .ignite-btn {
          position: relative;
          display: inline-flex;
          border: 0;
          padding: 6px;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          background: linear-gradient(180deg, #4a3f2e 0%, #17140d 55%, #342a1b 100%);
          box-shadow: 0 20px 40px rgba(10, 8, 4, 0.4), 0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition: transform 0.35s cubic-bezier(.34,1.4,.5,1), box-shadow 0.35s ease;
        }
        .ignite-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 26px 52px rgba(201, 162, 74, 0.28), 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.14);
        }
        .ignite-btn:active {
          transform: translateY(1px) scale(0.985);
        }
        .ignite-btn:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 5px;
        }
        .ignite-core {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border-radius: 999px;
          overflow: hidden;
          background: #0c0a06;
          padding: 13px 28px;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.85);
        }
        .ignite-btn.compact .ignite-core {
          padding: 10px 22px;
        }
        .ignite-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .ignite-label {
          position: relative;
          z-index: 1;
          pointer-events: none;
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: 0.01em;
          color: #fdf3df;
          white-space: nowrap;
          text-shadow: 0 0 14px rgba(224, 182, 92, 0.55), 0 1px 6px rgba(0, 0, 0, 0.9);
        }
        .ignite-btn.compact .ignite-label {
          font-size: 0.875rem;
        }
      `}</style>
    </>
  );
}
