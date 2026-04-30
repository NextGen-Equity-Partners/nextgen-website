const CELLS = Array.from({ length: 35 }, (_, index) => index);

export function MarketMap2D() {
  return (
    <div className="ad2d-stage ad2d-map" aria-hidden="true">
      <div className="ad2d-map-grid">
        {CELLS.map((cell) => (
          <span
            key={cell}
            className={`ad2d-cell ${cell % 7 === 2 || cell % 11 === 0 ? "hot" : ""}`}
          ></span>
        ))}
      </div>
      <span className="ad2d-scan-line"></span>
      <span className="ad2d-map-pin primary"></span>
      <span className="ad2d-map-pin secondary"></span>
      <span className="ad2d-map-pin tertiary"></span>
    </div>
  );
}
