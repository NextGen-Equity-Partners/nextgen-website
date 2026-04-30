import type { ReactNode, CSSProperties } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  id?: string;
  contentMaxWidth?: number | string;
  style?: CSSProperties;
};

/**
 * Standard pane section: optional eyebrow + display title + intro paragraph,
 * then arbitrary children. Use `bold` styling on parts of the title via JSX.
 *
 * Example:
 *   <Section eyebrow="Wer wir sind" title={<>Was Sie aufgebaut haben,<br /><span className="bold">soll bleiben.</span></>}>
 *     <div className="glass-grid cols-2">...</div>
 *   </Section>
 */
export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  id,
  contentMaxWidth,
  style,
}: SectionProps) {
  return (
    <section className={["pane", className].filter(Boolean).join(" ")} id={id} style={style}>
      <div className="pane-inner">
        {eyebrow && <div className="s-tag rv">{eyebrow}</div>}
        {title && (
          <h2 className="display rv" style={contentMaxWidth ? { maxWidth: contentMaxWidth } : undefined}>
            {title}
          </h2>
        )}
        {intro && (
          <p className="body-text rv rv-d1 section-intro">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
