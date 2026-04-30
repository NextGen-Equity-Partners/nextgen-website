"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

type LabCanvasProps = {
  children: ReactNode;
  /** Camera position. Default suits a tight subject around origin. */
  camera?: [number, number, number];
  /** Field of view. */
  fov?: number;
  /** Background color (hex int). Default deep navy from design tokens. */
  bg?: number;
};

/**
 * Shared R3F canvas wrapper for all lab scenes.
 * Owns: DPR, GL settings, Suspense boundary, dark canvas clear color.
 * Each scene is responsible for its own lighting, camera control, and EffectComposer
 * (postprocessing varies per scene).
 */
export function LabCanvas({
  children,
  camera = [0, 0, 5.5],
  fov = 38,
  bg = 0x050d1f,
}: LabCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: camera, fov }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(bg, 1);
        gl.toneMappingExposure = 1.05;
        scene.fog = null;
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
