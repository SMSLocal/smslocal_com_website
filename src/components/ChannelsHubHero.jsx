import './ChannelsHubHero.css'
import { IconMegaphone, IconChat, IconBolt, IconPhone, IconUsers } from './icons.jsx'

/**
 * Hero visual for the /channels hub.
 * A non-container "channel rail": every channel sits as a lit glyph node on one
 * shared horizontal track, each carrying a small delivered-tick, under a "one
 * platform" caption. A brand-gradient signal pulses along the track and pings
 * each node in turn — one platform carrying every channel. No wrapping frame;
 * nodes and track float on the page. Base (reduced-motion) state is fully lit
 * and static; motion only adds the travelling ping.
 */
const NODES = [
  { label: 'SMS', icon: <IconMegaphone /> },
  { label: 'WhatsApp', icon: <IconChat /> },
  { label: 'RCS', icon: <IconBolt /> },
  { label: 'Voice', icon: <IconPhone /> },
  { label: 'Social', icon: <IconUsers /> },
]

function ChannelsHubHero() {
  return (
    <div className="chh" aria-hidden="true">
      <span className="chh-cap">
        <span className="chh-live" />
        One platform · one inbox · one API
      </span>

      <div className="chh-rail">
        <span className="chh-track" />
        <span className="chh-pulse" />
        {NODES.map((n, i) => (
          <div className="chh-node" key={n.label} style={{ animationDelay: `${i * 0.44}s` }}>
            <span className="chh-tick" style={{ animationDelay: `${i * 0.44}s` }}>
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
            </span>
            <span className="chh-chip" style={{ animationDelay: `${i * 0.44}s` }}>{n.icon}</span>
            <span className="chh-label">{n.label}</span>
          </div>
        ))}
      </div>

      <span className="chh-foot">Every message and reply, in one shared inbox</span>
    </div>
  )
}

export default ChannelsHubHero
