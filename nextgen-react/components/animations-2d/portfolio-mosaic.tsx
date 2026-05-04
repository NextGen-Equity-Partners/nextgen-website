import type { CSSProperties } from "react";

const TILES = [
  { label: "Core", fromX: 12, fromY: 18, toX: 35, toY: 35 },
  { label: "AI", fromX: 86, fromY: 14, toX: 55, toY: 31 },
  { label: "Ops", fromX: 8, fromY: 78, toX: 29, toY: 55 },
  { label: "Sales", fromX: 80, fromY: 84, toX: 52, toY: 58 },
  { label: "Data", fromX: 54, fromY: 5, toX: 43, toY: 47 },
];

/**
 * Portfolio Mosaic · separate operating modules dock into one investable
 * platform, then emit a subtle value ring.
 */
export function PortfolioMosaic2D() {
  return (
    <div className="ad2d-stage ad2d-mosaic" aria-hidden="true">
      <div className="ad2d-mosaic-grid"></div>
      <span className="ad2d-mosaic-ring one"></span>
      <span className="ad2d-mosaic-ring two"></span>
      <div className="ad2d-mosaic-core">
        <em>NextGen</em>
        <strong>Platform</strong>
      </div>
      {TILES.map((tile, index) => (
        <span
          key={tile.label}
          className="ad2d-mosaic-tile"
          style={
            {
              "--from-x": `${tile.fromX}%`,
              "--from-y": `${tile.fromY}%`,
              "--to-x": `${tile.toX}%`,
              "--to-y": `${tile.toY}%`,
              "--i": index,
            } as CSSProperties
          }
        >
          {tile.label}
        </span>
      ))}
      <span className="ad2d-mosaic-value">+ Synergy</span>
    </div>
  );
}
