import type { CSSProperties } from "react";

const BARS = [34, 48, 64, 78, 92];

export function ValueBridge2D() {
  return (
    <div className="ad2d-stage ad2d-bridge" aria-hidden="true">
      <div className="ad2d-bridge-grid"></div>
      <svg className="ad2d-bridge-line" viewBox="0 0 320 180" preserveAspectRatio="none">
        <polyline points="28,134 92,112 156,86 220,62 284,28" />
      </svg>
      <div className="ad2d-bars">
        {BARS.map((height, index) => (
          <span
            key={height}
            className="ad2d-bar"
            style={{ "--bar-height": `${height}%`, "--i": index } as CSSProperties}
          ></span>
        ))}
      </div>
      <span className="ad2d-bridge-dot"></span>
    </div>
  );
}
