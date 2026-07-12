"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          x: mx, y: my, translateX: "-50%", translateY: "-50%",
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          width: 5, height: 5, borderRadius: "50%",
          background: "#569CD6", pointerEvents: "none",
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          x: sx, y: sy, translateX: "-50%", translateY: "-50%",
          position: "fixed", top: 0, left: 0, zIndex: 9998,
          width: 28, height: 28, borderRadius: "50%",
          border: "1px solid rgba(86,156,214,0.5)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
