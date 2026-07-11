"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Mail, Phone, Briefcase, Clock, Award, Layers } from "lucide-react";

const stats = [
  { value: "4+",    label: "Years Dev",          icon: Clock,       accent: "#0ea5e9" },
  { value: "486h",  label: "QA OJT",             icon: Briefcase,   accent: "#22c55e" },
  { value: "3+",    label: "Certifications",      icon: Award,       accent: "#00f3ff" },
  { value: "2-in-1",label: "Full-Stack & Mobile", icon: Layers,      accent: "#bd00ff" },
];

const timeline = [
  {
    role: "Quality Assurance Trainee (OJT)",
    company: "Wela Online Corporation — DCMU",
    location: "Cagayan de Oro City",
    period: "Feb 2026 – May 2026",
    accent: "#22c55e",
    tag: "QA",
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
    accent: "#0ea5e9",
    tag: "Dev",
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
    accent: "#bd00ff",
    tag: "VA",
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
    accent: "#94a3b8",
    tag: "Tech",
    bullets: [
      "Assembled and configured computer units; encoded inventory and transaction records.",
      "Assisted customers with hardware troubleshooting and repair documentation.",
    ],
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-padding max-w-6xl mx-auto">
      {/* Header */}
      <motion.p variants={fadeUp(0)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="text-maritime text-xs tracking-[0.3em] uppercase font-inter mb-2">
        Who I Am
      </motion.p>
      <motion.h2 variants={fadeUp(0.08)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-12">
        About <span className="gradient-text-nautical">Me</span>
      </motion.h2>

      {/* Bio + Stats */}
      <div className="grid lg:grid-cols-5 gap-6 mb-16">
        {/* Bio card */}
        <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="lg:col-span-3 glass glass-hover rounded-2xl p-8 flex flex-col gap-5">
          <div>
            <p className="text-offwhite font-inter text-sm leading-[1.9] mb-4">
              I&apos;m a{" "}
              <span className="text-maritime font-semibold">Full-Stack Developer & QA Engineer</span>{" "}
              based in Davao del Norte, Philippines. With 4+ years of hands-on development experience
              and 486 hours of professional QA OJT at Wela Online Corporation, I bridge the gap between
              building robust systems and ensuring they work flawlessly.
            </p>
            <p className="text-muted font-inter text-sm leading-[1.9]">
              My capstone —{" "}
              <span className="text-cypress font-medium">Maritime Licensing System</span>{" "}
              for the City Agriculture Office — gave me real-world full-stack experience with Laravel,
              PHP, and MySQL. My QA internship sharpened my skills in Cypress automation, test case
              design, and data migration validation.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          <div className="grid sm:grid-cols-2 gap-3 text-xs font-inter text-muted">
            {[
              { icon: GraduationCap, text: "BS Information Systems · DNSC · 2022–2026" },
              { icon: MapPin,        text: "Prk. 3, Brgy. Taba, Carmen, Davao del Norte" },
              { icon: Phone,         text: "(+63) 994-375-3635" },
              { icon: Mail,          text: "Jhonlloydsamson11@gmail.com", href: "mailto:Jhonlloydsamson11@gmail.com" },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} className="flex items-start gap-2.5">
                <Icon size={12} className="text-maritime shrink-0 mt-0.5" />
                {href
                  ? <a href={href} className="hover:text-maritime transition-colors break-all">{text}</a>
                  : <span>{text}</span>
                }
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div variants={fadeUp(0.22)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, y: -3 }}
                transition={{ duration: 0.2 }}
                className="glass glass-hover rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3"
                style={{ borderColor: `${s.accent}18` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}25` }}>
                  <Icon size={16} style={{ color: s.accent }} />
                </div>
                <div>
                  <p className="font-grotesk font-bold text-2xl"
                    style={{ color: s.accent, textShadow: `0 0 20px ${s.accent}50` }}>
                    {s.value}
                  </p>
                  <p className="text-muted text-[11px] font-inter leading-snug mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mb-16" />

      {/* Experience Timeline */}
      <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}>
            <Briefcase size={14} className="text-maritime" />
          </div>
          <div>
            <p className="font-grotesk font-semibold text-offwhite text-sm">Experience Timeline</p>
            <p className="text-muted text-xs font-inter">Professional journey & roles</p>
          </div>
        </div>

        <div className="relative pl-6">
          {/* Vertical connector */}
          <div className="absolute left-0 top-4 bottom-4 w-px"
            style={{ background: "linear-gradient(180deg, #0ea5e9, #22c55e, rgba(148,163,184,0.2), transparent)" }} />

          <div className="space-y-6">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Node */}
                <div
                  className="absolute -left-[1.6rem] top-4 w-7 h-7 rounded-full flex items-center justify-center timeline-node"
                  style={{
                    background: `${t.accent}15`,
                    border: `2px solid ${t.accent}`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
                </div>

                <div className="glass glass-hover rounded-xl p-5 ml-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <p className="font-inter font-semibold text-offwhite text-sm">{t.role}</p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-medium"
                        style={{ background: `${t.accent}15`, color: t.accent, border: `1px solid ${t.accent}30` }}>
                        {t.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted shrink-0 font-inter">{t.period}</span>
                  </div>
                  <p className="text-xs mb-3 font-inter" style={{ color: t.accent }}>
                    {t.company} · {t.location}
                  </p>
                  <ul className="space-y-1.5">
                    {t.bullets.map((b, j) => (
                      <li key={j} className="text-muted text-xs font-inter leading-relaxed flex gap-2">
                        <span style={{ color: t.accent }} className="shrink-0 mt-0.5 text-[10px]">▸</span>
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
