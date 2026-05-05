"use client";

import { useEffect, useState } from "react";

/**
 * Hair-thin scroll-progress bar pinned to the very top of the viewport.
 * Fills left → right as the user scrolls through the page. Apple/Safari
 * style: passive ambient feedback, no controls, no labels.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const range =
        document.documentElement.scrollHeight - window.innerHeight;
      const p =
        range > 0
          ? Math.max(0, Math.min(1, window.scrollY / range))
          : 0;
      setProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
