"use client";

import { useEffect, useRef } from "react";

const CODE_LINES = [
  "import { useState, useEffect } from 'react';",
  "import Lenis from 'lenis';",
  "const app = new Laravel\\Application();",
  "Route::get('/licenses', [LicenseController::class, 'index']);",
  "describe('Login Flow', () => {",
  "  cy.visit('/login');",
  "  cy.get('[data-cy=email]').type('admin@wela.com');",
  "  cy.get('[data-cy=submit]').click();",
  "  expect(response.status).toBe(200);",
  "});",
  "interface License { id: number; holder: string; status: 'active' | 'expired'; }",
  "const migrate = async (from: string, to: string): Promise<void> => {",
  "  await db.transaction(async (trx) => {",
  "    await trx('licenses').insert(payload);",
  "  });",
  "};",
  "export default function HeroSection() {",
  "  const [isLoading, setIsLoading] = useState(false);",
  "  useEffect(() => { lenis.on('scroll', onScroll); }, []);",
  "  return <main className=\"ide-window\">{children}</main>;",
  "}",
  "// Quality Assurance — 486h OJT @ Wela Online Corporation",
  "// Maritime Licensing System — City Agriculture Office, Panabo City",
  "class LicenseController extends Controller {",
  "  public function store(Request $request): JsonResponse {",
  "    $validated = $request->validate([",
  "      'holder_name' => 'required|string|max:255',",
  "      'license_type' => 'required|in:fishing,maritime',",
  "    ]);",
  "    return response()->json($license, 201);",
  "  }",
  "}",
  "const testSuite = cy.wrap(sprintCycle).should('exist');",
  "SELECT * FROM licenses WHERE status = 'active' AND expires_at > NOW();",
  "git commit -m 'feat: add role-based validation for QA module'",
  "npm run cypress:run --spec 'e2e/login.cy.ts'",
  "type UserRole = 'ProductOwner' | 'ProjectManager' | 'Developer' | 'QA';",
  "const backlog = await ProductBacklog.create({ sprint_id, title, priority });",
  "// TODO: implement data migration v11 → v15",
  "export const config: NextConfig = { reactStrictMode: true };",
];

