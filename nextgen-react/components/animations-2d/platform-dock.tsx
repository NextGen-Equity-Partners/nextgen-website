import type { CSSProperties } from "react";

/**
 * Platform Dock · central platform circle, smaller add-on cubes drift in
 * from random angles, snap onto the surface, dissolve in. The platform
 * gently breathes to suggest growth.
 */

type Dock = {
  /** start angle in degrees (0 = right, 90 = bottom). */
  angle: number;
  /** start distance from centre, in px. */
  distance: number;
  /** size of the cube in px. */
  size: number;
};

const DOCKS: Dock[] = [
  { angle: 18, distance: 150, size: 14 },
  { angle: 88, distance: 130, size: 11 },
  { angle: 152, distance: 145, size: 13 },
  { angle: 212, distance: 138, size: 12 },
  { angle: 268, distance: 158, size: 15 },
  { angle: 322, distance: 134, size: 11 },
];

export function PlatformDock2D() {
  return (
    <div className="ad2d-stage ad2d-platform" aria-hidden="true">
      <span className="ad2d-platform-halo"></span>
      <span className="ad2d-platform-core"></span>
      {DOCKS.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const x = Math.cos(rad) * d.distance;
        const y = Math.sin(rad) * d.distance;
        const style: CSSProperties = {
          "--start-x": `${x}px`,
          "--start-y": `${y}px`,
          "--size": `${d.size}px`,
          "--i": i,
        } as CSSProperties;
        return <span key={i} className="ad2d-platform-cube" style={style}></span>;
      })}
    </div>
  );
}
