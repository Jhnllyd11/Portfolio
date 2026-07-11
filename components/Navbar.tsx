"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { FileText, X, Menu } from "lucide-react";

const links = [
  { label: "About",    href: "#about" },
  { label: "Stack",    href: "#stack" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certs",    href: "#certs" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [active, setActive]       = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section detection
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-white/5 py-3" : "py-5"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono-code font-bold text-obsidian"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #22c55e)" }}>
              JL
            </span>
            <span className="font-grotesk font-bold text-base gradient-text-nautical tracking-wider">
              JayEL
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "relative px-4 py-2 text-xs font-inter tracking-wide rounded-full transition-all duration-200",
                    isActive ? "text-offwhite" : "text-muted hover:text-offwhite"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Resume CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/images/CV/CV Resume.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-grotesk font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #22c55e)", color: "#0a0a0a" }}
            >
              <FileText size={12} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 glass rounded-full flex items-center justify-center text-muted hover:text-offwhite transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden glass border-t border-white/5 px-6 py-5 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "px-4 py-2.5 rounded-xl text-sm font-inter transition-all",
                  active === l.href.slice(1)
                    ? "text-maritime bg-maritime/10"
                    : "text-muted hover:text-offwhite hover:bg-white/5"
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/images/CV/CV Resume.png"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-grotesk font-semibold text-obsidian"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #22c55e)" }}
            >
              <FileText size={13} /> Resume
            </a>
          </motion.nav>
        )}
      </motion.header>
    </>
  );
}
