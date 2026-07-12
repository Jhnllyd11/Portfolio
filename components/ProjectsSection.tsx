"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Layers, CheckCircle2, X, ShieldCheck, FlaskConical } from "lucide-react";

type Badge = { label: string; icon: string; color: string };

const projects: Array<{
  index: string; title: string; subtitle: string; url: string; description: string;
  tech: string[]; badge: Badge; highlights: string[]; images: string[];
  github: string; live: string | null; period: string; color: string; type: string; file: string;
}> = [
  {
    index: "01",
    title: "Maritime Licensing System",
    subtitle: "City Agriculture Office — Panabo City",
    url: "localhost:8000/maritime-licensing",
    description:
      "A full-stack web-based system for fisheries and maritime licensing workflows. Handles license applications, renewals, and record management for the City Agriculture Office – Fisheries Development Center.",
    tech: ["PHP", "Custom MVC", "MySQL", "Tailwind CSS", "HTML/CSS/JS", "PHPMailer"],
    badge: { label: "QA Audited", icon: "shield", color: "#22C55E" },
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
    color: "#569CD6",
    type: "Full-Stack Web App",
    file: "maritime_system.php",
  },
  {
    index: "02",
    title: "Cypress QA Automation Suite",
    subtitle: "Wela Online Corporation — DCMU",
    url: "localhost:3000/cypress/e2e",
    description:
      "A comprehensive Cypress end-to-end test automation suite built during OJT. Covers login flows, Sprint Cycle creation, Product Backlog management, and role-based validation across multiple user types.",
    tech: ["Cypress", "JavaScript", "GitHub", "VS Code"],
    badge: { label: "Test Coverage: High", icon: "flask", color: "#F59E0B" },
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
    color: "#4EC9B0",
    type: "QA Automation",
    file: "cypress_suite.cy.ts",
  },
];

