/**
 * Compound Curve · single exponential line with milestone markers.
 * Pure CSS animation: SVG path stroke-dashoffset draws in, markers fade in
 * along the curve, area fill grows underneath.
 */
export function CompoundCurve2D() {
  return (
    <div className="ad2d-stage ad2d-compound" aria-hidden="true">
      <div className="ad2d-compound-grid"></div>
      <svg className="ad2d-compound-svg" viewBox="0 0 320 180" preserveAspectRatio="none">
        <path
          className="ad2d-compound-area"
          d="M16,160 C 60,156 120,138 180,108 S 270,28 304,16 L 304,168 L 16,168 Z"
        />
        <path
          className="ad2d-compound-line"
          d="M16,160 C 60,156 120,138 180,108 S 270,28 304,16"
        />
      </svg>
      <span className="ad2d-compound-marker m1"></span>
      <span className="ad2d-compound-marker m2"></span>
      <span className="ad2d-compound-marker m3"></span>
      <span className="ad2d-compound-marker m4"></span>
      <span className="ad2d-compound-tip"></span>
      <span className="ad2d-compound-axis y1">Y1</span>
      <span className="ad2d-compound-axis y3">Y3</span>
      <span className="ad2d-compound-axis y5">Y5</span>
      <span className="ad2d-compound-axis y10">Y10</span>
    </div>
  );
}
