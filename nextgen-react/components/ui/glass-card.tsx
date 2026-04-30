import type { ReactNode } from "react";
import { GlassIcon, type IconKey } from "./glass-icon";

type GlassCardProps = {
  num: string;
  title: ReactNode;
  body: ReactNode;
  icon?: IconKey;
  delay?: 1 | 2 | 3 | 4;
};

/**
 * Glass card with eyebrow label (.num), heading, body and optional inline icon.
 * `delay` maps to .rv-d1..rv-d4 reveal stagger.
 *
 * Replaces the legacy auto-icon DOM mutation in shared.js — pass `icon` explicitly.
 */
export function GlassCard({ num, title, body, icon, delay }: GlassCardProps) {
  const delayClass = delay ? ` rv-d${delay}` : "";
  return (
    <div className={`glass-card rv${delayClass}`}>
      {icon ? (
        <div className="gc-num-row">
          <span className="gc-icon"><GlassIcon name={icon} /></span>
          <div className="num">{num}</div>
        </div>
      ) : (
        <div className="num">{num}</div>
      )}
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}
