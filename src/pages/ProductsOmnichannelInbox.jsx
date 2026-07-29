import Seo from '../components/Seo.jsx'
import { Hero, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import InboxThreadHero from '../components/InboxThreadHero.jsx'
import InboxChannelHop from '../components/InboxChannelHop.jsx'
import InboxTeamFeed from '../components/InboxTeamFeed.jsx'
import InboxRoutingRules from '../components/InboxRoutingRules.jsx'
import InboxMetrics from '../components/InboxMetrics.jsx'

const FAQS = [
  { q: 'Which channels land in the shared inbox?', a: 'WhatsApp, SMS, RCS, email, voice and social channels like Instagram and Messenger all arrive in one place. Every message from a customer joins the same thread, whatever channel it came in on.' },
  { q: 'Does context carry over when a customer switches channels?', a: 'Yes. When a customer moves from WhatsApp to email to a phone call, the conversation stays as one continuous thread with full history, past replies and internal notes attached — so nobody has to ask them to repeat themselves.' },
  { q: 'How many teammates can share one inbox, and how do seats work?', a: 'The whole team works from the same inbox. You add teammates as seats, assign conversations, @mention each other and leave private notes, while collision detection stops two agents from replying to the same customer at once.' },
  { q: 'Can I enforce SLAs and automatic escalation?', a: 'Yes. Routing rules assign conversations by channel, topic or keyword the moment they arrive, and SLA timers escalate or reassign automatically when a reply is overdue — so nothing slips through.' },
]

function ProductsOmnichannelInbox() {
  return (
    <>
      <Seo
        title="Omnichannel Shared Inbox for Every Channel"
        description="One shared inbox where WhatsApp, SMS, email, voice and social conversations land together with full context. Assign, mention, note and route with SLAs."
        keywords={['shared inbox', 'omnichannel inbox', 'team inbox', 'customer conversations']}
      />

      <Hero
        eyebrow="Omnichannel Inbox"
        title={<>One <span className="grad-word">shared inbox</span> for every channel</>}
        subtitle="WhatsApp, SMS, email, voice and social land in a single team inbox. Conversations follow the customer across channels, keep full context, and your whole team works them together."
        primaryCta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        visual={<InboxThreadHero />}
      />

      <InboxChannelHop />

      <InboxTeamFeed />

      <InboxRoutingRules />

      <InboxMetrics />

      <CTABanner
        title="Bring every conversation into one inbox"
        subtitle="Give your team a single place to see, assign and resolve every customer conversation — across every channel."
        cta={{ label: 'Get Started', href: '/contact-us' }}
        secondaryCta={{ label: 'See Pricing', href: '/pricing' }}
        variant="spotlight"
      />

      <FAQ title={<>Shared inbox — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ProductsOmnichannelInbox
