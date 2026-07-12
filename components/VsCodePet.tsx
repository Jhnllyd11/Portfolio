"use client";

import { useEffect, useRef, useState } from "react";

type State = "walk" | "idle" | "swipe";

const SPEED = 0.8;
const IDLE_CHANCE = 0.002;
const IDLE_DURATION = 3000;
const SIZE = 64;

// Pixel art cat — 8x8 grid drawn with colored divs
const CAT_COLORS: Record<string, string> = {
  B: "#1E1E1E", // black outline
  O: "#E8A87C", // orange fur
  W: "#F5F5F5", // white
  N: "#C47A3A", // dark orange
  P: "#FFB6C1", // pink nose
  _: "transparent",
};

// 8 rows × 8 cols pixel art frames
const FRAMES: string[][] = [
  // frame 0 — walk A
  [
    "_ B B B B _ _ _",
    "B O O O O B _ _",
    "B O W B W O B _",
    "B O O P O O B _",
    "_ B O O O B _ _",
    "_ B N O N B _ _",
    "_ B _ B _ B _ _",
    "_ B _ _ _ B _ _",
  ],
  // frame 1 — walk B (legs shifted)
  [
    "_ B B B B _ _ _",
    "B O O O O B _ _",
    "B O W B W O B _",
    "B O O P O O B _",
    "_ B O O O B _ _",
    "_ B N O N B _ _",
    "_ _ B _ B _ _ _",
    "_ B _ _ _ _ B _",
  ],
];

function PixelCat({ frame, flipped }: { frame: number; flipped: boolean }) {
  const grid = FRAMES[frame % FRAMES.length];
  const px = SIZE / 8;
  return (
    <div style={{
      width: SIZE, height: SIZE,
      transform: flipped ? "scaleX(-1)" : "scaleX(1)",
      display: "grid",
      gridTemplateRows: `repeat(8, ${px}px)`,
      imageRendering: "pixelated",
    }}>
      {grid.map((row, r) => (
        <div key={r} style={{ display: "grid", gridTemplateColumns: `repeat(8, ${px}px)` }}>
          {row.split(" ").map((cell, c) => (
            <div key={c} style={{ width: px, height: px, background: CAT_COLORS[cell] ?? "transparent" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function VsCodePet() {
  const [x, setX] = useState(160);
  const [dir, setDir] = useState<1 | -1>(1);
  const [state, setState] = useState<State>("walk");
  const [frame, setFrame] = useState(0);
  const [tooltip, setTooltip] = useState(false);

  const xRef = useRef(160);
  const dirRef = useRef<1 | -1>(1);
  const stateRef = useRef<State>("walk");
  const rafRef = useRef<number>(0);
  const frameTickRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let tick = 0;
    const step = () => {
      tick++;
      // Animate sprite frame every 12 RAF ticks (~5fps)
      if (tick % 12 === 0) setFrame(f => f + 1);

      if (stateRef.current === "walk") {
        const maxX = window.innerWidth - SIZE - 8;
        let nx = xRef.current + SPEED * dirRef.current;
        if (nx >= maxX) { nx = maxX; dirRef.current = -1; setDir(-1); }
        if (nx <= 8)    { nx = 8;    dirRef.current =  1; setDir(1); }
        xRef.current = nx;
        setX(nx);

        if (Math.random() < IDLE_CHANCE) {
          stateRef.current = "idle";
          setState("idle");
          idleTimerRef.current = setTimeout(() => {
            stateRef.current = "walk";
            setState("walk");
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
    setState("swipe");
    setTooltip(true);
    setTimeout(() => setTooltip(false), 1800);
    setTimeout(() => { stateRef.current = "walk"; setState("walk"); }, 2000);
  };

  return (
    <div
      onClick={handleClick}
      title="Click me!"
      style={{
        position: "fixed",
        bottom: 28,
        left: x,
        zIndex: 300,
        width: SIZE,
        height: SIZE,
        cursor: "pointer",
        userSelect: "none",
        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
      }}
    >
      {tooltip && (
        <div style={{
          position: "absolute",
          bottom: SIZE + 6,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#252526",
          border: "1px solid #569CD6",
          borderRadius: 5,
          padding: "3px 10px",
          fontFamily: "'Fira Code', monospace",
          fontSize: 11,
          color: "#9CDCFE",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 1,
        }}>
          meow! 🐾
        </div>
      )}
      <PixelCat
        frame={state === "idle" ? 0 : frame}
        flipped={dir === -1}
      />
    </div>
  );
}
