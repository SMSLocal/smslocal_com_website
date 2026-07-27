import './OneAgentCore.css'
import { IconPhone, IconChat, IconBrain, IconLink, IconMic, IconUsers, IconCalendar, IconCart, IconShield } from './icons.jsx'

const APPS = [
  { icon: <IconCart />, label: 'Orders' },
  { icon: <IconCalendar />, label: 'Calendar' },
  { icon: <IconShield />, label: 'Policies' },
  { icon: <IconLink />, label: 'CRM' },
]

function OneAgentCore() {
  return (
    <div className="oac" role="img" aria-label="A phone call and a WhatsApp chat both flowing through one shared AI core, connected to the same apps, with a warm handoff to a human">
      <div className="oac-flow">
        <div className="oac-branch oac-branch--call">
          <span className="oac-chan"><IconPhone /> Voice</span>
          <div className="oac-bubble oac-bubble--call">
            <span className="oac-wave" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i />
            </span>
            <p>&ldquo;Hi — can you check my order, it&rsquo;s number 7734?&rdquo;</p>
          </div>
          <span className="oac-note">Real speech, mid-sentence pauses and all</span>
        </div>

        <svg className="oac-wire oac-wire--left" viewBox="0 0 160 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 20 C 60 20, 100 20, 160 20" />
        </svg>

        <div className="oac-core">
          <span className="oac-core-ring oac-core-ring--1" />
          <span className="oac-core-ring oac-core-ring--2" />
          <span className="oac-core-badge"><IconBrain /></span>
          <span className="oac-core-label">One agent</span>
        </div>

        <svg className="oac-wire oac-wire--right" viewBox="0 0 160 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 20 C 60 20, 100 20, 160 20" />
        </svg>

        <div className="oac-branch oac-branch--chat">
          <span className="oac-chan"><IconChat /> WhatsApp</span>
          <div className="oac-bubble oac-bubble--chat">
            <p>Order #7734 is out for delivery — arriving today by 6 PM.</p>
          </div>
          <span className="oac-note">Same reasoning, same answer, no separate bot</span>
        </div>
      </div>

      <div className="oac-apps">
        <span className="oac-apps-label">Shared data & guardrails — every channel reads the same connected apps</span>
        <div className="oac-apps-row">
          {APPS.map((a) => (
            <span className="oac-app" key={a.label}>
              <span className="oac-app-ic">{a.icon}</span>
              {a.label}
            </span>
          ))}
        </div>
      </div>

      <div className="oac-handoff">
        <span className="oac-handoff-mic"><IconMic /></span>
        <p><strong>Built for real speech</strong> — background noise and cross-talk don&rsquo;t break the call.</p>
        <span className="oac-handoff-div" aria-hidden="true" />
        <span className="oac-handoff-users"><IconUsers /></span>
        <p><strong>Emma Clarke joined</strong> the call with the full transcript — never a cold &ldquo;please hold&rdquo;.</p>
      </div>
    </div>
  )
}

export default OneAgentCore