// Syntax token colors
function tokenize(line: string): Array<{ text: string; color: string }> {
  const tokens: Array<{ text: string; color: string }> = [];
  const dim = "#3A3A3A";

  if (line.startsWith("//") || line.startsWith("*")) {
    tokens.push({ text: line, color: "#4A6741" });
    return tokens;
  }

  const patterns: Array<{ re: RegExp; color: string }> = [
    { re: /\b(import|export|from|const|let|var|function|return|async|await|class|extends|interface|type|enum|default|new|this|if|else|for|while|public|private|protected|static|void|null|undefined|true|false|describe|it|expect|cy|Route|Request|Response)\b/g, color: "#C586C0" },
    { re: /\b(useState|useEffect|useRef|useMemo|useCallback|NextConfig|JsonResponse|Controller|Application)\b/g, color: "#DCDCAA" },
    { re: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, color: "#CE9178" },
    { re: /\b(\d+)\b/g, color: "#B5CEA8" },
    { re: /\b(string|number|boolean|void|any|Promise|Array|Record|never)\b/g, color: "#4EC9B0" },
  ];

  // Simple approach: color whole line based on dominant pattern
  if (/^(import|export|from)\b/.test(line.trim())) {
    return [{ text: line, color: "#C586C0" }];
  }
  if (/^(const|let|var|type|interface)\b/.test(line.trim())) {
    return [{ text: line, color: "#9CDCFE" }];
  }
  if (/^(class|function|public|private|protected)\b/.test(line.trim())) {
    return [{ text: line, color: "#DCDCAA" }];
  }
  if (/^(describe|it|cy\.|expect|test)\b/.test(line.trim())) {
    return [{ text: line, color: "#4EC9B0" }];
  }
  if (/^(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\b/.test(line.trim())) {
    return [{ text: line, color: "#569CD6" }];
  }
  if (/^(git|npm|yarn)\b/.test(line.trim())) {
    return [{ text: line, color: "#B5CEA8" }];
  }
  if (/'[^']*'|"[^"]*"/.test(line)) {
    return [{ text: line, color: "#CE9178" }];
  }
  if (/[{}();]/.test(line)) {
    return [{ text: line, color: "#808080" }];
  }

  return [{ text: line, color: dim }];
}

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    let scrollY = 0, lastScrollY = 0, velocity = 0;
    let mouseX = -999, mouseY = -999;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });
    window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

    // Build rows of code lines
    const FONT_SIZE = 13;
    const LINE_H = 22;
    const COLS = 2;
    const COL_W = () => W / COLS;

    // Each line has a column, a y offset, and a base y
    interface Row {
      text: string;
      col: number;
      baseY: number;
      tokens: Array<{ text: string; color: string }>;
      opacity: number;
      blur: number;
    }

    const rows: Row[] = [];
    const ROWS_PER_COL = Math.ceil(CODE_LINES.length / COLS);
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS_PER_COL; r++) {
        const lineIdx = (c * ROWS_PER_COL + r) % CODE_LINES.length;
        const text = CODE_LINES[lineIdx];
        rows.push({
          text,
          col: c,
          baseY: r * LINE_H + 60,
          tokens: tokenize(text),
          opacity: 0.06 + Math.random() * 0.06,
          blur: 0,
        });
      }
    }

    function draw() {
      velocity = scrollY - lastScrollY;
      lastScrollY = scrollY;

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#1E1E1E";
      ctx.fillRect(0, 0, W, H);

      // Subtle vignette
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9);
      vig.addColorStop(0, "rgba(30,30,30,0)");
      vig.addColorStop(1, "rgba(10,10,10,0.85)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      const absVel = Math.abs(velocity);
      const blurAmount = Math.min(absVel * 0.8, 6);
      const scrollOffset = scrollY * 0.25;

      ctx.font = `${FONT_SIZE}px 'Fira Code', monospace`;

      for (const row of rows) {
        const cw = COL_W();
        const x = row.col * cw + 40;
        const y = (row.baseY - scrollOffset) % (ROWS_PER_COL * LINE_H + 60);
        const wrappedY = y < -LINE_H ? y + ROWS_PER_COL * LINE_H + 60 : y;

        if (wrappedY < -LINE_H || wrappedY > H + LINE_H) continue;

        // Velocity-based blur via opacity reduction
        const velOpacity = Math.max(0.02, row.opacity - blurAmount * 0.01);

        // Mouse proximity highlight
        const midX = x + (row.text.length * FONT_SIZE * 0.6) / 2;
        const dist = Math.sqrt((mouseX - midX) ** 2 + (mouseY - wrappedY) ** 2);
        const highlight = Math.max(0, 1 - dist / 180);
        const finalOpacity = velOpacity + highlight * 0.18;

        // Selection box on hover
        if (highlight > 0.3) {
          ctx.fillStyle = `rgba(38,79,120,${highlight * 0.35})`;
          ctx.fillRect(x - 4, wrappedY - FONT_SIZE, row.text.length * 7.8 + 8, LINE_H);
        }

        // Draw tokens
        let tx = x;
        for (const token of row.tokens) {
          const hex = token.color;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r},${g},${b},${finalOpacity})`;
          ctx.fillText(token.text, tx, wrappedY);
          tx += ctx.measureText(token.text).width;
        }
      }

      // Scan line
      const scanY = ((Date.now() * 0.03) % (H + 200)) - 100;
      const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      sg.addColorStop(0, "rgba(86,156,214,0)");
      sg.addColorStop(0.5, "rgba(86,156,214,0.04)");
      sg.addColorStop(1, "rgba(86,156,214,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 40, W, 80);

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
