"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Mail, Phone } from "lucide-react";

const STATS = [
  { v: "4+",     key: "years_experience",  color: "#569CD6" },
  { v: "486h",   key: "qa_ojt_hours",      color: "#4EC9B0" },
  { v: "3+",     key: "certifications",    color: "#C586C0" },
  { v: "2-in-1", key: "fullstack_mobile",  color: "#CE9178" },
];

const TIMELINE = [
  {
    role: "Quality Assurance Trainee (OJT)",
    company: "Wela Online Corporation — DCMU",
    location: "Cagayan de Oro City",
    period: "Feb 2026 – May 2026",
    color: "#4EC9B0", tag: "QA",
    bullets: [
      "Manual & role-based testing: Sprint Cycle, Product Backlog, Livro Time Tracker, Intern Timesheet.",
      "Built Cypress automation scripts for login, Sprint creation, and Product Backlog creation.",
      "Created test cases, checklists, eLibrary docs; presented V11–V15 Data Migration tool.",
      "Conducted data migration checks, staging validation, Role Permission Manager review, Passbolt setup.",
    ],
  },
  {
    role: "Web Developer — Capstone",
    company: "Davao del Norte State College",
    location: "Panabo City",
    period: "2024 – 2026",
    color: "#569CD6", tag: "Dev",
    bullets: [
      "Built Maritime Licensing System end-to-end for the City Agriculture Office – Fisheries Development Center.",
      "Designed database structure and core modules for fisheries and maritime licensing workflows.",
      "Applied QA practices from OJT to test and debug features prior to deployment.",
    ],
  },
  {
    role: "Video Editor / Virtual Assistant",
    company: "Servesway Co.",
    location: "Remote",
    period: "Sep 2024 – Jan 2025",
    color: "#C586C0", tag: "VA",
    bullets: [
      "Edited client video content ensuring quality, consistency, and timely turnaround.",
      "Coordinated remotely to align outputs with client branding guidelines.",
    ],
  },
  {
    role: "Computer Assembler & Data Encoder",
    company: "Denven Computer Parts and Repairs",
    location: "Bankerohan, Davao City",
    period: "Jan 2021 – Jun 2021",
    color: "#858585", tag: "Tech",
    bullets: [
      "Assembled and configured computer units; encoded inventory and transaction records.",
      "Assisted customers with hardware troubleshooting and repair documentation.",
    ],
  },
];

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-wrap">
      <p className="section-label">Who I Am</p>
      <motion.h2 variants={up(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        <span style={{ color: "#C586C0" }}>const </span>
        <span style={{ color: "#DCDCAA" }}>about</span>
        <span style={{ color: "#808080" }}> = </span>
        <span style={{ color: "#4EC9B0" }}>Developer</span>
        <span style={{ color: "#808080" }}>()</span>
      </motion.h2>

      {/* Bio + Stats */}
      <div className="grid lg:grid-cols-5 gap-5 mb-14">
        {/* Bio */}
        <motion.div variants={up(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="lg:col-span-3 ide-window">
          <div className="ide-titlebar">
            <div className="flex items-center gap-1.5 px-3">
              <div className="browser-dot" style={{ background: "#FF5F57" }} />
              <div className="browser-dot" style={{ background: "#FEBC2E" }} />
              <div className="browser-dot" style={{ background: "#28C840" }} />
            </div>
            <div className="ide-tab active">
              <div className="ide-tab-dot" style={{ background: "#569CD6" }} />
              about.ts
            </div>
            <div className="ide-tab">
              <div className="ide-tab-dot" style={{ background: "#4EC9B0" }} />
              contact.ts
            </div>
          </div>
          <div className="ide-code-area">
            <div className="ide-line-numbers">
              {Array.from({ length: 14 }, (_, i) => <span key={i}>{i + 1}</span>)}
            </div>
            <div className="ide-body flex-1" style={{ fontSize: 12 }}>
              <div><span style={{ color: "#6A9955" }}>{"// Full-Stack Developer & QA Engineer"}</span></div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: "#C586C0" }}>const </span>
                <span style={{ color: "#9CDCFE" }}>bio</span>
                <span style={{ color: "#808080" }}> = </span>
                <span style={{ color: "#CE9178" }}>&quot;4+ years building robust systems,</span>
              </div>
              <div><span style={{ color: "#CE9178" }}>&nbsp;&nbsp;486h QA OJT at Wela Online Corporation.&quot;</span><span style={{ color: "#808080" }}>;</span></div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: "#C586C0" }}>const </span>
                <span style={{ color: "#9CDCFE" }}>education</span>
                <span style={{ color: "#808080" }}> = {"{"}</span>
              </div>
              <div>&nbsp;&nbsp;<span style={{ color: "#9CDCFE" }}>degree</span><span style={{ color: "#808080" }}>: </span><span style={{ color: "#CE9178" }}>&quot;BS Information Systems&quot;</span><span style={{ color: "#808080" }}>,</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#9CDCFE" }}>school</span><span style={{ color: "#808080" }}>: </span><span style={{ color: "#CE9178" }}>&quot;Davao del Norte State College&quot;</span><span style={{ color: "#808080" }}>,</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#9CDCFE" }}>period</span><span style={{ color: "#808080" }}>: </span><span style={{ color: "#CE9178" }}>&quot;2022 – 2026&quot;</span><span style={{ color: "#808080" }}>,</span></div>
              <div><span style={{ color: "#808080" }}>{"}"}</span><span style={{ color: "#808080" }}>;</span></div>
              <div style={{ marginTop: 8 }}>
                {[
                  { icon: GraduationCap, text: "BS Information Systems · DNSC · 2022–2026", color: "#569CD6" },
                  { icon: MapPin,        text: "Prk. 3, Brgy. Taba, Carmen, Davao del Norte", color: "#4EC9B0" },
                  { icon: Phone,         text: "(+63) 994-375-3635", color: "#C586C0" },
                  { icon: Mail,          text: "Jhonlloydsamson11@gmail.com", color: "#CE9178", href: "mailto:Jhonlloydsamson11@gmail.com" },
                ].map(({ icon: Icon, text, color, href }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Icon size={10} style={{ color, flexShrink: 0 }} />
                    {href
                      ? <a href={href} style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585", textDecoration: "none" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = color; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}>{text}</a>
                      : <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585" }}>{text}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats code window */}
        <motion.div variants={up(0.18)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="lg:col-span-2 ide-window">
          <div className="ide-titlebar">
            <div className="flex items-center gap-1.5 px-3">
              <div className="browser-dot" style={{ background: "#FF5F57" }} />
              <div className="browser-dot" style={{ background: "#FEBC2E" }} />
              <div className="browser-dot" style={{ background: "#28C840" }} />
            </div>
            <div className="ide-tab active">
              <div className="ide-tab-dot" style={{ background: "#4EC9B0" }} />
              stats.json
            </div>
          </div>
          <div className="ide-body" style={{ fontSize: 12 }}>
            <div style={{ color: "#808080" }}>{"{"}</div>
            {STATS.map((s, i) => (
              <motion.div key={s.key}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                style={{ paddingLeft: 16, marginBottom: 6 }}
              >
                <span style={{ color: "#9CDCFE" }}>&quot;{s.key}&quot;</span>
                <span style={{ color: "#808080" }}>: </span>
                <span style={{ color: s.color, fontWeight: 600, fontSize: 15 }}>&quot;{s.v}&quot;</span>
                {i < STATS.length - 1 && <span style={{ color: "#808080" }}>,</span>}
                {/* Compile bar animation */}
                <div style={{ height: 2, background: "#2D2D30", borderRadius: 99, marginTop: 4, overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", background: `linear-gradient(90deg,${s.color},${s.color}60)`, borderRadius: 99 }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
            <div style={{ color: "#808080" }}>{"}"}</div>
          </div>
        </motion.div>
      </div>

      {/* Timeline — The Vertical Log */}
      <motion.div variants={up(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#6A9955", marginBottom: 20 }}>
          {"// experience_log.ts — Professional Journey"}
        </div>

        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {/* Vertical line that draws itself */}
          <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 1, background: "#3E3E42" }}>
            <motion.div
              style={{ width: "100%", background: "linear-gradient(180deg,#569CD6,#4EC9B0,#3E3E42)", transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {TIMELINE.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, type: "spring", stiffness: 200, damping: 24 }}
                style={{ position: "relative" }}
              >
                {/* Node dot */}
                <div className="timeline-dot" style={{
                  position: "absolute", left: "-2.1rem", top: 14,
                  width: 20, height: 20, borderRadius: "50%",
                  background: `${t.color}15`, border: `2px solid ${t.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.color }} />
                </div>

                {/* Code block card */}
                <div className="ide-window glass-hover" style={{ borderColor: `${t.color}25` }}>
                  <div className="ide-titlebar">
                    <div className="flex items-center gap-1.5 px-3">
                      <div className="browser-dot" style={{ background: "#FF5F57" }} />
                      <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                      <div className="browser-dot" style={{ background: "#28C840" }} />
                    </div>
                    <div className="ide-tab active" style={{ borderTopColor: t.color }}>
                      <div className="ide-tab-dot" style={{ background: t.color }} />
                      {t.tag.toLowerCase()}_experience.ts
                    </div>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585", paddingRight: 12 }}>
                      {t.period}
                    </span>
                  </div>
                  <div className="ide-body" style={{ fontSize: 12 }}>
                    <div>
                      <span style={{ color: "#C586C0" }}>class </span>
                      <span style={{ color: "#DCDCAA" }}>{t.role.replace(/[^a-zA-Z]/g, "")}</span>
                      <span style={{ color: "#808080" }}> {"{"}</span>
                    </div>
                    <div style={{ paddingLeft: 16, marginTop: 4 }}>
                      <span style={{ color: "#6A9955" }}>{"// "}{t.company} · {t.location}</span>
                    </div>
                    <div style={{ paddingLeft: 16, marginTop: 6 }}>
                      {t.bullets.map((b, j) => (
                        <div key={j} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                          <span style={{ color: t.color, flexShrink: 0 }}>▸</span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585", lineHeight: 1.6 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ color: "#808080", marginTop: 4 }}>{"}"}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
