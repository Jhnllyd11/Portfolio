"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function drawArrow(ctx: CanvasRenderingContext2D, pressed: boolean, glowIntensity: number) {
  ctx.clearRect(0, 0, 56, 56);

  const scale = pressed ? 0.82 : 1;
  ctx.save();
  ctx.translate(28, 28);
  ctx.scale(scale, scale);
  ctx.translate(-28, -28);

  // ── Glow layers ───────────────────────────────────────────────────
  const glowColor = `rgba(86,156,214,${0.12 + glowIntensity * 0.18})`;
  const glowColor2 = `rgba(78,201,176,${0.06 + glowIntensity * 0.1})`;

  // outer glow
  ctx.shadowColor = "#569CD6";
  ctx.shadowBlur = 14 + glowIntensity * 8;

  // ── Arrow path ────────────────────────────────────────────────────
  // Classic sharp pointer arrow, tilted -15deg naturally
  ctx.save();
  ctx.translate(8, 4);

  // Arrow fill
  ctx.beginPath();
  ctx.moveTo(0, 0);        // tip
  ctx.lineTo(0, 28);       // left edge down
  ctx.lineTo(7, 22);       // inner notch
  ctx.lineTo(16, 36);      // right barb bottom
  ctx.lineTo(20, 33);      // right barb top
  ctx.lineTo(11, 19);      // inner notch right
  ctx.lineTo(18, 19);      // right edge
  ctx.closePath();

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 18, 36);
  grad.addColorStop(0, "#FFFFFF");
  grad.addColorStop(0.3, "#D4EEFF");
  grad.addColorStop(1, "#9CDCFE");
  ctx.fillStyle = grad;
  ctx.fill();

  // Neon outline
  ctx.strokeStyle = "#569CD6";
  ctx.lineWidth = 1.2;
  ctx.shadowColor = "#569CD6";
  ctx.shadowBlur = 10 + glowIntensity * 6;
  ctx.stroke();

  // Inner highlight on left edge
  ctx.beginPath();
  ctx.moveTo(1, 2);
  ctx.lineTo(1, 22);
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 0.8;
  ctx.shadowBlur = 0;
  ctx.stroke();

  ctx.restore();
  ctx.restore();
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [pressed, setPressed] = useState(false);
  const glowRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastPos = useRef({ x: -100, y: -100 });

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });

  // Tilt based on horizontal movement
  const [tilt, setTilt] = useState(-15);
  const velX = useRef(0);

  useEffect(() => {
    if ("ontouchstart" in window) { setIsTouch(true); return; }

    const move = (e: MouseEvent) => {
      velX.current = e.clientX - lastPos.current.x;
      lastPos.current = { x: e.clientX, y: e.clientY };
      mx.set(e.clientX);
      my.set(e.clientY);
      // Tilt: base -15deg, shifts slightly with horizontal velocity
      const t = -15 + Math.max(-10, Math.min(10, velX.current * 0.8));
      setTilt(t);
      // Boost glow on fast movement
      const speed = Math.abs(velX.current);
      glowRef.current = Math.min(1, speed / 20);
    };
    const down = () => setPressed(true);
    const up   = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
    };
  }, [mx, my]);

  // Animate glow decay + redraw
  useEffect(() => {
    if (isTouch) return;
    const loop = () => {
      glowRef.current *= 0.88; // decay
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) drawArrow(ctx, pressed, glowRef.current);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pressed, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      style={{
        x: sx, y: sy,
        translateX: "-8px",
        translateY: "-4px",
        position: "fixed",
        top: 0, left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        rotate: tilt,
        scale: pressed ? 0.88 : 1,
      }}
      transition={{ rotate: { type: "spring", stiffness: 300, damping: 20 }, scale: { duration: 0.1 } }}
    >
      <canvas ref={canvasRef} width={56} height={56} style={{ display: "block" }} />
    </motion.div>
  );
}
