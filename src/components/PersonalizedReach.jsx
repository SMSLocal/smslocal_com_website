import './PersonalizedReach.css'
import { IconMegaphone, IconCheck } from './icons.jsx'

/**
 * Bespoke section for /channels/whatsapp-broadcasting.
 * Shows the core idea instead of listing it: one broadcast hub on the left fans
 * out to several personalized 1:1 message previews on the right — each addressed
 * by name, delivered and read. Spatial, de-boxed, light on text.
 */
const THREADS = [
  { initial: 'P', name: 'Priya', msg: 'Hi Priya — your order #4821 ships today 📦' },
  { initial: 'S', name: 'Sam', msg: 'Hi Sam — 20% off is back, just for you ✨' },
  { initial: 'M', name: 'Maya', msg: 'Hi Maya — your appointment is confirmed for Fri' },
]

function PersonalizedReach() {
  return (
    <section className="section section-alt preach-section">
      <div className="container">
        <h2 className="section-title">One send. Every contact gets a message that sounds like it&rsquo;s just for them.</h2>
        <p className="section-subtitle">
          A WhatsApp broadcast reaches your whole opted-in list at once — but each person gets it in their own
          private 1:1 thread, personalized with their name and open to a reply.
        </p>

        <div className="preach">
          <div className="preach-hub" aria-hidden="true">
            <span className="preach-hub-badge"><IconMegaphone /></span>
            <strong>1 broadcast</strong>
            <span>sent once</span>
          </div>

          <svg className="preach-fan" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="preachGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--blue)" />
                <stop offset="1" stopColor="var(--cyan)" />
              </linearGradient>
            </defs>
            <line x1="13" y1="50" x2="40" y2="16.7" />
            <line x1="13" y1="50" x2="40" y2="50" />
            <line x1="13" y1="50" x2="40" y2="83.3" />
          </svg>

          <div className="preach-threads">
            {THREADS.map((t) => (
              <div className="preach-thread" key={t.name}>
                <span className="preach-avatar">{t.initial}</span>
                <div className="preach-thread-body">
                  <span className="preach-thread-head">
                    {t.name}
                    <span className="preach-ticks" aria-label="Delivered and read"><IconCheck /><IconCheck /></span>
                  </span>
                  <span className="preach-thread-msg">{t.msg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PersonalizedReach
