"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award } from "lucide-react";

const certs = [
  {
    title: "Certificate of Internship Completion",
    issuer: "Livro Systems Inc. / Wela Online Corporation",
    date: "May 2026",
    desc: "Awarded for completing 486 hours of OJT in the QA Department – DCMU (Feb 10 – May 25, 2026).",
    image: "/images/certs/ojt-completion.png",
  },
  {
    title: "Python Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    desc: "Foundational Python programming concepts, data structures, and scripting.",
    image: "/images/certs/python-essentials.png",
  },
  {
    title: "Stand-Up Sandayag",
    issuer: "Davao del Norte State College",
    date: "2024",
    desc: "Recognition for participation and contribution in the Stand-Up Sandayag program.",
    image: "/images/certs/standup-sandayag.png",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export default function CertsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certs" ref={ref} className="section-padding max-w-6xl mx-auto">
      <motion.p
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-cyan text-xs tracking-[0.3em] uppercase font-inter mb-2"
      >
        Credentials
      </motion.p>
      <motion.h2
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-12"
      >
        Certificates & <span className="gradient-text">Awards</span>
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((c, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.2 + i * 0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="glass glass-hover rounded-2xl overflow-hidden group"
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-start gap-3">
                <Award size={16} className="text-cyan shrink-0 mt-0.5" />
                <div>
                  <p className="font-grotesk font-semibold text-offwhite text-sm leading-snug">{c.title}</p>
                  <p className="text-cyan text-xs mt-1">{c.issuer}</p>
                  <p className="text-muted text-xs mt-0.5">{c.date}</p>
                  <p className="text-muted text-xs mt-2 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
