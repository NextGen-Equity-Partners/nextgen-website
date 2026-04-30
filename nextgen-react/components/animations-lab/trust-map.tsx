import type { CSSProperties } from "react";

const NODES = ["Unternehmer", "Team", "Kunden", "NextGen", "Standort"];

export function TrustMapAnimation() {
  return (
    <div className="trust-map-demo" aria-hidden="true">
      <svg className="trust-lines" viewBox="0 0 320 220">
        <path d="M160 110L72 58M160 110l88-52M160 110l86 90M160 110l-88 90M160 110V30" />
      </svg>
      {NODES.map((node, index) => (
        <div key={node} className="trust-node" style={{ "--i": index } as CSSProperties}>
          {node}
        </div>
      ))}
    </div>
  );
}
