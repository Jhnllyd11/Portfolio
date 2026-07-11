"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Github, Linkedin, Facebook, Instagram,
  MapPin, Sparkles, FileText, X, Download, Eye, ArrowRight,
} from "lucide-react";

const socials = [
  { icon: Github,    href: "https://github.com/Jhnllyd11",                             label: "GitHub" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook,  href: "https://www.facebook.com/Jsamm3",                         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd",                       label: "Instagram" },
];

const ROLES = ["Full-Stack Developer", "QA Engineer", "Mobile Developer", "Laravel Developer"];
const CV = "/images/CV/CV Resume.png";

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22,1,0.36,1] as number[] } },
});

export default function HeroSection() {
  const [cvOpen,    setCvOpen]    = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  // Cycle roles: fade out → swap text → fade in
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setCvOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center"
        style={{ background: "transparent" }}
      >
        {/* subtle center glow — complements the canvas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(14,165,233,0.05) 0%, transparent 70%)" }}
        />

        <div className="section-wrap w-full pt-28">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

            {/* ── Left column ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              className="flex flex-col items-center gap-5 shrink-0"
            >
              {/* Avatar */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-[3px] rounded-full"
                  style={{ background: "conic-gradient(from 0deg, #0ea5e9, #22c55e, #0ea5e9)", opacity: 0.7 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-40 h-40 rounded-full overflow-hidden" style={{ border: "2px solid rgba(255,255,255,0.08)" }}>
                  <Image src="/images/profile/avatar.jpg" alt="Jhon Lloyd Samson" fill className="object-cover" priority />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{ background: "#0d1526", border: "1px solid rgba(34,197,94,0.3)" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cypress opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cypress" />
                  </span>
                  <span className="text-[10px] font-inter" style={{ color: "#22c55e" }}>Open to work</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs font-inter" style={{ color: "#64748b" }}>
                <MapPin size={11} style={{ color: "#0ea5e9" }} />
                Davao del Norte, PH
              </div>

              {/* CV thumbnail */}
              <motion.button
                onClick={() => setCvOpen(true)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-24 rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(14,165,233,0.2)", boxShadow: "0 4px 24px rgba(14,165,233,0.1)" }}
              >
                <Image src={CV} alt="CV" width={96} height={136} className="w-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(8,12,20,0.8)" }}>
                  <Eye size={14} style={{ color: "#0ea5e9" }} />
                  <span className="text-[9px] font-inter text-white">View CV</span>
                </div>
              </motion.button>

              {/* Socials */}
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                    style={{ color: "#64748b" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0ea5e9")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Right column ── */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div variants={up(0)} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-inter"
                style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", color: "#0ea5e9" }}>
                <Sparkles size={11} /> Software Developer & QA Engineer
              </motion.div>

              <motion.h1 variants={up(0.08)} initial="hidden" animate="show"
                className="font-grotesk font-bold leading-[1.08] mb-5"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)" }}>
                Building{" "}
                <span className="gradient-text-nautical">Robust</span>
                <br />
                Systems &amp;{" "}
                <span className="gradient-text">Automating</span>
                <br />
                Quality.
              </motion.h1>

              <motion.p variants={up(0.16)} initial="hidden" animate="show"
                className="font-inter text-base leading-relaxed mb-3 max-w-lg"
                style={{ color: "#94a3b8" }}>
                Hi, I&apos;m{" "}
                <span style={{ color: "#f1f5f9", fontWeight: 600 }}>Jhon Lloyd Samson</span> — a developer
                who builds full-stack systems by day and breaks them (on purpose) by night.
              </motion.p>

              {/* Role ticker */}
              <motion.div variants={up(0.22)} initial="hidden" animate="show"
                className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
                <span className="text-xs font-inter" style={{ color: "#64748b" }}>Currently:</span>
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: roleVisible ? 1 : 0, y: roleVisible ? 0 : -6 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-xs font-mono-code"
                  style={{ color: "#0ea5e9" }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={up(0.28)} initial="hidden" animate="show"
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <a href="#projects"
                  className="group flex items-center gap-2 px-6 py-3 rounded-full font-grotesk font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: "linear-gradient(135deg,#0ea5e9,#22c55e)", color: "#080c14", boxShadow: "0 0 0 0 rgba(14,165,233,0)" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(14,165,233,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(14,165,233,0)")}>
                  View Projects <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-grotesk font-semibold text-sm glass transition-all duration-300"
                  style={{ color: "#f1f5f9", border: "1px solid rgba(14,165,233,0.2)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.2)")}>
                  Contact Me
                </a>
                <button onClick={() => setCvOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-inter text-sm glass transition-all duration-300"
                  style={{ color: "#94a3b8", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>
                  <FileText size={13} /> View CV
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={up(0.34)} initial="hidden" animate="show"
                className="flex gap-8 justify-center lg:justify-start pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {[["4+","Years Dev"],["486h","QA OJT"],["3+","Certs"]].map(([v,l]) => (
                  <div key={l}>
                    <p className="font-grotesk font-bold text-xl gradient-text-nautical">{v}</p>
                    <p className="text-xs font-inter mt-0.5" style={{ color: "#64748b" }}>{l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0,8,0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="text-[9px] tracking-[0.3em] uppercase font-inter" style={{ color: "#475569" }}>Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(180deg,#0ea5e9,transparent)" }} />
        </motion.div>
      </section>

      {/* ── CV Modal ── */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 200, background: "rgba(8,12,20,0.92)", backdropFilter: "blur(16px)" }}
            onClick={() => setCvOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <FileText size={14} style={{ color: "#0ea5e9" }} />
                  <span className="font-grotesk font-semibold text-sm" style={{ color: "#f1f5f9" }}>
                    Jhon Lloyd Samson — CV Resume
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a href={CV} download="JhonLloyd_Samson_CV.png"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-inter"
                    style={{ background: "linear-gradient(135deg,#0ea5e9,#22c55e)", color: "#080c14" }}
                    onClick={e => e.stopPropagation()}>
                    <Download size={11} /> Download
                  </a>
                  <button onClick={() => setCvOpen(false)}
                    className="w-8 h-8 glass rounded-full flex items-center justify-center"
                    style={{ color: "#64748b" }}>
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(14,165,233,0.2)", boxShadow: "0 0 60px rgba(14,165,233,0.12)" }}>
                <Image src={CV} alt="CV Resume" width={800} height={1131} className="w-full h-auto" priority />
              </div>
              <p className="text-center text-xs font-inter mt-3" style={{ color: "#475569" }}>
                Press <kbd className="px-1.5 py-0.5 rounded glass text-[10px]">Esc</kbd> or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
