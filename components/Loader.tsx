"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ background: "#020408", zIndex: 999 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 3D-style concentric rings */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full animate-spin-slow"
            style={{ border: "1px solid rgba(14,165,233,0.15)", borderTopColor: "#0ea5e9" }} />
          {/* Mid ring */}
          <div className="absolute inset-3 rounded-full animate-spin-rev"
            style={{ border: "1px solid rgba(34,197,94,0.15)", borderTopColor: "#22c55e" }} />
          {/* Inner ring */}
          <div className="absolute inset-6 rounded-full animate-spin-slow"
            style={{ border: "1px solid rgba(189,0,255,0.15)", borderTopColor: "#bd00ff", animationDuration: "2s" }} />
          {/* Core glow */}
          <div className="absolute inset-[38%] rounded-full animate-pulse-glow"
            style={{ background: "radial-gradient(circle, rgba(14,165,233,0.8), rgba(34,197,94,0.4))" }} />
        </div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-grotesk font-bold text-lg tracking-[0.15em]"
          style={{ background: "linear-gradient(135deg,#0ea5e9,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          JHON LLOYD
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-mono-code text-xs tracking-[0.4em] mt-1"
          style={{ color: "#334155" }}
        >
          PORTFOLIO
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 h-px rounded-full overflow-hidden"
          style={{ width: 120, background: "rgba(255,255,255,0.05)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#0ea5e9,#22c55e)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
