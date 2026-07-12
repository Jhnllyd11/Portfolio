"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  id: number;
  dot: string;
  label: string;
  detail: string;
  time: string;
}

const EVENTS = [
  { dot: "#28C840", label: "jhon pushed to",   detail: "main" },
  { dot: "#4EC9B0", label: "build",             detail: "passed — 0 errors" },
  { dot: "#569CD6", label: "deployed",          detail: "→ vercel ✓" },
  { dot: "#DCDCAA", label: "tsc",               detail: "--noEmit ✓" },
  { dot: "#28C840", label: "git commit",        detail: "\"feat: new section\"" },
  { dot: "#C586C0", label: "tests",             detail: "24/24 passed ✓" },
  { dot: "#4EC9B0", label: "lint",              detail: "0 warnings" },
  { dot: "#28C840", label: "git commit",        detail: "\"fix: mobile layout\"" },
  { dot: "#569CD6", label: "npm run",           detail: "build — 1.4s" },
  { dot: "#DCDCAA", label: "bundle",            detail: "optimized 98kb" },
  { dot: "#28C840", label: "git commit",        detail: "\"chore: update deps\"" },
  { dot: "#4EC9B0", label: "compiled",          detail: "successfully in 0.9s" },
];

function timeAgo(sec: number) {
  if (sec < 60)  return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  return `${Math.floor(sec / 3600)}h ago`;
}

let uid = 0;

export default function ActivityFeed() {
  const [events, setEvents] = useState<Event[]>(() =>
    EVENTS.slice(0, 4).map((e, i) => ({
      ...e, id: uid++, time: timeAgo((4 - i) * 18),
    }))
  );
  const [tick, setTick] = useState(0);
  const idxRef = { current: 4 };

  // Add new event every 4s
  useEffect(() => {
    let idx = 4;
    const t = setInterval(() => {
      const e = EVENTS[idx % EVENTS.length];
      idx++;
      setEvents(prev => [
        { ...e, id: uid++, time: "just now" },
        ...prev.slice(0, 3),
      ]);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Update timestamps every 15s
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 28,
      left: 16,
      zIndex: 200,
      width: 230,
      pointerEvents: "none",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        marginBottom: 5, paddingLeft: 2,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28C840", boxShadow: "0 0 6px #28C840" }} />
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#858585", letterSpacing: "0.08em" }}>
          ACTIVITY
        </span>
      </div>

      {/* Events */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <AnimatePresence initial={false}>
          {events.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -12, height: 0 }}
              animate={{ opacity: 1 - i * 0.18, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(30,30,30,0.75)",
                border: "1px solid rgba(62,62,66,0.6)",
                borderRadius: 4,
                padding: "4px 8px",
                backdropFilter: "blur(6px)",
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: e.dot, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#858585", flexShrink: 0 }}>
                {e.label}
              </span>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, color: "#C8C8C8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                {e.detail}
              </span>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 8, color: "#555", flexShrink: 0 }}>
                {e.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
