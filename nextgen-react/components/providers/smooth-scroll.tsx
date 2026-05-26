"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import type { ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis drives its own RAF (autoRaf: true). We only sync ScrollTrigger to
 * Lenis's scroll events. This avoids race conditions where the ref is null
 * during the first useEffect tick — which froze the page scroll entirely.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Disable GSAP's lag smoothing so ScrollTrigger updates feel immediate.
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 0.7,
        smoothWheel: true,
        wheelMultiplier: 1.4,
      }}
      onScroll={() => ScrollTrigger.update()}
    >
      {children}
    </ReactLenis>
  );
}
