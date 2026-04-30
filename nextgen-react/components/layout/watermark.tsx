"use client";

import { useEffect, useState } from "react";

export function Watermark() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY || 0;

    const sync = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY;
      if (Math.abs(delta) < 4) return;

      setCollapsed(delta > 0 && y > 12);
      lastY = y;
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <span className={`site-watermark${collapsed ? " is-collapsed" : ""}`} aria-hidden="true">
      <img src="/assets/logo-white.svg" alt="" />
    </span>
  );
}
