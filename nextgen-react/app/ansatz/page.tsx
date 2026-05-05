"use client";

import { Hero } from "@/components/ui/hero";
import { GlassCard } from "@/components/ui/glass-card";
import { ansatz as content } from "@/lib/content/ansatz";
import { useLocale } from "@/components/providers/locale-provider";

function JList({ items }: { items: ReadonlyArray<{ n: string; title: string; body: string }> }) {
  return (
    <div className="j-list">
      {items.map((it, i) => (
        <div key={it.n} className={`j-item rv rv-d${(i % 3) + 1}`}>
          <div className="n">{it.n}</div>
          <div>
            <h4>{it.title}</h4>
            <p>{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const { locale } = useLocale();
  const c = content[locale];
  return (
    <>
      <Hero variant="subpage" eyebrow={c.hero.eyebrow} title={c.hero.title} sub={c.hero.sub} />

      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">{c.meet.eyebrow}</div>
              <h2 className="display rv">{c.meet.title}</h2>
            </div>
            <div>
              {c.meet.paragraphs.map((p, i) => (
                <p key={i} className={`body-text rv${i > 0 ? ` rv-d${i}` : ""}`}>{p}</p>
              ))}
            </div>
          </div>
          <JList items={c.meet.items} />
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">{c.cooperate.eyebrow}</div>
              <h2 className="display rv">{c.cooperate.title}</h2>
            </div>
            <div>
              {c.cooperate.paragraphs.map((p, i) => (
                <p key={i} className={`body-text rv${i > 0 ? ` rv-d${i}` : ""}`}>{p}</p>
              ))}
            </div>
          </div>
          <div className="glass-grid">
            {c.cooperate.cards.map((card, i) => (
              <GlassCard key={i} {...card} delay={(i + 1) as 1 | 2 | 3 | 4} />
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">{c.build.eyebrow}</div>
              <h2 className="display rv">{c.build.title}</h2>
            </div>
            <div>
              <p className="body-text rv">{c.build.intro}</p>
            </div>
          </div>
          <div className="glass-grid cols-3">
            {c.build.cards.map((card, i) => (
              <GlassCard key={i} {...card} delay={(i + 1) as 1 | 2 | 3} />
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="s-tag rv">{c.meaning.eyebrow}</div>
          <h2 className="display rv">{c.meaning.title}</h2>
          <JList items={c.meaning.items} />
          <div className="rv rv-d4 cta-row">
            <a href={c.meaning.cta.href} className="btn btn-light">{c.meaning.cta.label}</a>
          </div>
        </div>
      </section>
    </>
  );
}
