import { useState } from 'react'
import './AgentGroundingProof.css'

/**
 * "Where the answers come from" for /ai-agents.
 *
 * A contrast pair. LEFT: a question your content covers — the answer carries
 * numbered citations, and the sources it drew from sit underneath with their
 * last-synced stamp. Click a citation to light up the source it came from.
 * RIGHT: a question nothing covers — the agent declines, says so plainly, and
 * hands off instead of inventing an answer.
 *
 * Together they make the grounding claim falsifiable: the answer is traceable
 * to a named file, and the failure case is shown rather than hidden.
 *
 * Self-contained by design — no pricing, plans, or references to other pages.
 * Static apart from the citation highlight; no timers or autoplay.
 */

const COVERED = {
  ask: 'Can I return something after 40 days?',
  answer: [
    { t: 'Our return window is 30 days from delivery, so day 40 sits outside it' },
    { cite: 1 },
    { t: '. If it arrived damaged though, that\'s covered whenever you spotted it' },
    { cite: 2 },
    { t: ' — tell me which and I\'ll sort it now.' },
  ],
  sources: [
    { n: 1, file: 'returns-policy.pdf', span: 'section 3 · "standard window"', synced: 'synced 2h ago' },
    { n: 2, file: 'damage-claims.md', span: 'section 1 · "on arrival"', synced: 'synced today' },
  ],
}

const UNCOVERED = {
  ask: 'Do you ship to Norway?',
  answer:
    "I don't have anything on Norway in what I've been given, so I'm not going to guess. I've passed this to the team and they'll confirm today.",
  behaviours: [
    'Says it does not know, in plain words',
    'Invents nothing — no plausible-sounding guess',
    'Hands off, and tells the customer it has',
  ],
}

function AgentGroundingProof({ eyebrow = 'Grounding', title, subtitle }) {
  const [hot, setHot] = useState(null)

  return (
    <section className="agp">
      <div className="container">
        <div className="agp-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="agp-pair" onMouseLeave={() => setHot(null)}>
          {/* ---------- covered ---------- */}
          <div className="agp-side agp-side--yes">
            <span className="agp-verdict agp-verdict--yes">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
              Your content covers it
            </span>

            <p className="agp-ask">{COVERED.ask}</p>

            <p className="agp-answer">
              {COVERED.answer.map((part, i) =>
                part.cite ? (
                  <button
                    key={`c-${part.cite}`}
                    type="button"
                    className={`agp-cite${hot === part.cite ? ' is-hot' : ''}`}
                    onMouseEnter={() => setHot(part.cite)}
                    onFocus={() => setHot(part.cite)}
                    aria-label={`Source ${part.cite}`}
                  >
                    {part.cite}
                  </button>
                ) : (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={`t-${i}`}>{part.t}</span>
                )
              )}
            </p>

            <span className="agp-srclabel">drawn from</span>
            <ul className="agp-sources">
              {COVERED.sources.map((s) => (
                <li
                  key={s.file}
                  className={`agp-src${hot === s.n ? ' is-hot' : ''}`}
                  onMouseEnter={() => setHot(s.n)}
                >
                  <span className="agp-src-n">{s.n}</span>
                  <span className="agp-src-body">
                    <strong>{s.file}</strong>
                    <span>{s.span}</span>
                  </span>
                  <span className="agp-src-sync">{s.synced}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- not covered ---------- */}
          <div className="agp-side agp-side--no">
            <span className="agp-verdict agp-verdict--no">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg>
              Nothing covers it
            </span>

            <p className="agp-ask">{UNCOVERED.ask}</p>

            <p className="agp-answer agp-answer--no">{UNCOVERED.answer}</p>

            <span className="agp-srclabel">so it</span>
            <ul className="agp-behav">
              {UNCOVERED.behaviours.map((b) => (
                <li key={b}>
                  <span className="agp-behav-dot" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="agp-foot">
          Every answer traces back to a file you approved. Change the file and the answer
          changes with it — nothing is baked into a prompt you can&apos;t see.
        </p>
      </div>
    </section>
  )
}

export default AgentGroundingProof
