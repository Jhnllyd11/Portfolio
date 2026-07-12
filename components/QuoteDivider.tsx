"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function QuoteDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <motion.blockquote
        className="quote-divider"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        &ldquo;Quality isn&apos;t a phase you add at the end — it&apos;s the discipline you build into every commit.&rdquo;
        <cite>— Jhon Lloyd Samson, Full-Stack Developer &amp; QA Engineer</cite>
      </motion.blockquote>
    </div>
  );
}
