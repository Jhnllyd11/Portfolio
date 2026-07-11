"use client";

import { useRef, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { clsx } from "clsx";

const skills = [
  { name: "Cypress Automation", level: 85, color: "#00f3ff" },
  { name: "Manual & Role-Based Testing", level: 90, color: "#bd00ff" },
  { name: "Next.js / React", level: 78, color: "#00f3ff" },
  { name: "PHP / Laravel", level: 75, color: "#bd00ff" },
  { name: "MySQL / Database Design", level: 80, color: "#00f3ff" },
  { name: "GitHub / Version Control", level: 85, color: "#bd00ff" },
  { name: "Video Editing", level: 80, color: "#00f3ff" },
  { name: "QA Documentation", level: 88, color: "#bd00ff" },
];

const stats = [
  { value: "486h", label: "OJT Hours" },
  { value: "4+", label: "Years Dev" },
  { value: "3+", label: "Certs" },
  { value: "2", label: "Languages" },
];

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={clsx("glass glass-hover rounded-2xl transition-transform duration-200 ease-out", className)}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export default function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-cyan text-xs tracking-[0.3em] uppercase font-inter mb-2"
      >
        Capabilities
      </motion.p>
      <motion.h2
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-12"
      >
        Skills & <span className="gradient-text">Stack</span>
      </motion.h2>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Skills card — spans 2 cols */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="md:col-span-2"
        >
          <TiltCard className="p-7 h-full">
            <p className="font-grotesk font-semibold text-offwhite mb-6">Technical Skills</p>
            <div className="space-y-4">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs font-inter mb-1">
                    <span className="text-muted">{s.name}</span>
                    <span style={{ color: s.color }}>{s.level}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${s.color}, #bd00ff)` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${s.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </motion.div>

        {/* Stats column */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-1 gap-4"
        >
          {stats.map((s, i) => (
            <TiltCard key={i} className="p-6 flex flex-col items-center justify-center text-center">
              <p className="font-grotesk font-bold text-3xl gradient-text">{s.value}</p>
              <p className="text-muted text-xs font-inter mt-1">{s.label}</p>
            </TiltCard>
          ))}
        </motion.div>

        {/* Languages card */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="md:col-span-3"
        >
          <TiltCard className="p-7">
            <p className="font-grotesk font-semibold text-offwhite mb-4">Core Competencies</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Quality Assurance", "Test Automation", "Cypress", "Manual Testing",
                "Data Migration", "Test Case Design", "GitHub", "VS Code",
                "Passbolt", "QA Documentation", "Problem-Solving", "Team Collaboration",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-inter border border-cyan/20 text-muted hover:border-cyan/60 hover:text-cyan transition-all"
                >
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
