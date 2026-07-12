"use client";

import { useEffect, useRef } from "react";

const SYMBOLS = ["{}", "=>", "//", ";", "[]", "()", "&&", "||", "!=", "++", "**", "??", "::", "fn", "ts"];
const COLORS  = ["#569CD6", "#4EC9B0", "#C586C0", "#DCDCAA", "#CE9178", "#9CDCFE"];

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  opacity: number;
  vy: number;
  vx: number;
  size: number;
  life: number;
}

let uid = 0;

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastPos = useRef({ x: -999, y: -999 });
  const throttle = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - throttle.current < 60) return; // max ~16 particles/sec
      throttle.current = now;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 12) return; // only emit when actually moving

      lastPos.current = { x: e.clientX, y: e.clientY };

      particles.current.push({
        id: uid++,
        x: e.clientX + (Math.random() - 0.5) * 16,
        y: e.clientY + (Math.random() - 0.5) * 16,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.85,
        vy: -(0.6 + Math.random() * 0.8),
        vx: (Math.random() - 0.5) * 0.5,
        size: 10 + Math.random() * 4,
        life: 1,
      });
    };

    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(tick); return; }

      particles.current = particles.current.filter(p => p.opacity > 0.02);

      particles.current.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.opacity *= 0.93;
      });

      container.innerHTML = particles.current.map(p => `
        <span style="
          position:fixed;
          left:${p.x}px;
          top:${p.y}px;
          font-family:'Fira Code',monospace;
          font-size:${p.size}px;
          color:${p.color};
          opacity:${p.opacity};
          pointer-events:none;
          user-select:none;
          transform:translate(-50%,-50%);
          white-space:nowrap;
          text-shadow:0 0 8px ${p.color}60;
        ">${p.symbol}</span>
      `).join("");

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }}
    />
  );
}
