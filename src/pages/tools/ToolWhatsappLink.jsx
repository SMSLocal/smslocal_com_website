import { useMemo, useState } from 'react'
import Seo from '../../components/Seo.jsx'
import { Hero, HowItWorks, FAQ, CTABanner } from '../../components/sections/Sections.jsx'
import '../../components/CpaasPage.css'

const STEPS = [
  { title: 'Enter the number', desc: 'Type the WhatsApp number with its country code, for example 919876543210.' },
  { title: 'Add a message', desc: 'Optionally pre-fill the message people will see when the chat opens.' },
  { title: 'Share the link', desc: 'Copy the link into your website, ads, email or QR code.' },
]

const FAQS = [
  { q: 'What format should the number be in?', a: 'Use the full international number with the country code and no plus sign, spaces or dashes, for example 919876543210 for an Indian number.' },
  { q: 'Does the link work without the WhatsApp Business API?', a: 'Yes. A wa.me link opens a chat in WhatsApp on any phone. To answer at scale with templates and AI agents, use the WhatsApp Business API.' },
  { q: 'Is this tool free?', a: 'Yes, it runs in your browser, needs no account and stores nothing.' },
]

function ToolWhatsappLink() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const digits = phone.replace(/\D/g, '')
  const valid = digits.length >= 7 && digits.length <= 15

  const link = useMemo(() => {
    if (!valid) return ''
    const text = message.trim()
    return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`
  }, [valid, digits, message])

  async function copy() {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      const el = document.createElement('textarea')
      el.value = link
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      <Seo
        title="Free WhatsApp Link Generator"
        description="Create a wa.me link with a pre-filled message in seconds. Free, no account needed."
        keywords={['WhatsApp link generator', 'wa.me link', 'click to chat link', 'WhatsApp chat link']}
      />

      <Hero
        eyebrow="Free tool"
        title={<>WhatsApp link <span className="grad-word">generator</span></>}
        subtitle="Create a click-to-chat link with a ready-typed message. Free, instant and no account needed."
        primaryCta={{ label: 'Start free', href: '/signup/' }}
        secondaryCta={{ label: 'WhatsApp Business API', href: '/products/channels/whatsapp/' }}
      />

      <section className="section">
        <div className="container">
          <div className="cpaas-tool">
            <label>
              WhatsApp number
              <input
                type="tel"
                inputMode="tel"
                placeholder="919876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={phone !== '' && !valid}
              />
              <span className="cpaas-tool-hint">
                {phone !== '' && !valid ? 'Enter 7 to 15 digits including the country code.' : 'Country code first, no plus sign or spaces.'}
              </span>
            </label>

            <label>
              Pre-filled message <span className="cpaas-tool-hint">(optional)</span>
              <textarea
                rows={3}
                placeholder="Hi, I would like to know more about your plans."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <div className="cpaas-tool-result" aria-live="polite">
              <strong>Your link</strong>
              {link ? <code>{link}</code> : <span className="cpaas-tool-hint">Enter a valid number to see your link.</span>}
              <div className="cpaas-tool-actions">
                <button type="button" className="btn btn-primary" onClick={copy} disabled={!link}>
                  {copied ? 'Copied' : 'Copy link'}
                </button>
                <a
                  className="btn btn-ghost"
                  href={link || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!link}
                  onClick={(e) => { if (!link) e.preventDefault() }}
                >
                  Test it
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks eyebrow="How it works" title={<>Make a link in <span className="grad-word">three steps</span></>} steps={STEPS} alt />

      <CTABanner
        title="Ready to answer at scale?"
        subtitle="Move from a chat link to the WhatsApp Business API, with templates, a team inbox and AI agents."
        cta={{ label: 'Start free', href: '/signup/' }}
        secondaryCta={{ label: 'Talk to sales', href: '/contact-us/' }}
      />

      <FAQ title={<>WhatsApp link generator — frequently asked questions</>} items={FAQS} alt />
    </>
  )
}

export default ToolWhatsappLink
