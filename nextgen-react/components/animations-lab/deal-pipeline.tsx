"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene · Deal Pipeline
 * Story: Aus 100 Gesprächen werden 50 Prüfungen, daraus 12 LOIs, daraus
 * 3 Closings. Der Trichter ist Teil unseres Geschäfts — und die wenigen,
 * die durchkommen, sind die richtigen.
 *
 * Tech: 4 vertical stage rings forming a narrowing funnel. Particles spawn
 * at the top and fall through. At each stage a deterministic per-particle
 * "filter outcome" decides whether it deflects outward and falls away
 * (filtered out) or continues to the next stage. Soft warm bloom.
 */

const STAGE_Y = [1.6, 0.7, -0.2, -1.1];
const STAGE_R = [1.55, 1.05, 0.6, 0.28];
const TOP_Y = 2.2;
const BOT_Y = -1.6;
const SPEED = 0.62;
const PARTICLE_COUNT = 38;
const CYCLE = 11; // seconds; matches one full top-to-bottom traversal + buffer

type Particle = {
  spawn: number;
  jitterAngle: number;
  jitterScale: number; // 0..1, how far from axis it spawns
  filterAt: number; // 0..3 = filtered at that stage; 4 = passes through
};

function makeParticles(): Particle[] {
  // Approximate funnel attrition: 100 → 50 → 12 → 3 → kept
  // i.e. cumulative survival 1, 0.5, 0.12, 0.03, 0.03
  // Per-particle filter probability per stage (conditional): 0.5, 0.76, 0.75, 0
  const out: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let filterAt = 4;
    if (Math.random() < 0.5) filterAt = 0;
    else if (Math.random() < 0.76) filterAt = 1;
    else if (Math.random() < 0.75) filterAt = 2;
    out.push({
      spawn: (i / PARTICLE_COUNT) * CYCLE + (Math.random() - 0.5) * 0.2,
      jitterAngle: Math.random() * Math.PI * 2,
      jitterScale: 0.55 + Math.random() * 0.45,
      filterAt,
    });
  }
  return out;
}

function PipelineScene() {
  const particles = useMemo(makeParticles, []);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const ringsRef = useRef<(THREE.Mesh | null)[]>([]);
  const ringPulseRef = useRef<number[]>([0, 0, 0, 0]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const passColor = useMemo(() => new THREE.Color("#ffd9ad"), []);
  const filteredColor = useMemo(() => new THREE.Color("#7da3ff"), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Decay ring pulses.
    ringPulseRef.current = ringPulseRef.current.map((p) => Math.max(0, p - dt * 3.2));

    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      let lifeT = (t - p.spawn) % CYCLE;
      if (lifeT < 0) lifeT += CYCLE;

      // Default: linear fall from top.
      let y = TOP_Y - lifeT * SPEED;
      let visible = true;
      let filtered = false;

      // Funnel converging.
      const fallProg = THREE.MathUtils.clamp((TOP_Y - y) / (TOP_Y - BOT_Y), 0, 1);
      // Interp the radius along stage Y values.
      const r0 = STAGE_R[0];
      const r3 = STAGE_R[3];
      const radius = THREE.MathUtils.lerp(r0, r3, fallProg);
      let x = Math.cos(p.jitterAngle) * radius * p.jitterScale;
      let z = Math.sin(p.jitterAngle) * radius * p.jitterScale;

      // Filtering: at the filter stage, switch to deflecting trajectory.
      if (p.filterAt < 4) {
        const filterY = STAGE_Y[p.filterAt];
        if (y <= filterY) {
          filtered = true;
          const tFilter = (TOP_Y - filterY) / SPEED;
          const dtSince = lifeT - tFilter;
          // Deflect outward + arc downward.
          const outward = 1.0 + dtSince * 1.6;
          x = Math.cos(p.jitterAngle) * STAGE_R[p.filterAt] * outward;
          z = Math.sin(p.jitterAngle) * STAGE_R[p.filterAt] * outward;
          y = filterY + dtSince * 0.15 - 0.55 * dtSince * dtSince;

          // Pulse the ring on filter event.
          if (dtSince < dt * 1.2) {
            ringPulseRef.current[p.filterAt] = 1;
          }
        }
      }

      // Off-screen below or past life.
      if (y < BOT_Y - 1 || lifeT > CYCLE - 0.6) visible = false;

      // Detect "graduates" passing the bottom ring (filterAt=4 only).
      if (!filtered && p.filterAt === 4) {
        if (y <= STAGE_Y[3] && y >= STAGE_Y[3] - 0.2) {
          ringPulseRef.current[3] = 1;
        }
      }

      dummy.position.set(x, y, z);
      const baseScale = visible ? 0.05 : 0;
      const lifePulse = filtered ? 0.5 : 1;
      dummy.scale.setScalar(baseScale * lifePulse);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      tempColor.copy(filtered ? filteredColor : passColor);
      meshRef.current!.setColorAt(i, tempColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    // Animate ring scale based on pulse.
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;
      const pulse = ringPulseRef.current[i];
      ring.scale.setScalar(1 + pulse * 0.06);
      const mat = ring.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.35 + pulse * 1.6;
    });
  });

  return (
    <group>
      {STAGE_Y.map((y, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringsRef.current[i] = el;
          }}
          position={[0, y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[STAGE_R[i], 0.022, 12, 64]} />
          <meshStandardMaterial
            color="#ffd9ad"
            emissive="#fb724e"
            emissiveIntensity={0.35}
            metalness={0.4}
            roughness={0.35}
            toneMapped={false}
          />
        </mesh>
      ))}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function CameraDolly() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.05;
    state.camera.position.x = Math.sin(t) * 0.5;
    state.camera.position.z = 4.6 + Math.cos(t) * 0.2;
    state.camera.position.y = 0.4 + Math.sin(t * 1.5) * 0.15;
    state.camera.lookAt(0, 0.2, 0);
  });
  return null;
}

export function DealPipelineAnimation() {
  return (
    <LabCanvas camera={[0, 0.4, 4.6]} fov={45}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 4]} intensity={1.0} color="#fff0d8" />
      <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#cbd6ff" />
      <CameraDolly />
      <PipelineScene />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.7} luminanceThreshold={0.32} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
