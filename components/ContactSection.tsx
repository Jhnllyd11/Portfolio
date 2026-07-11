"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle, Loader2, Github, Linkedin, Mail } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com/ and create a free account.
// 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID below.
// 3. Create an Email Template with variables: {{from_name}}, {{reply_to}},
//    {{subject}}, {{message}} → copy the Template ID below.
// 4. Go to Account → API Keys → copy your Public Key below.
// 5. Replace the three placeholder strings with your real credentials.
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "YOUR_PUBLIC_KEY";

type Status = "idle" | "sending" | "success" | "error";

/** Sends the form via EmailJS. Returns true on success, throws on failure. */
async function sendEmail(form: HTMLFormElement): Promise<void> {
  await emailjs.sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    form,
    EMAILJS_PUBLIC_KEY
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-inter text-offwhite placeholder-muted focus:outline-none focus:border-maritime/60 focus:bg-white/8 transition-all duration-200";

const contacts = [
  { icon: Mail,     label: "Jhonlloydsamson11@gmail.com", href: "mailto:Jhonlloydsamson11@gmail.com" },
  { icon: Github,   label: "github.com/Jhnllyd11",        href: "https://github.com/Jhnllyd11" },
  { icon: Linkedin, label: "linkedin.com/in/jhonlloyd-samson", href: "https://www.linkedin.com/in/jhonlloyd-samson-ba94b9411/" },
];

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
      await sendEmail(formRef.current);
      setStatus("success");
      formRef.current.reset();
      // Auto-reset after 5 s so user can send again
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" ref={ref} className="section-padding max-w-5xl mx-auto">
      {/* Header */}
      <motion.p
        variants={fadeUp(0)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="text-maritime text-xs tracking-[0.3em] uppercase font-inter mb-2"
      >
        Get In Touch
      </motion.p>
      <motion.h2
        variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-4"
      >
        Let&apos;s <span className="gradient-text-nautical">Connect</span>
      </motion.h2>
      <motion.p
        variants={fadeUp(0.2)} initial="hidden" animate={inView ? "show" : "hidden"}
        className="text-muted font-inter text-sm mb-12 max-w-xl"
      >
        Open to opportunities in QA Engineering, Full-Stack Web Development, or Mobile Development.
        Drop a message and I&apos;ll get back to you within 24 hours.
      </motion.p>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Contact info sidebar */}
        <motion.div
          variants={fadeUp(0.25)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="md:col-span-2 space-y-4"
        >
          {contacts.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 glass glass-hover rounded-xl p-4 group transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-maritime/10 border border-maritime/20 flex items-center justify-center shrink-0 group-hover:bg-maritime/20 transition-colors">
                <Icon size={15} className="text-maritime" />
              </div>
              <span className="text-muted text-xs font-inter group-hover:text-maritime transition-colors break-all">
                {label}
              </span>
            </a>
          ))}

          {/* Availability badge */}
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cypress opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cypress" />
            </span>
            <span className="text-xs font-inter text-muted">
              Available for <span className="text-cypress">new opportunities</span>
            </span>
          </div>
        </motion.div>

        {/* Form — slides in from bottom */}
        <motion.div
          variants={fadeUp(0.35)} initial="hidden" animate={inView ? "show" : "hidden"}
          className="md:col-span-3"
        >
          {/* Animated glassmorphism border container */}
          <div className="glass-animated-border rounded-2xl p-px">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl bg-obsidian/60 backdrop-blur-xl p-7 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-muted font-inter mb-1.5 block">Name</label>
                  {/* EmailJS template variable: {{from_name}} */}
                  <input
                    name="from_name"
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted font-inter mb-1.5 block">Email</label>
                  {/* EmailJS template variable: {{reply_to}} */}
                  <input
                    name="reply_to"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted font-inter mb-1.5 block">Subject</label>
                {/* EmailJS template variable: {{subject}} */}
                <input
                  name="subject"
                  required
                  placeholder="Job opportunity / Project inquiry / etc."
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs text-muted font-inter mb-1.5 block">Message</label>
                {/* EmailJS template variable: {{message}} */}
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit row */}
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="flex items-center gap-2 px-7 py-3 rounded-full font-grotesk font-semibold text-sm transition-all duration-300 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
                    color: "#0a0a0a",
                    boxShadow: status === "idle" ? "0 0 0 0 transparent" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 24px rgba(14,165,233,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  {status === "sending" ? (
                    <><Loader2 size={14} className="animate-spin" /> Sending…</>
                  ) : status === "success" ? (
                    <><CheckCircle size={14} /> Sent!</>
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>

                {/* Toast messages */}
                {status === "success" && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-xs text-cypress font-inter"
                  >
                    <CheckCircle size={13} />
                    Message sent! I&apos;ll reply within 24h.
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-xs text-red-400 font-inter"
                  >
                    <AlertCircle size={13} />
                    Failed to send. Please try again or email directly.
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
