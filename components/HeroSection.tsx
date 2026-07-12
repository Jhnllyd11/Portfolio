"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Facebook, Instagram, MapPin, FileText, X, Download, Eye, ArrowRight, Terminal } from "lucide-react";

const ROLES = ["Full-Stack Developer", "QA Engineer", "Laravel Developer", "Cypress Automation", "Next.js Developer"];
const CV = "/images/CV/CV Resume.png";

const TERMINAL_LINES = [
  { prompt: "user@portfolio:~$", cmd: " whoami", delay: 0 },
  { output: "jhon-lloyd-samson", color: "#4EC9B0", delay: 600 },
  { prompt: "user@portfolio:~$", cmd: " cat skills.txt", delay: 1200 },
  { output: "→ PHP · Laravel · Next.js · TypeScript", color: "#9CDCFE", delay: 1800 },
  { output: "→ Cypress · Manual Testing · Test Design", color: "#22C55E", delay: 2400 },
  { output: "→ MySQL · Flutter · Git · VS Code", color: "#CE9178", delay: 3000 },
  { prompt: "user@portfolio:~$", cmd: " echo $STATUS", delay: 3600 },
  { output: "✓ open_to_work=true | qa_certified=true", color: "#22C55E", delay: 4200 },
  { prompt: "user@portfolio:~$", cmd: " _", delay: 4800, cursor: true },
];

const socials = [
  { icon: Github,    href: "https://github.com/Jhnllyd11",                             label: "GitHub" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook,  href: "https://www.facebook.com/Jsamm3",                         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd",                       label: "Instagram" },
];

function SyntaxName() {
  return (
    <div style={{ fontFamily: "'Fira Code', monospace", lineHeight: 1.2 }}>
      <div style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)", fontWeight: 600 }}>
        <span style={{ color: "#C586C0" }}>const </span>
        <span style={{ color: "#9CDCFE" }}>developer</span>
        <span style={{ color: "#808080" }}> = &#123;</span>
      </div>
      <div style={{ fontSize: "clamp(1.3rem, 3vw, 2.2rem)", fontWeight: 700, paddingLeft: "clamp(1rem, 3vw, 2rem)", color: "#ECECEC" }}>
        <span style={{ color: "#9CDCFE", fontWeight: 400, fontSize: "0.6em" }}>name</span>
        <span style={{ color: "#808080", fontWeight: 400, fontSize: "0.6em" }}>: </span>
        <span style={{ color: "#CE9178" }}>&quot;Jhon Lloyd Samson&quot;</span>
      </div>
      <div style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)", fontWeight: 400, paddingLeft: "clamp(1rem, 3vw, 2rem)", color: "#A0A0A0" }}>
        <span style={{ color: "#9CDCFE" }}>role</span>
        <span style={{ color: "#808080" }}>: </span>
        <span style={{ color: "#CE9178" }}>&quot;</span>
        <span style={{ color: "#569CD6" }}>I build</span>
        <span style={{ color: "#808080" }}> &amp; </span>
        <span style={{ color: "#22C55E" }}>automate</span>
        <span style={{ color: "#CE9178" }}>&quot;</span>
        <span style={{ color: "#808080" }}>,</span>
      </div>
      <div style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)", fontWeight: 400, paddingLeft: "clamp(1rem, 3vw, 2rem)" }}>
        <span style={{ color: "#9CDCFE" }}>status</span>
        <span style={{ color: "#808080" }}>: </span>
        <span style={{ color: "#CE9178" }}>&quot;</span>
        <span style={{ color: "#22C55E" }}>open to work</span>
        <span style={{ color: "#CE9178" }}>&quot;</span>
        <span style={{ color: "#808080" }}>,</span>
      </div>
      <div style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)", fontWeight: 600 }}>
        <span style={{ color: "#808080" }}>&#125;;</span>
      </div>
    </div>
  );
}

