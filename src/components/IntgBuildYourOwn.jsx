import { Link } from 'react-router-dom'
import './IntgBuildYourOwn.css'
import { IconCode, IconBolt, IconRefresh } from './icons.jsx'

const CAPS = [
  { icon: <IconCode />, title: 'REST API', desc: 'Read and write contacts, messages and events.' },
  { icon: <IconBolt />, title: 'Webhooks', desc: 'Real-time callbacks the moment something happens.' },
  { icon: <IconRefresh />, title: 'Zapier & Make', desc: 'Automate across thousands of apps, no code.' },
]

function IntgBuildYourOwn() {
  return (
    <section className="section section-alt intg-build">
      <div className="container intg-build-inner">
        <span className="section-kicker">Build your own</span>
        <h2 className="section-title">No app for it? Build it.</h2>
        <p className="section-subtitle">
          Every listed integration runs on the same open platform you get. Push and pull data over a
          documented REST API, subscribe to events with webhooks, or wire it up in Zapier and Make &mdash;
          no partnership required.
        </p>

        <div className="intg-build-row reveal">
          {CAPS.map((c) => (
            <div className="intg-build-cap" key={c.title}>
              <span className="intg-build-ic">{c.icon}</span>
              <span className="intg-build-text">
                <span className="intg-build-name">{c.title}</span>
                <span className="intg-build-desc">{c.desc}</span>
              </span>
            </div>
          ))}
        </div>

        <Link to="/contact-us" className="intg-build-link">See what you can build &rarr;</Link>
      </div>
    </section>
  )
}

export default IntgBuildYourOwn
