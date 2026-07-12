"use client";

import { useEffect, useRef, useState } from "react";

type State = "walk" | "idle" | "swipe";

const SIZE = 72;
const SPEED = 0.9;
const IDLE_CHANCE = 0.0015;
const IDLE_DURATION = 3500;

function drawCat(ctx: CanvasRenderingContext2D, frame: number, state: State) {
  ctx.clearRect(0, 0, SIZE, SIZE);

  const cx = SIZE / 2;
  const legOffset = state === "walk" ? (frame % 2 === 0 ? 3 : -3) : 0;
  const tailWag = Math.sin(frame * 0.4) * 8;
  const eyeBlink = frame % 40 === 0;

  // ── Tail ──────────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo(cx + 14, 46);
  ctx.quadraticCurveTo(cx + 28 + tailWag, 38, cx + 22 + tailWag, 28);
  ctx.strokeStyle = "#C47A3A";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.stroke();

  // ── Body ──────────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(cx, 44, 16, 13, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#E8A87C";
  ctx.fill();

  // belly
  ctx.beginPath();
  ctx.ellipse(cx - 1, 46, 9, 8, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#F5DEB3";
  ctx.fill();

  // ── Legs ──────────────────────────────────────────────────────────
  const legColor = "#C47A3A";
  // back legs
  ctx.fillStyle = legColor;
  ctx.beginPath(); ctx.roundRect(cx + 6,  54 - legOffset, 6, 10, 3); ctx.fill();
  ctx.beginPath(); ctx.roundRect(cx - 4, 54 + legOffset, 6, 10, 3); ctx.fill();
  // front legs
  ctx.fillStyle = "#E8A87C";
  ctx.beginPath(); ctx.roundRect(cx + 8,  50 + legOffset, 5, 9, 3); ctx.fill();
  ctx.beginPath(); ctx.roundRect(cx - 6, 50 - legOffset, 5, 9, 3); ctx.fill();

  // ── Head ──────────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(cx, 28, 15, 14, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#E8A87C";
  ctx.fill();

  // ── Ears ──────────────────────────────────────────────────────────
  // left ear
  ctx.beginPath();
  ctx.moveTo(cx - 10, 18); ctx.lineTo(cx - 18, 6); ctx.lineTo(cx - 3, 16);
  ctx.fillStyle = "#E8A87C"; ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 10, 17); ctx.lineTo(cx - 15, 9); ctx.lineTo(cx - 5, 16);
  ctx.fillStyle = "#F4A0A0"; ctx.fill();

  // right ear
  ctx.beginPath();
  ctx.moveTo(cx + 10, 18); ctx.lineTo(cx + 18, 6); ctx.lineTo(cx + 3, 16);
  ctx.fillStyle = "#E8A87C"; ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 10, 17); ctx.lineTo(cx + 15, 9); ctx.lineTo(cx + 5, 16);
  ctx.fillStyle = "#F4A0A0"; ctx.fill();

  // ── Face ──────────────────────────────────────────────────────────
  // eyes
  if (eyeBlink) {
    ctx.beginPath(); ctx.moveTo(cx - 6, 27); ctx.lineTo(cx - 2, 27);
    ctx.strokeStyle = "#2D1A0E"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 2, 27); ctx.lineTo(cx + 6, 27);
    ctx.stroke();
  } else {
    ctx.beginPath(); ctx.ellipse(cx - 4, 27, 3.5, state === "idle" ? 2 : 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#2D1A0E"; ctx.fill();
    // shine
    ctx.beginPath(); ctx.ellipse(cx - 3, 25.5, 1, 1, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#fff"; ctx.fill();

    ctx.beginPath(); ctx.ellipse(cx + 4, 27, 3.5, state === "idle" ? 2 : 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#2D1A0E"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 5, 25.5, 1, 1, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#fff"; ctx.fill();
  }

  // nose
  ctx.beginPath();
  ctx.moveTo(cx, 31); ctx.lineTo(cx - 2, 33); ctx.lineTo(cx + 2, 33);
  ctx.closePath(); ctx.fillStyle = "#FF9999"; ctx.fill();

  // mouth
  ctx.beginPath();
  ctx.moveTo(cx - 3, 34); ctx.quadraticCurveTo(cx, 37, cx + 3, 34);
  ctx.strokeStyle = "#C47A3A"; ctx.lineWidth = 1; ctx.stroke();

  // whiskers
  ctx.strokeStyle = "#A0A0A0"; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(cx - 5, 32); ctx.lineTo(cx - 16, 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx - 5, 33); ctx.lineTo(cx - 16, 34); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + 5, 32); ctx.lineTo(cx + 16, 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + 5, 33); ctx.lineTo(cx + 16, 34); ctx.stroke();

  // swipe paw
  if (state === "swipe") {
    ctx.beginPath();
    ctx.ellipse(cx + 20, 38, 7, 5, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#E8A87C"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + 24, 34); ctx.lineTo(cx + 27, 30); ctx.strokeStyle = "#C47A3A"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 26, 35); ctx.lineTo(cx + 30, 32); ctx.stroke();
  }
}

export default function VsCodePet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [x, setX] = useState(160);
  const [dir, setDir] = useState<1 | -1>(1);
  const [tooltip, setTooltip] = useState(false);

  const xRef = useRef(160);
  const dirRef = useRef<1 | -1>(1);
  const stateRef = useRef<State>("walk");
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const tickRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const step = () => {
      tickRef.current++;
      frameRef.current = tickRef.current;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) drawCat(ctx, tickRef.current, stateRef.current);
      }

      if (stateRef.current === "walk") {
        const maxX = window.innerWidth - SIZE - 8;
        let nx = xRef.current + SPEED * dirRef.current;
        if (nx >= maxX) { nx = maxX; dirRef.current = -1; setDir(-1); }
        if (nx <= 8)    { nx = 8;    dirRef.current =  1; setDir(1); }
        xRef.current = nx;
        setX(nx);

        if (Math.random() < IDLE_CHANCE) {
          stateRef.current = "idle";
          idleTimerRef.current = setTimeout(() => {
            stateRef.current = "walk";
          }, IDLE_DURATION);
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (stateRef.current === "swipe") return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    stateRef.current = "swipe";
    setTooltip(true);
    setTimeout(() => setTooltip(false), 1800);
    setTimeout(() => { stateRef.current = "walk"; }, 2000);
  };

  return (
    <div
      onClick={handleClick}
      title="Click me!"
      style={{
        position: "fixed",
        bottom: 20,
        left: x,
        zIndex: 300,
        width: SIZE,
        height: SIZE,
        cursor: "pointer",
        userSelect: "none",
        transform: `scaleX(${dir === -1 ? -1 : 1})`,
        filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.5))",
      }}
    >
      {tooltip && (
        <div style={{
          position: "absolute",
          bottom: SIZE + 6,
          left: "50%",
          transform: `translateX(-50%) scaleX(${dir === -1 ? -1 : 1})`,
          background: "#252526",
          border: "1px solid #569CD6",
          borderRadius: 5,
          padding: "3px 10px",
          fontFamily: "'Fira Code', monospace",
          fontSize: 11,
          color: "#9CDCFE",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}>
          meow! 🐾
        </div>
      )}
      <canvas ref={canvasRef} width={SIZE} height={SIZE} />
    </div>
  );
}
