"use client";

import type { ReactNode } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
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
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "160px 0px", threshold: 0 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="lab-canvas-stage">
      <Canvas
        dpr={[1, 1.35]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: camera, fov }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(bg, 1);
          gl.toneMappingExposure = 1.05;
          scene.fog = null;
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
