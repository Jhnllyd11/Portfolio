"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Facebook, Instagram, MapPin, FileText, X, Download, Eye, ArrowRight } from "lucide-react";

const ROLES = ["Full-Stack Developer", "QA Engineer", "Laravel Developer", "Cypress Automation"];
const CV = "/images/CV/CV Resume.png";

const socials = [
  { icon: Github,    href: "https://github.com/Jhnllyd11",                             label: "GitHub" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook,  href: "https://www.facebook.com/Jsamm3",                         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd",                       label: "Instagram" },
];

function SyntaxName() {
  return (
    <div style={{ fontFamily: "'Fira Code', monospace", lineHeight: 1.15 }}>
      <div style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", fontWeight: 600 }}>
        <span style={{ color: "#C586C0" }}>const </span>
        <span style={{ color: "#9CDCFE" }}>developer</span>
        <span style={{ color: "#808080" }}> = </span>
        <span style={{ color: "#808080" }}>{"{"}</span>
      </div>
      <div style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)", fontWeight: 600, paddingLeft: "clamp(1rem, 3vw, 2rem)" }}>
        <span style={{ color: "#9CDCFE" }}>name</span>
        <span style={{ color: "#808080" }}>: </span>
        <span style={{ color: "#CE9178" }}>&quot;Jhon Lloyd Samson&quot;</span>
        <span style={{ color: "#808080" }}>,</span>
      </div>
      <div style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)", fontWeight: 400, paddingLeft: "clamp(1rem, 3vw, 2rem)" }}>
        <span style={{ color: "#9CDCFE" }}>location</span>
        <span style={{ color: "#808080" }}>: </span>
        <span style={{ color: "#CE9178" }}>&quot;Davao del Norte, PH&quot;</span>
        <span style={{ color: "#808080" }}>,</span>
      </div>
      <div style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)", fontWeight: 400, paddingLeft: "clamp(1rem, 3vw, 2rem)" }}>
        <span style={{ color: "#9CDCFE" }}>status</span>
        <span style={{ color: "#808080" }}>: </span>
        <span style={{ color: "#CE9178" }}>&quot;</span>
        <span style={{ color: "#22C55E" }}>open to work</span>
        <span style={{ color: "#CE9178" }}>&quot;</span>
        <span style={{ color: "#808080" }}>,</span>
      </div>
      <div style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", fontWeight: 600 }}>
        <span style={{ color: "#808080" }}>{"}"}</span>
        <span style={{ color: "#808080" }}>;</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [cvOpen, setCvOpen] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIdx(i => (i + 1) % ROLES.length); setRoleVisible(true); }, 350);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  const closeCV = useCallback(() => setCvOpen(false), []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeCV(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [closeCV]);

  return (
    <>
      <section className="relative min-h-screen flex items-center" style={{ background: "transparent" }}>
        <div className="section-wrap w-full pt-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left: Avatar + socials */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5 shrink-0"
            >
              {/* IDE window wrapping avatar */}
              <div className="ide-window" style={{ width: 200 }}>
                <div className="ide-titlebar">
                  <div className="flex items-center gap-1.5 px-3">
                    <div className="browser-dot" style={{ background: "#FF5F57" }} />
                    <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                    <div className="browser-dot" style={{ background: "#28C840" }} />
                  </div>
                  <div className="ide-tab active" style={{ fontSize: 10 }}>
                    <div className="ide-tab-dot" style={{ background: "#CE9178" }} />
                    avatar.jpg
                  </div>
                </div>
                <div style={{ padding: 12, background: "#1E1E1E" }}>
                  <div className="relative" style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "1" }}>
                    <Image src="/images/profile/avatar.jpg" alt="Jhon Lloyd Samson" fill className="object-cover" priority />
                  </div>
                  {/* Status */}
                  <div style={{
                    marginTop: 10, display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#6A9955",
                  }}>
                    <span style={{ color: "#808080" }}>// </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: "#22C55E", opacity: 0.75 }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#22C55E" }} />
                    </span>
                    open to work
                  </div>
                  {/* Location */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#569CD6" }}>
                    <MapPin size={9} />
                    Davao del Norte, PH
                  </div>
                </div>
              </div>

              {/* CV thumbnail */}
              <motion.button
                onClick={() => setCvOpen(true)}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-lg overflow-hidden"
                style={{ width: 80, border: "1px solid #3E3E42" }}
              >
                <Image src={CV} alt="CV" width={80} height={113} className="w-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(30,30,30,0.85)" }}>
                  <Eye size={12} style={{ color: "#569CD6" }} />
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#D4D4D4" }}>view cv</span>
                </div>
              </motion.button>

              {/* Socials */}
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{
                      width: 32, height: 32, borderRadius: 4,
                      border: "1px solid #3E3E42", background: "#252526",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#858585", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#569CD6"; (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Syntax hero text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Comment header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#6A9955", marginBottom: 16 }}
              >
                {"/**"}
                <br />
                {" * @author Jhon Lloyd Samson"}
                <br />
                {" * @role "}
                <motion.span
                  key={roleIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: roleVisible ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: "#4EC9B0" }}
                >
                  {ROLES[roleIdx]}
                </motion.span>
                <br />
                {" * @location Davao del Norte, Philippines"}
                <br />
                {" */"}
              </motion.div>

              {/* Main syntax name */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-left"
              >
                <SyntaxName />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#858585", marginTop: 20, maxWidth: 480, lineHeight: 1.7 }}
              >
                Building full-stack systems by day, breaking them on purpose by night.
                {" "}<span style={{ color: "#D4D4D4" }}>486h QA OJT</span> at Wela Online Corporation.
                Capstone: <span style={{ color: "#4EC9B0" }}>Maritime Licensing System</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24, justifyContent: "center" }}
                className="lg:justify-start"
              >
                <a href="#projects"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 4,
                    background: "rgba(86,156,214,0.15)", border: "1px solid rgba(86,156,214,0.4)",
                    fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#569CD6",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.25)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.15)"; }}
                >
                  viewProjects() <ArrowRight size={12} />
                </a>
                <a href="#contact"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 4,
                    background: "#252526", border: "1px solid #3E3E42",
                    fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#858585",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4D4D4"; (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}
                >
                  contact.send()
                </a>
                <button onClick={() => setCvOpen(true)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 4,
                    background: "#252526", border: "1px solid #3E3E42",
                    fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#858585",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4D4D4"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}
                >
                  <FileText size={12} /> resume.open()
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                style={{ display: "flex", gap: 24, marginTop: 28, paddingTop: 20, borderTop: "1px solid #3E3E42", justifyContent: "center" }}
                className="lg:justify-start"
              >
                {[["4+", "years_dev"], ["486h", "qa_ojt"], ["3+", "certs"]].map(([v, l]) => (
                  <div key={l}>
                    <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 20, fontWeight: 600, color: "#569CD6" }}>{v}</p>
                    <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#6A9955", marginTop: 2 }}>// {l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#3E3E42", letterSpacing: "0.3em" }}>scroll</span>
          <div style={{ width: 1, height: 28, background: "linear-gradient(180deg,#569CD6,transparent)" }} />
        </motion.div>
      </section>

      {/* CV Modal */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 200, background: "rgba(13,13,13,0.92)", backdropFilter: "blur(16px)" }}
            onClick={closeCV}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-xl ide-window"
              onClick={e => e.stopPropagation()}
            >
              <div className="ide-titlebar">
                <div className="flex items-center gap-1.5 px-3">
                  <div className="browser-dot" style={{ background: "#FF5F57" }} />
                  <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                  <div className="browser-dot" style={{ background: "#28C840" }} />
                </div>
                <div className="ide-tab active">
                  <div className="ide-tab-dot" style={{ background: "#CE9178" }} />
                  CV_Resume.pdf
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 12 }}>
                  <a href={CV} download="JhonLloyd_Samson_CV.png"
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "3px 10px", borderRadius: 3,
                      background: "rgba(86,156,214,0.15)", border: "1px solid rgba(86,156,214,0.3)",
                      fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#569CD6",
                      textDecoration: "none",
                    }}
                    onClick={e => e.stopPropagation()}>
                    <Download size={10} /> download
                  </a>
                  <button onClick={closeCV}
                    style={{ background: "none", border: "none", color: "#858585", padding: 4 }}>
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div style={{ padding: 16, background: "#1E1E1E" }}>
                <Image src={CV} alt="CV Resume" width={800} height={1131} className="w-full h-auto rounded" priority />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
