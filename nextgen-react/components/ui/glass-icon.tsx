import type { ReactElement } from "react";

const PATHS: Record<string, ReactElement> = {
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9.5h4.5a2 2 0 010 4H10a2 2 0 000 4h5M12 6.5v11" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="0.5" />
      <path d="M9 6V3M12 6V3M15 6V3M9 21v-3M12 21v-3M15 21v-3M6 9H3M6 12H3M6 15H3M21 9h-3M21 12h-3M21 15h-3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3.5" />
      <path d="M3 19a6 6 0 0112 0M16.5 11.5a3 3 0 100-6 3 3 0 000 6zM21 19a5 5 0 00-7-4.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </>
  ),
  chart: <path d="M3 20h18M6 16l3-3 3 2 4-5 5 4" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
    </>
  ),
  handshake: <path d="M5 13l4-4 3 3 4-4 3 3M5 13l3 3 4-4M16 11l4 4-3 3-3-3" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-9 7-15 15-15-1 8-6 15-15 15z" />
      <path d="M5 19l8-8" />
    </>
  ),
  layers: (
    <>
      <path d="M12 4l9 5-9 5-9-5 9-5z" />
      <path d="M3 14l9 5 9-5M3 19l9 5 9-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2z" />
    </>
  ),
  plus: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  arrowOut: <path d="M5 19l14-14M14 5h5v5" />,
  flag: <path d="M5 4v17M5 4h12l-3 4 3 4H5" />,
  horizon: (
    <>
      <path d="M3 17h18" />
      <circle cx="12" cy="13" r="4" />
      <path d="M3 12l3-3M21 12l-3-3" />
    </>
  ),
  spark: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2" />,
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

export type IconKey = keyof typeof PATHS;

export function GlassIcon({ name }: { name: IconKey }) {
  return <svg viewBox="0 0 24 24">{PATHS[name]}</svg>;
}
