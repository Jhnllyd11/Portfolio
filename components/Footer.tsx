"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, ArrowUp, Heart, GitBranch, Wifi } from "lucide-react";

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
