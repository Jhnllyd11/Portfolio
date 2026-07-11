"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Globe, Smartphone, Database, TestTube2, Wrench, Zap } from "lucide-react";

type Skill = { name: string; glow: string; dot: string };
type Category = {
  label: string;
  icon: React.ElementType;
  accent: string;
  desc: string;
  skills: Skill[];
  featured?: boolean;
};

const categories: Category[] = [
  {
    label: "Backend",
    icon: Server,
    accent: "#ff2d20",
    desc: "Server-side logic & APIs",
    skills: [
      { name: "PHP",     glow: "skill-glow-php",     dot: "#777bb4" },
      { name: "Laravel", glow: "skill-glow-laravel",  dot: "#ff2d20" },
      { name: "Python",  glow: "skill-glow-python",   dot: "#3776ab" },
    ],
  },
  {
    label: "Frontend",
    icon: Globe,
    accent: "#0ea5e9",
    desc: "UI/UX & web interfaces",
    skills: [
      { name: "HTML / CSS / JS", glow: "skill-glow-default",  dot: "#f7df1e" },
      { name: "TypeScript",      glow: "skill-glow-ts",        dot: "#3178c6" },
      { name: "React",           glow: "skill-glow-react",     dot: "#61dafb" },
      { name: "Next.js",         glow: "skill-glow-next",      dot: "#ffffff" },
      { name: "Tailwind CSS",    glow: "skill-glow-tailwind",  dot: "#06b6d4" },
      { name: "Bootstrap",       glow: "skill-glow-default",   dot: "#7952b3" },
    ],
  },
  {
    label: "Mobile",
    icon: Smartphone,
    accent: "#54b6f6",
    desc: "Cross-platform apps",
    skills: [
      { name: "Flutter", glow: "skill-glow-flutter", dot: "#54b6f6" },
      { name: "Dart",    glow: "skill-glow-dart",    dot: "#00b4ab" },
    ],
  },
  {
    label: "Database",
    icon: Database,
    accent: "#336791",
    desc: "Data storage & design",
    skills: [
      { name: "PostgreSQL", glow: "skill-glow-postgres", dot: "#336791" },
      { name: "MySQL",      glow: "skill-glow-mysql",    dot: "#00758f" },
    ],
  },
  {
    label: "QA & Testing",
    icon: TestTube2,
    accent: "#69db7c",
    desc: "Quality assurance & automation",
    featured: true,
    skills: [
      { name: "Cypress",           glow: "skill-glow-cypress", dot: "#69db7c" },
      { name: "Manual Testing",    glow: "skill-glow-cypress", dot: "#22c55e" },
      { name: "Automated Testing", glow: "skill-glow-cypress", dot: "#4ade80" },
      { name: "Test Case Design",  glow: "skill-glow-cypress", dot: "#86efac" },
      { name: "Data Migration",    glow: "skill-glow-cypress", dot: "#bbf7d0" },
    ],
  },
  {
    label: "Tools",
    icon: Wrench,
    accent: "#f05032",
    desc: "Dev environment & workflow",
    skills: [
      { name: "Git",     glow: "skill-glow-git",     dot: "#f05032" },
      { name: "VS Code", glow: "skill-glow-default",  dot: "#007acc" },
      { name: "Passbolt",glow: "skill-glow-default",  dot: "#cf2a27" },
    ],
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="section-padding max-w-6xl mx-auto">
      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-maritime text-xs tracking-[0.3em] uppercase font-inter mb-2">
        Arsenal
      </motion.p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-grotesk font-bold text-4xl md:text-5xl">
          Tech <span className="gradient-text-nautical">Stack</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted text-sm font-inter max-w-xs">
          Technologies I use to build, test, and ship products.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={container} initial="hidden" animate={inView ? "show" : "hidden"}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.label}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`glass glass-hover rounded-2xl p-6 flex flex-col gap-5 group ${cat.featured ? "lg:col-span-2" : ""}`}
              style={{ borderColor: `${cat.accent}12` }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${cat.accent}15`, border: `1px solid ${cat.accent}30` }}>
                    <Icon size={17} style={{ color: cat.accent }} />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-sm text-offwhite">{cat.label}</p>
                    <p className="text-muted text-[11px] font-inter">{cat.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full"
                  style={{ background: `${cat.accent}10`, color: cat.accent, border: `1px solid ${cat.accent}20` }}>
                  {cat.skills.length} tools
                </span>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: `linear-gradient(90deg, ${cat.accent}30, transparent)` }} />

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className={`skill-tag px-3 py-1.5 rounded-full text-xs font-inter border border-white/8 text-muted flex items-center gap-1.5 ${s.glow}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
                    {s.name}
                  </span>
                ))}
              </div>

              {/* Featured badge */}
              {cat.featured && (
                <div className="flex items-center gap-1.5 text-[11px] font-inter mt-auto pt-1"
                  style={{ color: cat.accent }}>
                  <Zap size={11} />
                  <span>Primary specialization — 486h professional OJT</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
