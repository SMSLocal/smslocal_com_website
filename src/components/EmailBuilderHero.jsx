import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck } from './icons.jsx'
import { useReducedMotion } from './cpaas/useMotion.js'
import './EmailBuilderHero.css'

/**
 * Hero for the Email page. Copy on the left; on the right a template builder.
 * For each block, the cursor picks it up from the palette, carries a ghost copy
 * across to a dashed drop slot on the canvas and sets it down with a small
 * spring. The heading types itself out. When the email is complete the cursor
 * presses "Send test", the button spins and turns green, the canvas badge flips
 * from Draft to Sent, an inbox notification slides in over the canvas, and
 * Delivered, Opened and Clicked light up in a strip below. The email then fades
 * and the build starts again. Everything shown is illustrative. Reduced-motion
 * visitors get the finished, sent email.
 */

const BLOCKS = [
  { key: 'header', label: 'Header', h: 8 },
  { key: 'heading', label: 'Heading', h: 8 },
  { key: 'image', label: 'Image', h: 16 },
  { key: 'text', label: 'Text', h: 10 },
  { key: 'button', label: 'Button', h: 9 },
]

const HEADING = 'Your order #4021 is confirmed'
const RESULT = ['Delivered', 'Opened', 'Clicked']
const PAL_TOP = 5.8 // cqw, first palette row centre
const PAL_GAP = 7.2
const CANVAS_TOP = 6
const IDLE = { x: 60, y: 36 }

function Builder() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0) // blocks placed: 0..5, then 5 = ready to send
  const [drag, setDrag] = useState(-1) // index of the block being carried
  const [cur, setCur] = useState(IDLE)
  const [typed, setTyped] = useState(0)
  const [send, setSend] = useState('idle') // idle, press, sending, sent
  const [result, setResult] = useState(0)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (reduced) { setStep(BLOCKS.length); setTyped(HEADING.length); setSend('sent'); setResult(3); return undefined }
    const ids = []
    const at = (ms, fn) => ids.push(setTimeout(fn, ms))
    if (step < BLOCKS.length) {
      const before = BLOCKS.slice(0, step).reduce((a, b) => a + b.h + 1.6, 0)
      const slot = { x: 60, y: CANVAS_TOP + before + BLOCKS[step].h / 2 }
      at(150, () => { setCur({ x: 9, y: PAL_TOP + step * PAL_GAP }) })
      at(750, () => setDrag(step))
      at(850, () => setCur(slot))
      at(1650, () => {
        setDrag(-1)
        setStep((s) => s + 1)
      })
    } else if (send === 'idle') {
      at(450, () => setCur({ x: 88, y: -4.2 }))
      at(1250, () => setSend('press'))
    } else if (send === 'press') {
      at(350, () => setSend('sending'))
    } else if (send === 'sending') {
      at(1100, () => setSend('sent'))
    } else if (send === 'sent') {
      RESULT.forEach((_, i) => at(350 + i * 650, () => setResult(i + 1)))
      at(3600, () => setFade(true))
      at(4300, () => {
        setFade(false); setStep(0); setTyped(0); setSend('idle'); setResult(0); setCur(IDLE)
      })
    }
    return () => ids.forEach((id) => { clearTimeout(id); clearInterval(id) })
  }, [step, send, reduced])

  // the heading types itself once its block has landed
  useEffect(() => {
    if (reduced || step < 2) return undefined
    const iv = setInterval(() => setTyped((t) => Math.min(HEADING.length, t + 1)), 38)
    return () => clearInterval(iv)
  }, [step, reduced])

  const placed = (i) => step > i
  const sent = send === 'sent'

  return (
    <figure className="eb" aria-label="An email template builder: blocks are carried onto the canvas to assemble an order confirmation, then a test send is delivered, opened and clicked (illustrative)">
      <div className="eb-win">
        <div className="eb-bar">
          <span className="eb-dots" aria-hidden="true"><i /><i /><i /></span>
          <b>Order confirmation</b>
          <span className="eb-tabs" aria-hidden="true"><u className="on">Design</u><u>HTML</u></span>
          <span className={`eb-send ${send}`} aria-hidden="true">
            {send === 'sending' && <i className="eb-spin" />}
            {send === 'sent' ? <><IconCheck /> Sent</> : send === 'sending' ? 'Sending' : 'Send test'}
          </span>
        </div>

        <div className="eb-body">
          <ul className="eb-pal" aria-hidden="true">
            {BLOCKS.map((b, i) => (
              <li key={b.key} className={drag === i ? 'grab' : placed(i) ? 'used' : ''}>
                <span className={`g ${b.key}`} />{b.label}
              </li>
            ))}
          </ul>

          <div className="eb-canvas" aria-hidden="true">
            <span className={`eb-state${sent ? ' sent' : ''}`}>{sent ? 'Sent' : 'Draft'}</span>
            <div className={`eb-mail${fade ? ' fade' : ''}${sent ? ' sentmail' : ''}`}>
              {BLOCKS.map((b, i) => {
                const cls = placed(i) ? ' in' : drag === i ? ' ph' : ''
                return (
                  <div key={b.key} className={`eb-b ${b.key}${cls}`} style={{ '--h': `${b.h}cqw` }}>
                    {b.key === 'header' && <><i>S</i><b>SMSLocal</b></>}
                    {b.key === 'heading' && <strong>{HEADING.slice(0, typed)}{typed > 0 && typed < HEADING.length && <em className="eb-caret" />}</strong>}
                    {b.key === 'image' && <span className="box" />}
                    {b.key === 'text' && <p><span /><span /><span className="s" /></p>}
                    {b.key === 'button' && <u>Track order</u>}
                  </div>
                )
              })}
              {step === 0 && drag < 0 && <p className="eb-drop">Drag blocks here</p>}
              <span className="eb-shine" />
            </div>
            <div className={`eb-note${sent && !fade ? ' on' : ''}`}>
              <i>S</i>
              <span><b>SMSLocal</b><em>{HEADING}</em></span>
              <u>now</u>
            </div>
          </div>

          {drag >= 0 && (
            <span className={`eb-ghost ${BLOCKS[drag].key}`} style={{ left: `${cur.x}cqw`, top: `${cur.y}cqw` }}>{BLOCKS[drag].label}</span>
          )}
          <svg className={`eb-cursor${drag >= 0 ? ' hold' : ''}`} viewBox="0 0 24 24" aria-hidden="true" style={{ left: `${cur.x}cqw`, top: `${cur.y}cqw` }}>
            <path d="M5 3l14 8-6 1.600L10.500 19z" fill="#0f172a" stroke="#fff" strokeWidth="1.600" strokeLinejoin="round" />
          </svg>
        </div>

        <ul className="eb-strip" aria-hidden="true">
          {RESULT.map((r, i) => (
            <li key={r} className={i < result ? 'on' : ''}><IconCheck />{r}</li>
          ))}
        </ul>
      </div>
      <figcaption>Illustrative</figcaption>
    </figure>
  )
}

function EmailBuilderHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="ebh">
      <div className="container ebh-inner">
        <div className="ebh-copy">
          <span className="ebh-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="ebh-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
        </div>
        <Builder />
      </div>
    </section>
  )
}

export default EmailBuilderHero
