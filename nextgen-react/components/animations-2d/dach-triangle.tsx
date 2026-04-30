/**
 * DACH Triangle · three nodes (DE/AT/CH) connected with a triangle path,
 * pulses traveling along edges in sequence. Background: subtle dotted map.
 */
export function DachTriangle2D() {
  return (
    <div className="ad2d-stage ad2d-dach" aria-hidden="true">
      <div className="ad2d-dach-dots"></div>
      <svg className="ad2d-dach-svg" viewBox="0 0 200 180" preserveAspectRatio="xMidYMid meet">
        <path className="ad2d-dach-edge edge-de-at" d="M44,52 L156,58" />
        <path className="ad2d-dach-edge edge-at-ch" d="M156,58 L100,138" />
        <path className="ad2d-dach-edge edge-ch-de" d="M100,138 L44,52" />
      </svg>
      <span className="ad2d-dach-node node-de">
        <i></i>
        <b>DE</b>
      </span>
      <span className="ad2d-dach-node node-at">
        <i></i>
        <b>AT</b>
      </span>
      <span className="ad2d-dach-node node-ch">
        <i></i>
        <b>CH</b>
      </span>
      <span className="ad2d-dach-pulse pulse-1"></span>
      <span className="ad2d-dach-pulse pulse-2"></span>
      <span className="ad2d-dach-pulse pulse-3"></span>
    </div>
  );
}
