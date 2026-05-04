import type { CSSProperties } from "react";

const CELLS = Array.from({ length: 28 }, (_, index) => index);

/**
 * AI Ops Grid · data cells, model layer and operating cadence are shown as
 * one calm system instead of a generic neural-network cliche.
 */
export function AiOpsGrid2D() {
  return (
    <div className="ad2d-stage ad2d-aiops" aria-hidden="true">
      <div className="ad2d-aiops-grid">
        {CELLS.map((cell) => (
          <span key={cell} style={{ "--i": cell } as CSSProperties}></span>
        ))}
      </div>
      <span className="ad2d-aiops-scan"></span>
      <span className="ad2d-aiops-beam b1"></span>
      <span className="ad2d-aiops-beam b2"></span>
      <div className="ad2d-aiops-core">
        <span>DATA</span>
        <strong>AI OPS</strong>
        <span>ACTION</span>
      </div>
      <span className="ad2d-aiops-token t1">KPI</span>
      <span className="ad2d-aiops-token t2">CRM</span>
      <span className="ad2d-aiops-token t3">FIN</span>
    </div>
  );
}
