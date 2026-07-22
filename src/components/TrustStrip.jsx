import './TrustStrip.css'
import { IconShield, IconBolt, IconGlobe, IconGear } from './icons.jsx'

const ITEMS = [
  { icon: <IconShield />, label: 'Secure & compliant' },
  { icon: <IconBolt />, label: '99.7% delivery' },
  { icon: <IconGlobe />, label: 'AI in 8 languages' },
  { icon: <IconGear />, label: 'Free trial credit' },
]

function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="container trust-strip-row">
        {ITEMS.map((item) => (
          <span className="trust-strip-item" key={item.label}>
            <span className="trust-strip-icon">{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TrustStrip
