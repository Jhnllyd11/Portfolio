"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, ArrowUp, Heart } from "lucide-react";

const SOCIALS = [
  { icon: Github,    href: "https://github.com/Jhnllyd11",                             label: "GitHub" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook,  href: "https://www.facebook.com/Jsamm3",                         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd",                       label: "Instagram" },
];

const LINKS = [
  { label: "About",    href: "#about" },
  { label: "Stack",    href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Certs",    href: "#certs" },
  { label: "Contact",  href: "#contact" },
];

export default function Footer() {
  return (
    <footer style={{ position: "relative", marginTop: "2rem" }}>
      {/* Gradient divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(14,165,233,0.35),rgba(34,197,94,0.35),transparent)" }} />

      {/* Top glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 400, height: 120, pointerEvents: "none",
        background: "radial-gradient(ellipse,rgba(14,165,233,0.06),transparent)",
        filter: "blur(40px)",
      }} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono-code font-bold"
                style={{ background: "linear-gradient(135deg,#0ea5e9,#22c55e)", color: "#020408" }}>
                JL
              </span>
              <span className="font-grotesk font-bold text-lg gradient-text-nautical">JayEL</span>
            </div>
            <p className="text-xs font-inter leading-relaxed" style={{ color: "#475569", maxWidth: 200 }}>
              Building robust systems & automating quality — one commit at a time.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-grotesk font-semibold tracking-wide mb-1" style={{ color: "#f1f5f9" }}>Navigation</p>
            {LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-xs font-inter w-fit transition-colors duration-200"
                style={{ color: "#475569" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0ea5e9"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-grotesk font-semibold tracking-wide" style={{ color: "#f1f5f9" }}>Connect</p>
            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 glass rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{ color: "#475569" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0ea5e9"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <p className="text-xs font-inter" style={{ color: "#475569" }}>Jhonlloydsamson11@gmail.com</p>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginBottom: "1.5rem" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-inter flex items-center gap-1.5" style={{ color: "#475569" }}>
            © {new Date().getFullYear()} Jhon Lloyd M. Samson. Made with
            <Heart size={11} style={{ color: "#f87171", fill: "#f87171" }} />
            in Davao del Norte.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-inter transition-all"
            style={{ color: "#475569" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0ea5e9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
          >
            <ArrowUp size={11} /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
