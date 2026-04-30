"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Shard({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.12;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.8}
          roughness={0.05}
          ior={1.4}
          chromaticAberration={0.05}
          backside
          color="#cfd8e8"
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -3, 2]} intensity={0.4} color="#4060a0" />
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
      <Shard position={[-2.6, 0.4, 0]} rotation={[0.3, 0.5, 0]} scale={0.85} />
      <Shard position={[2.4, -0.3, -1]} rotation={[-0.2, 0.8, 0.3]} scale={0.7} />
      <Shard position={[0, 0.8, -2]} rotation={[0.5, -0.4, 0.2]} scale={1.1} />
      <Shard position={[-1, -0.9, -1.2]} rotation={[0.1, 1.2, -0.3]} scale={0.55} />
    </>
  );
}

export function FloatingShards() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.55,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
