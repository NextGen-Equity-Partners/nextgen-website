"use client";

import { LiquidMetal } from "@paper-design/shaders-react";

/**
 * Deep blue background with slowly drifting color glows + a real-time
 * WebGL liquid-metal organic glass form on the right.
 */
export function HeroShader() {
  return (
    <>
      <div className="hero-bg-base" aria-hidden="true" />
      <div className="hero-bg-glow" aria-hidden="true">
        <div className="glow glow-1" />
        <div className="glow glow-2" />
        <div className="glow glow-3" />
      </div>
      <div className="liquid-metal-stage" aria-hidden="true">
        <LiquidMetal
          style={{ width: "100%", height: "100%" }}
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
          colorBack="rgba(0, 0, 0, 0)"
          colorTint="#FB724E"
          shape="metaballs"
          repetition={2}
          softness={0.95}
          shiftRed={0.6}
          shiftBlue={0.18}
          distortion={0.32}
          contour={1.0}
          angle={35}
          speed={0.1}
          scale={1.0}
          offsetX={0.22}
          offsetY={-0.3}
        />
      </div>
    </>
  );
}
