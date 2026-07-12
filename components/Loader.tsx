"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "$ initializing portfolio...", color: "#6A9955", delay: 0 },
  { text: "> loading modules: [react, next, gsap, lenis]", color: "#9CDCFE", delay: 250 },
  { text: "> compiling TypeScript...", color: "#569CD6", delay: 600 },
  { text: "> running QA checks...", color: "#4EC9B0", delay: 950 },
  { text: "✓ build successful — jhon-lloyd-samson@portfolio", color: "#22C55E", delay: 1350 },
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(prev => [...prev, i]), line.delay);
    });
    const t = setTimeout(onComplete, 2200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ background: "#0D0D0D", zIndex: 999 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* IDE window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "min(480px, 90vw)" }}
        >
          {/* Title bar */}
          <div className="ide-titlebar rounded-t-lg">
            <div className="flex items-center gap-1.5 px-3">
              <div className="browser-dot" style={{ background: "#FF5F57" }} />
              <div className="browser-dot" style={{ background: "#FEBC2E" }} />
              <div className="browser-dot" style={{ background: "#28C840" }} />
            </div>
            <div className="ide-tab active ml-2">
              <div className="ide-tab-dot" style={{ background: "#569CD6" }} />
              portfolio.ts
            </div>
          </div>

          {/* Terminal body */}
          <div className="terminal rounded-b-lg" style={{ borderTop: "none", borderRadius: "0 0 8px 8px" }}>
            <div className="terminal-body" style={{ minHeight: 160 }}>
              {BOOT_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleLines.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: line.color, marginBottom: 4 }}
                    >
                      {line.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
              {visibleLines.length < BOOT_LINES.length && (
                <span className="terminal-cursor" />
              )}
            </div>

            {/* Progress bar */}
            <div style={{ padding: "0 20px 16px" }}>
              <div style={{ height: 2, background: "#2D2D30", borderRadius: 99, overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", background: "linear-gradient(90deg,#569CD6,#4EC9B0)", borderRadius: 99 }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.0, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Name below */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#3E3E42", marginTop: 20, letterSpacing: "0.3em" }}
        >
          JHON LLOYD SAMSON
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
