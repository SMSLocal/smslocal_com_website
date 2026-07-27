import { useState } from 'react'
import './ApproachMatrix.css'

/* A single compact matrix instead of three tall cards. Each row explains
   itself when you hover or focus it — the detail lives in one shared line
   under the table rather than being repeated in every column. */
const COLS = ['Canned replies', 'Scripted bot', 'Agentic AI']

const ROWS = [
  {
    label: 'Answers a common question',
    cells: ['yes', 'yes', 'yes'],
    note: 'Everyone clears the easy 20%. The other 80% is where they split.',
  },
  {
    label: 'Reads live data from your apps',
    cells: ['no', 'no', 'yes'],
    note: 'A bot answers from a knowledge base. The agent opens the actual record.',
  },
  {
    label: 'Takes the real action — refund, reschedule, update',
    cells: ['no', 'no', 'yes'],
    note: 'This is the whole difference: a reply closes a message, an action closes a case.',
  },
  {
    label: 'Handles a request it has never seen',
    cells: ['no', 'part', 'yes'],
    note: 'Scripts only cover the branches someone wrote. The agent reasons from context.',
  },
  {
    label: 'Stays inside the permissions you set',
    cells: ['n/a', 'part', 'yes'],
    note: 'Custom roles decide which apps and which actions each agent may touch.',
  },
  {
    label: 'Escalates to a human with full context',
    cells: ['no', 'part', 'yes'],
    note: 'When it hands off, the transcript and the lookups travel with it.',
  },
]

const RESOLVED = [12, 31, 78]

const MARK = {
  yes: { glyph: '✓', label: 'yes' },
  no: { glyph: '–', label: 'no' },
  part: { glyph: '~', label: 'partly' },
  'n/a': { glyph: '–', label: 'not applicable' },
}

function ApproachMatrix() {
  const [row, setRow] = useState(2)

  return (
    <section className="apm">
      <div className="container">
        <div className="apm-head">
          <span className="apm-kicker">Comparison</span>
          <h2 className="apm-h2">Three ways to answer. One that finishes the job.</h2>
        </div>

        <div className="apm-table">
          <div className="apm-row apm-row--head">
            <span className="apm-label" />
            {COLS.map((c, i) => (
              <span className={`apm-col${i === 2 ? ' apm-col--best' : ''}`} key={c}>{c}</span>
            ))}
          </div>

          {ROWS.map((r, ri) => (
            <div
              className={`apm-row${row === ri ? ' is-on' : ''}`}
              key={r.label}
              onMouseEnter={() => setRow(ri)}
              onFocus={() => setRow(ri)}
              tabIndex={0}
              role="button"
              aria-label={r.label}
            >
              <span className="apm-label">{r.label}</span>
              {r.cells.map((c, ci) => (
                <span
                  className={`apm-cell apm-cell--${c === 'n/a' ? 'no' : c}${ci === 2 ? ' apm-col--best' : ''}`}
                  key={`${r.label}-${ci}`}
                  data-col={COLS[ci]}
                >
                  <i aria-hidden="true">{MARK[c].glyph}</i>
                  <em>{MARK[c].label}</em>
                </span>
              ))}
            </div>
          ))}

          <div className="apm-row apm-row--stat">
            <span className="apm-label">Resolved without a human</span>
            {RESOLVED.map((v, i) => (
              <span className={`apm-stat${i === 2 ? ' apm-col--best' : ''}`} key={v} data-col={COLS[i]}>
                <b>{v}%</b>
                <span className="apm-bar"><span style={{ width: `${v}%` }} /></span>
              </span>
            ))}
          </div>
        </div>

        <p className="apm-note" key={row}>{ROWS[row].note}</p>
      </div>
    </section>
  )
}

export default ApproachMatrix
