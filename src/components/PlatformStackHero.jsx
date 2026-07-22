import './PlatformStackHero.css'
import { IconChat, IconUsers, IconBrain, IconShield } from './icons.jsx'

const LAYERS = [
  { side: 'L1', name: 'Channels', meta: 'SMS · WhatsApp · Voice', icon: <IconChat /> },
  { side: 'L2', name: 'Shared inbox', meta: 'assign · reply · note', icon: <IconUsers /> },
  { side: 'L3', name: 'AI + automation', meta: 'route · resolve', icon: <IconBrain /> },
  { side: 'L4', name: 'Data + security', meta: 'one record · audit', icon: <IconShield /> },
]

function PlatformStackHero() {
  return (
    <div
      className="psh"
      role="img"
      aria-label="A message packet flows downward through the SMSLocal platform layers: channels, shared inbox, AI and automation, then data and security."
    >
      <div className="psh-scene">
        <span className="psh-packet" aria-hidden="true">
          <span className="psh-packet-trail" />
        </span>

        {LAYERS.map((l, i) => (
          <div className="psh-layer" style={{ '--i': i }} key={l.name}>
            <span className="psh-side">{l.side}</span>
            <div className="psh-band">
              <span className="psh-band-ic">{l.icon}</span>
              <span className="psh-band-name">{l.name}</span>
              <span className="psh-band-meta">{l.meta}</span>
              <span className="psh-band-glow" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      <span className="psh-caption">one message · every layer</span>
    </div>
  )
}

export default PlatformStackHero
