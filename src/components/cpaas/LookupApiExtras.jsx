import { useState } from 'react'
import { IconCheck, IconChart, IconCode, IconGear, IconUsers } from '../icons.jsx'
import { Head } from './LookupApiSections.jsx'
import './lookup-api-extras.css'

/**
 * Two content sections for the Number Lookup page: a guide to how a phone
 * number is written (with the usual ways people type one and the standard form
 * each becomes), and a tabbed look at who uses lookups and why. The writing
 * rules shown are general telephony facts, not product claims. Classes: `lf-`
 * and `lw-`.
 */

/* ═════ How a number is written ═════ */

const FORMATS = [
  { typed: '(415) 555-0123', std: '+14155550123', tip: 'Add the country code. Drop the brackets and dashes.' },
  { typed: '07911 123456', std: '+447911123456', tip: 'In the UK, swap the leading 0 for +44.' },
  { typed: '+91-98765-43210', std: '+919876543210', tip: 'Remove dashes and spaces. Keep the +.' },
  { typed: '00 61 412 345 678', std: '+61412345678', tip: 'Replace the 00 dial-out prefix with +.' },
]

export function FormatGuide({ eyebrow, title, subtitle }) {
  const [on, setOn] = useState(0)
  return (
    <section className="lf">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="lf-grid">
          <div className="lf-anatomy">
            <div className="lf-label">The standard form</div>
            <div className="lf-parts" role="img" aria-label="A plus sign, then a country code of one to three digits, then the national number">
              <span className="plus"><b>+</b><small>Plus</small></span>
              <span className="cc"><b>44</b><small>Country code</small><i>1 to 3 digits</i></span>
              <span className="nat"><b>7911 123456</b><small>National number</small><i>The rest</i></span>
            </div>
            <p className="lf-rule"><IconCheck /> At most <strong>15 digits</strong> in total, with no spaces or dashes once stored.</p>
          </div>

          <ul className="lf-rows">
            {FORMATS.map((f, i) => (
              <li key={f.typed} className={i === on ? 'on' : ''}>
                <button type="button" onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)} aria-pressed={i === on}>
                  <span className="lf-typed"><small>Typed as</small><code>{f.typed}</code></span>
                  <span className="lf-arrow" aria-hidden="true">→</span>
                  <span className="lf-std"><small>Stored as</small><code>{f.std}</code></span>
                </button>
                <p>{f.tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ═════ Who uses lookups ═════ */

const PEOPLE = [
  {
    key: 'marketing', label: 'Marketing', icon: <IconChart />,
    title: 'Plan campaigns by network',
    text: 'See which carriers your audience is on before you launch, so you plan around your list instead of guessing.',
    points: ['Know the network mix of a list', 'Spot numbers that will not work before you pay to send', 'Segment by network when it matters'],
  },
  {
    key: 'product', label: 'Product', icon: <IconUsers />,
    title: 'Catch bad numbers at sign-up',
    text: 'Check a number as people type it, so a typo never turns into a failed verification.',
    points: ['Check the format before you ask for a code', 'Ask for a fix before sending a code', 'Pair it with the Verify API to confirm the number is theirs'],
  },
  {
    key: 'ops', label: 'Operations', icon: <IconGear />,
    title: 'Keep contact data clean',
    text: 'Run a list through a check before a big send, and keep the clean version.',
    points: ['Set aside numbers that look wrong', 'Keep one standard format across systems', 'Do not pay to message numbers that cannot receive a text'],
  },
  {
    key: 'dev', label: 'Developers', icon: <IconCode />,
    title: 'Check before you send',
    text: 'Add a lookup step in front of your sends and route on what you learn.',
    points: ['Individual lookups are free in the lookup tool', 'Ask us about bulk or automated lookups', 'Works alongside the SMS API'],
  },
]

export function WhoUses({ eyebrow, title, subtitle }) {
  const [i, setI] = useState(0)
  const p = PEOPLE[i]
  return (
    <section className="lw">
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <div className="lw-box">
          <div className="lw-tabs" role="tablist" aria-label="Team" aria-orientation="vertical">
            {PEOPLE.map((t, n) => (
              <button key={t.key} type="button" role="tab" id={`lw-t-${t.key}`} aria-selected={n === i} aria-controls="lw-panel" className={n === i ? 'on' : ''} onClick={() => setI(n)}>
                <span className="ico">{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <div className="lw-panel" id="lw-panel" role="tabpanel" aria-labelledby={`lw-t-${p.key}`} key={p.key}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <ul>
              {p.points.map((x) => <li key={x}><IconCheck />{x}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
