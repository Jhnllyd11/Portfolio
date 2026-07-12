"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

const NAV = [
  { label: "about.ts",    href: "#about",    dot: "#569CD6" },
  { label: "timeline.ts", href: "#about",    dot: "#4EC9B0" },
  { label: "stack.ts",    href: "#stack",    dot: "#C586C0" },
  { label: "projects.ts", href: "#projects", dot: "#CE9178" },
  { label: "certs.ts",    href: "#certs",    dot: "#B5CEA8" },
  { label: "contact.ts",  href: "#contact",  dot: "#DCDCAA" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["contact", "certs", "projects", "skills", "stack", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60, pointerEvents: "none" }}>
        <motion.div style={{ height: "100%", scaleX, transformOrigin: "left", background: "linear-gradient(90deg,#569CD6,#4EC9B0)" }} />
      </div>

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(30,30,30,0.95)" : "rgba(30,30,30,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #3E3E42",
          transition: "background 0.3s",
        }}
      >
        {/* Tab bar */}
        <div style={{ display: "flex", alignItems: "stretch", height: 40, overflowX: "auto" }} className="ide-scroll">
          {/* Logo tab */}
          <a href="#" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "0 16px", borderRight: "1px solid #3E3E42",
            fontFamily: "'Fira Code', monospace", fontSize: 12,
            color: "#D4D4D4", textDecoration: "none", flexShrink: 0,
          }}>
            <span style={{
              width: 20, height: 20, borderRadius: 4,
              background: "linear-gradient(135deg,#569CD6,#4EC9B0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, fontWeight: 700, color: "#1E1E1E",
            }}>JL</span>
            <span style={{ color: "#9CDCFE" }}>jhon-lloyd</span>
            <span style={{ color: "#808080" }}>/</span>
            <span style={{ color: "#CE9178" }}>portfolio</span>
          </a>

          {/* Nav tabs — desktop */}
          <nav className="hidden md:flex" style={{ alignItems: "stretch" }}>
            {NAV.map(({ label, href, dot }) => {
              const id = href.slice(1);
              const isActive = active === id || (id === "about" && (active === "about" || active === ""));
              return (
                <a key={label} href={href}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "0 14px", height: "100%",
                    fontFamily: "'Fira Code', monospace", fontSize: 11,
                    color: isActive ? "#D4D4D4" : "#858585",
                    borderRight: "1px solid #3E3E42",
                    borderTop: isActive ? "1px solid #569CD6" : "1px solid transparent",
                    background: isActive ? "#1E1E1E" : "transparent",
                    textDecoration: "none", flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#2A2D2E"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Resume + mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", borderLeft: "1px solid #3E3E42" }}>
            <a href="/images/CV/CV Resume.png" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex"
              style={{
                alignItems: "center", gap: 6, padding: "4px 12px",
                background: "rgba(86,156,214,0.1)", border: "1px solid rgba(86,156,214,0.3)",
                borderRadius: 4, fontFamily: "'Fira Code', monospace", fontSize: 11,
                color: "#569CD6", textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.1)"; }}
            >
              <FileText size={11} /> resume.pdf
            </a>
            <button
              className="md:hidden"
              style={{ background: "none", border: "none", color: "#858585", padding: 4 }}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: "#252526", borderTop: "1px solid #3E3E42", padding: "8px 0" }}
          >
            {NAV.map(({ label, href, dot }) => (
              <a key={label} href={href} onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", fontFamily: "'Fira Code', monospace",
                  fontSize: 12, color: "#858585", textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4D4D4"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot }} />
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
