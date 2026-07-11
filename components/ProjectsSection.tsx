"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github, CheckCircle2, Layers } from "lucide-react";

const projects = [
  {
    index: "01",
    title: "Maritime Licensing System",
    subtitle: "City Agriculture Office — Panabo City",
    description:
      "A full-stack web-based system for fisheries and maritime licensing workflows. Handles license applications, renewals, and record management for the City Agriculture Office – Fisheries Development Center.",
    tech: ["PHP", "Laravel", "MySQL", "Bootstrap", "JavaScript"],
    highlights: [
      "End-to-end full-stack development",
      "Real-world stakeholder collaboration",
      "Database design & core module architecture",
      "QA-tested prior to deployment",
    ],
    images: [
      "/images/projects/maritime-1.png",
      "/images/projects/maritime-2.png",
      "/images/projects/maritime-3.png",
      "/images/projects/maritime-4.png",
      "/images/projects/maritime-5.png",
      "/images/projects/maritime-6.png",
      "/images/projects/maritime-7.png",
      "/images/projects/maritime-8.png",
    ],
    github: "https://github.com/Jhnllyd11",
    live: null,
    period: "2024 – 2026",
    accent: "#0ea5e9",
    type: "Full-Stack Web App",
  },
  {
    index: "02",
    title: "Cypress QA Automation Suite",
    subtitle: "Wela Online Corporation — DCMU",
    description:
      "A comprehensive Cypress end-to-end test automation suite built during OJT. Covers login flows, Sprint Cycle creation, Product Backlog management, and role-based validation across multiple user types.",
    tech: ["Cypress", "JavaScript", "GitHub", "VS Code"],
    highlights: [
      "E2E automation for login, Sprint & Backlog creation",
      "Role-based validation (PO, PM, Dev, QA roles)",
      "Scripts maintained across system version changes",
      "Integrated with GitHub for version control",
    ],
    images: [],
    github: "https://github.com/Jhnllyd11",
    live: null,
    period: "Feb 2026 – May 2026",
    accent: "#22c55e",
    type: "QA Automation",
  },
];

function ImageCarousel({ images, accent }: { images: string[]; accent: string }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return (
    <div className="w-full aspect-video rounded-xl flex flex-col items-center justify-center gap-3"
      style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
      <Layers size={32} style={{ color: accent, opacity: 0.4 }} />
      <p className="text-muted text-xs font-inter">Private repository</p>
    </div>
  );

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden group"
      style={{ background: "#0f172a" }}>
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }} className="absolute inset-0">
          <Image src={images[idx]} alt={`Screenshot ${idx + 1}`} fill className="object-cover" />
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent pointer-events-none" />

      <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
        <ChevronLeft size={13} />
      </button>
      <button onClick={() => setIdx((i) => (i + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
        <ChevronRight size={13} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/30"}`} />
        ))}
      </div>

      <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[10px] font-mono-code text-muted">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p variants={fadeUp(0)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="text-maritime text-xs tracking-[0.3em] uppercase font-inter mb-2">
        Work
      </motion.p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <motion.h2 variants={fadeUp(0.08)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="font-grotesk font-bold text-4xl md:text-5xl">
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p variants={fadeUp(0.12)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="text-muted text-sm font-inter">
          {projects.length} projects shipped
        </motion.p>
      </div>

      <div className="space-y-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.15 + i * 0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="glass glass-hover rounded-2xl overflow-hidden"
            style={{ borderColor: `${p.accent}15` }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image / visual */}
              <div className="p-6 flex flex-col gap-4">
                <ImageCarousel images={p.images} accent={p.accent} />
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-mono-code border transition-all duration-200 hover:-translate-y-0.5"
                      style={{ borderColor: `${p.accent}25`, color: p.accent, background: `${p.accent}08` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-7 flex flex-col justify-between border-l border-white/5">
                <div>
                  {/* Index + type */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-code text-4xl font-bold opacity-10 text-offwhite">{p.index}</span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-inter"
                      style={{ background: `${p.accent}12`, color: p.accent, border: `1px solid ${p.accent}25` }}>
                      {p.type}
                    </span>
                  </div>

                  <span className="text-[11px] text-muted font-inter">{p.period}</span>
                  <h3 className="font-grotesk font-bold text-xl text-offwhite mt-1 mb-1">{p.title}</h3>
                  <p className="text-sm font-inter mb-3" style={{ color: p.accent }}>{p.subtitle}</p>
                  <p className="text-muted text-xs font-inter leading-relaxed mb-5">{p.description}</p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {p.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs font-inter text-muted">
                        <CheckCircle2 size={12} className="shrink-0 mt-0.5" style={{ color: p.accent }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 glass rounded-full text-xs font-inter text-muted hover:text-offwhite hover:border-white/20 transition-all">
                    <Github size={12} /> GitHub
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-inter transition-all hover:opacity-90"
                      style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30`, color: p.accent }}>
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
