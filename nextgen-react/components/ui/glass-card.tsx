import type { ReactNode } from "react";
import { GlassIcon, type IconKey } from "./glass-icon";

type GlassCardProps = {
  num?: string;
  title: ReactNode;
  body: ReactNode;
  icon?: IconKey;
  delay?: 1 | 2 | 3 | 4;
};

/**
 * Glass card with optional eyebrow label (.num), heading, body and
 * optional inline icon. `delay` maps to .rv-d1..rv-d4 reveal stagger.
 */
export function GlassCard({ num, title, body, icon, delay }: GlassCardProps) {
  const delayClass = delay ? ` rv-d${delay}` : "";
  const hasEyebrow = !!num;
  return (
    <div className={`glass-card rv${delayClass}`}>
      {(icon || hasEyebrow) && (
        icon ? (
          <div className="gc-num-row">
            <span className="gc-icon"><GlassIcon name={icon} /></span>
            {hasEyebrow && <div className="num">{num}</div>}
          </div>
        ) : (
          <div className="num">{num}</div>
        )
      )}
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}
