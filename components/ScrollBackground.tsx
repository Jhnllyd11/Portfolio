"use client";

import { useEffect, useRef } from "react";

/* ── math helpers ─────────────────────────────────────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

/* ── 3-D projection ───────────────────────────────────────────────────────── */
function project(
  x: number, y: number, z: number,
  cx: number, cy: number,
  fov: number
): [number, number, number] {
  const scale = fov / (fov + z);
  return [cx + x * scale, cy + y * scale, scale];
}

/* ── icosahedron vertices ─────────────────────────────────────────────────── */
function buildIcosahedron(r: number): [number, number, number][] {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [
    [-1, t, 0],[1, t, 0],[-1,-t, 0],[1,-t, 0],
    [0,-1, t],[0, 1, t],[0,-1,-t],[0, 1,-t],
    [t, 0,-1],[t, 0, 1],[-t, 0,-1],[-t, 0, 1],
  ];
  return raw.map(([x, y, z]) => {
    const len = Math.sqrt(x*x + y*y + z*z);
    return [x/len*r, y/len*r, z/len*r];
  });
}

const ICO_EDGES = [
  [0,1],[0,5],[0,7],[0,10],[0,11],
  [1,5],[1,7],[1,8],[1,9],
  [2,3],[2,6],[2,10],[2,11],[2,4],
  [3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,8],[7,10],
  [8,9],[10,11],
];

