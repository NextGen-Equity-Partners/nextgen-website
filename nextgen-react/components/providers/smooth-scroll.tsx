"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis drives its own RAF (autoRaf: true). We only sync ScrollTrigger to
 * Lenis's scroll events.
 *
 * On touch devices we skip Lenis entirely — native iOS/Android momentum
 * scrolling feels far better than emulated smooth scroll.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!isTouch);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: true,
      }}
      onScroll={() => ScrollTrigger.update()}
    >
      {children}
    </ReactLenis>
  );
}
