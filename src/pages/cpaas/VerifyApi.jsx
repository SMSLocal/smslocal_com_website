import Seo from '../../components/Seo.jsx'
import PageSchema from '../../components/PageSchema.jsx'
import { InLink, OutLink } from '../../components/BodyLinks.jsx'
import { FAQ, CTABanner } from '../../components/sections/Sections.jsx'
import VerifyApiHero from '../../components/cpaas/VerifyApiHero.jsx'
import {
  WhyPanels, FlowStepper, ChannelSwitch, TicketRail, IndiaNotice, RelatedCards,
} from '../../components/cpaas/VerifyApiSections.jsx'
import { PasscodeTuner, DropoffFunnel } from '../../components/cpaas/VerifyApiExtras.jsx'
import { IconBolt, IconSearch, IconShield } from '../../components/icons.jsx'
import { VERIFY_API } from '../../data/cpaasPages.jsx'

const { seo, hero, features, steps, cta, faqs } = VERIFY_API

const RELATED = [
  { icon: <IconBolt />, title: 'SMS API', desc: 'The delivery layer behind every passcode.', href: '/products/cpaas/sms-api/' },
  { icon: <IconSearch />, title: 'Number Lookup API', desc: 'Check a number before you send a code to it.', href: '/products/cpaas/lookup-api/' },
  { icon: <IconShield />, title: 'OTP & authentication', desc: 'See how teams use verification end to end.', href: '/solutions/use-case/otp-authentication/' },
]

/* One section per design, in the order a reader meets the idea. */
function VerifyApi() {
  return (
    <>
      <Seo {...seo} />
      <PageSchema name={seo.title.split(' — ')[0]} description={seo.description} faqs={faqs.items} />
      <VerifyApiHero {...hero} />

      <WhyPanels eyebrow={features.eyebrow} title="Verification is the message users wait for" items={features.items} />

      <FlowStepper eyebrow={steps.eyebrow} title="How verification works" steps={steps.steps} />

      <ChannelSwitch
        eyebrow="More than one way in"
        title="Reach users where they are"
        subtitle={<>SMS is the default. Add <InLink to="/products/channels/whatsapp/">WhatsApp</InLink> or voice when SMS is not the best route.</>}
      />

      <TicketRail
        eyebrow="Where it fits"
        title="One flow, many moments"
        subtitle="The same passcode flow works for sign-up, login, password reset and confirming a payment."
      />

      <PasscodeTuner
        eyebrow="Design the flow"
        title="Choose how your passcode behaves"
        subtitle={<>Length, lifetime and tries are rules in your own app, and <OutLink href="https://pages.nist.gov/800-63-3/sp800-63b.html">NIST guidance</OutLink> is a good starting point. See what each choice means.</>}
      />

      <DropoffFunnel
        eyebrow="See what happens"
        title="Spot where users drop off"
        subtitle={<>Delivery tracking for every passcode shows which step of sign-up loses people. Check numbers first with the <InLink to="/products/cpaas/lookup-api/">Number Lookup API</InLink>.</>}
      />

      <IndiaNotice
        title="Sending to India?"
        text="SMS to Indian numbers must use an approved entity, sender header and template under DLT. Our team helps you register them during onboarding."
        cta={{ label: 'Talk to us', href: '/contact-us/' }}
      />

      <RelatedCards eyebrow="Related" title="Works with the rest of the platform" items={RELATED} />

      <FAQ alt title={faqs.title} items={faqs.items} />
      <CTABanner {...cta} />
    </>
  )
}

export default VerifyApi