/* ── section color palettes ───────────────────────────────────────────────── */
const PALETTES = [
  { a: [14,165,233] as [number,number,number], b: [34,197,94]  as [number,number,number] }, // Hero
  { a: [99,102,241] as [number,number,number], b: [14,165,233] as [number,number,number] }, // About
  { a: [34,197,94]  as [number,number,number], b: [0,243,255]  as [number,number,number] }, // Stack
  { a: [0,243,255]  as [number,number,number], b: [34,197,94]  as [number,number,number] }, // Skills
  { a: [14,165,233] as [number,number,number], b: [189,0,255]  as [number,number,number] }, // Projects
  { a: [34,197,94]  as [number,number,number], b: [14,165,233] as [number,number,number] }, // Certs
  { a: [14,165,233] as [number,number,number], b: [34,197,94]  as [number,number,number] }, // Contact
];

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number;
  size: number; opacity: number;
}

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    let scrollY = 0, targetScrollY = 0;
    let curA: [number,number,number] = [14,165,233];
    let curB: [number,number,number] = [34,197,94];
    let tarA: [number,number,number] = [14,165,233];
    let tarB: [number,number,number] = [34,197,94];

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", () => { targetScrollY = window.scrollY; }, { passive: true });

    /* particles */
    const PCOUNT = 80;
    const particles: Particle[] = Array.from({ length: PCOUNT }, () => ({
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000,
      z: Math.random() * 800 - 400,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    /* icosahedron */
    const icoVerts = buildIcosahedron(220);
    let rotX = 0, rotY = 0, rotZ = 0;

    function rotateVert(v: [number,number,number], rx: number, ry: number, rz: number): [number,number,number] {
      let [x, y, z] = v;
      // rotate X
      let y2 = y * Math.cos(rx) - z * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z * Math.cos(rx);
      y = y2; z = z2;
      // rotate Y
      let x2 = x * Math.cos(ry) + z * Math.sin(ry);
      let z3 = -x * Math.sin(ry) + z * Math.cos(ry);
      x = x2; z = z3;
      // rotate Z
      let x3 = x * Math.cos(rz) - y * Math.sin(rz);
      let y3 = x * Math.sin(rz) + y * Math.cos(rz);
      return [x3, y3, z];
    }

    function draw(ts: number) {
      /* smooth scroll */
      scrollY = lerp(scrollY, targetScrollY, 0.05);

      /* palette interpolation */
      const docH = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const prog = clamp(scrollY / docH, 0, 1);
      const pi   = prog * (PALETTES.length - 1);
      const pf   = Math.floor(pi), pc = Math.min(pf + 1, PALETTES.length - 1);
      const pt   = pi - pf;
      tarA = PALETTES[pf].a.map((v, i) => lerp(v, PALETTES[pc].a[i], pt)) as [number,number,number];
      tarB = PALETTES[pf].b.map((v, i) => lerp(v, PALETTES[pc].b[i], pt)) as [number,number,number];
      curA = curA.map((v, i) => lerp(v, tarA[i], 0.025)) as [number,number,number];
      curB = curB.map((v, i) => lerp(v, tarB[i], 0.025)) as [number,number,number];

      const [ar,ag,ab] = curA.map(Math.round);
      const [br,bg,bb] = curB.map(Math.round);

      ctx.clearRect(0, 0, W, H);

      /* ── deep background ── */
      const bgGrd = ctx.createLinearGradient(0, 0, W, H);
      bgGrd.addColorStop(0, "#020408");
      bgGrd.addColorStop(0.5, "#050d1a");
      bgGrd.addColorStop(1, "#020408");
      ctx.fillStyle = bgGrd;
      ctx.fillRect(0, 0, W, H);

      /* ── aurora wave layers ── */
      const t = ts * 0.0004;
      const scrollShift = scrollY * 0.12;

      for (let layer = 0; layer < 3; layer++) {
        const phase  = layer * 1.2 + t;
        const yBase  = H * (0.25 + layer * 0.22) - scrollShift * (1 + layer * 0.3);
        const amp    = 90 + layer * 30;
        const alpha  = 0.07 - layer * 0.015;
        const color  = layer % 2 === 0
          ? `rgba(${ar},${ag},${ab},${alpha})`
          : `rgba(${br},${bg},${bb},${alpha})`;

        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 4) {
          const y = yBase
            + Math.sin(x * 0.006 + phase) * amp
            + Math.sin(x * 0.003 + phase * 0.7) * amp * 0.5
            + Math.cos(x * 0.009 + phase * 1.3) * amp * 0.3;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }

      /* ── aurora glow blobs ── */
      for (let i = 0; i < 3; i++) {
        const blobX = W * (0.2 + i * 0.3) + Math.sin(t * 0.8 + i) * W * 0.08;
        const blobY = H * (0.3 + i * 0.15) - scrollShift * (0.5 + i * 0.2);
        const blobR = Math.min(W, H) * (0.35 + i * 0.05);
        const blobG = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, blobR);
        const bc = i % 2 === 0 ? [ar,ag,ab] : [br,bg,bb];
        blobG.addColorStop(0,   `rgba(${bc[0]},${bc[1]},${bc[2]},0.12)`);
        blobG.addColorStop(0.4, `rgba(${bc[0]},${bc[1]},${bc[2]},0.05)`);
        blobG.addColorStop(1,   `rgba(${bc[0]},${bc[1]},${bc[2]},0)`);
        ctx.fillStyle = blobG;
        ctx.fillRect(0, 0, W, H);
      }

      /* ── 3D icosahedron wireframe ── */
      rotX = ts * 0.00018 + scrollY * 0.0003;
      rotY = ts * 0.00025 + scrollY * 0.0002;
      rotZ = ts * 0.00012;

      const cx = W * 0.78, cy = H * 0.42 - scrollShift * 0.15;
      const fov = 500;

      const projected = icoVerts.map(v => {
        const rv = rotateVert(v, rotX, rotY, rotZ);
        return project(rv[0], rv[1], rv[2], cx, cy, fov);
      });

      ctx.lineWidth = 0.8;
      for (const [i, j] of ICO_EDGES) {
        const [x1, y1, s1] = projected[i];
        const [x2, y2, s2] = projected[j];
        const depth = (s1 + s2) / 2;
        const alpha = clamp(depth * 0.35, 0.04, 0.28);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${alpha})`;
        ctx.stroke();
      }

      /* vertex dots */
      for (const [px, py, sc] of projected) {
        const alpha = clamp(sc * 0.5, 0.05, 0.5);
        ctx.beginPath();
        ctx.arc(px, py, sc * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${alpha})`;
        ctx.fill();
      }

      /* ── floating particles with depth ── */
      const pcx = W / 2, pcy = H / 2;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > 1000) p.x = -1000;
        if (p.x < -1000) p.x = 1000;
        if (p.y > 1000) p.y = -1000;
        if (p.y < -1000) p.y = 1000;

        const [sx, sy, sc] = project(p.x, p.y - scrollShift * 0.3, p.z, pcx, pcy, 600);
        if (sc <= 0) continue;
        const alpha = clamp(p.opacity * sc, 0.03, 0.5);
        const r2 = p.size * sc;

        ctx.beginPath();
        ctx.arc(sx, sy, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar},${ag},${ab},${alpha})`;
        ctx.fill();
      }

      /* ── dot grid with parallax ── */
      const GRID = 64;
      const gox = 0;
      const goy = (scrollY * 0.18) % GRID;
      ctx.fillStyle = `rgba(${ar},${ag},${ab},0.12)`;
      for (let x = gox % GRID; x < W; x += GRID) {
        for (let y = goy % GRID - GRID; y < H + GRID; y += GRID) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* ── scan line ── */
      const sy2 = ((ts * 0.05 + scrollY * 0.06) % (H + 200)) - 100;
      const sg = ctx.createLinearGradient(0, sy2 - 60, 0, sy2 + 60);
      sg.addColorStop(0,    `rgba(${ar},${ag},${ab},0)`);
      sg.addColorStop(0.5,  `rgba(${ar},${ag},${ab},0.06)`);
      sg.addColorStop(1,    `rgba(${ar},${ag},${ab},0)`);
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy2 - 60, W, 120);

      /* ── vignette ── */
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.85);
      vig.addColorStop(0, "rgba(2,4,8,0)");
      vig.addColorStop(1, "rgba(2,4,8,0.7)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
