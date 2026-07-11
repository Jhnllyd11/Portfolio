"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, ExternalLink, X } from "lucide-react";

const certs = [
  {
    title: "Certificate of Internship Completion",
    issuer: "Livro Systems Inc. / Wela Online Corporation",
    date: "May 2026",
    desc: "Awarded for successfully completing 486 hours of OJT in the Quality Assurance Department – DCMU, from February 10 to May 25, 2026.",
    image: "/images/certs/ojt-completion.png",
    accent: "#22c55e",
    tag: "OJT",
  },
  {
    title: "Python Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    desc: "Foundational Python programming concepts, data structures, functions, and scripting for automation.",
    image: "/images/certs/python-essentials.png",
    accent: "#3776ab",
    tag: "Python",
  },
  {
    title: "Start-Up Sandayag",
    issuer: "Davao del Norte State College",
    date: "2024",
    desc: "Recognition for active participation and contribution in the Stand-Up Sandayag program at DNSC.",
    image: "/images/certs/standup-sandayag.png",
    accent: "#0ea5e9",
    tag: "Award",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

function CertCard({
  c,
  i,
  onOpen,
}: {
  c: (typeof certs)[0];
  i: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp(0.15 + i * 0.1)}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={onOpen}
      className="glass glass-hover rounded-2xl overflow-hidden group cursor-pointer"
      style={{ borderColor: `${c.accent}12` }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={c.image}
          alt={c.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

        {/* Tag badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono-code font-medium"
          style={{
            background: `${c.accent}20`,
            color: c.accent,
            border: `1px solid ${c.accent}35`,
            backdropFilter: "blur(8px)",
          }}
        >
          {c.tag}
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${c.accent}10` }}
        >
          <div className="glass rounded-full px-4 py-2 text-xs font-inter text-offwhite flex items-center gap-2">
            <ExternalLink size={11} /> View Certificate
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{
              background: `${c.accent}15`,
              border: `1px solid ${c.accent}25`,
            }}
          >
            <Award size={13} style={{ color: c.accent }} />
          </div>
          <div className="min-w-0">
            <p className="font-grotesk font-semibold text-offwhite text-sm leading-snug">
              {c.title}
            </p>
            <p className="text-xs mt-1 font-inter" style={{ color: c.accent }}>
              {c.issuer}
            </p>
            <p className="text-muted text-[11px] font-inter mt-0.5">{c.date}</p>
            <p className="text-muted text-xs font-inter mt-2 leading-relaxed line-clamp-2">
              {c.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<(typeof certs)[0] | null>(null);

  return (
    <section id="certs" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-maritime text-xs tracking-[0.3em] uppercase font-inter mb-2"
      >
        Credentials
      </motion.p>
      <motion.h2
        variants={fadeUp(0.08)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-12"
      >
        Certificates & <span className="gradient-text">Awards</span>
      </motion.h2>

      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certs.map((c, i) => (
          <CertCard key={i} c={c} i={i} onOpen={() => setSelected(c)} />
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{
              background: "rgba(10,10,10,0.92)",
              backdropFilter: "blur(16px)",
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-2xl w-full glass rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 border-t border-white/5">
                <p className="font-grotesk font-bold text-offwhite">
                  {selected.title}
                </p>
                <p
                  className="text-xs font-inter mt-1"
                  style={{ color: selected.accent }}
                >
                  {selected.issuer} · {selected.date}
                </p>
                <p className="text-muted text-xs font-inter mt-2 leading-relaxed">
                  {selected.desc}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center text-muted hover:text-offwhite transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
