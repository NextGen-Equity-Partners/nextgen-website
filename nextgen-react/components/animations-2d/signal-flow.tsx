export function SignalFlow2D() {
  return (
    <div className="ad2d-stage ad2d-signal" aria-hidden="true">
      <div className="ad2d-signal-track main"></div>
      <div className="ad2d-signal-track branch-a"></div>
      <div className="ad2d-signal-track branch-b"></div>
      <span className="ad2d-node source"></span>
      <span className="ad2d-node diligence"></span>
      <span className="ad2d-node partner"></span>
      <span className="ad2d-node close"></span>
      <span className="ad2d-pulse p1"></span>
      <span className="ad2d-pulse p2"></span>
      <span className="ad2d-pulse p3"></span>
    </div>
  );
}
