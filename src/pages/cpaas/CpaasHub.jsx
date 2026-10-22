import Seo from '../../components/Seo.jsx'
import PageSchema from '../../components/PageSchema.jsx'
import { InLink, OutLink } from '../../components/BodyLinks.jsx'
import { FAQ, CTABanner } from '../../components/sections/Sections.jsx'
import CpaasHubHero from '../../components/cpaas/CpaasHubHero.jsx'
import {
  FlowDiagram, ChannelMatrix, TimelineSteps, PrincipleBand, CardRail,
} from '../../components/cpaas/CpaasSections.jsx'
import {
  IconCode, IconChat, IconRefresh, IconChart, IconPlug, IconShield, IconBolt, IconSearch,
  IconPhone, IconMail, IconGear,
} from '../../components/icons.jsx'
import { CPAAS_HUB } from '../../data/cpaasPages.jsx'

const { seo, hero, cta, faqs } = CPAAS_HUB

const FEATURES = [
  { icon: <IconCode />, title: 'One REST API', desc: 'Authenticate once with a Token header and send on any channel with the same request shape.' },
  { icon: <IconRefresh />, title: 'Fallback built in', desc: 'When a message cannot reach someone on one channel, retry on another instead of losing it.' },
  { icon: <IconChart />, title: 'One set of reports', desc: 'Delivery, engagement and conversion for all channels in a single dashboard.' },
  { icon: <IconPlug />, title: 'Webhooks, not polling', desc: 'Delivery reports and inbound replies are pushed to your callback URL as they happen.' },
  { icon: <IconShield />, title: 'Compliance handled', desc: 'DLT registration and sender approvals are part of onboarding, not an afterthought.' },
]

function CpaasHub() {
  return (
    <>
      <Seo {...seo} />
      <PageSchema name={seo.title.split(' — ')[0]} description={seo.description} faqs={faqs.items} />
      <CpaasHubHero {...hero} />

      <section className="section">
        <div className="container">
          <div className="cph-feat-head">
            <span className="section-kicker">The platform</span>
            <h2 className="cx-title">Build once, reach customers anywhere</h2>
            <p className="cx-sub">The same account, credentials and reporting across every channel you switch on, starting with the <InLink to="/products/cpaas/sms-api/">SMS API</InLink>.</p>
          </div>
          <ul className="cph-feat">
            {FEATURES.map((f, i) => (
              <li key={f.title}>
                <span className="cph-feat-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cph-feat-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FlowDiagram
        alt
        eyebrow="Under the hood"
        title="What happens to a request"
        subtitle="From your server to the customer’s phone, and back again as a report."
        nodes={[
          { icon: <IconCode />, title: 'Your app', desc: 'Calls the API with a sender, recipient and content.' },
          { icon: <IconGear />, title: 'Platform', desc: 'Validates the request and returns a message ID at once.' },
          { icon: <IconRefresh />, title: 'Routing', desc: 'Picks the channel and route for the message.' },
          { icon: <IconPhone />, title: 'Customer', desc: 'Receives the message on their phone or inbox.' },
          { icon: <IconPlug />, title: 'Callback', desc: 'A status report returns to your server.' },
        ]}
      />

      <ChannelMatrix
        eyebrow="Channels"
        title="Pick the channel that fits the message"
        subtitle={<>Each channel has its own strengths and its own setup, from SMS to <OutLink href="https://en.wikipedia.org/wiki/Rich_Communication_Services">RCS</OutLink>. You use them all from one account.</>}
        columns={['SMS', 'WhatsApp', 'RCS', 'Voice', 'Email']}
        rows={[
          { label: 'Send through the API', values: [true, true, true, true, true] },
          { label: 'Delivery reports', values: [true, true, true, true, true] },
          { label: 'Rich media', values: [false, true, true, false, true] },
          { label: 'Two-way replies', values: [true, true, true, 'IVR input', 'Reply-to'] },
          { label: 'Sender setup', values: ['DLT', 'Templates', 'Brand verification', 'Number', 'Domain'] },
        ]}
      />

      <TimelineSteps
        eyebrow="How it works"
        title="From signup to your first message"
        subtitle={<>Three steps, and the first one takes a few minutes. Add <InLink to="/products/cpaas/verify-api/">passcode verification</InLink> when sign-ups need it.</>}
        steps={[
          { tag: 'Step 1', title: 'Create an account', desc: 'Sign up, get your access key and pick the channels you want to switch on.' },
          { tag: 'Step 2', title: 'Send through the API', desc: 'POST a sender, recipient and content. You get a message ID back immediately.' },
          { tag: 'Step 3', title: 'Track every message', desc: 'Receive status reports and replies on your callback URL, and watch them in the dashboard.' },
        ]}
      />

      <PrincipleBand
        eyebrow="Our approach"
        title="Start small, keep control"
        items={[
          { title: 'Start with one', desc: 'Switch on a single channel today and add others when you need them.' },
          { title: 'Stay in control', desc: 'Your sender IDs, templates and routes remain yours to manage.' },
          { title: 'Keep one record', desc: 'Every message can be traced from request to final status by its ID.' },
          { title: 'Open by default', desc: 'Plain REST, JSON and webhooks that fit any stack.' },
        ]}
      />

      <CardRail
        eyebrow="Explore the APIs"
        title="Pick the building block you need"
        items={[
          { icon: <IconBolt />, title: 'SMS API', desc: 'Send, track and receive SMS over a plain REST API.', href: '/products/cpaas/sms-api/' },
          { icon: <IconShield />, title: 'Verify API', desc: 'One-time passcodes for sign-ups and logins.', href: '/products/cpaas/verify-api/' },
          { icon: <IconSearch />, title: 'Number Lookup API', desc: 'Find the carrier behind a number before you send.', href: '/products/cpaas/lookup-api/' },
          { icon: <IconChat />, title: 'WhatsApp Business API', desc: 'Official WhatsApp messaging with templates.', href: '/products/channels/whatsapp/' },
          { icon: <IconPhone />, title: 'Voice API', desc: 'Calls, IVR, routing and recording.', href: '/products/channels/voice/' },
          { icon: <IconMail />, title: 'Email API', desc: 'Transactional and bulk email over REST or SMTP.', href: '/products/channels/email/' },
        ]}
      />

      <CTABanner {...cta} />
      <FAQ title={faqs.title} items={faqs.items} alt />
    </>
  )
}

export default CpaasHub
