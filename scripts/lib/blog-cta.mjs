/**
 * The old blog CTA block (the scraped "Engage Smarter with SMSLocal!" banner)
 * is a contact prompt, not a signup: its button reads "Contact Us" and goes to
 * /contact-us/. Other signup/register links in post copy stay on /signup/.
 */
const OLD_BUTTON_TEXT = new Set(['Register Now', 'Sign Up'])
const OLD_BUTTON_HREF = new Set(['/register/', '/login/register/', '/signup/'])

export function applyBlogCta(blocks) {
  return blocks.map((b) =>
    b.type === 'cta' && OLD_BUTTON_TEXT.has(b.buttonText) && OLD_BUTTON_HREF.has(b.buttonHref)
      ? { ...b, buttonText: 'Contact Us', buttonHref: '/contact-us/', buttonExternal: false }
      : b,
  )
}
