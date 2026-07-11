"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Globe, Smartphone, Database, TestTube2, Wrench, Zap } from "lucide-react";

const CATS = [
  {
    label: "Backend", icon: Server, accent: "#ff2d20", desc: "Server-side logic & APIs",
    skills: [
      { name: "PHP",     glow: "skill-glow-php",    dot: "#777bb4" },
      { name: "Laravel", glow: "skill-glow-laravel", dot: "#ff2d20" },
      { name: "Python",  glow: "skill-glow-python",  dot: "#3776ab" },
    ],
  },
  {
    label: "Frontend", icon: Globe, accent: "#0ea5e9", desc: "UI/UX & web interfaces",
    skills: [
      { name: "HTML/CSS/JS",  glow: "skill-glow-default",  dot: "#f7df1e" },
      { name: "TypeScript",   glow: "skill-glow-ts",        dot: "#3178c6" },
      { name: "React",        glow: "skill-glow-react",     dot: "#61dafb" },
      { name: "Next.js",      glow: "skill-glow-next",      dot: "#ffffff" },
      { name: "Tailwind CSS", glow: "skill-glow-tailwind",  dot: "#06b6d4" },
      { name: "Bootstrap",    glow: "skill-glow-default",   dot: "#7952b3" },
    ],
  },
  {
    label: "Mobile", icon: Smartphone, accent: "#54b6f6", desc: "Cross-platform apps",
    skills: [
      { name: "Flutter", glow: "skill-glow-flutter", dot: "#54b6f6" },
      { name: "Dart",    glow: "skill-glow-dart",    dot: "#00b4ab" },
    ],
  },
  {
    label: "Database", icon: Database, accent: "#336791", desc: "Data storage & design",
    skills: [
      { name: "PostgreSQL", glow: "skill-glow-postgres", dot: "#336791" },
      { name: "MySQL",      glow: "skill-glow-mysql",    dot: "#00758f" },
    ],
  },
  {
    label: "QA & Testing", icon: TestTube2, accent: "#22c55e", desc: "Quality assurance & automation",
    featured: true,
    skills: [
      { name: "Cypress",            glow: "skill-glow-cypress", dot: "#69db7c" },
      { name: "Manual Testing",     glow: "skill-glow-cypress", dot: "#22c55e" },
      { name: "Automated Testing",  glow: "skill-glow-cypress", dot: "#4ade80" },
      { name: "Test Case Design",   glow: "skill-glow-cypress", dot: "#86efac" },
      { name: "Data Migration",     glow: "skill-glow-cypress", dot: "#bbf7d0" },
    ],
  },
  {
    label: "Tools", icon: Wrench, accent: "#f05032", desc: "Dev environment & workflow",
    skills: [
      { name: "Git",      glow: "skill-glow-git",     dot: "#f05032" },
      { name: "VS Code",  glow: "skill-glow-default",  dot: "#007acc" },
      { name: "Passbolt", glow: "skill-glow-default",  dot: "#cf2a27" },
    ],
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.5, ease: [0.22,1,0.36,1] as number[] } },
};

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="section-wrap">
      <p className="section-label">Arsenal</p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }} className="section-title" style={{ marginBottom: 0 }}>
          Tech <span className="gradient-text-nautical">Stack</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-sm font-inter" style={{ color: "#64748b" }}>
          Technologies I use to build, test, and ship.
        </motion.p>
      </div>

      <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATS.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.label} variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`glass glass-hover rounded-2xl p-6 flex flex-col gap-4 group ${cat.featured ? "lg:col-span-2" : ""}`}
              style={{ borderColor: `${cat.accent}10` }}>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${cat.accent}12`, border: `1px solid ${cat.accent}25` }}>
                    <Icon size={16} style={{ color: cat.accent }} />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-sm" style={{ color: "#f1f5f9" }}>{cat.label}</p>
                    <p className="text-[11px] font-inter" style={{ color: "#64748b" }}>{cat.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full"
                  style={{ background: `${cat.accent}10`, color: cat.accent, border: `1px solid ${cat.accent}18` }}>
                  {cat.skills.length}
                </span>
              </div>

              <div style={{ height: 1, background: `linear-gradient(90deg,${cat.accent}25,transparent)` }} />

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(s => (
                  <span key={s.name} className={`skill-tag ${s.glow}`}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                    {s.name}
                  </span>
                ))}
              </div>

              {cat.featured && (
                <div className="flex items-center gap-1.5 text-[11px] font-inter mt-auto"
                  style={{ color: cat.accent }}>
                  <Zap size={10} /> Primary specialization — 486h professional OJT
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
