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
        {member.linkedin && (
          <a
            className="tm-linkedin"
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} auf LinkedIn`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
            </svg>
          </a>
        )}
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
