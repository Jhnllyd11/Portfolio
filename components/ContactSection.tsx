"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-inter text-offwhite placeholder-muted focus:outline-none focus:border-cyan/50 focus:bg-white/8 transition-all";

  return (
    <section id="contact" ref={ref} className="section-padding max-w-3xl mx-auto">
      <motion.p
        variants={fadeUp(0)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-cyan text-xs tracking-[0.3em] uppercase font-inter mb-2"
      >
        Get In Touch
      </motion.p>
      <motion.h2
        variants={fadeUp(0.1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="font-grotesk font-bold text-4xl md:text-5xl mb-4"
      >
        Let&apos;s <span className="gradient-text">Connect</span>
      </motion.h2>
      <motion.p
        variants={fadeUp(0.2)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-muted font-inter text-sm mb-10"
      >
        Open to opportunities in QA Engineering, Web Development, or freelance projects.
      </motion.p>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        variants={fadeUp(0.3)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="glass rounded-2xl p-8 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs text-muted font-inter mb-1.5 block">Name</label>
            <input name="from_name" required placeholder="Your name" className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-muted font-inter mb-1.5 block">Email</label>
            <input name="reply_to" type="email" required placeholder="your@email.com" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted font-inter mb-1.5 block">Subject</label>
          <input name="subject" required placeholder="What's this about?" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-muted font-inter mb-1.5 block">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell me about your project or opportunity..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center gap-2 px-7 py-3 bg-cyan text-obsidian font-grotesk font-semibold text-sm rounded-full hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] disabled:opacity-50 transition-all"
          >
            <Send size={14} />
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-sm text-green-400 font-inter"
            >
              <CheckCircle size={14} /> Sent successfully!
            </motion.span>
          )}
          {status === "error" && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-sm text-red-400 font-inter"
            >
              <AlertCircle size={14} /> Something went wrong.
            </motion.span>
          )}
        </div>
      </motion.form>
    </section>
  );
}
