"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "4+",    label: "Projects Built",  color: "#569CD6", sub: "Full-Stack" },
  { value: "486h",  label: "QA OJT",          color: "#22C55E", sub: "Wela Online Corp" },
  { value: "50+",   label: "E2E Tests",       color: "#F59E0B", sub: "Cypress Automated" },
  { value: "15+",   label: "Bugs Found",      color: "#F44747", sub: "Manual Testing" },
  { value: "2-in-1",label: "Dev & QA",        color: "#4EC9B0", sub: "Hybrid Engineer" },
];

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="stats-strip" style={{ position: "relative", zIndex: 10 }}>
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          className="stats-strip-item"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
        >
          <p style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 700,
            color: s.color,
            lineHeight: 1,
          }}>{s.value}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#C8C8C8", marginTop: 4, fontWeight: 600 }}>{s.label}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#555", marginTop: 2 }}>{s.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
