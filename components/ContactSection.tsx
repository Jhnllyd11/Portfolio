"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CheckCircle, AlertCircle, Loader2, Github, Linkedin, Mail, Terminal } from "lucide-react";

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "YOUR_PUBLIC_KEY";

type Status = "idle" | "sending" | "success" | "error";

const contacts = [
  { icon: Mail,     label: "Jhonlloydsamson11@gmail.com",      href: "mailto:Jhonlloydsamson11@gmail.com",                    color: "#CE9178" },
  { icon: Github,   label: "github.com/Jhnllyd11",             href: "https://github.com/Jhnllyd11",                          color: "#D4D4D4" },
  { icon: Linkedin, label: "linkedin.com/in/jhonlloyd-samson", href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/", color: "#569CD6" },
];

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] as number[] } },
});

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ from_name: "", reply_to: "", subject: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, fields, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      setFields({ from_name: "", reply_to: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" ref={ref} className="section-wrap">
      <p className="section-label">Get In Touch</p>
      <motion.h2 variants={fadeUp(0.05)} initial="hidden" animate={inView ? "show" : "hidden"} className="section-title">
        Let&apos;s Connect
      </motion.h2>
      <motion.p variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
        style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#A0A0A0", marginBottom: 36, maxWidth: 480, lineHeight: 1.75 }}>
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
              <div style={{ width: 32, height: 32, borderRadius: 4, flexShrink: 0, background: `${color}12`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={13} style={{ color }} />
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#A0A0A0", wordBreak: "break-all" }}>{label}</span>
            </a>
          ))}

          <div className="ide-window" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: "#22C55E", opacity: 0.75 }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#22C55E" }} />
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#22C55E" }}>
              Available for new opportunities
            </span>
          </div>
        </motion.div>

        {/* Terminal Form */}
        <motion.div variants={fadeUp(0.2)} initial="hidden" animate={inView ? "show" : "hidden"} className="md:col-span-3">
          <div className="terminal">
            <div className="terminal-bar">
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 8 }}>
                <Terminal size={10} style={{ color: "#858585" }} />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585" }}>bash — send_message</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "14px 18px" }}>
              {/* Command header */}
              <div style={{ marginBottom: 14 }}>
                <span className="terminal-prompt" style={{ fontSize: 12 }}>user@portfolio:~$ </span>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#D4D4D4" }}>
                  send_message --to=&quot;hiring&quot;
                </span>
              </div>

              <div className="terminal-form-line">
                <label>--name=</label>
                <input
                  name="from_name" required value={fields.from_name} onChange={set("from_name")}
                  placeholder="Your full name"
                />
              </div>
              <div className="terminal-form-line">
                <label>--email=</label>
                <input
                  name="reply_to" type="email" required value={fields.reply_to} onChange={set("reply_to")}
                  placeholder="your@email.com"
                />
              </div>
              <div className="terminal-form-line">
                <label>--subject=</label>
                <input
                  name="subject" required value={fields.subject} onChange={set("subject")}
                  placeholder="Job opportunity / Project inquiry"
                />
              </div>
              <div className="terminal-form-line" style={{ alignItems: "flex-start" }}>
                <label style={{ paddingTop: 2 }}>--message=</label>
                <textarea
                  name="message" required rows={4} value={fields.message} onChange={set("message")}
                  placeholder="Tell me about the role or project..."
                />
              </div>

              {/* Submit line */}
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span className="terminal-prompt" style={{ fontSize: 12 }}>user@portfolio:~$ </span>
                <button type="submit"
                  disabled={status === "sending" || status === "success"}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 18px", borderRadius: 4,
                    background: "rgba(86,156,214,0.15)", border: "1px solid rgba(86,156,214,0.4)",
                    fontFamily: "'Fira Code', monospace", fontSize: 12, color: "#569CD6",
                    transition: "all 0.2s", opacity: status === "sending" || status === "success" ? 0.6 : 1, cursor: "pointer",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.25)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.15)"; }}
                >
                  {status === "sending" ? <><Loader2 size={12} className="animate-spin" /> executing…</>
                    : status === "success" ? <><CheckCircle size={12} /> sent ✓</>
                    : <>./send.sh</>}
                </button>

                {status === "success" && (
                  <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#22C55E", display: "flex", alignItems: "center", gap: 5 }}>
                    <CheckCircle size={11} /> exit 0 — message delivered
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#F44747", display: "flex", alignItems: "center", gap: 5 }}>
                    <AlertCircle size={11} /> exit 1 — retry or email directly
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
