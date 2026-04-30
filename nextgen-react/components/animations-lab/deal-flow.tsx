import type { CSSProperties } from "react";

const STEPS = ["Gespräch", "Prüfung", "Closing", "Aufbau"];

export function DealFlowAnimation() {
  return (
    <div className="deal-flow-demo" aria-hidden="true">
      <div className="deal-flow-line" />
      {STEPS.map((step, index) => (
        <div key={step} className="deal-step" style={{ "--i": index } as CSSProperties}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </div>
      ))}
      <div className="deal-pulse" />
    </div>
  );
}
