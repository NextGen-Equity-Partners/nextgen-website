import type { ReactNode } from "react";

type HeroProps = {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  /** Render CTA buttons. */
  ctas?: ReactNode;
  /** Anchor target for the scroll arrow. Pass undefined to hide the arrow. */
  scrollTo?: string;
  /** Add `subpage` class for non-home heroes (smaller, no scroll-arrow by default). */
  variant?: "home" | "subpage";
};

/**
 * Standard hero block. Title supports rich JSX so callers can stress words via
 * <span className="bold">.
 */
export function Hero({ eyebrow, title, sub, ctas, scrollTo, variant = "home" }: HeroProps) {
  const isHome = variant === "home";
  return (
    <section className={`hero${isHome ? "" : " subpage"}`}>
      <div className="hero-eyebrow">{eyebrow}</div>
      <h1 className="display hero-title">{title}</h1>
      {sub && <p className="hero-sub">{sub}</p>}
      {ctas && <div className="hero-ctas">{ctas}</div>}
      {scrollTo && (
        <a href={`#${scrollTo}`} className="hero-scroll" aria-label="Scrollen">
          <div className="mouse"><div className="wheel"></div></div>
        </a>
      )}
    </section>
  );
}
