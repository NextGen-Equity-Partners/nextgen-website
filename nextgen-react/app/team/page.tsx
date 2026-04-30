import { Hero } from "@/components/ui/hero";
import { team as c, type TeamMember } from "@/lib/content/team";

function TeamCard({ member, delay }: { member: TeamMember; delay: 1 | 2 | 3 }) {
  return (
    <div className={`tm rv rv-d${delay}`}>
      <div className="portrait"><img src={member.image} alt={member.name} /></div>
      <div className="tm-body">
        <div className="role">{member.role}</div>
        <h4>{member.name}</h4>
        <p>{member.body}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Hero variant="subpage" eyebrow={c.hero.eyebrow} title={c.hero.title} sub={c.hero.sub} />

      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">{c.intro.eyebrow}</div>
          <h2 className="display rv">{c.intro.title}</h2>
          <p className="body-text rv rv-d1 intro-narrow">{c.intro.body}</p>

          <div className="team-grid">
            <div className="team-row-3">
              {c.partners.map((m, i) => (
                <TeamCard key={m.name} member={m} delay={(i + 1) as 1 | 2 | 3} />
              ))}
            </div>
            <div className="team-row-2">
              {c.extended.map((m, i) => (
                <TeamCard key={m.name} member={m} delay={(i + 1) as 1 | 2} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="s-tag rv">{c.philosophy.eyebrow}</div>
          <h2 className="display rv">{c.philosophy.title}</h2>
          <div className="team-philosophy-text">
            {c.philosophy.paragraphs.map((p, i) => (
              <p key={i} className={`body-text rv${i > 0 ? ` rv-d${i}` : ""}`}>{p}</p>
            ))}
          </div>
          <div className="rv rv-d3 cta-row">
            <a href={c.philosophy.cta.href} className="btn btn-light">{c.philosophy.cta.label}</a>
          </div>
        </div>
      </section>
    </>
  );
}
