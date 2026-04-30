"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * Animated WebGL mesh-gradient background — replaces the legacy hero-scrub.mp4.
 * Fixed fullscreen behind all content. Reuses .hero-image-bg / .hero-image-tint
 * positioning conventions from globals.css.
 *
 * Mobile-optimised: detects touch + small viewport and runs at half speed
 * (cheaper on GPU, easier on battery). prefers-reduced-motion → static.
 */
export function HeroShader() {
  const [profile, setProfile] = useState<"desktop" | "mobile" | "static">(
    "desktop"
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProfile("static");
      return;
    }
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 760;
    setProfile(isTouch || small ? "mobile" : "desktop");
  }, []);

  const speed = profile === "static" ? 0 : profile === "mobile" ? 0.1 : 0.22;

  return (
    <>
      <MeshGradient
        className="hero-image-bg"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -2,
        }}
        colors={["#050d1f", "#0c1a32", "#1a2a48", "#2a1838"]}
        distortion={0.85}
        swirl={0.18}
        speed={speed}
      />
      <div className="hero-image-tint" style={{ zIndex: -1 }} />
    </>
  );
}
