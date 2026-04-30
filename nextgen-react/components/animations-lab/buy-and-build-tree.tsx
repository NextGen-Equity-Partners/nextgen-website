"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene · Buy-and-Build Tree
 * Story: Eine Plattform oben, Add-ons docken über Connection-Lines unten an.
 * Add-ons erscheinen nacheinander; Pulse-Particles laufen entlang der Lines
 * und visualisieren den Wertetransfer in beide Richtungen.
 *
 * Tech: parented mesh layout, sequential per-node reveal driven by timeline
 * thresholds, instanced pulse particles riding pre-computed straight paths,
 * matte business material (no chromatic aberration, low bloom).
 */

const PLATFORM = { x: 0, y: 1.35, w: 0.95, h: 0.42, d: 0.5 };
const ADDON_Y = -0.55;
const ADDON_X = [-1.55, -0.78, 0, 0.78, 1.55];
const ADDON_SIZE = { w: 0.46, h: 0.34, d: 0.42 };
const REVEAL_PLATFORM = 0.0;
const REVEAL_PLATFORM_DUR = 0.9;
const REVEAL_FIRST_ADDON = 1.1;
const REVEAL_STAGGER = 0.65;
const REVEAL_DUR = 0.8;
const CYCLE = 12;
const FADE_DUR = 1.0;

const PULSE_PER_LINE = 4;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function PlatformBox() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cy = t % CYCLE;
    const fadeStart = CYCLE - FADE_DUR;
    let s: number;
    if (cy < REVEAL_PLATFORM) s = 0;
    else if (cy < REVEAL_PLATFORM + REVEAL_PLATFORM_DUR) {
      s = easeOutCubic((cy - REVEAL_PLATFORM) / REVEAL_PLATFORM_DUR);
    } else if (cy < fadeStart) s = 1;
    else s = 1 - easeOutCubic((cy - fadeStart) / FADE_DUR);
    if (ref.current) {
      ref.current.scale.set(s, s, s);
      ref.current.rotation.y = Math.sin(t * 0.18) * 0.08;
    }
  });

  return (
    <mesh ref={ref} position={[PLATFORM.x, PLATFORM.y, 0]}>
      <boxGeometry args={[PLATFORM.w, PLATFORM.h, PLATFORM.d]} />
      <meshStandardMaterial
        color="#e3c089"
        emissive="#9a6a32"
        emissiveIntensity={0.45}
        metalness={0.45}
        roughness={0.32}
      />
    </mesh>
  );
}

function AddOn({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const reveal = REVEAL_FIRST_ADDON + index * REVEAL_STAGGER;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cy = t % CYCLE;
    const fadeStart = CYCLE - FADE_DUR;
    let s: number;
    if (cy < reveal) s = 0;
    else if (cy < reveal + REVEAL_DUR) s = easeOutCubic((cy - reveal) / REVEAL_DUR);
    else if (cy < fadeStart) s = 1;
    else s = 1 - easeOutCubic((cy - fadeStart) / FADE_DUR);

    if (ref.current) {
      ref.current.scale.set(s, s, s);
      ref.current.rotation.y = Math.sin(t * 0.4 + index) * 0.05;
    }
  });

  return (
    <mesh ref={ref} position={[ADDON_X[index], ADDON_Y, 0]}>
      <boxGeometry args={[ADDON_SIZE.w, ADDON_SIZE.h, ADDON_SIZE.d]} />
      <meshStandardMaterial
        color="#f4e9d2"
        emissive="#996c3e"
        emissiveIntensity={0.32}
        metalness={0.25}
        roughness={0.45}
      />
    </mesh>
  );
}

