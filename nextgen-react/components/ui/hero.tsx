import type { ReactNode } from "react";

type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  /** Render CTA buttons. */
  ctas?: ReactNode;
  /** Add `subpage` class for non-home heroes (smaller). */
  variant?: "home" | "subpage";
};

/**
 * Standard hero block. Title supports rich JSX so callers can stress words via
 * <span className="bold">. The scroll cue is global (see ScrollCue provider).
 */
export function Hero({ eyebrow, title, sub, ctas, variant = "home" }: HeroProps) {
  const isHome = variant === "home";
  return (
    <section className={`hero${isHome ? "" : " subpage"}`}>
      {eyebrow && <div className="hero-eyebrow">{eyebrow}</div>}
      <h1 className="display hero-title">{title}</h1>
      {sub && <p className="hero-sub">{sub}</p>}
      {ctas && <div className="hero-ctas">{ctas}</div>}
    </section>
  );
}
