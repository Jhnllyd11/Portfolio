"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Server, Globe, Smartphone, Database, TestTube2, Wrench, Zap } from "lucide-react";

const CATS = [
  {
    label: "Backend", icon: Server, color: "#FF2D20", desc: "Server-side logic & APIs", filter: "Backend",
    items: [
      { name: "PHP",     color: "#777BB4", usage: "Custom MVC for Maritime Licensing System" },
      { name: "Laravel", color: "#FF2D20", usage: "RESTful APIs & Eloquent ORM" },
      { name: "Python",  color: "#3776AB", usage: "Cisco Python Essentials certified" },
    ],
  },
  {
    label: "Frontend", icon: Globe, color: "#569CD6", desc: "UI/UX & web interfaces", filter: "Frontend",
    items: [
      { name: "TypeScript",   color: "#3178C6", usage: "This portfolio — strict typed Next.js 15" },
      { name: "React",        color: "#61DAFB", usage: "Component-driven UI architecture" },
      { name: "Next.js",      color: "#D4D4D4", usage: "App Router, SSR, dynamic imports" },
      { name: "Tailwind CSS", color: "#06B6D4", usage: "Utility-first styling across all projects" },
      { name: "HTML/CSS/JS",  color: "#F7DF1E", usage: "Maritime Licensing System frontend" },
    ],
  },
  {
    label: "Mobile", icon: Smartphone, color: "#54B6F6", desc: "Cross-platform apps", filter: "Mobile",
    items: [
      { name: "Flutter", color: "#54B6F6", usage: "Cross-platform mobile development" },
      { name: "Dart",    color: "#00B4AB", usage: "Flutter's primary language" },
    ],
  },
  {
    label: "Database", icon: Database, color: "#336791", desc: "Data storage & design", filter: "Backend",
    items: [
      { name: "MySQL",      color: "#00758F", usage: "Maritime Licensing System database" },
      { name: "PostgreSQL", color: "#336791", usage: "Advanced relational data management" },
    ],
  },
  {
    label: "QA & Testing", icon: TestTube2, color: "#22C55E", desc: "Quality assurance & automation", filter: "QA", featured: true,
    items: [
      { name: "Cypress",            color: "#69DB7C", usage: "Automated 50+ E2E tests at Wela Online Corp" },
      { name: "Manual Testing",     color: "#22C55E", usage: "486h OJT — Sprint Cycle, Backlog, Timesheet" },
      { name: "Test Case Design",   color: "#4ADE80", usage: "Documented test cases & checklists for DCMU" },
      { name: "Data Migration",     color: "#86EFAC", usage: "V11–V15 migration validation & presentation" },
      { name: "Role-Based Testing", color: "#BBF7D0", usage: "PO, PM, Dev, Technical, QA role validation" },
    ],
  },
  {
    label: "Tools", icon: Wrench, color: "#F05032", desc: "Dev environment & workflow", filter: "Tools",
    items: [
      { name: "Git",      color: "#F05032", usage: "Version control across all projects" },
      { name: "VS Code",  color: "#007ACC", usage: "Primary IDE — this portfolio is VS Code themed" },
      { name: "Passbolt", color: "#CF2A27", usage: "Secure credential management setup at OJT" },
      { name: "GitHub",   color: "#D4D4D4", usage: "Cypress suite version control & collaboration" },
    ],
  },
];

const FILTERS = ["All", "Frontend", "Backend", "QA", "Mobile", "Tools"];

function SkillChip({ name, color, usage }: { name: string; color: string; usage: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -2 }}
        style={{
          display: "inline-flex", flexDirection: "column",
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
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)",
              background: "#2D2D30", border: `1px solid ${color}40`,
              borderRadius: 4, padding: "5px 10px",
              fontFamily: "Inter, sans-serif", fontSize: 10, color: "#C8C8C8",
              whiteSpace: "nowrap", zIndex: 50, pointerEvents: "none",
              boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
            }}
          >
            {usage}
            <div style={{
              position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
              borderTop: `4px solid ${color}40`,
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = CATS.filter(c => activeFilter === "All" || c.filter === activeFilter);

  return (
    <section id="stack" ref={ref} className="section-wrap">
      <p className="section-label">Arsenal</p>
      <motion.h2 variants={up(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        <span style={{ color: "#C586C0" }}>import </span>
        <span style={{ color: "#808080" }}>&#123; </span>
        <span style={{ color: "#9CDCFE" }}>stack</span>
        <span style={{ color: "#808080" }}> &#125; </span>
        <span style={{ color: "#C586C0" }}>from </span>
        <span style={{ color: "#CE9178" }}>&quot;./arsenal&quot;</span>
      </motion.h2>

      {/* Filter buttons */}
      <motion.div
        variants={up(0.08)} initial="hidden" animate={inView ? "show" : "hidden"}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}
      >
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`filter-btn${activeFilter === f ? " active" + (f === "QA" ? " qa" : "") : ""}`}
          >
            {f === "QA" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />}
            {f}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.label}
                variants={up(0.04 + i * 0.05)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`ide-window glass-hover ${cat.featured && activeFilter === "All" ? "lg:col-span-2" : ""}`}
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
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {cat.items.map(item => <SkillChip key={item.name} name={item.name} color={item.color} usage={item.usage} />)}
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
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
