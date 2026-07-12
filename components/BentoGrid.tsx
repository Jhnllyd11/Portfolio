"use client";

import { useRef, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, ShieldCheck, GitBranch, Terminal, Quote } from "lucide-react";

const SKILLS = [
  { name: "Manual & Role-Based Testing", level: 90, color: "#4EC9B0" },
  { name: "QA Documentation",            level: 88, color: "#4EC9B0" },
  { name: "Cypress Automation",          level: 85, color: "#22C55E" },
  { name: "GitHub / Version Control",    level: 85, color: "#569CD6" },
  { name: "MySQL / Database Design",     level: 80, color: "#569CD6" },
  { name: "Next.js / React",             level: 78, color: "#61DAFB" },
  { name: "PHP / Custom MVC",            level: 75, color: "#FF2D20" },
];

const COMPS = [
  { icon: ShieldCheck, label: "Quality Assurance", color: "#4EC9B0" },
  { icon: Terminal,    label: "Test Automation",   color: "#22C55E" },
  { icon: Code2,       label: "Full-Stack Dev",    color: "#569CD6" },
  { icon: GitBranch,   label: "Version Control",   color: "#F05032" },
];

const TAGS = [
  "Quality Assurance", "Test Automation", "Cypress", "Manual Testing",
  "Data Migration", "Test Case Design", "Role-Based Testing",
  "GitHub", "VS Code", "Passbolt", "QA Documentation", "Sprint Testing",
  "Problem-Solving", "Team Collaboration", "Attention to Detail",
];

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.01)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)"; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      className={`ide-window glass-hover ${className ?? ""}`}
      style={{ willChange: "transform", transition: "transform 0.2s ease-out", ...style }}>
      {children}
    </div>
  );
}

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-wrap">
      <p className="section-label">Capabilities</p>
      <motion.h2 variants={up(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        Skills & Proficiency
      </motion.h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <motion.div variants={up(0.1)} initial="hidden" animate={inView ? "show" : "hidden"} className="md:col-span-2">
          <TiltCard>
            <div className="ide-titlebar">
              <div className="flex items-center gap-1.5 px-3">
                <div className="browser-dot" style={{ background: "#FF5F57" }} />
                <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                <div className="browser-dot" style={{ background: "#28C840" }} />
              </div>
              <div className="ide-tab active">
                <div className="ide-tab-dot" style={{ background: "#569CD6" }} />
                proficiency.ts
              </div>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#ECECEC", marginBottom: 16 }}>Technical Proficiency</p>
              {SKILLS.map((s, i) => (
                <div key={s.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#C8C8C8" }}>{s.name}</span>
                    <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: s.color }}>{s.level}%</span>
                  </div>
                  <div style={{ height: 3, background: "#2D2D30", borderRadius: 99, overflow: "hidden" }}>
                    <motion.div
                      style={{ height: "100%", background: `linear-gradient(90deg,${s.color},${s.color}60)`, borderRadius: 99 }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${s.level}%` } : { width: 0 }}
                      transition={{ duration: 1.1, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
          {COMPS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i} variants={up(0.15 + i * 0.05)} initial="hidden" animate={inView ? "show" : "hidden"}>
                <TiltCard>
                  <div style={{ padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 8, minHeight: 90 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 6, background: `${c.color}12`, border: `1px solid ${c.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={16} style={{ color: c.color }} />
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "#C8C8C8" }}>{c.label}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={up(0.3)} initial="hidden" animate={inView ? "show" : "hidden"}>
          <TiltCard style={{ height: "100%" }}>
            <div className="ide-titlebar">
              <div className="flex items-center gap-1.5 px-3">
                <div className="browser-dot" style={{ background: "#FF5F57" }} />
                <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                <div className="browser-dot" style={{ background: "#28C840" }} />
              </div>
              <div className="ide-tab active">
                <div className="ide-tab-dot" style={{ background: "#6A9955" }} />
                philosophy.md
              </div>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              <Quote size={18} style={{ color: "rgba(86,156,214,0.3)" }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#C8C8C8", lineHeight: 1.75, fontStyle: "italic" }}>
                &ldquo;I don&apos;t just write code — I write code that works, and then I prove it.
                Quality isn&apos;t a phase; it&apos;s the whole process.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 1, background: "linear-gradient(90deg,#569CD6,#4EC9B0)" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585" }}>Jhon Lloyd Samson</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div variants={up(0.35)} initial="hidden" animate={inView ? "show" : "hidden"} className="md:col-span-2">
          <TiltCard>
            <div className="ide-titlebar">
              <div className="flex items-center gap-1.5 px-3">
                <div className="browser-dot" style={{ background: "#FF5F57" }} />
                <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                <div className="browser-dot" style={{ background: "#28C840" }} />
              </div>
              <div className="ide-tab active">
                <div className="ide-tab-dot" style={{ background: "#C586C0" }} />
                competencies.ts
              </div>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#ECECEC", marginBottom: 12 }}>Core Competencies</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TAGS.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
