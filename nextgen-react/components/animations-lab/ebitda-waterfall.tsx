"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene · EBITDA Bridge (Waterfall)
 * Story: Vom Start-EBITDA zum Ziel — über Preisinitiativen, Effizienz,
 * Add-on-Synergien und gezielte Reinvestments. Klassisches M&A-Schaubild.
 *
 * Tech: 7 bars in a row. Anchors (start, end) sit at the floor; positive
 * contributions stack on top of the running cumulative; negatives subtract.
 * Per-bar grow animation runs sequentially with thin step lines connecting
 * bar tops/bottoms. Subtle business material — no neon.
 */

type Step =
  | { kind: "anchor"; label: string }
  | { kind: "pos" | "neg"; label: string; value: number };

const STEPS: Step[] = [
  { kind: "anchor", label: "Y0" },
  { kind: "pos", label: "Preise", value: 0.3 },
  { kind: "pos", label: "Effizienz", value: 0.4 },
  { kind: "neg", label: "FX", value: -0.15 },
  { kind: "pos", label: "Add-ons", value: 0.28 },
  { kind: "neg", label: "Reinvest", value: -0.1 },
  { kind: "anchor", label: "Y3" },
];

const START_VALUE = 1.0;
const BAR_WIDTH = 0.55;
const BAR_DEPTH = 0.55;
const X_STEP = 0.78;
const REVEAL_STAGGER = 0.55;
const REVEAL_DUR = 0.55;
const HOLD_DUR = 1.6;
const FADE_DUR = 0.9;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type Bar = {
  index: number;
  baseY: number;
  height: number;
  kind: "anchor" | "pos" | "neg";
  color: string;
  emissive: string;
  reveal: number;
};

function buildBars(): Bar[] {
  const bars: Bar[] = [];
  let cumulative = 0;
  STEPS.forEach((step, i) => {
    const reveal = i * REVEAL_STAGGER;
    if (step.kind === "anchor") {
      if (i === 0) {
        bars.push({
          index: i,
          baseY: 0,
          height: START_VALUE,
          kind: "anchor",
          color: "#e2c489",
          emissive: "#8a5a25",
          reveal,
        });
        cumulative = START_VALUE;
      } else {
        bars.push({
          index: i,
          baseY: 0,
          height: cumulative,
          kind: "anchor",
          color: "#e2c489",
          emissive: "#8a5a25",
          reveal,
        });
      }
    } else if (step.value > 0) {
      bars.push({
        index: i,
        baseY: cumulative,
        height: step.value,
        kind: "pos",
        color: "#a0c896",
        emissive: "#3e7e3a",
        reveal,
      });
      cumulative += step.value;
    } else {
      bars.push({
        index: i,
        baseY: cumulative + step.value,
        height: -step.value,
        kind: "neg",
        color: "#d6907a",
        emissive: "#7a3424",
        reveal,
      });
      cumulative += step.value;
    }
  });
  return bars;
}

function getCycleProgress(bar: Bar, cycleT: number, totalReveal: number) {
  const fadeStart = totalReveal + HOLD_DUR;
  if (cycleT < bar.reveal) return 0;
  if (cycleT < bar.reveal + REVEAL_DUR) {
    return easeOutCubic((cycleT - bar.reveal) / REVEAL_DUR);
  }
  if (cycleT < fadeStart) return 1;
  return 1 - easeOutCubic(Math.min((cycleT - fadeStart) / FADE_DUR, 1));
}

function WaterfallScene() {
  const bars = useMemo(buildBars, []);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const stepRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Total cycle.
  const totalReveal = REVEAL_STAGGER * (STEPS.length - 1) + REVEAL_DUR;
  const cycle = totalReveal + HOLD_DUR + FADE_DUR;

  const xOffset = ((STEPS.length - 1) * X_STEP) / 2;

  // Step lines: between bar i and bar i+1, at the joining height.
  const steps = useMemo(() => {
    const arr: { x: number; y: number; reveal: number }[] = [];
    for (let i = 0; i < bars.length - 1; i++) {
      const cur = bars[i];
      const next = bars[i + 1];
      const x = i * X_STEP - xOffset + X_STEP / 2;
      // Connect top of current bar (cur.baseY + cur.height) to base of next bar.
      // For anchor bars, the connection is at the cumulative running level.
      const y = next.kind === "anchor"
        ? cur.baseY + cur.height
        : (next.kind === "pos" ? next.baseY : next.baseY + next.height);
      arr.push({ x, y, reveal: bars[i + 1].reveal - 0.08 });
    }
    return arr;
  }, [bars, xOffset]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cy = t % cycle;

    bars.forEach((b, i) => {
      const m = meshRefs.current[i];
      if (!m) return;
      const k = getCycleProgress(b, cy, totalReveal);
      const grown = b.height * k;
      m.scale.set(1, Math.max(grown, 0.0001), 1);
      m.position.y = b.baseY + grown / 2;
    });

    steps.forEach((s, i) => {
      const m = stepRefs.current[i];
      if (!m) return;
      const fadeStart = totalReveal + HOLD_DUR;
      let k: number;
      if (cy < s.reveal) k = 0;
      else if (cy < s.reveal + REVEAL_DUR * 0.6) k = (cy - s.reveal) / (REVEAL_DUR * 0.6);
      else if (cy < fadeStart) k = 1;
      else k = 1 - Math.min((cy - fadeStart) / FADE_DUR, 1);
      m.scale.set(easeOutCubic(THREE.MathUtils.clamp(k, 0, 1)), 1, 1);
    });
  });

  return (
    <group>
      {bars.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={[i * X_STEP - xOffset, b.baseY, 0]}
        >
          <boxGeometry args={[BAR_WIDTH, 1, BAR_DEPTH]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.emissive}
            emissiveIntensity={0.35}
            metalness={0.32}
            roughness={0.42}
          />
        </mesh>
      ))}

      {steps.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            stepRefs.current[i] = el;
          }}
          position={[s.x, s.y, 0]}
        >
          <boxGeometry args={[X_STEP - BAR_WIDTH, 0.022, 0.05]} />
          <meshBasicMaterial color="#fb724e" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function GroundGrid() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(8, 16, "#243a6e", "#11204a");
    (g.material as THREE.LineBasicMaterial).transparent = true;
    (g.material as THREE.LineBasicMaterial).opacity = 0.42;
    return g;
  }, []);
  return <primitive object={grid} position={[0, 0, 0]} />;
}

function CameraDolly() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.04;
    state.camera.position.x = Math.sin(t) * 0.6;
    state.camera.position.z = 4.6 + Math.cos(t) * 0.25;
    state.camera.position.y = 1.4 + Math.sin(t * 1.2) * 0.1;
    state.camera.lookAt(0, 0.7, 0);
  });
  return null;
}

export function EbitdaWaterfallAnimation() {
  return (
    <LabCanvas camera={[0, 1.4, 4.6]} fov={46}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.15} color="#fff0d8" />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#cbd6ff" />
      <CameraDolly />
      <GroundGrid />
      <WaterfallScene />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.5} luminanceThreshold={0.45} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
