import './VoiceCapabilitiesConsole.css'
import { IconMic, IconRefresh, IconChart, IconPhone, IconGlobe } from './icons.jsx'

const ITEMS = [
  { n: 1, icon: <IconMic />, title: 'Natural, two-way conversation', teaser: 'Real speech in, real speech out.', more: 'No menu tree, no "press 1 for sales". Interruptions and mid-sentence pauses don’t break the flow.' },
  { n: 2, icon: <IconRefresh />, title: 'Understands the actual ask', teaser: 'Resolves the real request.', more: 'Listens for what the caller actually needs and acts on it directly, instead of routing by keypad choice.' },
  { n: 3, icon: <IconChart />, title: 'Transcript & sentiment, every call', teaser: 'Every call, scored automatically.', more: 'Transcribed, summarized and scored for sentiment — searchable from your dashboard the moment the call ends.' },
  { n: 4, icon: <IconRefresh />, title: 'Escalates the moment it should', teaser: 'Hands off before it’s asked twice.', more: 'Detects a direct request for a human or rising frustration, and routes with full context already gathered.' },
  { n: 5, icon: <IconPhone />, title: 'Sits in front of your existing line', teaser: 'Layers over your current IVR.', more: 'Keep your existing number and queue, or let the agent replace it outright — your choice.' },
  { n: 6, icon: <IconGlobe />, title: 'Speaks the caller’s language', teaser: 'Hindi, English and more.', more: 'Detects the language the caller opens with and replies in kind, without a menu to pick one.' },
]

function Card({ item, dupKey }) {
  return (
    <div className="vmq-card" key={dupKey}>
      <div className="vmq-card-top">
        <span className="vmq-num">{String(item.n).padStart(2, '0')}</span>
        <span className="vmq-icon">{item.icon}</span>
      </div>
      <h3>{item.title}</h3>
      <p className="vmq-teaser">{item.teaser}</p>
      <p className="vmq-more">{item.more}</p>
    </div>
  )
}

function VoiceCapabilitiesConsole() {
  return (
    <div className="vmq">
      <div className="vmq-track">
        {ITEMS.map((item) => <Card item={item} dupKey={`a-${item.n}`} key={`a-${item.n}`} />)}
        {ITEMS.map((item) => <Card item={item} dupKey={`b-${item.n}`} key={`b-${item.n}`} />)}
      </div>
    </div>
  )
}

export default VoiceCapabilitiesConsole
