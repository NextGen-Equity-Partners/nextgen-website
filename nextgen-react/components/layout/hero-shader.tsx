"use client";

import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Animated WebGL mesh-gradient background.
 * Fixed fullscreen behind all content. Reuses .hero-image-bg / .hero-image-tint
 * positioning conventions from globals.css.
 */
export function HeroShader() {
  return (
    <>
      <MeshGradient
        className="hero-image-bg"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100svh",
          zIndex: -2,
          filter: "saturate(1.2)",
          transform: "scale(1.06)",
        }}
        colors={["#050d1f", "#0c1a32", "#1a2a48", "#2a1838"]}
        distortion={0.85}
        swirl={0.18}
        speed={0.14}
      />
      <div className="hero-image-tint" style={{ zIndex: -1 }} />
    </>
  );
}
