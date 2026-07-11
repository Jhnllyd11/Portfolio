import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0a0a0a",
        midnight: "#0f172a",
        // Original accents
        cyan: { DEFAULT: "#00f3ff", glow: "rgba(0,243,255,0.15)" },
        violet: { DEFAULT: "#bd00ff", glow: "rgba(189,0,255,0.15)" },
        // Cyber-Nautical theme
        maritime: {
          DEFAULT: "#0ea5e9",   // Maritime Blue
          light: "#38bdf8",
          dark: "#0369a1",
          glow: "rgba(14,165,233,0.2)",
        },
        cypress: {
          DEFAULT: "#22c55e",   // Cypress Green
          light: "#4ade80",
          dark: "#15803d",
          glow: "rgba(34,197,94,0.2)",
        },
        offwhite: "#f8fafc",
        muted: "#94a3b8",
        surface: "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "mono-code": ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%)",
        "maritime-gradient": "linear-gradient(135deg, #0ea5e9, #22c55e)",
        "cyber-gradient": "linear-gradient(135deg, #00f3ff, #0ea5e9, #22c55e)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
        "node-pulse": "nodePulse 2s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        nodePulse: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(14,165,233,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(14,165,233,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
