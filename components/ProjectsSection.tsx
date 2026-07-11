"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Maritime Licensing System",
    subtitle: "City Agriculture Office — Panabo City",
    description:
      "A full-stack web-based system for fisheries and maritime licensing workflows. Handles license applications, renewals, and record management for the City Agriculture Office – Fisheries Development Center.",
    tech: ["PHP", "Laravel", "MySQL", "Bootstrap", "JavaScript"],
    images: [
      "/images/projects/maritime-1.png",
      "/images/projects/maritime-2.png",
      "/images/projects/maritime-3.png",
      "/images/projects/maritime-4.png",
      "/images/projects/maritime-5.png",
      "/images/projects/maritime-6.png",
      "/images/projects/maritime-7.png",
      "/images/projects/maritime-8.png",
    ],
    github: "https://github.com/Jhnllyd11",
    live: null,
    period: "2024 – 2026",
  },
];

function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-midnight group">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          <Image
            src={images[idx]}
            alt={`Screenshot ${idx + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-cyan/50"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-cyan/50"
      >
        <ChevronRight size={14} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-cyan w-4" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-cyan text-xs tracking-[0.3em] uppercase font-inter mb-2"
      >
        Work
      </motion.p>
      <motion.h2
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-12"
      >
        Featured <span className="gradient-text">Projects</span>
      </motion.h2>

      <div className="space-y-10">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.2 + i * 0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="glass glass-hover rounded-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image carousel */}
              <div className="p-5">
                <ImageCarousel images={p.images} />
              </div>

              {/* Info */}
              <div className="p-7 flex flex-col justify-center">
                <span className="text-xs text-muted font-inter mb-2">{p.period}</span>
                <h3 className="font-grotesk font-bold text-2xl text-offwhite mb-1">{p.title}</h3>
                <p className="text-cyan text-sm font-inter mb-4">{p.subtitle}</p>
                <p className="text-muted text-sm font-inter leading-relaxed mb-6">{p.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs border border-violet/30 text-muted hover:border-violet/60 hover:text-violet transition-all">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-inter text-muted hover:text-cyan hover:border-cyan/40 transition-all"
                  >
                    <Github size={13} /> GitHub
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-cyan/10 border border-cyan/30 rounded-full text-xs font-inter text-cyan hover:bg-cyan/20 transition-all"
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
