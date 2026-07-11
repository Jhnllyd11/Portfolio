import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian:  "#020408",
        deep:      "#050d1a",
        surface:   "#0e1424",
        maritime:  { DEFAULT: "#0ea5e9", light: "#38bdf8" },
        cypress:   { DEFAULT: "#22c55e", light: "#4ade80" },
        cyan:      "#00f3ff",
        violet:    "#bd00ff",
        offwhite:  "#f1f5f9",
        muted:     "#64748b",
        subtle:    "#94a3b8",
      },
      fontFamily: {
        grotesk:     ["Space Grotesk", "sans-serif"],
        inter:       ["Inter", "sans-serif"],
        "mono-code": ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
