"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Trail } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene 3 · Orbit-Gruppe
 * Story: Eine Gruppe, die langfristig um einen Kern wächst — verschiedene
 * Geschwindigkeiten, verschiedene Bahnen, stabil über die Zeit.
 *
 * Tech: iridescent center body slowly morphing, satellites on tilted ellipses
 * with drei <Trail> for fading streaks, slow camera orbit, bloom + chromatic
 * aberration for the cinematic feel.
 */

type Orbit = {
  radius: number;
  ratio: number; // y/x ratio for ellipse eccentricity
  tilt: THREE.Euler;
  speed: number;
  phase: number;
  size: number;
  color: string;
};

const ORBITS: Orbit[] = [
  { radius: 1.6, ratio: 0.92, tilt: new THREE.Euler(0.15, 0.2, 0.05), speed: 0.55, phase: 0, size: 0.07, color: "#ffd6b3" },
  { radius: 2.1, ratio: 0.88, tilt: new THREE.Euler(-0.2, 0.5, 0.1), speed: 0.38, phase: 1.4, size: 0.06, color: "#ffe4cc" },
  { radius: 2.55, ratio: 0.82, tilt: new THREE.Euler(0.4, -0.3, 0.12), speed: 0.27, phase: 2.7, size: 0.085, color: "#a8c4ff" },
  { radius: 1.92, ratio: 0.78, tilt: new THREE.Euler(-0.45, -0.6, -0.08), speed: 0.46, phase: 4.1, size: 0.065, color: "#cfd9ff" },
  { radius: 2.85, ratio: 0.86, tilt: new THREE.Euler(0.05, 0.85, 0.18), speed: 0.21, phase: 5.5, size: 0.075, color: "#fff1de" },
];

function Satellite({ orbit }: { orbit: Orbit }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const a = t * orbit.speed + orbit.phase;
    const local = new THREE.Vector3(
      Math.cos(a) * orbit.radius,
      Math.sin(a) * orbit.radius * orbit.ratio,
      Math.sin(a * 0.4) * 0.18,
    );
    local.applyEuler(orbit.tilt);
    if (ref.current) ref.current.position.copy(local);
  });

  return (
    <Trail
      width={0.7}
      length={5}
      color={new THREE.Color(orbit.color)}
      attenuation={(w) => w * w}
      decay={1.4}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[orbit.size, 24, 24]} />
        <meshStandardMaterial
          color={orbit.color}
          emissive={orbit.color}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

function Center() {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.18;
      ref.current.rotation.x = Math.sin(t * 0.13) * 0.4;
      const breath = 1 + Math.sin(t * 0.7) * 0.04;
      ref.current.scale.setScalar(breath);
    }
    if (matRef.current) {
      // Drift the iridescence band over time so the center reads "alive".
      matRef.current.iridescenceIOR = 1.3 + Math.sin(t * 0.4) * 0.25;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.62, 6]} />
      <meshPhysicalMaterial
        ref={matRef}
        color="#1a2950"
        metalness={0.65}
        roughness={0.18}
        clearcoat={1}
        clearcoatRoughness={0.05}
        iridescence={1}
        iridescenceIOR={1.45}
        iridescenceThicknessRange={[120, 760]}
        emissive="#3a2a18"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function Camera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.07;
    const r = 5.6;
    state.camera.position.x = Math.cos(t) * r;
    state.camera.position.z = Math.sin(t) * r;
    state.camera.position.y = 0.6 + Math.sin(t * 1.5) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const orbits = useMemo(() => ORBITS, []);
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} color="#ffb37a" intensity={2} distance={6} decay={1.5} />
      <directionalLight position={[5, 4, 4]} intensity={0.7} color="#cfd9ff" />
      <Environment preset="night" environmentIntensity={0.45} />
      <Camera />
      <Center />
      {orbits.map((o, i) => (
        <Satellite key={i} orbit={o} />
      ))}
    </>
  );
}

export function OrbitGroupAnimation() {
  return (
    <LabCanvas camera={[0, 0.6, 5.6]} fov={40}>
      <Scene />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.95} luminanceThreshold={0.22} luminanceSmoothing={0.4} mipmapBlur />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.001, 0.0014]}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </LabCanvas>
  );
}
