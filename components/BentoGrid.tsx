"use client";

import { useRef, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, ShieldCheck, GitBranch, Terminal, Quote } from "lucide-react";

const SKILLS = [
  { name: "Manual & Role-Based Testing", level: 90, color: "#22c55e" },
  { name: "QA Documentation",            level: 88, color: "#22c55e" },
  { name: "Cypress Automation",          level: 85, color: "#69db7c" },
  { name: "GitHub / Version Control",    level: 85, color: "#0ea5e9" },
  { name: "MySQL / Database Design",     level: 80, color: "#0ea5e9" },
  { name: "Next.js / React",             level: 78, color: "#61dafb" },
  { name: "PHP / Laravel",               level: 75, color: "#ff2d20" },
];

const COMPS = [
  { icon: ShieldCheck, label: "Quality Assurance", accent: "#22c55e" },
  { icon: Terminal,    label: "Test Automation",   accent: "#69db7c" },
  { icon: Code2,       label: "Full-Stack Dev",    accent: "#0ea5e9" },
  { icon: GitBranch,   label: "Version Control",   accent: "#f05032" },
];

const TAGS = [
  "Quality Assurance","Test Automation","Cypress","Manual Testing",
  "Data Migration","Test Case Design","Role-Based Testing",
  "GitHub","VS Code","Passbolt","QA Documentation","Sprint Testing",
  "Problem-Solving","Team Collaboration","Attention to Detail",
];

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -12;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.012)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)"; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      className={`glass glass-hover rounded-2xl transition-transform duration-200 ease-out ${className ?? ""}`}
      style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22,1,0.36,1] as number[] } },
});

export default function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-wrap">
      <p className="section-label">Capabilities</p>
      <motion.h2 variants={up(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        Skills & <span className="gradient-text">Proficiency</span>
      </motion.h2>

      {/* Row 1: skill bars (wide) + 2 competency cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <motion.div variants={up(0.1)} initial="hidden" animate={inView ? "show" : "hidden"} className="md:col-span-2">
          <TiltCard className="p-7 h-full">
            <div className="flex items-center gap-2 mb-6">
              <Code2 size={14} style={{ color: "#0ea5e9" }} />
              <p className="font-grotesk font-semibold text-sm" style={{ color: "#f1f5f9" }}>Technical Proficiency</p>
            </div>
            <div className="flex flex-col gap-4">
              {SKILLS.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs font-inter mb-1.5">
                    <span style={{ color: "#94a3b8" }}>{s.name}</span>
                    <span className="font-mono-code" style={{ color: s.color }}>{s.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg,${s.color},${s.color}70)` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${s.level}%` } : { width: 0 }}
                      transition={{ duration: 1.1, delay: 0.3 + i * 0.07, ease: "easeOut" }} />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {COMPS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i} variants={up(0.15 + i * 0.05)} initial="hidden" animate={inView ? "show" : "hidden"}>
                <TiltCard className="p-5 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${c.accent}12`, border: `1px solid ${c.accent}25` }}>
                    <Icon size={18} style={{ color: c.accent }} />
                  </div>
                  <p className="text-xs font-inter font-medium" style={{ color: "#f1f5f9" }}>{c.label}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Row 2: quote + tags */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={up(0.3)} initial="hidden" animate={inView ? "show" : "hidden"}>
          <TiltCard className="p-7 h-full flex flex-col justify-between gap-4">
            <Quote size={20} style={{ color: "rgba(14,165,233,0.3)" }} />
            <p className="font-inter text-sm leading-relaxed italic" style={{ color: "#f1f5f9" }}>
              &ldquo;I don&apos;t just write code — I write code that works, and then I prove it.
              Quality isn&apos;t a phase; it&apos;s the whole process.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div style={{ width: 32, height: 1, background: "linear-gradient(90deg,#0ea5e9,#22c55e)" }} />
              <span className="text-xs font-inter" style={{ color: "#64748b" }}>Jhon Lloyd Samson</span>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div variants={up(0.35)} initial="hidden" animate={inView ? "show" : "hidden"} className="md:col-span-2">
          <TiltCard className="p-7 h-full">
            <p className="font-grotesk font-semibold text-sm mb-4" style={{ color: "#f1f5f9" }}>Core Competencies</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <span key={tag} className="skill-tag skill-glow-default">{tag}</span>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