function Connector({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const reveal = REVEAL_FIRST_ADDON + index * REVEAL_STAGGER - 0.15;

  // Straight cylinder from platform-bottom to addon-top.
  const startY = PLATFORM.y - PLATFORM.h / 2;
  const endY = ADDON_Y + ADDON_SIZE.h / 2;
  const start = new THREE.Vector3(PLATFORM.x, startY, 0);
  const end = new THREE.Vector3(ADDON_X[index], endY, 0);
  const mid = start.clone().lerp(end, 0.5);
  const dir = end.clone().sub(start);
  const len = dir.length();

  // Cylinder default points along Y. Compute orientation.
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize(),
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cy = t % CYCLE;
    const fadeStart = CYCLE - FADE_DUR;
    let s: number;
    if (cy < reveal) s = 0;
    else if (cy < reveal + REVEAL_DUR) s = easeOutCubic((cy - reveal) / REVEAL_DUR);
    else if (cy < fadeStart) s = 1;
    else s = 1 - easeOutCubic((cy - fadeStart) / FADE_DUR);

    if (ref.current) {
      ref.current.scale.set(1, s, 1);
    }
  });

  return (
    <mesh ref={ref} position={mid.toArray()} quaternion={quat}>
      <cylinderGeometry args={[0.012, 0.012, len, 8, 1, false]} />
      <meshBasicMaterial color="#fb724e" toneMapped={false} transparent opacity={0.85} />
    </mesh>
  );
}

function PulseParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const total = ADDON_X.length * PULSE_PER_LINE;

  // Per-pulse: lane index, base offset, speed, direction (1 = down, -1 = up).
  const pulses = useMemo(() => {
    const out: { lane: number; offset: number; speed: number; dir: 1 | -1 }[] = [];
    for (let lane = 0; lane < ADDON_X.length; lane++) {
      for (let i = 0; i < PULSE_PER_LINE; i++) {
        out.push({
          lane,
          offset: i / PULSE_PER_LINE,
          speed: 0.18 + Math.random() * 0.12,
          dir: Math.random() > 0.6 ? -1 : 1, // mostly downward (capital deployed), some return
        });
      }
    }
    return out;
  }, []);

  // Precompute lane endpoints for speed.
  const laneEndpoints = useMemo(() => {
    return ADDON_X.map((x) => ({
      start: new THREE.Vector3(PLATFORM.x, PLATFORM.y - PLATFORM.h / 2, 0),
      end: new THREE.Vector3(x, ADDON_Y + ADDON_SIZE.h / 2, 0),
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cy = t % CYCLE;
    if (!meshRef.current) return;

    pulses.forEach((p, i) => {
      // Only render after that lane's connector revealed.
      const reveal = REVEAL_FIRST_ADDON + p.lane * REVEAL_STAGGER + REVEAL_DUR;
      const fadeStart = CYCLE - FADE_DUR;
      let alphaScale = 1;
      if (cy < reveal) alphaScale = 0;
      else if (cy > fadeStart) alphaScale = 1 - (cy - fadeStart) / FADE_DUR;

      const tt = (p.offset + t * p.speed * p.dir) % 1;
      const local = (tt + 1) % 1; // wrap negative
      const seg = laneEndpoints[p.lane];
      dummy.position.lerpVectors(seg.start, seg.end, local);
      const baseScale = 0.04 * alphaScale;
      dummy.scale.setScalar(baseScale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, total]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#ffe0b3" toneMapped={false} />
    </instancedMesh>
  );
}

function GroundShadow() {
  // Subtle disc beneath to ground the structure.
  return (
    <mesh position={[0, ADDON_Y - ADDON_SIZE.h / 2 - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2.4, 48]} />
      <meshBasicMaterial color="#0a1532" transparent opacity={0.6} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 4]} intensity={1.1} color="#fff0d8" />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#cbd6ff" />
      <GroundShadow />
      <PlatformBox />
      {ADDON_X.map((_, i) => (
        <AddOn key={i} index={i} />
      ))}
      {ADDON_X.map((_, i) => (
        <Connector key={i} index={i} />
      ))}
      <PulseParticles />
    </>
  );
}

export function BuyAndBuildTreeAnimation() {
  return (
    <LabCanvas camera={[0, 0.4, 4.5]} fov={48}>
      <Scene />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.55} luminanceThreshold={0.4} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