function ImageCarousel({ images, color, onOpen }: { images: string[]; color: string; onOpen?: (i: number) => void }) {
  const [idx, setIdx] = useState(0);

  if (!images.length) {
    return (
      <div style={{
        width: "100%", aspectRatio: "16/9", borderRadius: 6,
        background: "#1E1E1E", border: `1px solid ${color}20`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        <Layers size={28} style={{ color, opacity: 0.3 }} />
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#3E3E42" }}>
          // private repository
        </span>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 6, overflow: "hidden", background: "#0D0D0D", cursor: onOpen ? "zoom-in" : "default" }}
      className="group"
      onClick={() => onOpen?.(idx)}>
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }} style={{ position: "absolute", inset: 0 }}>
          <Image src={images[idx]} alt={`Screenshot ${idx + 1}`} fill className="object-cover" />
        </motion.div>
      </AnimatePresence>

      <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }}
        style={{
          position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
          width: 28, height: 28, borderRadius: 4, background: "rgba(30,30,30,0.85)",
          border: "1px solid #3E3E42", color: "#D4D4D4", display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transition: "opacity 0.2s",
        }}
        className="group-hover:opacity-100">
        <ChevronLeft size={12} />
      </button>
      <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
        style={{
          position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
          width: 28, height: 28, borderRadius: 4, background: "rgba(30,30,30,0.85)",
          border: "1px solid #3E3E42", color: "#D4D4D4", display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, transition: "opacity 0.2s",
        }}
        className="group-hover:opacity-100">
        <ChevronRight size={12} />
      </button>

      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
        {images.map((_, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
            style={{
              height: 3, borderRadius: 99, background: i === idx ? "#D4D4D4" : "rgba(255,255,255,0.25)",
              width: i === idx ? 16 : 6, transition: "all 0.25s", border: "none",
            }} />
        ))}
      </div>

      <div style={{
        position: "absolute", top: 8, right: 8,
        background: "rgba(30,30,30,0.85)", border: "1px solid #3E3E42",
        borderRadius: 3, padding: "2px 8px",
        fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585",
      }}>
        {idx + 1}/{images.length}
      </div>
    </div>
  );
}

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<{ images: string[]; idx: number } | null>(null);

  return (
    <section id="projects" ref={ref} className="section-wrap">
      <p className="section-label">Work</p>
      <motion.h2 variants={fadeUp(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        <span style={{ color: "#C586C0" }}>const </span>
        <span style={{ color: "#9CDCFE" }}>projects</span>
        <span style={{ color: "#808080" }}>: </span>
        <span style={{ color: "#4EC9B0" }}>Project</span>
        <span style={{ color: "#808080" }}>[] = [...]</span>
      </motion.h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {projects.map((p, i) => (
            <motion.div key={i}
            variants={fadeUp(0.1 + i * 0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {/* Browser window */}
            <motion.div
              className="browser-window glass-hover"
              style={{ borderColor: `${p.color}20` }}
              whileHover={{ y: -4, rotateX: 1, rotateY: -0.5 }}
              transition={{ duration: 0.25 }}
            >
              {/* Browser bar */}
              <div className="browser-bar">
                <div className="browser-dot" style={{ background: "#FF5F57" }} />
                <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                <div className="browser-dot" style={{ background: "#28C840" }} />
                <div className="browser-url">
                  <span style={{ color: "#4EC9B0" }}>http://</span>
                  <span style={{ color: "#D4D4D4" }}>{p.url}</span>
                </div>
                <span style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 10,
                  color: p.color, background: `${p.color}12`,
                  border: `1px solid ${p.color}25`, borderRadius: 3,
                  padding: "2px 8px", flexShrink: 0,
                }}>
                  {p.type}
                </span>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 0 }}>
                {/* Left: image + tech */}
                <div style={{ padding: 20, borderRight: "1px solid #3E3E42" }}>
                  <ImageCarousel images={p.images} color={p.color} onOpen={i => p.images.length && setLightbox({ images: p.images, idx: i })} />

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                    {p.tech.map(t => (
                      <span key={t} className="skill-tag"
                        style={{ borderColor: `${p.color}25`, color: p.color, background: `${p.color}08` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: info */}
                <div style={{ padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    {/* Index + period */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 32, fontWeight: 700, color: "#3E3E42" }}>
                        {p.index}
                      </span>
                      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585" }}>{p.period}</span>
                    </div>

                    {/* Title as code */}
                    <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#6A9955", marginBottom: 4 }}>
                      {"// "}{p.subtitle}
                    </div>
                    <h3 style={{ fontFamily: "'Fira Code', monospace", fontSize: 16, fontWeight: 600, color: "#D4D4D4", marginBottom: 4 }}>
                      <span style={{ color: "#DCDCAA" }}>{p.title}</span>
                    </h3>
                    <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: p.color, marginBottom: 12 }}>
                      {p.file}
                    </div>

                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#858585", lineHeight: 1.7, marginBottom: 14 }}>
                      {p.description}
                    </p>

                    {/* Highlights */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                      {p.highlights.map((h, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                          <CheckCircle2 size={11} style={{ color: p.color, flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585" }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* QA / Coverage badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                    <span className="qa-badge" style={p.badge.icon === "flask" ? { background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.35)", color: "#F59E0B" } : {}}>
                      {p.badge.icon === "shield"
                        ? <ShieldCheck size={9} />
                        : <FlaskConical size={9} />}
                      {p.badge.label}
                    </span>
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        padding: "6px 14px", borderRadius: 4,
                        background: "#2D2D30", border: "1px solid #3E3E42",
                        fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#858585",
                        textDecoration: "none", transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4D4D4"; (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}
                    >
                      <Github size={11} /> View Code
                    </a>
                    {p.live
                      ? (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "6px 14px", borderRadius: 4,
                            background: `${p.color}12`, border: `1px solid ${p.color}30`,
                            fontFamily: "'Fira Code', monospace", fontSize: 11, color: p.color,
                            textDecoration: "none", transition: "all 0.2s",
                          }}>
                          <ExternalLink size={11} /> Live Demo
                        </a>
                      ) : (
                        <span style={{
                          display: "flex", alignItems: "center", gap: 5,
                          padding: "6px 14px", borderRadius: 4,
                          background: "#1E1E1E", border: "1px solid #2D2D30",
                          fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#3E3E42",
                        }}>
                          <ExternalLink size={11} /> Private
                        </span>
                      )
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(13,13,13,0.95)", backdropFilter: "blur(16px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ position: "relative", maxWidth: 900, width: "100%", maxHeight: "85vh" }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                <Image src={lightbox.images[lightbox.idx]} alt={`Screenshot ${lightbox.idx + 1}`} fill className="object-contain" />
              </div>
              {/* Nav */}
              {lightbox.images.length > 1 && (
                <>
                  <button onClick={() => setLightbox(l => l && ({ ...l, idx: (l.idx - 1 + l.images.length) % l.images.length }))}
                    style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "#2D2D30", border: "1px solid #3E3E42", borderRadius: 6, width: 36, height: 36, color: "#D4D4D4", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setLightbox(l => l && ({ ...l, idx: (l.idx + 1) % l.images.length }))}
                    style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "#2D2D30", border: "1px solid #3E3E42", borderRadius: 6, width: 36, height: 36, color: "#D4D4D4", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              <button onClick={() => setLightbox(null)}
                style={{ position: "absolute", top: -40, right: 0, background: "none", border: "none", color: "#858585", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Fira Code', monospace", fontSize: 11 }}>
                <X size={14} /> close
              </button>
              <div style={{ textAlign: "center", marginTop: 10, fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#858585" }}>
                {lightbox.idx + 1} / {lightbox.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
