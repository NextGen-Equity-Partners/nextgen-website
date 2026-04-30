"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LenisHandle = { lenis?: { raf: (time: number) => void } } | null;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisHandle>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // Update ScrollTrigger on every Lenis scroll event
    const onScroll = () => ScrollTrigger.update();
    (lenis as unknown as { on: (e: string, fn: () => void) => void }).on(
      "scroll",
      onScroll
    );

    // Drive Lenis from GSAP's ticker (single source of truth for animation timing)
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false, // we drive raf via gsap.ticker
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
      ref={lenisRef as never}
    >
      {children}
    </ReactLenis>
  );
}

export { useLenis };
