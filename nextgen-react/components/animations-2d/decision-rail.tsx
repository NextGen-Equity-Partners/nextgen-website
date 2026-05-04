import type { CSSProperties } from "react";

/**
 * Decision Rail · a deal signal moves through four decision gates while
 * weaker signals quietly drop away. Built as plain SVG + CSS.
 */
export function DecisionRail2D() {
  return (
    <div className="ad2d-stage ad2d-decision" aria-hidden="true">
      <svg className="ad2d-decision-path" viewBox="0 0 360 180" preserveAspectRatio="none">
        <path
          className="ad2d-decision-line base"
          d="M28,122 C 82,96 104,70 152,82 S 218,128 266,92 S 320,54 336,58"
        />
        <path
          className="ad2d-decision-line active"
          d="M28,122 C 82,96 104,70 152,82 S 218,128 266,92 S 320,54 336,58"
        />
      </svg>

      <div className="ad2d-decision-steps">
        {["Lead", "Fit", "IC", "Partner"].map((label, index) => (
          <span key={label} className="ad2d-decision-step" style={{ "--i": index } as CSSProperties}>
            <i></i>
            <b>{label}</b>
          </span>
        ))}
      </div>

      <span className="ad2d-decision-pulse p1"></span>
      <span className="ad2d-decision-pulse p2"></span>
      <span className="ad2d-decision-reject r1"></span>
      <span className="ad2d-decision-reject r2"></span>
      <span className="ad2d-decision-reject r3"></span>
    </div>
  );
}
