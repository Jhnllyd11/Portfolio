"use client";

import { useRef, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { clsx } from "clsx";
import { Code2, ShieldCheck, GitBranch, Terminal, Quote } from "lucide-react";

const skills = [
  { name: "Manual & Role-Based Testing", level: 90, color: "#22c55e" },
  { name: "QA Documentation",            level: 88, color: "#22c55e" },
  { name: "Cypress Automation",          level: 85, color: "#69db7c" },
  { name: "GitHub / Version Control",    level: 85, color: "#0ea5e9" },
  { name: "MySQL / Database Design",     level: 80, color: "#0ea5e9" },
  { name: "Next.js / React",             level: 78, color: "#61dafb" },
  { name: "PHP / Laravel",               level: 75, color: "#ff2d20" },
];

const competencies = [
  { icon: ShieldCheck, label: "Quality Assurance",    accent: "#22c55e" },
  { icon: Terminal,    label: "Test Automation",       accent: "#69db7c" },
  { icon: Code2,       label: "Full-Stack Dev",        accent: "#0ea5e9" },
  { icon: GitBranch,   label: "Version Control",       accent: "#f05032" },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.015)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={clsx("glass glass-hover rounded-2xl transition-transform duration-200 ease-out", className)}
      style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p variants={fadeUp(0)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="text-maritime text-xs tracking-[0.3em] uppercase font-inter mb-2">
        Capabilities
      </motion.p>
      <motion.h2 variants={fadeUp(0.08)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-12">
        Skills & <span className="gradient-text">Proficiency</span>
      </motion.h2>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {/* ── Skill bars — spans 2 cols × 2 rows ── */}
        <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <TiltCard className="p-7 h-full">
            <div className="flex items-center gap-2 mb-6">
              <Code2 size={15} className="text-maritime" />
              <p className="font-grotesk font-semibold text-offwhite text-sm">Technical Proficiency</p>
            </div>
            <div className="space-y-5">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs font-inter mb-1.5">
                    <span className="text-muted">{s.name}</span>
                    <span className="font-mono-code" style={{ color: s.color }}>{s.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }}
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

        {/* ── Core competency cards ── */}
        {competencies.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div key={i} variants={fadeUp(0.2 + i * 0.06)} initial="hidden" animate={inView ? "show" : "hidden"}>
              <TiltCard className="p-5 flex flex-col items-center justify-center text-center gap-3 aspect-square">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${c.accent}15`, border: `1px solid ${c.accent}30` }}>
                  <Icon size={18} style={{ color: c.accent }} />
                </div>
                <p className="text-offwhite text-xs font-inter font-medium leading-snug">{c.label}</p>
              </TiltCard>
            </motion.div>
          );
        })}

        {/* ── Quote card ── */}
        <motion.div variants={fadeUp(0.35)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="md:col-span-3 lg:col-span-2">
          <TiltCard className="p-7 h-full flex flex-col justify-between gap-4">
            <Quote size={20} className="text-maritime/40" />
            <p className="text-offwhite font-inter text-sm leading-relaxed italic">
              &ldquo;I don&apos;t just write code — I write code that works, and then I prove it.
              Quality isn&apos;t a phase; it&apos;s the whole process.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #0ea5e9, #22c55e)" }} />
              <span className="text-muted text-xs font-inter">Jhon Lloyd Samson</span>
            </div>
          </TiltCard>
        </motion.div>

        {/* ── Tags card ── */}
        <motion.div variants={fadeUp(0.4)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="md:col-span-3 lg:col-span-4">
          <TiltCard className="p-7">
            <p className="font-grotesk font-semibold text-offwhite text-sm mb-4">Core Competencies</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Quality Assurance", "Test Automation", "Cypress", "Manual Testing",
                "Data Migration Validation", "Test Case Design", "Role-Based Testing",
                "GitHub", "VS Code", "Passbolt", "QA Documentation", "Sprint Testing",
                "Problem-Solving", "Team Collaboration", "Attention to Detail",
              ].map((tag) => (
                <span key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-inter border border-maritime/15 text-muted hover:border-maritime/50 hover:text-maritime transition-all duration-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
