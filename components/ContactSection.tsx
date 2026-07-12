"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle, Loader2, Github, Linkedin, Mail } from "lucide-react";

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "YOUR_PUBLIC_KEY";

type Status = "idle" | "sending" | "success" | "error";

const contacts = [
  { icon: Mail,     label: "Jhonlloydsamson11@gmail.com", href: "mailto:Jhonlloydsamson11@gmail.com", color: "#CE9178" },
  { icon: Github,   label: "github.com/Jhnllyd11",        href: "https://github.com/Jhnllyd11",       color: "#D4D4D4" },
  { icon: Linkedin, label: "linkedin.com/in/jhonlloyd-samson", href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", color: "#569CD6" },
];

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current || status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" ref={ref} className="section-wrap">
      <p className="section-label">Get In Touch</p>
      <motion.h2 variants={fadeUp(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        <span style={{ color: "#DCDCAA" }}>contact</span>
        <span style={{ color: "#808080" }}>.</span>
        <span style={{ color: "#4EC9B0" }}>send</span>
        <span style={{ color: "#808080" }}>(</span>
        <span style={{ color: "#9CDCFE" }}>message</span>
        <span style={{ color: "#808080" }}>)</span>
      </motion.h2>

      <motion.p variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
        style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#858585", marginBottom: 32, maxWidth: 480 }}>
        Open to opportunities in QA Engineering, Full-Stack Web Development, or Mobile Development.
        I&apos;ll get back to you within 24 hours.
      </motion.p>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="md:col-span-2" style={{ display: "flex", flexDirection: "column", gap: 10 }}>

          {contacts.map(({ icon: Icon, label, href, color }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="ide-window glass-hover"
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", textDecoration: "none", transition: "border-color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}40`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 4, flexShrink: 0,
                background: `${color}12`, border: `1px solid ${color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={13} style={{ color }} />
              </div>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#858585", wordBreak: "break-all" }}>
                {label}
              </span>
            </a>
          ))}

          {/* Availability */}
          <div className="ide-window" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: "#22C55E", opacity: 0.75 }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#22C55E" }} />
            </span>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#6A9955" }}>
              {"// available for new opportunities"}
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div variants={fadeUp(0.2)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="md:col-span-3">
          <div className="ide-window">
            <div className="ide-titlebar">
              <div className="flex items-center gap-1.5 px-3">
                <div className="browser-dot" style={{ background: "#FF5F57" }} />
                <div className="browser-dot" style={{ background: "#FEBC2E" }} />
                <div className="browser-dot" style={{ background: "#28C840" }} />
              </div>
              <div className="ide-tab active">
                <div className="ide-tab-dot" style={{ background: "#DCDCAA" }} />
                send_message.ts
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Line comment */}
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#6A9955" }}>
                {"// Fill in the fields below to send a message"}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#9CDCFE", display: "block", marginBottom: 5 }}>
                    from_name<span style={{ color: "#808080" }}>:</span>
                  </label>
                  <input name="from_name" required placeholder="Your full name"
                    className="ide-input" />
                </div>
                <div>
                  <label style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#9CDCFE", display: "block", marginBottom: 5 }}>
                    reply_to<span style={{ color: "#808080" }}>:</span>
                  </label>
                  <input name="reply_to" type="email" required placeholder="your@email.com"
                    className="ide-input" />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#9CDCFE", display: "block", marginBottom: 5 }}>
                  subject<span style={{ color: "#808080" }}>:</span>
                </label>
                <input name="subject" required placeholder="Job opportunity / Project inquiry / etc."
                  className="ide-input" />
              </div>

              <div>
                <label style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#9CDCFE", display: "block", marginBottom: 5 }}>
                  message<span style={{ color: "#808080" }}>:</span>
                </label>
                <textarea name="message" required rows={5}
                  placeholder="Tell me about the role or project..."
                  className="ide-input" style={{ resize: "none" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <button type="submit"
                  disabled={status === "sending" || status === "success"}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 20px", borderRadius: 4,
                    background: "rgba(86,156,214,0.15)", border: "1px solid rgba(86,156,214,0.4)",
                    fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#569CD6",
                    transition: "all 0.2s", opacity: status === "sending" || status === "success" ? 0.6 : 1,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.25)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.15)"; }}
                >
                  {status === "sending" ? <><Loader2 size={12} className="animate-spin" /> sending...</>
                    : status === "success" ? <><CheckCircle size={12} /> sent!</>
                    : <><Send size={12} /> send_message()</>}
                </button>

                {status === "success" && (
                  <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#4EC9B0", display: "flex", alignItems: "center", gap: 5 }}>
                    <CheckCircle size={11} /> {"// message sent! I'll reply within 24h."}
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#F44747", display: "flex", alignItems: "center", gap: 5 }}>
                    <AlertCircle size={11} /> {"// error: please try again or email directly."}
                  </motion.span>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
