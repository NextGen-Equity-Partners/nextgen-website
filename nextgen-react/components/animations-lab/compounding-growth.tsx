"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene · Wertsteigerungs-Kurve (Compounding Growth)
 * Story: Wert entsteht über Zeit. Sechs Jahre, jedes mit höherem EBITDA als
 * das letzte. Bars wachsen sequenziell, eine Trendkurve verbindet ihre
 * Spitzen — die klassische Investor-Pitch-Optik in 3D.
 *
 * Tech: instanced bar growth via per-bar scale.y on a per-frame timeline,
 * a curve mesh drawn through bar tops, low bloom for the polished feel.
 */

const HEIGHTS = [0.45, 0.62, 0.86, 1.18, 1.62, 2.2]; // ~1.38x compound
const BAR_WIDTH = 0.36;
const BAR_DEPTH = 0.36;
const X_STEP = 0.6;
const CYCLE = 9;
const STAGGER = 0.5;
const GROW = 0.7;
const HOLD_TAIL = 1.0;
const FADE_TAIL = 0.7;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Bars() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cy = t % CYCLE;
    const totalGrow = STAGGER * (HEIGHTS.length - 1) + GROW;
    const fadeStart = CYCLE - FADE_TAIL;

    HEIGHTS.forEach((target, i) => {
      const m = refs.current[i];
      if (!m) return;
      const start = i * STAGGER;
      let h: number;
      if (cy < start) h = 0;
      else if (cy < start + GROW) {
        h = easeOutCubic((cy - start) / GROW) * target;
      } else if (cy < fadeStart) {
        h = target;
      } else {
        // Collapse pass — fade from tip down.
        const k = (cy - fadeStart) / FADE_TAIL;
        h = target * (1 - easeOutCubic(k));
      }
      m.scale.y = Math.max(h, 0.001);
      m.position.y = (h - 0) / 2;
    });

    void totalGrow;
  });

  const xOffset = ((HEIGHTS.length - 1) * X_STEP) / 2;

  return (
    <group>
      {HEIGHTS.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[i * X_STEP - xOffset, 0, 0]}
        >
          <boxGeometry args={[BAR_WIDTH, 1, BAR_DEPTH]} />
          <meshStandardMaterial
            color="#e9c896"
            emissive="#7d4f24"
            emissiveIntensity={0.35}
            metalness={0.3}
            roughness={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

function TrendCurve() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  // Smooth curve through bar tops (a Catmull-Rom in xy).
  const tubeGeom = useMemo(() => {
    const xOffset = ((HEIGHTS.length - 1) * X_STEP) / 2;
    const points = HEIGHTS.map((h, i) => new THREE.Vector3(i * X_STEP - xOffset, h + 0.04, 0));
    // Add control extension for the curve sweep.
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.3);
    return new THREE.TubeGeometry(curve, 96, 0.025, 10, false);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cy = t % CYCLE;

    // Draw progressively from start as bars come in.
    const totalGrow = STAGGER * (HEIGHTS.length - 1) + GROW;
    let progress: number;
    if (cy < 0.6) progress = 0;
    else if (cy < totalGrow + 0.4) progress = (cy - 0.6) / (totalGrow - 0.2);
    else if (cy < CYCLE - FADE_TAIL) progress = 1;
    else progress = 1 - (cy - (CYCLE - FADE_TAIL)) / FADE_TAIL;
    progress = THREE.MathUtils.clamp(progress, 0, 1);

    if (meshRef.current) {
      const indexCount = (tubeGeom.index?.count ?? 0);
      meshRef.current.geometry.setDrawRange(0, Math.floor(indexCount * progress));
    }
    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.smoothstep(progress, 0, 0.1) * 1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeom}>
      <meshStandardMaterial
        ref={matRef}
        color="#fb724e"
        emissive="#fb724e"
        emissiveIntensity={1.4}
        toneMapped={false}
        transparent
      />
    </mesh>
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
    const t = state.clock.elapsedTime * 0.05;
    state.camera.position.x = Math.sin(t) * 0.7;
    state.camera.position.z = 4.2 + Math.cos(t) * 0.3;
    state.camera.position.y = 1.6 + Math.sin(t * 1.3) * 0.12;
    state.camera.lookAt(0, 0.7, 0);
  });
  return null;
}

export function CompoundingGrowthAnimation() {
  return (
    <LabCanvas camera={[0, 1.6, 4.2]} fov={44}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#fff0d8" />
      <directionalLight position={[-4, 3, -2]} intensity={0.55} color="#cbd6ff" />
      <CameraDolly />
      <GroundGrid />
      <Bars />
      <TrendCurve />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.55} luminanceThreshold={0.45} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