function TerminalTyping() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal" style={{ height: "100%", minHeight: 280 }}>
      <div className="terminal-bar">
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 8 }}>
          <Terminal size={10} style={{ color: "#858585" }} />
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585" }}>bash — portfolio</span>
        </div>
      </div>
      <div className="terminal-body" style={{ padding: "14px 18px" }}>
        {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 3, flexWrap: "wrap" }}
          >
            {"prompt" in line && (
              <>
                <span className="terminal-prompt" style={{ fontSize: 12 }}>{line.prompt}</span>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#D4D4D4" }}>{line.cmd}</span>
                {line.cursor && <span className="terminal-cursor" style={{ marginLeft: 2 }} />}
              </>
            )}
            {"output" in line && (
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: line.color, paddingLeft: 4 }}>
                {line.output}
              </span>
            )}
          </motion.div>
        ))}
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

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "5px 14px", borderRadius: 4, marginBottom: 28,
              background: "rgba(86,156,214,0.08)", border: "1px solid rgba(86,156,214,0.25)",
            }}
          >
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#858585" }}>Currently:</span>
            <motion.span
              key={roleIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: roleVisible ? 1 : 0, y: roleVisible ? 0 : -4 }}
              transition={{ duration: 0.25 }}
              style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#569CD6" }}
            >
              {ROLES[roleIdx]}
            </motion.span>
          </motion.div>

          {/* Split-screen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: Value prop + avatar + CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Syntax name */}
              <div style={{ marginBottom: 20 }}>
                <SyntaxName />
              </div>

              {/* Readable description */}
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#A0A0A0", marginBottom: 24, maxWidth: 460, lineHeight: 1.8 }}>
                Full-Stack Developer & QA Engineer based in Davao del Norte.{" "}
                <span style={{ color: "#C8C8C8" }}>486 hours of QA OJT</span> at Wela Online Corporation.
                Capstone: <span style={{ color: "#4EC9B0" }}>Maritime Licensing System</span>.
              </p>

              {/* Avatar + socials row */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                {/* Larger avatar with ring */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 10,
                    padding: 2,
                    background: "linear-gradient(135deg,#569CD6,#4EC9B0)",
                  }}>
                    <div style={{ borderRadius: 8, overflow: "hidden", width: "100%", height: "100%", position: "relative" }}>
                      <Image src="/images/profile/avatar.jpg" alt="Jhon Lloyd Samson" fill className="object-cover" priority />
                    </div>
                  </div>
                  {/* Online dot */}
                  <span style={{
                    position: "absolute", bottom: 4, right: 4,
                    width: 12, height: 12, borderRadius: "50%",
                    background: "#22C55E", border: "2px solid #1E1E1E",
                    boxShadow: "0 0 6px #22C55E",
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#22C55E", fontWeight: 600 }}>Open to work</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                    <MapPin size={9} style={{ color: "#569CD6" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#858585" }}>Davao del Norte, PH</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        style={{
                          width: 28, height: 28, borderRadius: 4,
                          border: "1px solid #3E3E42", background: "#252526",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#858585", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#569CD6"; (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}
                      >
                        <Icon size={11} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                <a href="#projects"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "10px 22px", borderRadius: 6,
                    background: "#569CD6", border: "1px solid #569CD6",
                    fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#1E1E1E",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#4A8BC4"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#569CD6"; }}
                >
                  View Projects <ArrowRight size={13} />
                </a>
                <a href="#contact"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "10px 22px", borderRadius: 6,
                    background: "#252526", border: "1px solid #3E3E42",
                    fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#C8C8C8",
                    textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; (e.currentTarget as HTMLElement).style.color = "#ECECEC"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; (e.currentTarget as HTMLElement).style.color = "#C8C8C8"; }}
                >
                  Contact Me
                </a>
                <button onClick={() => setCvOpen(true)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "10px 22px", borderRadius: 6,
                    background: "transparent", border: "1px solid #3E3E42",
                    fontFamily: "Inter, sans-serif", fontSize: 13, color: "#858585",
                    transition: "all 0.2s", cursor: "pointer",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#C8C8C8"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}
                >
                  <FileText size={13} /> View Resume
                </button>
              </div>

              {/* CV thumbnail */}
              <motion.button
                onClick={() => setCvOpen(true)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-lg overflow-hidden"
                style={{
                  width: 80, border: "1px solid #3E3E42", display: "flex",
                  flexDirection: "column", alignItems: "stretch", background: "#252526",
                }}
              >
                <div style={{ padding: "4px 4px 0", background: "#2D2D30", display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF5F57" }} />
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FEBC2E" }} />
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#28C840" }} />
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 7, color: "#858585", marginLeft: 2 }}>cv.pdf</span>
                </div>
                <div style={{ position: "relative" }}>
                  <Image src={CV} alt="CV" width={80} height={113} className="w-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(30,30,30,0.85)" }}>
                    <Eye size={12} style={{ color: "#569CD6" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "#D4D4D4" }}>View CV</span>
                  </div>
                </div>
              </motion.button>
            </motion.div>

            {/* RIGHT: Terminal typing animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <TerminalTyping />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: "#555", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
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
                      padding: "4px 12px", borderRadius: 4,
                      background: "rgba(86,156,214,0.15)", border: "1px solid rgba(86,156,214,0.3)",
                      fontFamily: "Inter, sans-serif", fontSize: 11, color: "#569CD6",
                      textDecoration: "none",
                    }}
                    onClick={e => e.stopPropagation()}>
                    <Download size={10} /> Download
                  </a>
                  <button onClick={closeCV} style={{ background: "none", border: "none", color: "#858585", padding: 4, cursor: "pointer" }}>
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
