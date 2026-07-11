"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Mail, Phone, Briefcase, Clock, Award, Layers } from "lucide-react";

const STATS = [
  { v: "4+",     l: "Years Dev",          icon: Clock,     accent: "#0ea5e9" },
  { v: "486h",   l: "QA OJT",             icon: Briefcase, accent: "#22c55e" },
  { v: "3+",     l: "Certifications",     icon: Award,     accent: "#00f3ff" },
  { v: "2-in-1", l: "Full-Stack & Mobile",icon: Layers,    accent: "#bd00ff" },
];

const TIMELINE = [
  {
    role: "Quality Assurance Trainee (OJT)",
    company: "Wela Online Corporation — DCMU",
    location: "Cagayan de Oro City",
    period: "Feb 2026 – May 2026",
    accent: "#22c55e", tag: "QA",
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
    accent: "#0ea5e9", tag: "Dev",
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
    accent: "#bd00ff", tag: "VA",
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
    accent: "#94a3b8", tag: "Tech",
    bullets: [
      "Assembled and configured computer units; encoded inventory and transaction records.",
      "Assisted customers with hardware troubleshooting and repair documentation.",
    ],
  },
];

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22,1,0.36,1] as number[] } },
});

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-wrap">
      <p className="section-label">Who I Am</p>
      <motion.h2 variants={up(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        About <span className="gradient-text-nautical">Me</span>
      </motion.h2>

      {/* Bio + Stats */}
      <div className="grid lg:grid-cols-5 gap-5 mb-14">
        <motion.div variants={up(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="lg:col-span-3 glass glass-hover rounded-2xl p-7 flex flex-col gap-5">
          <p className="font-inter text-sm leading-[1.85]" style={{ color: "#94a3b8" }}>
            I&apos;m a{" "}
            <span style={{ color: "#0ea5e9", fontWeight: 600 }}>Full-Stack Developer & QA Engineer</span>{" "}
            based in Davao del Norte, Philippines. With 4+ years of hands-on development experience and
            486 hours of professional QA OJT at Wela Online Corporation, I bridge the gap between building
            robust systems and ensuring they work flawlessly.
          </p>
          <p className="font-inter text-sm leading-[1.85]" style={{ color: "#64748b" }}>
            My capstone —{" "}
            <span style={{ color: "#22c55e", fontWeight: 500 }}>Maritime Licensing System</span>{" "}
            for the City Agriculture Office — gave me real-world full-stack experience with Laravel, PHP,
            and MySQL. My QA internship sharpened my skills in Cypress automation, test case design, and
            data migration validation.
          </p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
          <div className="grid sm:grid-cols-2 gap-2.5">
            {[
              { icon: GraduationCap, text: "BS Information Systems · DNSC · 2022–2026" },
              { icon: MapPin,        text: "Prk. 3, Brgy. Taba, Carmen, Davao del Norte" },
              { icon: Phone,         text: "(+63) 994-375-3635" },
              { icon: Mail,          text: "Jhonlloydsamson11@gmail.com", href: "mailto:Jhonlloydsamson11@gmail.com" },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} className="flex items-start gap-2 text-xs font-inter" style={{ color: "#64748b" }}>
                <Icon size={11} style={{ color: "#0ea5e9", marginTop: 2, flexShrink: 0 }} />
                {href
                  ? <a href={href} style={{ color: "#64748b" }} onMouseEnter={e => (e.currentTarget.style.color = "#0ea5e9")} onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}>{text}</a>
                  : <span>{text}</span>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={up(0.18)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="lg:col-span-2 grid grid-cols-2 gap-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} whileHover={{ scale: 1.04, y: -3 }} transition={{ duration: 0.2 }}
                className="glass glass-hover rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}>
                  <Icon size={16} style={{ color: s.accent }} />
                </div>
                <div>
                  <p className="font-grotesk font-bold text-2xl" style={{ color: s.accent }}>{s.v}</p>
                  <p className="text-[11px] font-inter mt-0.5" style={{ color: "#64748b" }}>{s.l}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div variants={up(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}>
            <Briefcase size={14} style={{ color: "#0ea5e9" }} />
          </div>
          <div>
            <p className="font-grotesk font-semibold text-sm" style={{ color: "#f1f5f9" }}>Experience Timeline</p>
            <p className="text-xs font-inter" style={{ color: "#64748b" }}>Professional journey & roles</p>
          </div>
        </div>

        <div className="relative" style={{ paddingLeft: "2rem" }}>
          {/* Line */}
          <div className="absolute left-0 top-3 bottom-3 w-px"
            style={{ background: "linear-gradient(180deg,#0ea5e9,#22c55e,rgba(148,163,184,0.15),transparent)" }} />

          <div className="flex flex-col gap-5">
            {TIMELINE.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22,1,0.36,1] }}
                className="relative"
              >
                {/* Node */}
                <div className="absolute timeline-dot"
                  style={{
                    left: "-2.35rem", top: "1rem",
                    width: 28, height: 28, borderRadius: "50%",
                    background: `${t.accent}15`,
                    border: `2px solid ${t.accent}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent }} />
                </div>

                <div className="glass glass-hover rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-inter font-semibold text-sm" style={{ color: "#f1f5f9" }}>{t.role}</p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code"
                        style={{ background: `${t.accent}15`, color: t.accent, border: `1px solid ${t.accent}25` }}>
                        {t.tag}
                      </span>
                    </div>
                    <span className="text-[11px] font-inter shrink-0" style={{ color: "#64748b" }}>{t.period}</span>
                  </div>
                  <p className="text-xs font-inter mb-3" style={{ color: t.accent }}>
                    {t.company} · {t.location}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {t.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-xs font-inter leading-relaxed" style={{ color: "#64748b" }}>
                        <span style={{ color: t.accent, flexShrink: 0, marginTop: 1 }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
