"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Mail, Phone, Briefcase } from "lucide-react";

const STATS = [
  { v: "4+",     label: "Years of Development",  color: "#569CD6" },
  { v: "486h",   label: "QA OJT Hours",           color: "#4EC9B0" },
  { v: "3+",     label: "Certifications",         color: "#C586C0" },
  { v: "2-in-1", label: "Full-Stack & Mobile",    color: "#CE9178" },
];

const TIMELINE = [
  {
    role: "Quality Assurance Trainee (OJT)",
    company: "Wela Online Corporation — DCMU",
    location: "Cagayan de Oro City",
    period: "Feb 2026 – May 2026",
    color: "#4EC9B0", tag: "QA",
    bullets: [
      "Manual & role-based testing across Sprint Cycle, Product Backlog, Livro Time Tracker, and Intern Timesheet.",
      "Built and maintained Cypress automation scripts for login, Sprint creation, and Product Backlog creation.",
      "Created test cases, checklists, eLibrary docs, and meeting minutes; presented V11–V15 Data Migration tool.",
      "Conducted data migration checks, staging validation, Role Permission Manager review, and Passbolt setup.",
    ],
  },
  {
    role: "Web Developer — Capstone",
    company: "Davao del Norte State College",
    location: "Panabo City",
    period: "2024 – 2026",
    color: "#569CD6", tag: "Dev",
    bullets: [
      "Built the Maritime Licensing System end-to-end for the City Agriculture Office – Fisheries Development Center.",
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
        About Me
      </motion.h2>

      {/* Bio + Stats */}
      <div className="grid lg:grid-cols-5 gap-5 mb-14">
        {/* Bio card — IDE window frame, plain text inside */}
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
          <div style={{ padding: "20px 24px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#A0A0A0", lineHeight: 1.8, marginBottom: 16 }}>
              I&apos;m a <span style={{ color: "#C8C8C8", fontWeight: 600 }}>Full-Stack Developer & QA Engineer</span> based
              in Davao del Norte, Philippines. With 4+ years of hands-on development experience and 486 hours of
              professional QA OJT at Wela Online Corporation, I bridge the gap between building robust systems and
              ensuring they work flawlessly.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#A0A0A0", lineHeight: 1.8, marginBottom: 20 }}>
              My capstone — <span style={{ color: "#4EC9B0", fontWeight: 500 }}>Maritime Licensing System</span> for the
              City Agriculture Office — gave me real-world full-stack experience with PHP, custom MVC, and MySQL.
              My QA internship sharpened my skills in Cypress automation, test case design, and data migration validation.
            </p>
            <div style={{ height: 1, background: "#3E3E42", marginBottom: 16 }} />
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { icon: GraduationCap, text: "BS Information Systems · DNSC · 2022–2026", color: "#569CD6" },
                { icon: MapPin,        text: "Prk. 3, Brgy. Taba, Carmen, Davao del Norte", color: "#4EC9B0" },
                { icon: Phone,         text: "(+63) 994-375-3635", color: "#C586C0" },
                { icon: Mail,          text: "Jhonlloydsamson11@gmail.com", color: "#CE9178", href: "mailto:Jhonlloydsamson11@gmail.com" },
              ].map(({ icon: Icon, text, color, href }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={11} style={{ color, flexShrink: 0 }} />
                  {href
                    ? <a href={href} style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#858585", textDecoration: "none" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = color; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}>{text}</a>
                    : <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#858585" }}>{text}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={up(0.18)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="lg:col-span-2 grid grid-cols-2 gap-3">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="ide-window glass-hover"
              style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 6 }}
            >
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 26, fontWeight: 700, color: s.color }}>{s.v}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585", lineHeight: 1.4 }}>{s.label}</p>
              <div style={{ height: 2, width: "60%", background: "#2D2D30", borderRadius: 99, overflow: "hidden", marginTop: 4 }}>
                <motion.div
                  style={{ height: "100%", background: s.color, borderRadius: 99 }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <motion.div variants={up(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6,
            background: "rgba(86,156,214,0.1)", border: "1px solid rgba(86,156,214,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Briefcase size={14} style={{ color: "#569CD6" }} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#ECECEC" }}>Experience</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#858585" }}>Professional journey & roles</p>
          </div>
        </div>

        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {/* Animated vertical line */}
          <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 1, background: "#3E3E42" }}>
            <motion.div
              style={{ width: "100%", background: "linear-gradient(180deg,#569CD6,#4EC9B0,#3E3E42)", transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {TIMELINE.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, type: "spring", stiffness: 200, damping: 24 }}
                style={{ position: "relative" }}
              >
                {/* Node */}
                <div className="timeline-dot" style={{
                  position: "absolute", left: "-2.1rem", top: 16,
                  width: 20, height: 20, borderRadius: "50%",
                  background: `${t.color}15`, border: `2px solid ${t.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.color }} />
                </div>

                {/* Card — IDE frame, plain readable content */}
                <div className="ide-window glass-hover" style={{ borderColor: `${t.color}20` }}>
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
                  <div style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "#ECECEC" }}>{t.role}</p>
                      <span style={{
                        padding: "1px 8px", borderRadius: 3,
                        background: `${t.color}15`, border: `1px solid ${t.color}30`,
                        fontFamily: "'Fira Code', monospace", fontSize: 10, color: t.color,
                      }}>{t.tag}</span>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: t.color, marginBottom: 10 }}>
                      {t.company} · {t.location}
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {t.bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", gap: 8 }}>
                          <span style={{ color: t.color, flexShrink: 0, marginTop: 1 }}>▸</span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#A0A0A0", lineHeight: 1.6 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
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
