"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LabCanvas } from "./_canvas";

/**
 * Scene 4 · Magnetische Konvergenz
 * Story: Kapital, Erfahrung und Technologie strömen aus verschiedenen Richtungen
 * an einen Mittelpunkt — ziehen ein, fusionieren, leuchten auf.
 *
 * Tech: 3000 GPU-driven Points. Position is fully derived in the vertex shader
 * from a per-particle `seed` + `lifeOffset` and the global `uTime`, so there is
 * zero CPU-side per-frame computation. A cheap curl-noise approximation adds
 * organic turbulence as particles spiral inward. Additive blending + bloom for
 * the lift.
 */

const COUNT = 1800;

const VERT = /* glsl */ `
  attribute vec3 seed;
  attribute float lifeOffset;
  uniform float uTime;
  uniform float uSize;
  varying float vAlpha;

  // Lightweight curl-noise approximation – good enough for organic drift.
  vec3 curl(vec3 p) {
    float s = sin(p.x * 1.3) + cos(p.y * 1.7);
    float c = cos(p.z * 1.1) + sin(p.x * 0.9);
    return vec3(
      cos(p.y * 1.5 + s) - sin(p.z * 1.2),
      cos(p.z * 1.4) - sin(p.x * 1.6 + c),
      sin(p.x * 1.7) + cos(p.y * 1.3 - s)
    );
  }

  void main() {
    float life = mod(uTime * 0.18 + lifeOffset, 1.0); // 0..1 each 5.5s
    float r = mix(3.6, 0.05, life);

    float angle = seed.x * 6.28318 + uTime * (0.18 + seed.y * 0.35);
    float lat = (seed.y - 0.5) * 2.6;

    vec3 base = vec3(
      cos(angle) * cos(lat) * r,
      sin(lat) * r * 0.68,
      sin(angle) * cos(lat) * r
    );

    // More turbulence in early life, settles as it approaches the core.
    vec3 turb = curl(base * 0.45 + uTime * 0.18) * 0.55 * smoothstep(0.0, 0.55, life);
    vec3 pos = base + turb;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Smaller as it approaches the singularity.
    float ps = uSize * (1.05 - 0.65 * life);
    float depth = max(1.15, -mv.z);
    gl_PointSize = min(ps * (180.0 / depth), 16.0);

    vAlpha = smoothstep(0.0, 0.12, life) * (1.0 - smoothstep(0.88, 1.0, life));
  }
`;

const FRAG = /* glsl */ `
  varying float vAlpha;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float falloff = pow(1.0 - dist * 2.0, 1.4);
    vec3 col = mix(uColorA, uColorB, vAlpha);
    gl_FragColor = vec4(col, falloff * vAlpha * 0.32);
  }
`;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    const lifeOffsets = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // initial positions don't matter — vertex shader computes them.
      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      seeds[i * 3 + 0] = Math.random();
      seeds[i * 3 + 1] = Math.random();
      seeds[i * 3 + 2] = Math.random();
      lifeOffsets[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("seed", new THREE.BufferAttribute(seeds, 3));
    g.setAttribute("lifeOffset", new THREE.BufferAttribute(lifeOffsets, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 7);
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 2.8 },
      uColorA: { value: new THREE.Color("#5a78d4") },
      uColorB: { value: new THREE.Color("#ffc18c") },
    }),
    [],
  );

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  // Bright glowing nucleus at the convergence point.
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      const pulse = 0.95 + Math.sin(t * 1.4) * 0.08;
      ref.current.scale.setScalar(pulse);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshBasicMaterial color="#fff0d4" toneMapped={false} />
    </mesh>
  );
}

export function MagneticConvergenceAnimation() {
  return (
    <LabCanvas camera={[0, 0, 5.8]} fov={42}>
      <Particles />
      <Core />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.72} luminanceThreshold={0.32} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </LabCanvas>
  );
}
