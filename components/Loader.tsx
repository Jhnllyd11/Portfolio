"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-obsidian"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Lightweight CSS spinner — no Three.js */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet animate-spin [animation-duration:1.4s] [animation-direction:reverse]" />
          <div className="absolute inset-[30%] rounded-full bg-cyan/20 animate-pulse-glow" />
        </div>
        <p className="mt-8 font-grotesk text-xs tracking-[0.4em] text-muted uppercase animate-pulse">
          Loading
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
