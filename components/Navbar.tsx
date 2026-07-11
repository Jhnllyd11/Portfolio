"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

const NAV = [
  { label: "About",    href: "#about" },
  { label: "Stack",    href: "#stack" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certs",    href: "#certs" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      for (const { href } of [...NAV].reverse()) {
        const el = document.getElementById(href.slice(1));
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(href.slice(1)); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Scroll progress bar — single instance */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60, pointerEvents: "none" }}>
        <motion.div
          style={{
            height: "100%",
            scaleX,
            transformOrigin: "left",
            background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
          }}
        />
      </div>

      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(2,4,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          padding: scrolled ? "0.7rem 0" : "1.2rem 0",
          transition: "background 0.35s, padding 0.35s, border-color 0.35s",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono-code font-bold"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#22c55e)", color: "#020408" }}
            >
              JL
            </span>
            <span className="font-grotesk font-bold text-base gradient-text-nautical tracking-wide">JayEL</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <a
                  key={href} href={href}
                  className="relative px-4 py-2 text-xs font-inter rounded-full transition-all duration-200"
                  style={{ color: isActive ? "#f1f5f9" : "#64748b" }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}
          </nav>

          {/* Resume CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/images/CV/CV Resume.png" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-grotesk font-semibold transition-all duration-200"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#22c55e)", color: "#020408" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(14,165,233,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <FileText size={11} /> Resume
            </a>
            <button
              className="md:hidden w-9 h-9 glass rounded-full flex items-center justify-center"
              style={{ color: "#64748b" }}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-6 py-4 flex flex-col gap-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(2,4,8,0.96)" }}
          >
            {NAV.map(({ label, href }) => (
              <a
                key={href} href={href} onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-inter transition-all"
                style={{
                  color: active === href.slice(1) ? "#0ea5e9" : "#64748b",
                  background: active === href.slice(1) ? "rgba(14,165,233,0.08)" : "transparent",
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="/images/CV/CV Resume.png" target="_blank" rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-grotesk font-semibold"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#22c55e)", color: "#020408" }}
            >
              <FileText size={13} /> Resume
            </a>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
