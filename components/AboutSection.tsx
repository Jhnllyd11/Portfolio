"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, MapPin, Mail, Phone } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const experience = [
  {
    role: "Quality Assurance Trainee (OJT)",
    company: "Wela Online Corporation — DCMU",
    period: "Feb 2026 – May 2026",
    desc: "Manual & automated testing with Cypress, test case design, data migration validation, and QA documentation.",
  },
  {
    role: "Web Developer — Capstone",
    company: "Davao del Norte State College",
    period: "2024 – 2026",
    desc: "Built the Maritime Licensing System end-to-end: frontend, backend, and database for the City Agriculture Office, Panabo City.",
  },
  {
    role: "Video Editor / Virtual Assistant",
    company: "Servesway Co.",
    period: "Sep 2024 – Jan 2025",
    desc: "Edited client video content and coordinated remotely to meet branding and delivery requirements.",
  },
  {
    role: "Computer Assembler & Data Encoder",
    company: "Denven Computer Parts and Repairs",
    period: "Jan 2021 – Jun 2021",
    desc: "Assembled computer units, encoded inventory records, and assisted with hardware troubleshooting.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-cyan text-xs tracking-[0.3em] uppercase font-inter mb-2"
      >
        Who I Am
      </motion.p>
      <motion.h2
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-12"
      >
        About <span className="gradient-text">Me</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Bio */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="glass glass-hover rounded-2xl p-7 space-y-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="text-cyan" size={20} />
            <span className="font-grotesk font-semibold text-offwhite">Education</span>
          </div>
          <div>
            <p className="text-offwhite font-inter font-medium">BS Information Systems</p>
            <p className="text-muted text-sm">Davao del Norte State College · 2022–2026</p>
            <p className="text-muted text-sm mt-1">
              Capstone: Maritime Licensing System for the City Agriculture Office, Panabo City
            </p>
          </div>

          <hr className="border-white/5" />

          <div className="space-y-2 text-sm text-muted font-inter">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-cyan shrink-0" />
              <span>Prk. 3, Brgy. Taba, Carmen, Davao del Norte</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-cyan shrink-0" />
              <span>(+63) 994-375-3635</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-cyan shrink-0" />
              <a href="mailto:Jhonlloydsamson11@gmail.com" className="hover:text-cyan transition-colors">
                Jhonlloydsamson11@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Experience timeline */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-violet" size={20} />
            <span className="font-grotesk font-semibold text-offwhite">Experience</span>
          </div>
          {experience.map((e, i) => (
            <div key={i} className="glass glass-hover rounded-xl p-5 border-l-2 border-cyan/20 hover:border-cyan/60 transition-all">
              <div className="flex justify-between items-start gap-2 mb-1">
                <p className="font-inter font-medium text-offwhite text-sm">{e.role}</p>
                <span className="text-xs text-muted shrink-0">{e.period}</span>
              </div>
              <p className="text-cyan text-xs mb-2">{e.company}</p>
              <p className="text-muted text-xs leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
