"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, ArrowUp, Heart, GitBranch, Wifi, ChevronUp, ChevronDown, CheckCircle2, Clock } from "lucide-react";
import VsCodePet from "@/components/VsCodePet";

const SOCIALS = [
  { icon: Github,    href: "https://github.com/Jhnllyd11",                             label: "GitHub" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook,  href: "https://www.facebook.com/Jsamm3",                         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd",                       label: "Instagram" },
];

const LINKS = [
  { label: "about.ts",    href: "#about" },
  { label: "stack.ts",    href: "#stack" },
  { label: "projects.ts", href: "#projects" },
  { label: "certs.ts",    href: "#certs" },
  { label: "contact.ts",  href: "#contact" },
];

const QA_TESTS = [
  { label: "Login Flow — PO / PM / Dev / QA roles",       ms: 312  },
  { label: "Sprint Cycle Creation",                        ms: 487  },
  { label: "Product Backlog Management",                   ms: 203  },
  { label: "Role-Based Access Validation",                 ms: 391  },
  { label: "Data Migration Integrity Check",               ms: 558  },
  { label: "Intern Timesheet Submission",                  ms: 174  },
];

function QAPanel() {
  const [open, setOpen] = useState(false);
  const [ran, setRan]   = useState(false);
  const [done, setDone] = useState(0);

  function runTests() {
    setRan(true);
    setDone(0);
    QA_TESTS.forEach((_, i) => {
      setTimeout(() => setDone(i + 1), 400 + i * 520);
    });
  }

  return (
    <div style={{ borderTop: "1px solid #3E3E42" }}>
      {/* Panel header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 8,
          padding: "6px 16px", background: "#2D2D30", border: "none",
          borderBottom: open ? "1px solid #3E3E42" : "none",
          fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#858585",
          cursor: "pointer", transition: "background 0.15s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#333337"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#2D2D30"; }}
      >
        {open ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
        <span style={{ color: "#22C55E" }}>TERMINAL</span>
        <span style={{ color: "#3E3E42" }}>|</span>
        <span>TEST RUNNER</span>
        <span style={{ color: "#3E3E42" }}>|</span>
        <span>OUTPUT</span>
        <div style={{ flex: 1 }} />
        {ran && (
          <span style={{ color: done === QA_TESTS.length ? "#22C55E" : "#F59E0B", fontSize: 10 }}>
            {done}/{QA_TESTS.length} passed
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="qa-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden", background: "#1E1E1E" }}
          >
            <div style={{ padding: "12px 16px" }}>
              {/* Run button */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <button
                  onClick={runTests}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "4px 14px", borderRadius: 4,
                    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.35)",
                    fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#22C55E",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.1)"; }}
                >
                  ▶ Run All Tests
                </button>
                {ran && done < QA_TESTS.length && (
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#F59E0B" }}>
                    Running...
                  </span>
                )}
                {ran && done === QA_TESTS.length && (
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#22C55E" }}>
                    ✓ All tests passed
                  </span>
                )}
              </div>

              {/* Test list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {QA_TESTS.map((t, i) => {
                  const passed = ran && done > i;
                  const running = ran && done === i;
                  return (
                    <motion.div
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                      animate={passed ? { x: [4, 0] } : {}}
                      transition={{ duration: 0.2 }}
                    >
                      {passed ? (
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <CheckCircle2 size={12} style={{ color: "#22C55E", flexShrink: 0 }} />
                        </motion.div>
                      ) : running ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                          <Clock size={12} style={{ color: "#F59E0B", flexShrink: 0 }} />
                        </motion.div>
                      ) : (
                        <div style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid #3E3E42", flexShrink: 0 }} />
                      )}
                      <span style={{
                        fontFamily: "'Fira Code', monospace", fontSize: 11,
                        color: passed ? "#D4D4D4" : "#555",
                        transition: "color 0.3s",
                      }}>
                        {t.label}
                      </span>
                      {passed && (
                        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#3E3E42", marginLeft: "auto" }}>
                          {t.ms}ms
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ position: "relative", marginTop: "2rem" }}>
      {/* Divider */}
      <div style={{ height: 1, background: "#3E3E42" }} />

      <div style={{ background: "#252526" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1.5rem 2rem" }}>
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 4,
                  background: "linear-gradient(135deg,#569CD6,#4EC9B0)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fira Code', monospace", fontSize: 10, fontWeight: 700, color: "#1E1E1E",
                }}>JL</span>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: "#9CDCFE" }}>
                  jhon-lloyd<span style={{ color: "#808080" }}>/</span><span style={{ color: "#CE9178" }}>portfolio</span>
                </span>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6A9955", lineHeight: 1.7, maxWidth: 200 }}>
                {"// Building robust systems & automating quality — one commit at a time."}
              </p>
            </div>

            {/* Nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#6A9955", marginBottom: 4 }}>
                {"// navigation"}
              </p>
              {LINKS.map(l => (
                <a key={l.href} href={l.href}
                  style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#858585", textDecoration: "none", width: "fit-content", transition: "color 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#569CD6"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; }}>
                  {l.label}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#6A9955" }}>
                {"// connect"}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{
                      width: 30, height: 30, borderRadius: 4,
                      border: "1px solid #3E3E42", background: "#2D2D30",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#858585", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#569CD6"; (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}>
                    <Icon size={12} />
                  </a>
                ))}
              </div>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#6A9955" }}>
                Jhonlloydsamson11@gmail.com
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: "#3E3E42", marginBottom: "1.5rem" }} />

          {/* Bottom row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#6A9955", display: "flex", alignItems: "center", gap: 6 }}>
              {"// © "}{new Date().getFullYear()}{" Jhon Lloyd M. Samson · Made with "}
              <Heart size={9} style={{ color: "#F44747", fill: "#F44747" }} />
              {" in Davao del Norte"}
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "5px 12px", borderRadius: 4,
                background: "#2D2D30", border: "1px solid #3E3E42",
                fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#569CD6"; (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}
            >
              <ArrowUp size={10} /> scroll_to_top()
            </motion.button>
          </div>
        </div>

        {/* QA Test Runner Panel */}
        <QAPanel />

        {/* IDE Status Bar */}
        <div style={{
          height: 22, background: "#007ACC",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#fff" }}>
              <GitBranch size={10} /> main
            </div>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "rgba(255,255,255,0.8)" }}>
              ✓ 0 errors, 0 warnings
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Fira Code', monospace", fontSize: 10, color: "rgba(255,255,255,0.8)" }}>
              <Wifi size={10} /> TypeScript
            </div>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "rgba(255,255,255,0.8)" }}>
              UTF-8
            </span>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "rgba(255,255,255,0.8)" }}>
              Ln 1, Col 1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
