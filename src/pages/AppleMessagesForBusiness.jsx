import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import { Hero, Testimonials, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { IconCalendar, IconDollar, IconShield, IconChat, IconMail, IconUsers, IconLink } from '../components/icons.jsx'
import AppleMessagesHeroMock from '../components/AppleMessagesHeroMock.jsx'
import './AppleMessagesForBusiness.css'

const SLOTS = ['Tomorrow, 11:00 AM', 'Tomorrow, 2:30 PM', 'Friday, 9:00 AM']

function PickerPreview() {
  const [picked, setPicked] = useState(0)
  return (
    <div className="am-format-mock">
      <span className="am-format-mock-title">📅 Pick a time</span>
      {SLOTS.map((slot, i) => (
        <button
          type="button"
          key={slot}
          className={`am-format-mock-row${picked === i ? ' am-format-mock-row--active' : ''}`}
          onClick={() => setPicked(i)}
        >
          {slot}
          {picked === i && <span className="am-format-mock-tick">✓</span>}
        </button>
      ))}
    </div>
  )
}

function PayPreview() {
  const [status, setStatus] = useState('idle')

  const handlePay = () => {
    if (status !== 'idle') return
    setStatus('processing')
    setTimeout(() => setStatus('paid'), 900)
    setTimeout(() => setStatus('idle'), 2600)
  }

  return (
    <div className="am-format-mock">
      <div className="am-format-mock-line">
        <span>Deposit</span>
        <strong>$25.00</strong>
      </div>
      <button
        type="button"
        className={`am-format-mock-pay am-format-mock-pay--${status}`}
        onClick={handlePay}
      >
        {status === 'idle' && <> Pay</>}
        {status === 'processing' && 'Processing…'}
        {status === 'paid' && '✓ Paid'}
      </button>
    </div>
  )
}

const TAPBACKS = ['❤️', '👍', '😂', '‼️']

function LinkPreview() {
  const [tapback, setTapback] = useState(0)
  const [popped, setPopped] = useState(false)

  const cycle = () => {
    setTapback((t) => (t + 1) % TAPBACKS.length)
    setPopped(true)
    setTimeout(() => setPopped(false), 300)
  }

  return (
    <div className="am-format-mock">
      <div className="am-format-mock-card">
        <span className="am-format-mock-thumb" />
        <span>New arrivals — Spring line</span>
      </div>
      <button
        type="button"
        className={`am-format-mock-tapback${popped ? ' am-format-mock-tapback--pop' : ''}`}
        onClick={cycle}
      >
        {TAPBACKS[tapback]}
      </button>
    </div>
  )
}

function VerifiedPreview() {
  const [checked, setChecked] = useState(true)
  return (
    <div
      className="am-format-mock am-format-mock--row"
      onClick={() => setChecked((c) => !c)}
      role="button"
      tabIndex={0}
    >
      <span className="am-format-mock-avatar">SL</span>
      <span>SMSLocal</span>
      <span className={`am-format-mock-check${checked ? ' am-format-mock-check--on' : ''}`}>
        {checked ? '✓' : '·'}
      </span>
    </div>
  )
}

const FORMATS = [
  { icon: <IconCalendar />, title: 'List & time pickers', desc: 'Customers tap a slot, size or option right inside the thread — no forms, no links out.', mock: <PickerPreview /> },
  { icon: <IconDollar />, title: 'Apple Pay', desc: 'Take a deposit or full payment without the customer ever leaving Messages.', mock: <PayPreview /> },
  { icon: <IconChat />, title: 'Rich links & tapbacks', desc: 'Branded link previews, images and reaction tapbacks — not plain grey texts.', mock: <LinkPreview /> },
  { icon: <IconShield />, title: 'Verified brand', desc: 'Your name, logo and colour sit at the top of every conversation.', mock: <VerifiedPreview /> },
]

const DIRECT = [
  'Apply as your own Messages Service Provider',
  'Wait through Apple’s review and verification',
  'Build list pickers and Apple Pay yourself',
  'No shared inbox with your other channels',
]
const ONUS = [
  'Send through our already-approved MSP status',
  'Live as soon as your business is verified',
  'List pickers, time pickers and Apple Pay, ready-made',
  'Sits beside WhatsApp, SMS and email in one inbox',
]

const STAGES = ['Apply as MSP', 'Apple review', 'Get verified', 'Send messages']

function ApprovalStepMock() {
  return (
    <div className="am-step-mock">
      <span className="am-step-mock-title">MSP application status</span>
      <div className="am-step-mock-row"><span>Business documents</span><span className="am-step-mock-tag am-step-mock-tag--done">Submitted</span></div>
      <div className="am-step-mock-row"><span>MSP application</span><span className="am-step-mock-tag am-step-mock-tag--done">Filed for you</span></div>
      <div className="am-step-mock-row"><span>Apple review</span><span className="am-step-mock-tag am-step-mock-tag--done">In progress</span></div>
      <div className="am-step-mock-row"><span>Business verified</span><span className="am-step-mock-tag am-step-mock-tag--live">✓ Approved</span></div>
      <span className="am-step-mock-foot">Average approval time: 3–5 business days — we track every stage for you.</span>
    </div>
  )
}
function ReplyStepMock() {
  return (
    <div className="am-step-mock">
      <span className="am-step-mock-title">Reply template builder</span>
      <div className="am-step-mock-preview">
        <span className="am-step-mock-avatar">SL</span>
        <span className="am-step-mock-bubble">Pick a fitting slot below 👇</span>
      </div>
      <div className="am-step-mock--chips">
        <span className="am-step-mock-chip">📅 Time picker</span>
        <span className="am-step-mock-chip"> Apple Pay</span>
        <span className="am-step-mock-chip">🔗 Rich link</span>
        <span className="am-step-mock-chip">❤️ Tapback</span>
      </div>
      <span className="am-step-mock-foot">4 rich formats, zero code — drag a template in and edit the copy.</span>
    </div>
  )
}
function InboxStepMock() {
  return (
    <div className="am-step-mock">
      <span className="am-step-mock-title">Shared inbox</span>
      <div className="am-step-mock-row"><span>💬 iMessage Business Chat</span><span className="am-step-mock-tag am-step-mock-tag--done">12 new</span></div>
      <div className="am-step-mock-row"><span>🟢 WhatsApp</span><span className="am-step-mock-tag am-step-mock-tag--done">8 new</span></div>
      <div className="am-step-mock-row"><span>✉️ SMS &amp; Email</span><span className="am-step-mock-tag am-step-mock-tag--done">5 new</span></div>
      <span className="am-step-mock-inbox">One shared inbox · 25 conversations</span>
      <span className="am-step-mock-foot">Every channel, every agent, one queue — nothing falls through the cracks.</span>
    </div>
  )
}

const STEPS = [
  {
    title: 'Get Apple-approved',
    desc: 'We handle the Messages Service Provider application and Apple review for you.',
    points: [
      'We file the MSP application on your behalf',
      'We answer Apple’s review questions for you',
      'You get notified the moment you’re verified',
    ],
    mock: <ApprovalStepMock />,
  },
  {
    title: 'Design rich replies',
    desc: 'Build list pickers, time pickers and Apple Pay prompts from templates.',
    points: [
      'Start from ready-made reply templates',
      'Drag in list pickers, Apple Pay and tapbacks',
      'Preview exactly what the customer sees',
    ],
    mock: <ReplyStepMock />,
  },
  {
    title: 'Go live in one inbox',
    desc: 'Every Business Chat conversation lands beside your other channels.',
    points: [
      'No separate app or dashboard to check',
      'Any agent can pick up any conversation',
      'One customer record across every channel',
    ],
    mock: <InboxStepMock />,
  },
]

const WHY = [
  { icon: <IconShield />, title: 'We are the approved path', desc: 'Apple requires an approved Messages Service Provider — that paperwork and review is on us, not you.' },
  { icon: <IconUsers />, title: 'Built for teams', desc: 'Multiple agents work the same Business Chat inbox without stepping on each other.' },
  { icon: <IconLink />, title: 'Works with your stack', desc: 'Connect your CRM, helpdesk or store so every reply carries real order and customer context.' },
  { icon: <IconMail />, title: 'One inbox, every channel', desc: 'Apple Messages sits beside WhatsApp, SMS and email in the same shared inbox.' },
]

const TESTIMONIALS = [
  { quote: 'Letting customers pick an appointment slot right inside Messages, with no app to download, cut our no-show rate noticeably.', name: 'Claire Bennett', role: 'Ops Manager, Salon chain' },
  { quote: 'The Apple approval process looked intimidating until SMSLocal ran the whole MSP application for us.', name: 'Marcus Lee', role: 'Founder, D2C brand' },
  { quote: 'Taking a deposit with Apple Pay inside the chat removed a step that used to lose us bookings.', name: 'Ana Popescu', role: 'Customer Experience Lead' },
]

const FAQS = [
  { q: 'What is Apple Messages for Business?', a: 'It is the official way for businesses to chat with customers inside the Messages app on iPhone, using rich formats like list pickers, time pickers and Apple Pay.' },
  { q: 'Do I need Apple approval to use this?', a: 'Yes — Apple requires businesses to send through an approved Messages Service Provider. We are that approved provider, and we handle the application for you.' },
  { q: 'Can customers pay inside the conversation?', a: 'Yes, Apple Pay can be triggered directly inside the chat for deposits, orders or invoices, without the customer leaving Messages.' },
  { q: 'Can I manage Apple Messages alongside WhatsApp and SMS?', a: 'Yes, Apple Messages sits beside WhatsApp, SMS and other channels in the same shared inbox, with one customer record across all of them.' },
]

function AppleMessagesForBusiness() {
  const [openPin, setOpenPin] = useState('us')
  const [activeStep, setActiveStep] = useState(0)
  const [activeWhy, setActiveWhy] = useState(0)

  return (
    <>
      <Seo
        title="Apple Messages for Business"
        description="Reach customers in Messages on iPhone with rich links, list pickers, Apple Pay and reactions."
        keywords={['iMessage for business', 'Apple Messages for Business API', 'iMessage business API', 'Messages for Business provider']}
      />

      <Hero
        eyebrow="Apple Messages"
        title={<>Native <span className="grad-word">iMessage</span> business chat, sent through an approved provider</>}
        subtitle="Rich links, list pickers, Apple Pay and reactions — delivered to the Messages app customers already trust, with Apple's required approval handled for you."
        primaryCta={{ label: 'Get Started', href: '/contact-us/' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing/' }}
        visual={<AppleMessagesHeroMock />}
      />

      {/* INNER 1 — rich formats: open 4-column band with hairline dividers */}
      <section className="section am-formats">
        <div className="container">
          <span className="section-kicker">Rich formats</span>
          <h2 className="section-title">Messages that do more than say hello</h2>
          <div className="am-format-band">
            {FORMATS.map((f, i) => (
              <div className="am-format" key={f.title} style={{ '--d': `${i * 0.1}s` }}>
                <span className="am-format-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                {f.mock}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INNER 2 — one shared approval pipeline with two clickable position pins */}
      <section className="section section-alt am-gate">
        <div className="container">
          <span className="section-kicker">The catch</span>
          <h2 className="section-title">Apple decides who can send. We are already through the gate.</h2>
          <p className="section-subtitle am-gate-sub">Apple Messages for Business isn’t an open API — every message must go through an approved Messages Service Provider. The bottleneck isn’t the chat, it’s the approval.</p>

          <div className="am-pipeline">
            <div className="am-pipeline-pins">
              <button
                type="button"
                className={`am-pin am-pin--direct${openPin === 'direct' ? ' am-pin--active' : ''}`}
                style={{ left: '9%' }}
                onClick={() => setOpenPin('direct')}
              >
                <span className="am-pin-avatar">You</span>
                <span className="am-pin-label">Going it alone</span>
              </button>
              <button
                type="button"
                className={`am-pin am-pin--us${openPin === 'us' ? ' am-pin--active' : ''}`}
                style={{ left: '89%' }}
                onClick={() => setOpenPin('us')}
              >
                <span className="am-pin-avatar am-pin-avatar--us">SL</span>
                <span className="am-pin-label">On SMSLocal</span>
              </button>
            </div>

            <div className="am-pipeline-track">
              {STAGES.map((s, i) => (
                <span className={`am-pipeline-stage${i === STAGES.length - 1 ? ' am-pipeline-stage--open' : ''}`} key={s}>
                  {s}
                </span>
              ))}
            </div>

            <div className="am-pipeline-detail" key={openPin}>
              {openPin === 'direct' ? (
                <ul className="am-pipeline-list am-pipeline-list--blocked">
                  {DIRECT.map((d) => <li key={d}><span>✕</span>{d}</li>)}
                </ul>
              ) : (
                <ul className="am-pipeline-list am-pipeline-list--go">
                  {ONUS.map((o) => <li key={o}><span>✓</span>{o}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INNER 3 — how it works: clickable step selector with a live preview panel */}
      <section className="section am-steps">
        <div className="container">
          <span className="section-kicker">How it works</span>
          <h2 className="section-title">Go live on Apple Messages in three steps</h2>

          <div className="am-stepper">
            <div className="am-stepper-tabs">
              {STEPS.map((s, i) => (
                <button
                  type="button"
                  key={s.title}
                  className={`am-stepper-tab${activeStep === i ? ' am-stepper-tab--active' : ''}`}
                  onClick={() => setActiveStep(i)}
                >
                  <span className="am-stepper-tab-num">{i + 1}</span>
                  {s.title}
                </button>
              ))}
            </div>

            <div className="am-stepper-panel" key={activeStep}>
              <div className="am-stepper-copy">
                <h3>{STEPS[activeStep].title}</h3>
                <p>{STEPS[activeStep].desc}</p>
                <ul className="am-stepper-points">
                  {STEPS[activeStep].points.map((p) => (
                    <li key={p}><span>✓</span>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="am-stepper-visual">{STEPS[activeStep].mock}</div>
            </div>
          </div>
        </div>
      </section>

      {/* INNER 4 — why us: horizontal expanding-panel accordion */}
      <section className="section section-alt am-why">
        <div className="container">
          <span className="section-kicker">Why us</span>
          <h2 className="section-title">Why brands choose SMSLocal as their MSP</h2>
          <div className="am-fan">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className={`am-fan-panel${activeWhy === i ? ' am-fan-panel--active' : ''}`}
                onClick={() => setActiveWhy(i)}
                onMouseEnter={() => setActiveWhy(i)}
              >
                <span className="am-fan-icon">{w.icon}</span>
                <span className="am-fan-num">{`0${i + 1}`}</span>
                <h3 className="am-fan-title">{w.title}</h3>
                <p className="am-fan-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials title={<>Trusted by growing brands</>} items={TESTIMONIALS} alt />

      <CTABanner
        title="Bring your brand into iMessage the right way"
        subtitle="We handle Apple's approval — you handle the conversation."
        cta={{ label: 'Get Started', href: '/contact-us/' }}
      />

      <FAQ title={<>Apple Messages for Business — frequently asked questions</>} items={FAQS} />
    </>
  )
}

export default AppleMessagesForBusiness
