"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Send, ChevronDown } from "lucide-react";

interface Message {
  from: "user" | "bot";
  text: string;
}

const QA: { patterns: string[]; answer: string }[] = [
  {
    patterns: ["hello", "hi", "hey", "sup", "yo"],
    answer: "Hey! 👋 I'm JL's portfolio assistant. Ask me anything about him — his skills, projects, experience, or how to get in touch.",
  },
  {
    patterns: ["who", "about", "yourself", "jhon", "lloyd", "jl"],
    answer: "Jhon Lloyd Samson is a Full-Stack Developer & QA Engineer based in Davao del Norte, Philippines. He's finishing his BS Information Systems at DNSC (2022–2026) and has real-world experience building systems and automating tests.",
  },
  {
    patterns: ["stack", "tech", "language", "use", "tools", "framework"],
    answer: "His main stack: PHP · MySQL · Tailwind CSS · JavaScript · TypeScript · Next.js · React · Cypress. He's also worked with GSAP, Framer Motion, and custom MVC architecture.",
  },
  {
    patterns: ["project", "work", "built", "system", "maritime"],
    answer: "Two featured projects:\n1. Maritime Licensing System — full-stack PHP/MySQL app for the City Agriculture Office, Panabo City.\n2. Cypress QA Automation Suite — E2E test suite built during OJT at Wela Online Corporation.",
  },
  {
    patterns: ["ojt", "internship", "wela", "experience"],
    answer: "He completed 486 hours of OJT at Wela Online Corporation (Livro Systems Inc.) as a QA Engineer in the DCMU department — Feb to May 2026. He built and maintained Cypress automation scripts across multiple user roles.",
  },
  {
    patterns: ["contact", "email", "reach", "hire", "available"],
    answer: "You can reach him at Jhonlloydsamson11@gmail.com, or use the Contact section on this portfolio. He's also on GitHub (Jhnllyd11) and LinkedIn.",
  },
  {
    patterns: ["github", "linkedin", "social", "facebook", "instagram"],
    answer: "GitHub: github.com/Jhnllyd11\nLinkedIn: linkedin.com/in/jhonlloyd-samson-ba94b9411\nFacebook: Jsamm3\nInstagram: @jqnllyd",
  },
  {
    patterns: ["cert", "award", "cisco", "python", "sandayag"],
    answer: "He holds a Python Essentials cert from Cisco Networking Academy, an OJT Completion certificate from Wela/Livro Systems, and a Start-Up Sandayag recognition from DNSC.",
  },
  {
    patterns: ["school", "college", "dnsc", "degree", "study"],
    answer: "He's studying BS Information Systems at Davao del Norte State College (DNSC), graduating 2026.",
  },
  {
    patterns: ["location", "where", "davao", "philippines", "ph"],
    answer: "He's based in Davao del Norte, Philippines. 🇵🇭",
  },
];

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const qa of QA) {
    if (qa.patterns.some(p => lower.includes(p))) return qa.answer;
  }
  return "Hmm, I'm not sure about that one. Try asking about JL's skills, projects, experience, or contact info!";
}

function useTypewriter(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return displayed;
}

function BotMessage({ text }: { text: string }) {
  const displayed = useTypewriter(text);
  return <span style={{ whiteSpace: "pre-line" }}>{displayed}</span>;
}

const SUGGESTIONS = ["Who is JL?", "What's his stack?", "His projects?", "How to contact?"];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hey! 👋 I'm JL's portfolio assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages(m => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: "bot", text: getReply(q) }]);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed", bottom: 36, right: 24, zIndex: 200,
          width: 44, height: 44, borderRadius: 10,
          background: "linear-gradient(135deg,#569CD6,#4EC9B0)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(86,156,214,0.35)",
        }}
      >
        {open ? <ChevronDown size={18} color="#1E1E1E" /> : <Terminal size={18} color="#1E1E1E" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "fixed", bottom: 90, right: 24, zIndex: 200,
              width: 340, maxHeight: 480,
              background: "#1E1E1E", border: "1px solid #3E3E42",
              borderRadius: 10, overflow: "hidden",
              display: "flex", flexDirection: "column",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Title bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#2D2D30", borderBottom: "1px solid #3E3E42",
              padding: "0 14px", height: 36,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#9CDCFE" }}>
                  jl_assistant.ts
                </span>
              </div>
              <button onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "#858585", cursor: "pointer", display: "flex" }}>
                <X size={13} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}
              className="ide-scroll">
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "82%", padding: "7px 11px", borderRadius: 7,
                    background: m.from === "user" ? "rgba(86,156,214,0.15)" : "#252526",
                    border: `1px solid ${m.from === "user" ? "rgba(86,156,214,0.25)" : "#3E3E42"}`,
                    fontFamily: "Inter, sans-serif", fontSize: 12, color: "#C8C8C8", lineHeight: 1.6,
                  }}>
                    {m.from === "bot" && i === messages.length - 1 && !typing
                      ? <BotMessage text={m.text} />
                      : <span style={{ whiteSpace: "pre-line" }}>{m.text}</span>}
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ display: "flex", gap: 4, padding: "8px 12px", alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                      style={{ width: 5, height: 5, borderRadius: "50%", background: "#569CD6" }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div style={{ padding: "0 14px 8px", display: "flex", flexWrap: "wrap", gap: 5 }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    style={{
                      background: "#2D2D30", border: "1px solid #3E3E42",
                      borderRadius: 4, padding: "3px 9px",
                      fontFamily: "'Fira Code', monospace", fontSize: 10, color: "#858585",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#9CDCFE"; (e.currentTarget as HTMLElement).style.borderColor = "#569CD6"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#858585"; (e.currentTarget as HTMLElement).style.borderColor = "#3E3E42"; }}
                  >{s}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ borderTop: "1px solid #3E3E42", padding: "8px 10px", display: "flex", gap: 6 }}>
              <input
                className="ide-input"
                style={{ flex: 1, fontSize: 12, padding: "6px 10px" }}
                placeholder="Ask about JL..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
              />
              <button onClick={() => send(input)}
                style={{
                  width: 32, height: 32, borderRadius: 5, flexShrink: 0,
                  background: "rgba(86,156,214,0.15)", border: "1px solid rgba(86,156,214,0.3)",
                  color: "#569CD6", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(86,156,214,0.15)"; }}
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
