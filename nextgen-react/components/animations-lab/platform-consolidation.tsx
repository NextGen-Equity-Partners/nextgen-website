"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene 1 · Plattform-Konsolidierung
 * Story: Buy-and-Build. Geometric shards drift in from offscreen, snap into a unified
 * platform grid, hold, then disperse. Endless loop.
 *
 * Tech: 9 octahedrons with MeshTransmissionMaterial (frosted glass + chromatic aberration),
 * easing-driven convergence, HDRI environment for reflections, additive bloom.
 */

const COUNT = 9;

type Shard = {
  target: THREE.Vector3;
  start: THREE.Vector3;
  offset: number;
  rotSeed: number;
  scale: number;
};

function createShards(): Shard[] {
  const out: Shard[] = [];
  for (let i = 0; i < COUNT; i++) {
    const col = (i % 3) - 1;
    const row = Math.floor(i / 3) - 1;
    const target = new THREE.Vector3(col * 0.95, row * 0.95, 0);
    const angle = (i / COUNT) * Math.PI * 2 + Math.random();
    const radius = 4.5 + Math.random() * 1.5;
    const start = new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle * 1.3) * (radius * 0.6),
      (Math.random() - 0.5) * 5,
    );
    out.push({
      target,
      start,
      offset: (i / COUNT) * 0.45,
      rotSeed: Math.random() * Math.PI * 2,
      scale: 0.42 + Math.random() * 0.05,
    });
  }
  return out;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Shards() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const shards = useMemo(createShards, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const CYCLE = 9;
    const cy = (t % CYCLE) / CYCLE;
    let phase: number;
    if (cy < 0.55) phase = easeOutCubic(cy / 0.55);
    else if (cy < 0.82) phase = 1;
    else phase = 1 - (cy - 0.82) / 0.18;

    shards.forEach((s, i) => {
      const m = meshRefs.current[i];
      if (!m) return;
      const local = THREE.MathUtils.clamp(phase - s.offset * 0.5, 0, 1);
      m.position.lerpVectors(s.start, s.target, local);
      m.rotation.x = s.rotSeed + t * 0.18;
      m.rotation.y = s.rotSeed * 1.7 + t * 0.24;
      m.rotation.z = Math.sin(t * 0.4 + i) * 0.2;
      const sScale = s.scale * (0.85 + 0.15 * local);
      m.scale.setScalar(sScale);
    });

    const g = groupRef.current;
    if (g) {
      g.rotation.y = t * 0.12;
      g.rotation.x = Math.sin(t * 0.2) * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
        >
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            samples={4}
            thickness={0.55}
            chromaticAberration={0.08}
            transmission={1}
            roughness={0.18}
            ior={1.45}
            distortion={0.18}
            distortionScale={0.35}
            temporalDistortion={0.05}
            color="#fde7c8"
            backside
          />
        </mesh>
      ))}
    </group>
  );
}

export function PlatformConsolidationAnimation() {
  return (
    <LabCanvas camera={[0, 0.4, 5.4]} fov={42}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 5, 6]} intensity={1.6} color="#ffe9cc" />
      <directionalLight position={[-4, -3, 2]} intensity={0.5} color="#9ec0ff" />
      <Environment preset="city" environmentIntensity={0.55} />
      <Shards />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.32}
          luminanceSmoothing={0.45}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0014]}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </LabCanvas>
  );
}
