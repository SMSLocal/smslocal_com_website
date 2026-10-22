import Seo from '../../components/Seo.jsx'
import PageSchema from '../../components/PageSchema.jsx'
import { InLink, OutLink } from '../../components/BodyLinks.jsx'
import { FAQ, CTABanner } from '../../components/sections/Sections.jsx'
import LookupApiHero from '../../components/cpaas/LookupApiHero.jsx'
import {
  ShapeChecker, ListCleaner, NetworkMix, TrioSteps, BulkBand, FlowChain,
} from '../../components/cpaas/LookupApiSections.jsx'
import { FormatGuide, WhoUses } from '../../components/cpaas/LookupApiExtras.jsx'
import { IconSearch, IconBolt, IconShield } from '../../components/icons.jsx'
import { LOOKUP_API } from '../../data/cpaasPages.jsx'

const { seo, hero, steps, cta, faqs } = LOOKUP_API

const TOOL = '/tools/carrier-lookup/'

const FLOW = [
  { icon: <IconSearch />, title: 'Free carrier lookup', desc: 'The tool, free and no account needed.', href: TOOL },
  { icon: <IconBolt />, title: 'SMS API', desc: 'Send once your list is clean.', href: '/products/cpaas/sms-api/' },
  { icon: <IconShield />, title: 'Verify API', desc: 'Confirm the number belongs to a real user.', href: '/products/cpaas/verify-api/' },
]

// The first two answers come from the page data; the rest restate what the free
// carrier lookup page already tells visitors.
const FAQ_ITEMS = [
  ...faqs.items,
  { q: 'What does a lookup tell me?', a: 'Whether the number is valid, its line type (mobile, landline or VoIP), the network it was issued by, its region and its time zone.' },
  { q: 'Does it work for every country?', a: 'Numbers from every country can be validated and given a line type. Carrier names are available for most countries. For the US and Canada the carrier is not shown, because numbers there move freely between operators.' },
  { q: 'Is the carrier always the one serving the number today?', a: 'Not always. The lookup shows the network the number range was originally assigned to. If the owner has ported the number to another operator since, the current carrier can differ. Validity and line type are reliable.' },
  { q: 'What is number portability?', a: 'Portability lets people keep their phone number when they switch operators. It is why the original network of a number is not always the one serving it today.' },
  { q: 'Can I look up numbers in bulk or through an API?', a: 'The free tool checks one number at a time. For bulk or API-based lookups, contact the SMSLocal team and tell us your volume.' },
]

/* One section per design, in the order a reader meets the idea. */
function LookupApi() {
  return (
    <>
      <Seo {...seo} />
      <PageSchema name={seo.title.split(' — ')[0]} description={seo.description} faqs={FAQ_ITEMS} />
      <LookupApiHero {...hero} />

      <ShapeChecker
        eyebrow="Start with the shape"
        title="Check how a number looks"
        subtitle={<>Many bad sends begin with a number that was never well-formed. Paste one to see how it breaks down, following the <OutLink href="https://www.itu.int/rec/T-REC-E.164">E.164</OutLink> standard.</>}
        toolHref={TOOL}
      />

      <ListCleaner
        eyebrow="Clean your lists"
        title="Remove landlines and invalid numbers"
        subtitle={<>Landlines usually cannot receive SMS. Checking line type before a campaign stops you paying for messages that cannot be delivered. Send the rest with the <InLink to="/products/cpaas/sms-api/">SMS API</InLink>.</>}
      />

      <NetworkMix
        eyebrow="Plan by network"
        title="Know your audience before you launch"
        subtitle={<>Understand which carriers your audience is on before you plan a <InLink to="/products/channels/sms-broadcasting/">bulk SMS</InLink> campaign.</>}
      />

      <WhoUses
        eyebrow="Who it helps"
        title="One check, four teams"
        subtitle="Marketing, product, operations and engineering all start from the same clean list."
      />

      <TrioSteps eyebrow={steps.eyebrow} title="Look up a number in seconds" steps={steps.steps} />

      <FormatGuide
        eyebrow="Know the format"
        title="How a phone number is written"
        subtitle="Every number has the same parts. Writing them in the standard way makes a number easy to check, store and send to."
      />

      <BulkBand
        title="Individual lookups are free"
        text="For high-volume or automated lookups, tell us your volume and we will set up bulk options."
        primary={{ label: 'Try the free lookup', href: TOOL }}
        secondary={{ label: 'Talk to sales', href: '/contact-us/' }}
      />

      <FlowChain eyebrow="Where it fits" title="Use it with" items={FLOW} />

      <FAQ alt title={faqs.title} items={FAQ_ITEMS} />
      <CTABanner {...cta} />
    </>
  )
}

export default LookupApi
