"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FileText, Menu, X, Folder, Search, GitBranch, Puzzle } from "lucide-react";

const NAV = [
  { label: "about.ts",    href: "#about",    dot: "#569CD6", id: "about"    },
  { label: "projects.ts", href: "#projects", dot: "#CE9178", id: "projects" },
  { label: "stack.ts",    href: "#stack",    dot: "#C586C0", id: "stack"    },
  { label: "skills.ts",   href: "#skills",   dot: "#4EC9B0", id: "skills"   },
  { label: "certs.ts",    href: "#certs",    dot: "#B5CEA8", id: "certs"    },
  { label: "contact.ts",  href: "#contact",  dot: "#DCDCAA", id: "contact"  },
];

const ACTIVITY_ICONS = [
  { icon: Folder,    title: "Explorer"       },
  { icon: Search,    title: "Search"         },
  { icon: GitBranch, title: "Source Control" },
  { icon: Puzzle,    title: "Extensions"     },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("about");
  const [clicking, setClicking] = useState<string | null>(null);

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
      {/* Scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60, pointerEvents: "none" }}>
        <motion.div style={{ height: "100%", scaleX, transformOrigin: "left", background: "linear-gradient(90deg,#569CD6,#4EC9B0)" }} />
      </div>

      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(30,30,30,0.97)" : "rgba(30,30,30,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #3E3E42",
          transition: "background 0.3s",
          display: "flex",
          alignItems: "stretch",
          height: 40,
        }}
      >
        {/* Logo */}
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

        {/* Nav tabs — horizontally scrollable on smaller screens */}
        <nav className="hidden md:flex" style={{ alignItems: "stretch", overflowX: "auto", scrollbarWidth: "none" }}>
          {NAV.map(({ label, href, dot, id }) => {
            const isActive = (clicking ?? active) === id;
            return (
              <a key={label} href={href}
                onClick={() => { setClicking(id); setTimeout(() => setClicking(null), 800); }}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "0 14px", height: "100%",
                  fontFamily: "'Fira Code', monospace", fontSize: 11,
                  color: isActive ? "#D4D4D4" : "#858585",
                  borderRight: "1px solid #3E3E42",
                  background: isActive ? "#1E1E1E" : "transparent",
                  textDecoration: "none", flexShrink: 0,
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#2A2D2E"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: 2,
                      background: "linear-gradient(90deg,#569CD6,#4EC9B0)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                {label}
              </a>
            );
          })}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Activity icons — horizontal, beside available badge */}
        <div className="hidden md:flex" style={{
          alignItems: "center", gap: 2,
          padding: "0 8px",
          borderLeft: "1px solid #3E3E42",
        }}>
          {ACTIVITY_ICONS.map(({ icon: Icon, title }) => (
            <div key={title} title={title}
              style={{
                width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 4, color: "#555",
                transition: "color 0.15s, background 0.15s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#D4D4D4";
                (e.currentTarget as HTMLElement).style.background = "#2A2D2E";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#555";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon size={13} />
            </div>
          ))}
        </div>

        {/* Available for work */}
        <div className="hidden md:flex" style={{
          alignItems: "center", gap: 6,
          padding: "0 14px",
          borderLeft: "1px solid #3E3E42",
          borderRight: "1px solid #3E3E42",
        }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#28C840", boxShadow: "0 0 6px #28C840" }}
          />
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#28C840", whiteSpace: "nowrap" }}>
            available for work
          </span>
        </div>

        {/* Resume + mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px" }}>
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
      </motion.header>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{
            position: "fixed", top: 40, left: 0, right: 0, zIndex: 49,
            background: "#252526", borderBottom: "1px solid #3E3E42", padding: "8px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px 4px", borderBottom: "1px solid #3E3E42", marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28C840", boxShadow: "0 0 5px #28C840" }} />
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#28C840" }}>available for work</span>
          </div>
          {NAV.map(({ label, href, dot }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 20px", fontFamily: "'Fira Code', monospace",
                fontSize: 12, color: "#858585", textDecoration: "none", transition: "color 0.15s",
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
    </>
  );
}
