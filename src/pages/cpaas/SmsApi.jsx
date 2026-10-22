import Seo from '../../components/Seo.jsx'
import PageSchema from '../../components/PageSchema.jsx'
import { InLink, OutLink } from '../../components/BodyLinks.jsx'
import { FAQ, CTABanner } from '../../components/sections/Sections.jsx'
import SmsApiHero from '../../components/cpaas/SmsApiHero.jsx'
import {
  SendPlayground, IdeasRow, LiveLog, PartsCounter, CompareSlider, LaunchChecklist, NextSteps,
} from '../../components/cpaas/SmsApiSections.jsx'
import { IconCode, IconBolt, IconRefresh } from '../../components/icons.jsx'
import { SMS_API } from '../../data/cpaasPages.jsx'

const { seo, hero, cta, faqs } = SMS_API

const FAQ_ITEMS = [
  ...faqs.items,
  { q: 'Do I need DLT registration in India?', a: 'Yes. SMS to Indian numbers must use an approved entity, sender header and template. Our team helps you register them during onboarding.' },
]

const LINKS = [
  { t: 'Developer docs', d: 'The full API reference and examples.', href: '/resources/docs/' },
  { t: 'Webhooks', d: 'How delivery reports and replies reach you.', href: '/developers/webhooks/' },
  { t: 'Verify API', d: 'One-time passcodes built on the same account.', href: '/products/cpaas/verify-api/' },
  { t: 'CPaaS platform', d: 'Everything else you can switch on.', href: '/products/cpaas/' },
]

/* One section per design, in the order a developer reads the page. */
function SmsApi() {
  return (
    <>
      <Seo {...seo} />
      <PageSchema name={seo.title.split(' — ')[0]} description={seo.description} faqs={FAQ_ITEMS} />
      <SmsApiHero {...hero} />

      <SendPlayground
        eyebrow="Send your first SMS"
        title="One request, one message"
        subtitle="Authenticate with your access key, POST the message, and read the msgid from the response. Press the button to see it run."
        tabs={[
          {
            label: 'cURL',
            file: 'POST /external/sms',
            lines: [
              'curl -X POST https://secure.smslocal.com/api/service/enterprise-service/external/sms \\',
              '  -H "Token: $SMSLOCAL_TOKEN" \\',
              '  -H "Content-Type: application/json" \\',
              "  -d '{",
              '    "from": "SMSLOCAL",',
              '    "to": "14155550123",',
              '    "content": "Your code is 481920."',
              "  }'",
            ],
          },
          {
            label: 'Node.js',
            file: 'send-sms.js',
            lines: [
              'const res = await fetch(',
              "  'https://secure.smslocal.com/api/service/enterprise-service/external/sms',",
              '  {',
              "    method: 'POST',",
              "    headers: { Token: process.env.SMSLOCAL_TOKEN, 'Content-Type': 'application/json' },",
              '    body: JSON.stringify({ from: "SMSLOCAL", to: "14155550123", content: "Your code is 481920." }),',
              '  }',
              ')',
              'console.log(await res.json())',
            ],
          },
          {
            label: 'Python',
            file: 'send_sms.py',
            lines: [
              'import os, requests',
              '',
              'res = requests.post(',
              '    "https://secure.smslocal.com/api/service/enterprise-service/external/sms",',
              '    headers={"Token": os.environ["SMSLOCAL_TOKEN"]},',
              '    json={"from": "SMSLOCAL", "to": "14155550123", "content": "Your code is 481920."},',
              ')',
              'print(res.json())',
            ],
          },
        ]}
        response={{ label: 'Response', lines: ['{', '  "msgid": "9f2a7c10",', '  "errorcode": 0', '}'] }}
      />

      <IdeasRow
        eyebrow="Built for developers"
        title="Nothing exotic to learn"
        subtitle={<>Three ideas cover the whole API, which follows plain <OutLink href="https://en.wikipedia.org/wiki/REST">REST</OutLink> conventions.</>}
        items={[
          { icon: <IconCode />, label: 'Authentication', title: 'Token authentication', desc: 'Send your access key in a Token header on every request, with JSON in and JSON out.', points: ['No SDK required', 'Works from any language', 'Keep the key in an environment variable'] },
          { icon: <IconBolt />, label: 'Response', title: 'Know it was accepted', desc: 'Every send returns a msgid and an errorcode immediately.', points: ['Store the msgid against your own record', 'errorcode 0 means accepted', 'Use the msgid to match reports later'] },
          { icon: <IconRefresh />, label: 'Replies', title: 'Two-way by default', desc: 'Replies arrive on the same callback, marked as mobile originated.', points: ['Same message shape as reports', 'Tell directions apart with mt / mo', 'Route replies to your support tools'] },
        ]}
      />

      <LiveLog
        eyebrow="Delivery reports"
        title="See what happened to every message"
        subtitle={<>A status report is posted to your <InLink to="/developers/webhooks/">callback URL</InLink> when a message reaches its final state.</>}
        points={[
          { title: 'Match by msgid', desc: 'Every report carries the ID you were given at send time.' },
          { title: 'Final states only', desc: 'You hear about a message when it is delivered or has failed.' },
          { title: 'One callback URL', desc: 'The same endpoint receives reports and replies.' },
        ]}
      />

      <PartsCounter
        eyebrow="Know before you send"
        title="See how a message is counted"
        subtitle={<>Longer text and non-Latin characters change how many parts a message is billed as. Try your own wording, and <InLink to="/products/cpaas/lookup-api/">look up a number</InLink> before you send.</>}
      />

      <CompareSlider
        eyebrow="Why an API"
        title="Stop gluing messaging together by hand"
        beforeLabel="Without a messaging API"
        beforeItems={['Manual exports and uploads', 'No idea if a message arrived', 'Replies land in someone’s inbox']}
        afterLabel="With the SMS API"
        afterItems={['Messages sent from your own code', 'A report for every message', 'Replies pushed to your system']}
      />

      <LaunchChecklist
        eyebrow="Before you go live"
        title="A short pre-launch checklist"
        groups={[
          { title: 'Account', items: ['Create an account and copy your access key', 'Register your sender ID', 'Add your callback URL'] },
          { title: 'Compliance (India)', items: ['Register your entity under DLT', 'Get headers and templates approved', 'Respect promotional sending hours'] },
          { title: 'Testing', items: ['Send to your own number first', 'Log every msgid you receive', 'Check that a failed status is handled'] },
        ]}
      />

      <NextSteps eyebrow="Keep building" title="More for your integration" links={LINKS} />

      <FAQ title={faqs.title} items={FAQ_ITEMS} />

      <CTABanner {...cta} />
    </>
  )
}

export default SmsApi
