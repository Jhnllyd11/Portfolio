"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;       // 0–1 normalized
  y: number;       // 0–1 normalized
  baseX: number;
  baseY: number;
  r: number;
  color: [number, number, number];
  speed: number;
  phase: number;
}

// Section color palettes — interpolated as user scrolls
const SECTION_PALETTES = [
  // Hero
  { orbs: [[14, 165, 233], [34, 197, 94]] as [number,number,number][], grid: "rgba(14,165,233,0.04)" },
  // About
  { orbs: [[14, 165, 233], [189, 0, 255]] as [number,number,number][], grid: "rgba(14,165,233,0.035)" },
  // Stack
  { orbs: [[34, 197, 94], [14, 165, 233]] as [number,number,number][], grid: "rgba(34,197,94,0.04)" },
  // Skills
  { orbs: [[0, 243, 255], [34, 197, 94]] as [number,number,number][], grid: "rgba(0,243,255,0.035)" },
  // Projects
  { orbs: [[14, 165, 233], [0, 243, 255]] as [number,number,number][], grid: "rgba(14,165,233,0.04)" },
  // Certs
  { orbs: [[34, 197, 94], [189, 0, 255]] as [number,number,number][], grid: "rgba(34,197,94,0.035)" },
  // Contact
  { orbs: [[14, 165, 233], [34, 197, 94]] as [number,number,number][], grid: "rgba(14,165,233,0.04)" },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Orbs — positioned at key spots
    const orbs: Orb[] = [
      { x: 0.15, y: 0.25, baseX: 0.15, baseY: 0.25, r: 0.38, color: [14, 165, 233],  speed: 0.0004, phase: 0 },
      { x: 0.82, y: 0.65, baseX: 0.82, baseY: 0.65, r: 0.32, color: [34, 197, 94],   speed: 0.0003, phase: 1.5 },
      { x: 0.5,  y: 0.5,  baseX: 0.5,  baseY: 0.5,  r: 0.22, color: [0, 243, 255],   speed: 0.0005, phase: 3.0 },
      { x: 0.9,  y: 0.1,  baseX: 0.9,  baseY: 0.1,  r: 0.18, color: [189, 0, 255],   speed: 0.0006, phase: 4.5 },
    ];

    const onScroll = () => { targetScrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = (timestamp: number) => {
      timeRef.current = timestamp;

      // Smooth scroll lerp
      scrollRef.current = lerp(scrollRef.current, targetScrollRef.current, 0.06);
      const scrollY = scrollRef.current;

      // Determine which palette to use based on scroll
      const docH = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = clamp(scrollY / docH, 0, 1); // 0–1 across full page
      const palIdx = progress * (SECTION_PALETTES.length - 1);
      const palA = SECTION_PALETTES[Math.floor(palIdx)];
      const palB = SECTION_PALETTES[Math.min(Math.ceil(palIdx), SECTION_PALETTES.length - 1)];
      const palT = palIdx % 1;

      // Interpolate orb colors
      const c0: [number,number,number] = [
        lerp(palA.orbs[0][0], palB.orbs[0][0], palT),
        lerp(palA.orbs[0][1], palB.orbs[0][1], palT),
        lerp(palA.orbs[0][2], palB.orbs[0][2], palT),
      ];
      const c1: [number,number,number] = [
        lerp(palA.orbs[1][0], palB.orbs[1][0], palT),
        lerp(palA.orbs[1][1], palB.orbs[1][1], palT),
        lerp(palA.orbs[1][2], palB.orbs[1][2], palT),
      ];
      orbs[0].color = c0;
      orbs[1].color = c1;

      ctx.clearRect(0, 0, W, H);

      // ── Animated orbs ──────────────────────────────────────────────────────
      for (const orb of orbs) {
        const t = timestamp * orb.speed + orb.phase;
        // Float around base position
        const ox = (orb.baseX + Math.sin(t) * 0.08) * W;
        const oy = (orb.baseY + Math.cos(t * 0.7) * 0.06) * H;
        // Scroll parallax — each orb moves at different rate
        const parallax = scrollY * (0.08 + orb.phase * 0.015);
        const fy = oy - parallax;

        const radius = orb.r * Math.min(W, H);
        const grd = ctx.createRadialGradient(ox, fy, 0, ox, fy, radius);
        const [r, g, b] = orb.color;
        grd.addColorStop(0,   `rgba(${r},${g},${b},0.12)`);
        grd.addColorStop(0.4, `rgba(${r},${g},${b},0.05)`);
        grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Scroll-reactive grid ───────────────────────────────────────────────
      const gridSize = 80;
      // Grid shifts slightly with scroll for parallax feel
      const gridOffsetY = (scrollY * 0.15) % gridSize;
      const gridOpacity = 0.03 + Math.sin(timestamp * 0.0003) * 0.01;

      ctx.strokeStyle = `rgba(14,165,233,${gridOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = -gridSize + gridOffsetY; y <= H; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // ── Diagonal scan line ─────────────────────────────────────────────────
      const scanY = ((timestamp * 0.04 + scrollY * 0.05) % (H + 200)) - 100;
      const scanGrd = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrd.addColorStop(0,   "rgba(14,165,233,0)");
      scanGrd.addColorStop(0.5, "rgba(14,165,233,0.025)");
      scanGrd.addColorStop(1,   "rgba(14,165,233,0)");
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 60, W, 120);

      // ── Vignette ──────────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "rgba(10,10,10,0)");
      vig.addColorStop(1, "rgba(10,10,10,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
