"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, ArrowDown } from "lucide-react";
import Image from "next/image";
import Hero3D from "./Hero3D";

const socials = [
  { icon: Github, href: "https://github.com/Jhnllyd11", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/Jsamm3", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/jqnllyd", label: "Instagram" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* 3D Background */}
      <Hero3D />

      {/* Radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Avatar */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <div className="relative w-24 h-24 rounded-full ring-2 ring-cyan/40 ring-offset-4 ring-offset-obsidian overflow-hidden">
            <Image
              src="/images/profile/avatar.jpg"
              alt="Jhon Lloyd Samson"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.p variants={fadeUp} className="text-cyan text-sm font-inter tracking-[0.3em] uppercase mb-3">
          Software Developer & QA Engineer
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-grotesk font-bold text-5xl md:text-7xl leading-tight mb-4"
        >
          Jhon Lloyd{" "}
          <span className="gradient-text">Samson</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-muted font-inter text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Building robust web systems & automating quality — from maritime licensing platforms to Cypress test suites.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mb-10">
          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-cyan text-obsidian font-grotesk font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full glass border border-cyan/30 text-offwhite font-grotesk font-semibold text-sm tracking-wide hover:border-cyan/70 transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={fadeUp} className="flex gap-5 justify-center">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-cyan hover:border-cyan/40 transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase font-inter">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
