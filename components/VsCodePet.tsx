"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type State = "walk" | "idle" | "swipe";

const SIZE = 80;
const SPEED = 1.2; // px per frame
const IDLE_CHANCE = 0.003; // probability per frame to stop and idle
const IDLE_DURATION = 3000; // ms to idle before walking again

export default function VsCodePet() {
  const [x, setX] = useState(120);
  const [dir, setDir] = useState<1 | -1>(1); // 1 = right, -1 = left
  const [state, setState] = useState<State>("walk");
  const [tooltip, setTooltip] = useState(false);

  const xRef = useRef(120);
  const dirRef = useRef<1 | -1>(1);
  const stateRef = useRef<State>("walk");
  const rafRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const step = () => {
      if (stateRef.current === "walk") {
        const maxX = window.innerWidth - SIZE - 8;
        let nx = xRef.current + SPEED * dirRef.current;

        // Bounce off edges
        if (nx >= maxX) { nx = maxX; dirRef.current = -1; setDir(-1); }
        if (nx <= 8)    { nx = 8;    dirRef.current =  1; setDir(1); }

        xRef.current = nx;
        setX(nx);

        // Random idle
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
    setTimeout(() => {
      stateRef.current = "walk";
      setState("walk");
    }, 2000);
  };

  const src =
    state === "idle"  ? "/images/pet/cat_idle.gif" :
    state === "swipe" ? "/images/pet/cat_swipe.gif" :
                        "/images/pet/cat_walk.gif";

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: 24,
        left: x,
        zIndex: 300,
        width: SIZE,
        height: SIZE,
        cursor: "pointer",
        userSelect: "none",
        transform: `scaleX(${dir === -1 ? -1 : 1})`,
        transition: "transform 0.1s",
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
      }}
    >
      {/* Tooltip — not flipped with the sprite */}
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
      <Image
        src={src}
        alt="VS Code Pet"
        width={SIZE}
        height={SIZE}
        style={{ imageRendering: "pixelated" }}
        unoptimized
      />
    </div>
  );
}
