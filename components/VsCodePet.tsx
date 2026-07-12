"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type State = "walk" | "idle" | "swipe";

const SIZE = 56;
const SPEED = 0.9;
const IDLE_CHANCE = 0.0015;
const IDLE_DURATION = 3500;

export default function VsCodePet() {
  const [x, setX] = useState(160);
  const [dir, setDir] = useState<1 | -1>(1);
  const [state, setState] = useState<State>("walk");
  const [tooltip, setTooltip] = useState(false);
  const [bob, setBob] = useState(false);

  const xRef = useRef(160);
  const dirRef = useRef<1 | -1>(1);
  const stateRef = useRef<State>("walk");
  const rafRef = useRef<number>(0);
  const tickRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const step = () => {
      tickRef.current++;

      // Bob every 18 frames
      if (tickRef.current % 18 === 0) setBob(b => !b);

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

  const src = state === "idle" || state === "swipe"
    ? "/images/pet/cat_face.png"
    : "/images/pet/cat.png";

  const bobY = state === "walk" && bob ? -4 : 0;
  const tilt = state === "walk" ? (bob ? 6 : -6) : state === "swipe" ? 20 : 0;

  return (
    <div
      onClick={handleClick}
      title="Click me! 🐾"
      style={{
        position: "fixed",
        bottom: 20,
        left: x,
        zIndex: 300,
        width: SIZE,
        height: SIZE,
        cursor: "pointer",
        userSelect: "none",
        transform: `scaleX(${dir === -1 ? -1 : 1}) translateY(${bobY}px) rotate(${tilt}deg)`,
        transition: "transform 0.18s ease",
        filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))",
      }}
    >
      {tooltip && (
        <div style={{
          position: "absolute",
          bottom: SIZE + 6,
          left: "50%",
          transform: `translateX(-50%) scaleX(${dir === -1 ? -1 : 1}) rotate(${-tilt}deg)`,
          background: "#252526",
          border: "1px solid #569CD6",
          borderRadius: 6,
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
        alt="pet"
        width={SIZE}
        height={SIZE}
        unoptimized
        priority
      />
    </div>
  );
}
