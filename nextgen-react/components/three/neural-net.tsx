"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/animations/reduced-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Subtle neural-network background: dots drift slowly, lines connect close
 * neighbours. Canvas-based, ~2 kB. Sits inside the hero behind text content.
 *
 * - Pauses (and skips raf) when the canvas is off-screen.
 * - Skipped on prefers-reduced-motion.
 * - DPR-capped at 1.5 for crisp lines without melting low-end GPUs.
 */
export function NeuralNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;

    const NODE_COUNT_DENSITY = 0.000045; // nodes per pixel² — tuned for hero size
    const MAX_LINK_DIST = 160;
    const NODE_RADIUS = 1.6;

    function resize() {
      if (!canvas || !ctx) return;
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(28, Math.min(70, Math.round(w * h * NODE_COUNT_DENSITY)));
      if (nodes.length < target) {
        for (let i = nodes.length; i < target; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
          });
        }
      } else {
        nodes = nodes.slice(0, target);
      }
    }

    function step() {
      if (!visible) {
        raf = requestAnimationFrame(step);
        return;
      }
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      }

      // Lines between close neighbours
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > MAX_LINK_DIST * MAX_LINK_DIST) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / MAX_LINK_DIST) * 0.35;
          ctx.strokeStyle = `rgba(220, 230, 255, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes
      ctx.fillStyle = "rgba(220, 230, 255, 0.85)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    obs.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    resize();
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.55,
        mixBlendMode: "screen",
        zIndex: 0,
      }}
    />
  );
}
