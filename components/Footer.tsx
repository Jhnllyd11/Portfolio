"use client";

import { Github, Linkedin, Facebook, Instagram } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/Jhnllyd11", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/Jsamm3", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-grotesk font-bold gradient-text tracking-wider">JayEL</p>
        <p className="text-muted text-xs font-inter">
          © {new Date().getFullYear()} Jhon Lloyd M. Samson. All rights reserved.
        </p>
        <div className="flex gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-cyan transition-colors"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
