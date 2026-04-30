import type { CSSProperties } from "react";

const STAGES: { label: string; count: string; width: number }[] = [
  { label: "Sourcing", count: "100", width: 100 },
  { label: "Pruefung", count: "50", width: 76 },
  { label: "LOI", count: "12", width: 52 },
  { label: "Closing", count: "3", width: 30 },
];

const DROPS = Array.from({ length: 6 }, (_, i) => i);

/**
 * Deal Funnel · vertical attrition trichter. Each stage label fades in
 * sequentially with its count. Drops fall along a centered axis, vanish
 * at decreasing depths to suggest filtering at every stage.
 */
export function DealFunnel2D() {
  return (
    <div className="ad2d-stage ad2d-funnel" aria-hidden="true">
      <div className="ad2d-funnel-axis"></div>
      <div className="ad2d-funnel-stages">
        {STAGES.map((s, i) => (
          <div
            key={s.label}
            className="ad2d-funnel-stage"
            style={{ "--width": `${s.width}%`, "--i": i } as CSSProperties}
          >
            <span className="ad2d-funnel-bar"></span>
            <span className="ad2d-funnel-meta">
              <em>{s.label}</em>
              <strong>{s.count}</strong>
            </span>
          </div>
        ))}
      </div>
      {DROPS.map((i) => (
        <span
          key={i}
          className="ad2d-funnel-drop"
          style={{ "--i": i, "--life": `${0.55 + (i % 4) * 0.18}` } as CSSProperties}
        ></span>
      ))}
    </div>
  );
}
