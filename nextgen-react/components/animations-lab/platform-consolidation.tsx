"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene 1 · Plattform & Add-ons (Buy-and-Build)
 * Story: Eine Plattform im Zentrum. Add-on-Unternehmen fliegen ein, docken
 * an der Oberfläche an, lösen sich in die Plattform auf — und die Plattform
 * wächst sichtbar mit jedem Andocken.
 *
 * Tech: matte warm sphere as platform, small cubes scheduled to spawn and
 * approach surface points on a 16s loop. Sphere radius is a function of how
 * many add-ons have completed docking. Soft warm lighting, low bloom — no
 * neon. Slow camera orbit.
 */

const DOCK_COUNT = 12;
const CYCLE = 16; // seconds per loop
const APPROACH_DURATION = 2.0;
const ABSORB_DURATION = 0.55;
const SPHERE_BASE_RADIUS = 0.55;
const SPHERE_MAX_RADIUS = 1.05;

type Dock = {
  spawnAt: number;
  start: THREE.Vector3;
  surface: THREE.Vector3;
  size: number;
  rotSeed: number;
  rotAxis: THREE.Vector3;
};

function makeDocks(): Dock[] {
  const out: Dock[] = [];
  for (let i = 0; i < DOCK_COUNT; i++) {
    // Stagger across the first 90% of the cycle.
    const spawnAt = (i / DOCK_COUNT) * CYCLE * 0.9;
    // Random direction on a sphere (uniform).
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta),
    );
    const start = dir.clone().multiplyScalar(3.8 + Math.random() * 1.4);
    const rotAxis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    out.push({
      spawnAt,
      start,
      surface: dir.clone(),
      size: 0.135 + Math.random() * 0.04,
      rotSeed: Math.random() * Math.PI * 2,
      rotAxis,
    });
  }
  return out;
}

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function PlatformScene() {
  const docks = useMemo(makeDocks, []);
  const sphereRef = useRef<THREE.Mesh>(null);
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const currentScaleRef = useRef(SPHERE_BASE_RADIUS);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cycleT = t % CYCLE;

    // Count add-ons that have already finished their approach (touched the surface).
    let completed = 0;
    for (const d of docks) {
      if (cycleT > d.spawnAt + APPROACH_DURATION) completed++;
    }

    const targetRadius = THREE.MathUtils.lerp(
      SPHERE_BASE_RADIUS,
      SPHERE_MAX_RADIUS,
      completed / DOCK_COUNT,
    );

    // Smooth growth even though completed jumps in steps — feels organic.
    currentScaleRef.current = THREE.MathUtils.lerp(currentScaleRef.current, targetRadius, 0.06);
    const sphereScale = currentScaleRef.current;

    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(sphereScale);
      sphereRef.current.rotation.y = t * 0.13;
      sphereRef.current.rotation.x = Math.sin(t * 0.18) * 0.14;
    }

    // Update each add-on cube.
    docks.forEach((d, i) => {
      const m = cubeRefs.current[i];
      if (!m) return;
      const localT = cycleT - d.spawnAt;

      // Hidden outside its own active window.
      if (localT < 0 || localT > APPROACH_DURATION + ABSORB_DURATION) {
        m.visible = false;
        return;
      }
      m.visible = true;

      const surfacePoint = d.surface.clone().multiplyScalar(sphereScale);

      if (localT < APPROACH_DURATION) {
        const k = easeOutQuad(localT / APPROACH_DURATION);
        m.position.lerpVectors(d.start, surfacePoint, k);
        // Slight pre-impact stretch toward the platform.
        const stretch = 1 + k * 0.18;
        m.scale.setScalar(d.size * stretch);
      } else {
        // Absorption: stick on surface, scale down to zero.
        const k = (localT - APPROACH_DURATION) / ABSORB_DURATION;
        m.position.copy(surfacePoint);
        m.scale.setScalar(d.size * (1 - k) * (1 - k));
      }

      // Spin while approaching.
      m.rotation.x = d.rotSeed + t * 1.6;
      m.rotation.y = d.rotSeed * 1.7 + t * 1.2;
      m.rotation.z = d.rotSeed * 0.4 + t * 0.8;
    });
  });

  return (
    <group>
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1, 5]} />
        <meshPhysicalMaterial
          color="#d8c8ad"
          metalness={0.32}
          roughness={0.38}
          clearcoat={0.6}
          clearcoatRoughness={0.18}
          emissive="#3b2c1a"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Subtle inner glow shell to give the platform body. */}
      <mesh>
        <icosahedronGeometry args={[SPHERE_BASE_RADIUS * 0.94, 3]} />
        <meshBasicMaterial color="#ffd6a8" transparent opacity={0.07} toneMapped={false} />
      </mesh>

      {docks.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => {
            cubeRefs.current[i] = el;
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#f3e7cf"
            emissive="#a07246"
            emissiveIntensity={0.65}
            metalness={0.2}
            roughness={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraOrbit() {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.06;
    const r = 4.2;
    state.camera.position.x = Math.cos(t) * r;
    state.camera.position.z = Math.sin(t) * r;
    state.camera.position.y = 0.6 + Math.sin(t * 1.4) * 0.15;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function PlatformConsolidationAnimation() {
  return (
    <LabCanvas camera={[3, 0.6, 3.5]} fov={44}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 4]} intensity={1.4} color="#fff0d8" />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#dde5ff" />
      <Environment preset="apartment" environmentIntensity={0.4} />
      <CameraOrbit />
      <PlatformScene />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.5} luminanceThreshold={0.42} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
