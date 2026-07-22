import { Link } from 'react-router-dom'
import './UseCaseTeamBranches.css'

// Bespoke 'Solutions by use-case / team' section: three team columns drawn as
// branch trees (spine + ringed leaf connectors), each leaf linking to a real
// use-case route. Floats on the page background - no card/panel frame.
function UseCaseTeamBranches({ eyebrow = 'By use-case', title, subtitle, teams, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="uctb-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="uctb-board">
          {teams.map((team) => (
            <div className="uctb-team" key={team.name}>
              <div className="uctb-team-head">
                <span className="uctb-team-ic">{team.icon}</span>
                <span className="uctb-team-name">{team.name}</span>
                <span className="uctb-team-count">{team.items.length}</span>
              </div>

              <div className="uctb-branch">
                <span className="uctb-spine" aria-hidden="true" />
                <ul className="uctb-leaves">
                  {team.items.map((u) => (
                    <li key={u.href}>
                      <Link to={u.href} className="uctb-leaf">
                        <span className="uctb-leaf-ic">{u.icon}</span>
                        <span className="uctb-leaf-text">
                          <strong>{u.title}</strong>
                          <span>{u.tag}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCaseTeamBranches
