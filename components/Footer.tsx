"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, ArrowUp, Heart } from "lucide-react";

const socials = [
  { icon: Github,    href: "https://github.com/Jhnllyd11",                             label: "GitHub" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook,  href: "https://www.facebook.com/Jsamm3",                         label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd",                       label: "Instagram" },
];

const links = [
  { label: "About",    href: "#about" },
  { label: "Stack",    href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Certs",    href: "#certs" },
  { label: "Contact",  href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-8">
      {/* Gradient divider */}
      <div className="h-px w-full" style={{
        background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.4), rgba(34,197,94,0.4), transparent)"
      }} />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.06), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono-code font-bold text-obsidian"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #22c55e)" }}>
                JL
              </span>
              <span className="font-grotesk font-bold text-lg gradient-text-nautical">JayEL</span>
            </div>
            <p className="text-muted text-xs font-inter leading-relaxed max-w-[200px]">
              Building robust systems & automating quality — one commit at a time.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            <p className="text-offwhite text-xs font-grotesk font-semibold mb-1 tracking-wide">Navigation</p>
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className="text-muted text-xs font-inter hover:text-maritime transition-colors w-fit">
                {l.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <p className="text-offwhite text-xs font-grotesk font-semibold tracking-wide">Connect</p>
            <div className="flex gap-2 flex-wrap">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 glass rounded-full flex items-center justify-center text-muted hover:text-maritime hover:border-maritime/40 transition-all duration-200 hover:-translate-y-0.5">
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <p className="text-muted text-[11px] font-inter">
              Jhonlloydsamson11@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-white/5 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs font-inter flex items-center gap-1.5">
            © {new Date().getFullYear()} Jhon Lloyd M. Samson. Made with
            <Heart size={11} className="text-red-400 fill-red-400" />
            in Davao del Norte.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-inter text-muted hover:text-maritime hover:border-maritime/30 transition-all"
          >
            <ArrowUp size={11} /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
