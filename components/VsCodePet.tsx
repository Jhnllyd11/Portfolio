"use client";

import { useState, useEffect } from "react";

type Mood = "walk" | "sit" | "sleep" | "wave";

const FRAMES: Record<Mood, string[]> = {
  walk:  ["ฅ^•ﻌ•^ฅ", "ฅ^•ﻌ•^ฅ", " ^•ﻌ•^ฅ", "ฅ^•ﻌ•^ "],
  sit:   ["(=^･ω･^=)", "(=^･ω･^=)"],
  sleep: ["(=^-ω-^=)zzz", "(=^-ω-^=)zz "],
  wave:  ["ฅ^•ﻌ•^ฅ !", "ฅ^≧ω≦^ฅ !", "ฅ^•ﻌ•^ฅ !", "ฅ^≧ω≦^ฅ !"],
};

const MOODS: Mood[] = ["walk", "walk", "sit", "walk", "sleep", "walk"];

export default function VsCodePet() {
  const [mood, setMood] = useState<Mood>("sit");
  const [frame, setFrame] = useState(0);
  const [moodIdx, setMoodIdx] = useState(0);
  const [waving, setWaving] = useState(false);

  // Cycle moods every ~6s
  useEffect(() => {
    const t = setInterval(() => {
      if (waving) return;
      setMoodIdx(i => (i + 1) % MOODS.length);
    }, 6000);
    return () => clearInterval(t);
  }, [waving]);

  useEffect(() => {
    if (!waving) setMood(MOODS[moodIdx]);
  }, [moodIdx, waving]);

  // Animate frames
  useEffect(() => {
    const fps = mood === "sleep" ? 800 : mood === "sit" ? 1200 : 220;
    const t = setInterval(() => setFrame(f => (f + 1) % FRAMES[mood].length), fps);
    return () => clearInterval(t);
  }, [mood]);

  const handleClick = () => {
    if (waving) return;
    setWaving(true);
    setMood("wave");
    setFrame(0);
    setTimeout(() => {
      setWaving(false);
      setMood(MOODS[moodIdx]);
    }, 2200);
  };

  return (
    <button
      onClick={handleClick}
      title="Click me!"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Fira Code', monospace",
        fontSize: 10,
        color: waving ? "#FEBC2E" : mood === "sleep" ? "#9CDCFE" : "#fff",
        padding: "0 6px",
        transition: "color 0.3s",
        letterSpacing: 0,
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {FRAMES[mood][frame % FRAMES[mood].length]}
    </button>
  );
}
