import type { CSSProperties } from "react";

const LAYERS = [
  ["01", "Daten"],
  ["02", "Automatisierung"],
  ["03", "Entscheidung"],
  ["04", "Umsetzung"],
];

export function AiStackAnimation() {
  return (
    <div className="ai-stack-demo" aria-hidden="true">
      {LAYERS.map(([num, label], index) => (
        <div key={label} className="ai-layer" style={{ "--i": index } as CSSProperties}>
          <span>{num}</span>
          <strong>{label}</strong>
        </div>
      ))}
      <div className="ai-scan" />
    </div>
  );
}
