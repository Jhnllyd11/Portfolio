import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ide: {
          bg:        "#1E1E1E",
          sidebar:   "#252526",
          panel:     "#2D2D30",
          border:    "#3E3E42",
          active:    "#1F1F1F",
          hover:     "#2A2D2E",
          selection: "#264F78",
        },
        syn: {
          blue:    "#569CD6",
          green:   "#4EC9B0",
          string:  "#CE9178",
          comment: "#6A9955",
          keyword: "#C586C0",
          fn:      "#DCDCAA",
          type:    "#4EC9B0",
          num:     "#B5CEA8",
          var:     "#9CDCFE",
          op:      "#D4D4D4",
        },
        term: {
          cyan:    "#00F3FF",
          green:   "#22C55E",
          blue:    "#569CD6",
          purple:  "#C586C0",
          orange:  "#CE9178",
          red:     "#F44747",
          white:   "#D4D4D4",
          dim:     "#6A9955",
        },
        // keep legacy
        maritime:  { DEFAULT: "#0ea5e9", light: "#38bdf8" },
        cypress:   { DEFAULT: "#22c55e", light: "#4ade80" },
        obsidian:  "#1E1E1E",
        muted:     "#6A9955",
        offwhite:  "#D4D4D4",
        subtle:    "#858585",
      },
      fontFamily: {
        mono:      ["'Fira Code'", "'JetBrains Mono'", "monospace"],
        "mono-code":["'JetBrains Mono'", "monospace"],
        inter:     ["Inter", "sans-serif"],
        grotesk:   ["'Space Grotesk'", "sans-serif"],
      },
      animation: {
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "compile":      "compile 1.4s ease-in-out infinite",
        "scan":         "scan 3s linear infinite",
        "type-in":      "typeIn 0.05s steps(1) forwards",
      },
      keyframes: {
        cursorBlink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        compile:     { "0%": { width: "0%" }, "100%": { width: "100%" } },
        scan:        { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
      },
    },
  },
  plugins: [],
};

export default config;
