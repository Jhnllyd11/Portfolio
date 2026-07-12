"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function drawHand(ctx: CanvasRenderingContext2D, pressed: boolean) {
  ctx.clearRect(0, 0, 48, 48);
  const scaleY = pressed ? 0.88 : 1;
  ctx.save();
  ctx.translate(10, pressed ? 4 : 2);
  ctx.scale(1, scaleY);

  ctx.beginPath(); ctx.roundRect(10, 0, 8, 22, 4);
  ctx.fillStyle = "#FDDBB4"; ctx.fill();
  ctx.strokeStyle = "#E8A87C"; ctx.lineWidth = 1; ctx.stroke();

  ctx.beginPath(); ctx.roundRect(19, 6, 7, 18, 4);
  ctx.fillStyle = "#FDDBB4"; ctx.fill(); ctx.stroke();

  ctx.beginPath(); ctx.roundRect(27, 8, 7, 16, 4);
  ctx.fillStyle = "#FDDBB4"; ctx.fill(); ctx.stroke();

  ctx.beginPath(); ctx.roundRect(35, 11, 6, 13, 4);
  ctx.fillStyle = "#FDDBB4"; ctx.fill(); ctx.stroke();

  ctx.beginPath(); ctx.roundRect(8, 18, 34, 18, [0, 0, 8, 8]);
  ctx.fillStyle = "#FDDBB4"; ctx.fill();
  ctx.strokeStyle = "#E8A87C"; ctx.lineWidth = 1; ctx.stroke();

  ctx.beginPath(); ctx.roundRect(0, 20, 12, 8, 4);
  ctx.fillStyle = "#FDDBB4"; ctx.fill(); ctx.stroke();

  ctx.strokeStyle = "#E8A87C"; ctx.lineWidth = 0.8;
  [13, 22, 30].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 23); ctx.stroke();
  });

  ctx.beginPath(); ctx.roundRect(11, 1, 6, 5, 2);
  ctx.fillStyle = "#FFD6B0"; ctx.fill();

  ctx.beginPath(); ctx.ellipse(20, 28, 5, 3, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,150,150,0.25)"; ctx.fill();

  ctx.restore();
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  useEffect(() => {
    if ("ontouchstart" in window) { setIsTouch(true); return; }
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
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

  useEffect(() => {
    if (isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawHand(ctx, pressed);
  }, [pressed, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      style={{
        x: sx, y: sy,
        translateX: "-4px", translateY: "-2px",
        position: "fixed", top: 0, left: 0,
        zIndex: 9999, pointerEvents: "none",
        rotate: pressed ? -8 : 0,
        scale: pressed ? 0.9 : 1,
        transition: "rotate 0.1s, scale 0.1s",
      }}
    >
      <canvas ref={canvasRef} width={48} height={48} style={{ display: "block" }} />
    </motion.div>
  );
}
