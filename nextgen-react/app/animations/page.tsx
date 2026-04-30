"use client";

import { useEffect, useRef, useState } from "react";

// ─── 1. Magnetic Dot Grid ──────────────────────────────────────────────────
function MagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const COLS = 22;
    const ROWS = 14;
    const sx = W / COLS;
    const sy = H / ROWS;

    type Dot = { ox: number; oy: number; x: number; y: number };
    const dots: Dot[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ox = (c + 0.5) * sx;
        const oy = (r + 0.5) * sy;
        dots.push({ ox, oy, x: ox, y: oy });
      }
    }

    let mx = -999;
    let my = -999;
    const RADIUS = 75;
    const STRENGTH = 32;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => { mx = -999; my = -999; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const dx = mx - d.ox;
        const dy = my - d.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let tx = d.ox;
        let ty = d.oy;
        if (dist < RADIUS && dist > 0) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          tx = d.ox - (dx / dist) * force;
          ty = d.oy - (dy / dist) * force;
        }
        d.x += (tx - d.x) * 0.13;
        d.y += (ty - d.y) * 0.13;
        const offset = Math.sqrt((d.x - d.ox) ** 2 + (d.y - d.oy) ** 2);
        const alpha = 0.22 + (offset / STRENGTH) * 0.72;
        const r = 1.5 + (offset / STRENGTH) * 1.8;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,247,244,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", cursor: "none" }}
    />
  );
}

// ─── 2. Text Scramble ──────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#@§±∆∑≠∞";

function useScramble(target: string, running: boolean) {
  const [text, setText] = useState(target);
  const rafRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!running) {
      setText(target);
      return;
    }
    frameRef.current = 0;
    const totalFrames = target.length * 5;

    const tick = () => {
      frameRef.current++;
      const progress = frameRef.current / totalFrames;
      const next = target
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (progress > i / target.length) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      setText(next);
      if (frameRef.current <= totalFrames + 8) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, target]);

  return text;
}

const SCRAMBLE_WORDS = [
  "NextGen Equity",
  "Mittelstand.",
  "Investition.",
  "Wachstum.",
  "Business Services.",
];

function TextScramble() {
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const text = useScramble(SCRAMBLE_WORDS[idx], running);

  const trigger = () => {
    if (running) return;
    setIdx((i) => (i + 1) % SCRAMBLE_WORDS.length);
    setRunning(true);
    setTimeout(() => setRunning(false), 1400);
  };

  return (
    <div
      onClick={trigger}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        cursor: "pointer",
        padding: "0 24px",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "clamp(20px, 3.2vw, 38px)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          color: "var(--w)",
          lineHeight: 1.2,
        }}
      >
        {text}
      </p>
    </div>
  );
}

// ─── 3. Flow Field ─────────────────────────────────────────────────────────
function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      hue: number;
    };

    const NUM = 200;
    const particles: Particle[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0,
      vy: 0,
      life: Math.random() * 100,
      maxLife: 70 + Math.random() * 90,
      hue: 200 + Math.random() * 60,
    }));

    const getAngle = (x: number, y: number, t: number) => {
      const nx = x * 0.006;
      const ny = y * 0.006;
      return (
        Math.sin(nx + t * 0.4) * Math.cos(ny + t * 0.3) * Math.PI * 2 +
        Math.sin(nx * 2.1 + ny * 1.7 + t * 0.2) * Math.PI
      );
    };

    ctx.fillStyle = "rgba(5,13,31,1)";
    ctx.fillRect(0, 0, W, H);

    let t = 0;
    let raf: number;

    const tick = () => {
      ctx.fillStyle = "rgba(5,13,31,0.04)";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const angle = getAngle(p.x, p.y, t);
        p.vx = p.vx * 0.92 + Math.cos(angle) * 0.6;
        p.vy = p.vy * 0.92 + Math.sin(angle) * 0.6;

        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.vx = 0;
          p.vy = 0;
          p.life = 0;
          p.maxLife = 70 + Math.random() * 90;
          continue;
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.65;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `hsla(${p.hue},55%,75%,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      t += 0.009;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ─── 4. Kinetic Typography ─────────────────────────────────────────────────
function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    let raf: number;
    const tick = () => {
      cx += (targetX - cx) * 0.07;
      cy += (targetY - cy) * 0.07;

      const spans = el.querySelectorAll<HTMLElement>("[data-depth]");
      spans.forEach((s) => {
        const d = parseFloat(s.dataset.depth ?? "1");
        s.style.transform = [
          `translate(${cx * d * 20}px, ${cy * d * 12}px)`,
          `rotateY(${cx * d * 9}deg)`,
          `rotateX(${-cy * d * 6}deg)`,
        ].join(" ");
      });

      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    tick();

    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        perspective: "600px",
        cursor: "crosshair",
        gap: 4,
      }}
    >
      <span
        data-depth="0.4"
        style={{
          display: "block",
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "var(--mute)",
          textTransform: "uppercase",
          willChange: "transform",
        }}
      >
        DACH · Mittelstand
      </span>
      <span
        data-depth="1"
        style={{
          display: "block",
          fontSize: "clamp(30px, 5vw, 52px)",
          fontWeight: 700,
          color: "var(--w)",
          lineHeight: 1,
          willChange: "transform",
        }}
      >
        NextGen
      </span>
      <span
        data-depth="1.6"
        style={{
          display: "block",
          fontSize: "clamp(30px, 5vw, 52px)",
          fontWeight: 100,
          color: "rgba(249,247,244,0.55)",
          lineHeight: 1,
          willChange: "transform",
        }}
      >
        Equity
      </span>
      <span
        data-depth="0.6"
        style={{
          display: "block",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "var(--mute-2)",
          textTransform: "uppercase",
          marginTop: 8,
          willChange: "transform",
        }}
      >
        Business Services
      </span>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
const DEMOS = [
  {
    id: "grid",
    label: "Magnetic Grid",
    tech: "Canvas · Cursor-Repulsion",
    Component: MagneticGrid,
  },
  {
    id: "scramble",
    label: "Text Scramble",
    tech: "JS · Zeichen-Rotation — klicken",
    Component: TextScramble,
  },
  {
    id: "flow",
    label: "Flow Field",
    tech: "Canvas · Vektorfeld",
    Component: FlowField,
  },
  {
    id: "kinetic",
    label: "Kinetic Type",
    tech: "CSS 3D · Mausverfolgung",
    Component: KineticTypography,
  },
];

export default function AnimationsPage() {
  return (
    <>
      <section
        style={{
          paddingTop: "clamp(120px, 14vw, 180px)",
          paddingBottom: "clamp(32px, 5vw, 56px)",
          paddingLeft: "clamp(24px, 6vw, 72px)",
          paddingRight: "clamp(24px, 6vw, 72px)",
        }}
      >
        <div className="s-tag rv">Animations Lab</div>
        <h1
          className="display rv"
          style={{ marginTop: 16, maxWidth: 700 }}
        >
          Demo <span className="bold">Bibliothek.</span>
        </h1>
        <p
          className="rv rv-d1"
          style={{
            marginTop: 18,
            opacity: 0.6,
            maxWidth: "52ch",
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          Bausteine für spätere Seiten. Klicken oder bewegen für Interaktion.
        </p>
      </section>

      <section className="pane">
        <div className="pane-inner">
          <div className="alab-grid">
            {DEMOS.map(({ id, label, tech, Component }) => (
              <div key={id} className="alab-card">
                <div className="alab-canvas">
                  <Component />
                </div>
                <div className="alab-meta">
                  <span className="alab-name">{label}</span>
                  <span className="alab-tech">{tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
