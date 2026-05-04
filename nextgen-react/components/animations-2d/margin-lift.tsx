import type { CSSProperties } from "react";

const LEVERS = [
  { label: "Price", value: 42 },
  { label: "Util.", value: 58 },
  { label: "Mix", value: 73 },
  { label: "AI", value: 88 },
];

/**
 * Margin Lift · operational levers rise in sequence and resolve into one
 * EBITDA lift. Uses plain bars, path drawing and small numeric accents.
 */
export function MarginLift2D() {
  return (
    <div className="ad2d-stage ad2d-margin" aria-hidden="true">
      <div className="ad2d-margin-grid"></div>
      <div className="ad2d-margin-bars">
        {LEVERS.map((lever, index) => (
          <span
            key={lever.label}
            className="ad2d-margin-bar"
            style={{ "--h": `${lever.value}%`, "--i": index } as CSSProperties}
          >
            <i></i>
            <b>{lever.label}</b>
          </span>
        ))}
      </div>
      <svg className="ad2d-margin-line" viewBox="0 0 320 170" preserveAspectRatio="none">
        <path d="M22,138 C 82,132 103,118 142,96 S 212,62 292,36" />
      </svg>
      <div className="ad2d-margin-result">
        <em>EBITDA</em>
        <strong>+280 bps</strong>
      </div>
    </div>
  );
}
