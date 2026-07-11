"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, ArrowDown, MapPin, Sparkles, FileText, X, Download, Eye } from "lucide-react";
import Image from "next/image";

const socials = [
  { icon: Github,    href: "https://github.com/Jhnllyd11",                             label: "GitHub" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook,  href: "https://www.facebook.com/Jsamm3",                         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd",                       label: "Instagram" },
];

const roles = ["Full-Stack Developer", "QA Engineer", "Mobile Developer", "Laravel Developer"];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as number[] } } };
const fadeIn  = { hidden: { opacity: 0 },         show: { opacity: 1,       transition: { duration: 0.6 } } };

const CV_IMAGE = "/images/CV/CV Resume.png";

export default function HeroSection() {
  const [cvOpen, setCvOpen] = useState(false);

  // Close CV modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setCvOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
        {/* Radial vignette — sits on top of ScrollBackground canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(10,10,10,0.7)_100%)] pointer-events-none" />

        {/* ── Content ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── Left: Avatar + status ── */}
            <motion.div variants={fadeIn} className="flex flex-col items-center gap-5 shrink-0">
              {/* Avatar with animated ring */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-3 rounded-full"
                  style={{ background: "conic-gradient(from 0deg, #0ea5e9, #22c55e, transparent, #0ea5e9)", opacity: 0.6 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative w-36 h-36 rounded-full overflow-hidden ring-2 ring-white/10 ring-offset-4 ring-offset-obsidian">
                  <Image src="/images/profile/avatar.jpg" alt="Jhon Lloyd Samson" fill className="object-cover" priority />
                </div>
                {/* Online badge */}
                <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 bg-obsidian border border-white/10 rounded-full px-2.5 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cypress opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cypress" />
                  </span>
                  <span className="text-[10px] font-inter text-cypress">Open to work</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-muted text-xs font-inter">
                <MapPin size={11} className="text-maritime" />
                <span>Davao del Norte, PH</span>
              </div>

              {/* CV preview card */}
              <motion.button
                onClick={() => setCvOpen(true)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-28 rounded-xl overflow-hidden border border-maritime/20 hover:border-maritime/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_24px_rgba(14,165,233,0.2)]"
              >
                <Image src={CV_IMAGE} alt="CV Resume" width={112} height={158} className="object-cover w-full" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-obsidian/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5">
                  <Eye size={16} className="text-maritime" />
                  <span className="text-[10px] font-inter text-offwhite">View CV</span>
                </div>
              </motion.button>

              {/* Social icons */}
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-muted hover:text-maritime hover:border-maritime/40 transition-all duration-200 hover:-translate-y-0.5">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Right: Text ── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
                <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-inter font-medium border"
                  style={{ background: "rgba(14,165,233,0.08)", borderColor: "rgba(14,165,233,0.25)", color: "#0ea5e9" }}>
                  <Sparkles size={11} />
                  Software Developer & QA Engineer
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp}
                className="font-grotesk font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-4">
                Building{" "}
                <span className="gradient-text-nautical">Robust</span>
                <br />
                Systems &amp;{" "}
                <span className="gradient-text">Automating</span>
                <br />
                Quality.
              </motion.h1>

              {/* Subhead */}
              <motion.p variants={fadeUp} className="text-muted font-inter text-base lg:text-lg max-w-xl mb-2 leading-relaxed">
                Hi, I&apos;m{" "}
                <span className="text-offwhite font-semibold">Jhon Lloyd Samson</span> — a developer who builds
                full-stack systems by day and breaks them (on purpose) by night.
              </motion.p>

              {/* Animated roles */}
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
                <span className="text-muted text-sm font-inter">I do:</span>
                <div className="overflow-hidden h-6">
                  <motion.div
                    animate={{ y: roles.map((_, i) => `-${i * 100}%`) }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                  >
                    {roles.map((r) => (
                      <div key={r} className="h-6 flex items-center">
                        <span className="text-sm font-mono-code font-medium text-maritime">{r}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href="#projects"
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-grotesk font-semibold text-sm text-obsidian transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.4)] hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #0ea5e9, #22c55e)" }}>
                  View Projects
                  <ArrowDown size={13} className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-maritime/25 text-offwhite font-grotesk font-semibold text-sm hover:border-maritime/60 hover:bg-maritime/5 transition-all duration-300">
                  Contact Me
                </a>
                {/* CV button */}
                <button
                  onClick={() => setCvOpen(true)}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-muted font-inter text-sm hover:text-offwhite hover:border-white/20 transition-all duration-300">
                  <FileText size={13} />
                  View CV
                </button>
              </motion.div>

              {/* Stats strip */}
              <motion.div variants={fadeUp}
                className="mt-10 pt-8 border-t border-white/5 grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
                {[
                  { v: "4+",   l: "Years Dev" },
                  { v: "486h", l: "QA OJT" },
                  { v: "3+",   l: "Certs" },
                ].map((s) => (
                  <div key={s.l} className="text-center lg:text-left">
                    <p className="font-grotesk font-bold text-xl gradient-text-nautical">{s.v}</p>
                    <p className="text-muted text-xs font-inter mt-0.5">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-inter">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-maritime/60 to-transparent" />
        </motion.div>
      </section>

      {/* ── CV Lightbox ── */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)" }}
            onClick={() => setCvOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.88,    opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-maritime" />
                  <span className="text-offwhite text-sm font-grotesk font-semibold">Jhon Lloyd Samson — CV Resume</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={CV_IMAGE}
                    download="JhonLloyd_Samson_CV.png"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-inter transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #0ea5e9, #22c55e)", color: "#0a0a0a" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={11} /> Download
                  </a>
                  <button
                    onClick={() => setCvOpen(false)}
                    className="w-8 h-8 glass rounded-full flex items-center justify-center text-muted hover:text-offwhite transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* CV image */}
              <div className="glass rounded-2xl overflow-hidden border border-maritime/20 shadow-[0_0_60px_rgba(14,165,233,0.15)]">
                <Image
                  src={CV_IMAGE}
                  alt="Jhon Lloyd Samson CV Resume"
                  width={800}
                  height={1131}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Footer hint */}
              <p className="text-center text-muted text-xs font-inter mt-3">
                Click outside or press <kbd className="px-1.5 py-0.5 glass rounded text-[10px]">Esc</kbd> to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
