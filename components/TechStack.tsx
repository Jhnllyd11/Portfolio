"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const IMPORTS = [
  {
    from: "backend",
    color: "#CE9178",
    items: [
      { name: "PHP",     color: "#777BB4" },
      { name: "Laravel", color: "#FF2D20" },
      { name: "Python",  color: "#3776AB" },
    ],
  },
  {
    from: "frontend",
    color: "#CE9178",
    items: [
      { name: "TypeScript",   color: "#3178C6" },
      { name: "React",        color: "#61DAFB" },
      { name: "Next.js",      color: "#D4D4D4" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "HTML/CSS/JS",  color: "#F7DF1E" },
    ],
  },
  {
    from: "mobile",
    color: "#CE9178",
    items: [
      { name: "Flutter", color: "#54B6F6" },
      { name: "Dart",    color: "#00B4AB" },
    ],
  },
  {
    from: "database",
    color: "#CE9178",
    items: [
      { name: "MySQL",      color: "#00758F" },
      { name: "PostgreSQL", color: "#336791" },
    ],
  },
  {
    from: "qa_testing",
    color: "#CE9178",
    featured: true,
    items: [
      { name: "Cypress",           color: "#69DB7C" },
      { name: "Manual Testing",    color: "#22C55E" },
      { name: "Test Case Design",  color: "#4ADE80" },
      { name: "Data Migration",    color: "#86EFAC" },
      { name: "Role-Based Testing",color: "#BBF7D0" },
    ],
  },
  {
    from: "tools",
    color: "#CE9178",
    items: [
      { name: "Git",      color: "#F05032" },
      { name: "VS Code",  color: "#007ACC" },
      { name: "Passbolt", color: "#CF2A27" },
      { name: "GitHub",   color: "#D4D4D4" },
    ],
  },
];

function SkillChip({ name, color }: { name: string; color: string }) {
  const [compiling, setCompiling] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setCompiling(true)}
      onHoverEnd={() => setCompiling(false)}
      whileHover={{ y: -2 }}
      style={{
        position: "relative",
        display: "inline-flex", flexDirection: "column",
        padding: "6px 12px",
        background: "#2D2D30", border: "1px solid #3E3E42",
        borderRadius: 4, overflow: "hidden",
        fontFamily: "'Fira Code', monospace", fontSize: 11,
        color: compiling ? color : "#858585",
        transition: "color 0.2s, border-color 0.2s",
        borderColor: compiling ? `${color}50` : "#3E3E42",
        cursor: "default",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, opacity: compiling ? 1 : 0.4 }} />
        {name}
      </span>
      {/* Compile bar */}
      {compiling && (
        <motion.div
          style={{
            position: "absolute", bottom: 0, left: 0,
            height: 2, background: `linear-gradient(90deg,${color},${color}60)`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
        <span style={{ color: "#C586C0" }}>import </span>
        <span style={{ color: "#4EC9B0" }}>TechStack</span>
        <span style={{ color: "#C586C0" }}> from </span>
        <span style={{ color: "#CE9178" }}>&quot;./skills&quot;</span>
      </motion.h2>

      <div className="ide-window">
        <div className="ide-titlebar">
          <div className="flex items-center gap-1.5 px-3">
            <div className="browser-dot" style={{ background: "#FF5F57" }} />
            <div className="browser-dot" style={{ background: "#FEBC2E" }} />
            <div className="browser-dot" style={{ background: "#28C840" }} />
          </div>
          <div className="ide-tab active">
            <div className="ide-tab-dot" style={{ background: "#C586C0" }} />
            tech_stack.ts
          </div>
        </div>

        <div className="ide-code-area">
          <div className="ide-line-numbers">
            {Array.from({ length: IMPORTS.length + 4 }, (_, i) => <span key={i}>{i + 1}</span>)}
          </div>
          <div className="ide-body flex-1" style={{ fontSize: 12 }}>
            <div style={{ color: "#6A9955", marginBottom: 12 }}>{"// Technologies I use to build, test, and ship."}</div>

            {IMPORTS.map((group, i) => (
              <motion.div key={group.from}
                variants={up(0.1 + i * 0.07)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                style={{ marginBottom: 14 }}
              >
                {/* Import statement line */}
                <div style={{ marginBottom: 8, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                  <span style={{ color: "#C586C0" }}>import </span>
                  <span style={{ color: "#808080" }}>{"{ "}</span>
                  {group.items.map((item, j) => (
                    <span key={item.name}>
                      <span style={{ color: "#9CDCFE" }}>{item.name.replace(/[^a-zA-Z]/g, "")}</span>
                      {j < group.items.length - 1 && <span style={{ color: "#808080" }}>, </span>}
                    </span>
                  ))}
                  <span style={{ color: "#808080" }}>{" }"}</span>
                  <span style={{ color: "#C586C0" }}> from </span>
                  <span style={{ color: "#CE9178" }}>&quot;{group.from}&quot;</span>
                  <span style={{ color: "#808080" }}>;</span>
                  {group.featured && <span style={{ color: "#6A9955", marginLeft: 8 }}>{"// ★ primary specialization"}</span>}
                </div>

                {/* Skill chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 16 }}>
                  {group.items.map(item => (
                    <SkillChip key={item.name} name={item.name} color={item.color} />
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div variants={up(0.6)} initial="hidden" animate={inView ? "show" : "hidden"}
              style={{ marginTop: 8, color: "#6A9955" }}>
              {"// 486h professional QA OJT — Wela Online Corporation, DCMU"}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
