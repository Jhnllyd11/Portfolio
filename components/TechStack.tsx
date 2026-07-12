"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Globe, Smartphone, Database, TestTube2, Wrench, Zap } from "lucide-react";

const CATS = [
  {
    label: "Backend", icon: Server, color: "#FF2D20", desc: "Server-side logic & APIs",
    items: [
      { name: "PHP",     color: "#777BB4" },
      { name: "Laravel", color: "#FF2D20" },
      { name: "Python",  color: "#3776AB" },
    ],
  },
  {
    label: "Frontend", icon: Globe, color: "#569CD6", desc: "UI/UX & web interfaces",
    items: [
      { name: "TypeScript",   color: "#3178C6" },
      { name: "React",        color: "#61DAFB" },
      { name: "Next.js",      color: "#D4D4D4" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "HTML/CSS/JS",  color: "#F7DF1E" },
    ],
  },
  {
    label: "Mobile", icon: Smartphone, color: "#54B6F6", desc: "Cross-platform apps",
    items: [
      { name: "Flutter", color: "#54B6F6" },
      { name: "Dart",    color: "#00B4AB" },
    ],
  },
  {
    label: "Database", icon: Database, color: "#336791", desc: "Data storage & design",
    items: [
      { name: "MySQL",      color: "#00758F" },
      { name: "PostgreSQL", color: "#336791" },
    ],
  },
  {
    label: "QA & Testing", icon: TestTube2, color: "#22C55E", desc: "Quality assurance & automation",
    featured: true,
    items: [
      { name: "Cypress",            color: "#69DB7C" },
      { name: "Manual Testing",     color: "#22C55E" },
      { name: "Test Case Design",   color: "#4ADE80" },
      { name: "Data Migration",     color: "#86EFAC" },
      { name: "Role-Based Testing", color: "#BBF7D0" },
    ],
  },
  {
    label: "Tools", icon: Wrench, color: "#F05032", desc: "Dev environment & workflow",
    items: [
      { name: "Git",      color: "#F05032" },
      { name: "VS Code",  color: "#007ACC" },
      { name: "Passbolt", color: "#CF2A27" },
      { name: "GitHub",   color: "#D4D4D4" },
    ],
  },
];

function SkillChip({ name, color }: { name: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -2 }}
      style={{
        position: "relative", display: "inline-flex", flexDirection: "column",
        padding: "5px 11px", background: "#2D2D30",
        border: `1px solid ${hovered ? `${color}50` : "#3E3E42"}`,
        borderRadius: 4, overflow: "hidden", cursor: "default",
        transition: "border-color 0.2s",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "Inter, sans-serif", fontSize: 12, color: hovered ? color : "#A0A0A0", transition: "color 0.2s" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, opacity: hovered ? 1 : 0.5 }} />
        {name}
      </span>
      {hovered && (
        <motion.div
          style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: `linear-gradient(90deg,${color},${color}60)` }}
          initial={{ width: "0%" }} animate={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="section-wrap">
      <p className="section-label">Arsenal</p>
      <motion.h2 variants={up(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        Tech Stack
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATS.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.label}
              variants={up(0.08 + i * 0.06)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`ide-window glass-hover ${cat.featured ? "lg:col-span-2" : ""}`}
              style={{ borderColor: `${cat.color}15` }}
            >
              <div className="ide-titlebar">
                <div className="flex items-center gap-1.5 px-3">
                  <div className="browser-dot" style={{ background: "#FF5F57" }} />
                  <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                  <div className="browser-dot" style={{ background: "#28C840" }} />
                </div>
                <div className="ide-tab active" style={{ borderTopColor: cat.color }}>
                  <div className="ide-tab-dot" style={{ background: cat.color }} />
                  {cat.label.toLowerCase().replace(/[^a-z]/g, "_")}.ts
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 6,
                      background: `${cat.color}12`, border: `1px solid ${cat.color}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={16} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#ECECEC" }}>{cat.label}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585" }}>{cat.desc}</p>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: "'Fira Code', monospace", fontSize: 10, padding: "2px 7px", borderRadius: 3,
                    background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}20`,
                  }}>{cat.items.length}</span>
                </div>
                <div style={{ height: 1, background: `linear-gradient(90deg,${cat.color}25,transparent)`, marginBottom: 12 }} />
                {/* Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map(item => <SkillChip key={item.name} name={item.name} color={item.color} />)}
                </div>
                {cat.featured && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 11, color: cat.color }}>
                    <Zap size={10} /> Primary specialization — 486h professional OJT
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
