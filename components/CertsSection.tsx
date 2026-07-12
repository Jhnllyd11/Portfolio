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
    color: "#4EC9B0",
    tag: "OJT",
    file: "ojt_completion.cert",
  },
  {
    title: "Python Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    desc: "Foundational Python programming concepts, data structures, functions, and scripting for automation.",
    image: "/images/certs/python-essentials.png",
    color: "#3776AB",
    tag: "Python",
    file: "python_essentials.cert",
  },
  {
    title: "Start-Up Sandayag",
    issuer: "Davao del Norte State College",
    date: "2024",
    desc: "Recognition for active participation and contribution in the Stand-Up Sandayag program at DNSC.",
    image: "/images/certs/startup-sandayag.png",
    color: "#569CD6",
    tag: "Award",
    file: "startup_sandayag.cert",
  },
];

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function CertsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<(typeof certs)[0] | null>(null);

  return (
    <section id="certs" ref={ref} className="section-wrap">
      <p className="section-label">Credentials</p>
      <motion.h2 variants={fadeUp(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        Certificates & Awards
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certs.map((c, i) => (
          <motion.div key={i}
            variants={fadeUp(0.1 + i * 0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(c)}
            style={{ cursor: "pointer" }}
          >
            <div className="ide-window glass-hover" style={{ borderColor: `${c.color}20`, height: "100%" }}>
              <div className="ide-titlebar">
                <div className="flex items-center gap-1.5 px-3">
                  <div className="browser-dot" style={{ background: "#FF5F57" }} />
                  <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                  <div className="browser-dot" style={{ background: "#28C840" }} />
                </div>
                <div className="ide-tab active" style={{ borderTopColor: c.color }}>
                  <div className="ide-tab-dot" style={{ background: c.color }} />
                  {c.file}
                </div>
              </div>

              {/* Image */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#1E1E1E" }}
                className="group">
                <Image src={c.image} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(30,30,30,0.85), transparent)" }} />
                <div style={{
                  position: "absolute", top: 10, left: 10,
                  padding: "2px 8px", borderRadius: 3,
                  background: `${c.color}20`, border: `1px solid ${c.color}35`,
                  fontFamily: "'Fira Code', monospace", fontSize: 10, color: c.color,
                  backdropFilter: "blur(8px)",
                }}>{c.tag}</div>
                <div style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${c.color}10`, opacity: 0, transition: "opacity 0.3s",
                }} className="group-hover:opacity-100">
                  <div style={{
                    background: "rgba(30,30,30,0.9)", border: "1px solid #3E3E42",
                    borderRadius: 4, padding: "6px 14px",
                    fontFamily: "Inter, sans-serif", fontSize: 12, color: "#D4D4D4",
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <ExternalLink size={11} /> View Certificate
                  </div>
                </div>
              </div>

              {/* Plain readable info */}
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 5, flexShrink: 0,
                    background: `${c.color}12`, border: `1px solid ${c.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                  }}>
                    <Award size={13} style={{ color: c.color }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#ECECEC", lineHeight: 1.4, marginBottom: 3 }}>{c.title}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: c.color, marginBottom: 2 }}>{c.issuer}</p>
                    <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585", marginBottom: 6 }}>{c.date}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#858585", lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(13,13,13,0.92)", backdropFilter: "blur(16px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="ide-window"
              style={{ maxWidth: 560, width: "100%", position: "relative" }}
              onClick={e => e.stopPropagation()}
            >
              <div className="ide-titlebar">
                <div className="flex items-center gap-1.5 px-3">
                  <div className="browser-dot" style={{ background: "#FF5F57" }} />
                  <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                  <div className="browser-dot" style={{ background: "#28C840" }} />
                </div>
                <div className="ide-tab active" style={{ borderTopColor: selected.color }}>
                  <div className="ide-tab-dot" style={{ background: selected.color }} />
                  {selected.file}
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => setSelected(null)}
                  style={{ background: "none", border: "none", color: "#858585", padding: "0 12px", cursor: "pointer" }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ padding: 16, background: "#1E1E1E" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
                  <Image src={selected.image} alt={selected.title} fill className="object-contain" style={{ padding: 8 }} />
                </div>
              </div>
              <div style={{ padding: "14px 20px", borderTop: "1px solid #3E3E42" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "#ECECEC", marginBottom: 4 }}>{selected.title}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: selected.color, marginBottom: 6 }}>{selected.issuer} · {selected.date}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#A0A0A0", lineHeight: 1.6 }}>{selected.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
