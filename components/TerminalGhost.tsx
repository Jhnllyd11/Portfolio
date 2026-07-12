"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LOGS = [
  { prefix: "git commit",  color: "#6A9955", msg: "-m \"fix: resolve merge conflict\"" },
  { prefix: "compiled",    color: "#4EC9B0", msg: "successfully in 1.2s" },
  { prefix: "git push",    color: "#569CD6", msg: "origin main ✓" },
  { prefix: "npm run",     color: "#DCDCAA", msg: "build — 0 errors" },
  { prefix: "tsc",         color: "#4EC9B0", msg: "--noEmit ✓" },
  { prefix: "git commit",  color: "#6A9955", msg: "-m \"feat: add dark mode\"" },
  { prefix: "deployed",    color: "#4EC9B0", msg: "to vercel in 3.4s ✓" },
  { prefix: "lint",        color: "#DCDCAA", msg: "passed — 0 warnings" },
  { prefix: "git commit",  color: "#6A9955", msg: "-m \"chore: update deps\"" },
  { prefix: "test",        color: "#C586C0", msg: "passed 24/24 ✓" },
  { prefix: "git commit",  color: "#6A9955", msg: "-m \"refactor: clean up types\"" },
  { prefix: "build",       color: "#4EC9B0", msg: "optimized — 98kb gzip" },
];

const W = 240;
const H = 90;
const SPEED = 0.25;

export default function TerminalGhost() {
  const [lines, setLines] = useState(LOGS.slice(0, 3));
  const [pos, setPos] = useState({ x: 80, y: 180 });
  const [vel, setVel] = useState({ vx: SPEED, vy: SPEED * 0.6 });
  const posRef = useRef({ x: 80, y: 180 });
  const velRef = useRef({ vx: SPEED, vy: SPEED * 0.6 });
  const rafRef = useRef<number>(0);
  const logIdx = useRef(3);

  // Rotate log lines every 2.5s
  useEffect(() => {
    const t = setInterval(() => {
      const next = LOGS[logIdx.current % LOGS.length];
      logIdx.current++;
      setLines(prev => [...prev.slice(-2), next]);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  // Drift around the screen, bounce off edges
  useEffect(() => {
    const step = () => {
      const maxX = window.innerWidth  - W - 16;
      const maxY = window.innerHeight - H - 16;

      let { x, y }   = posRef.current;
      let { vx, vy } = velRef.current;

      x += vx; y += vy;

      if (x >= maxX) { x = maxX; vx = -Math.abs(vx); }
      if (x <= 16)   { x = 16;   vx =  Math.abs(vx); }
      if (y >= maxY) { y = maxY; vy = -Math.abs(vy); }
      if (y <= 60)   { y = 60;   vy =  Math.abs(vy); }

      posRef.current = { x, y };
      velRef.current = { vx, vy };
      setPos({ x, y });

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 50,
        width: W,
        pointerEvents: "none",
        opacity: 0.72,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.72, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Title bar */}
      <div style={{
        background: "#2D2D30",
        border: "1px solid #3E3E42",
        borderBottom: "none",
        borderRadius: "6px 6px 0 0",
        padding: "0 10px",
        height: 24,
        display: "flex",
        alignItems: "center",
        gap: 5,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#858585", marginLeft: 4 }}>
          terminal
        </span>
      </div>

      {/* Body */}
      <div style={{
        background: "#0D0D0D",
        border: "1px solid #3E3E42",
        borderRadius: "0 0 6px 6px",
        padding: "8px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: H - 24,
      }}>
        {lines.map((l, i) => (
          <motion.div
            key={`${l.prefix}-${l.msg}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            style={{ display: "flex", gap: 5, alignItems: "baseline" }}
          >
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#569CD6", flexShrink: 0 }}>
              ~$
            </span>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: l.color, flexShrink: 0 }}>
              {l.prefix}
            </span>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#858585", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {l.msg}
            </span>
          </motion.div>
        ))}
        {/* blinking cursor */}
        <span style={{
          fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#569CD6",
          animation: "cursorBlink 1s step-end infinite",
        }}>
          ~$ <span style={{ background: "#569CD6", color: "#0D0D0D" }}>&nbsp;</span>
        </span>
      </div>
    </motion.div>
  );
}
