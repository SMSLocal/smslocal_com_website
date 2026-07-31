/**
 * Per-post curation of in-body images, applied by transform-smslocal-blogs.mjs
 * right after it builds each post's blocks — same pattern as COVER_SPECS
 * overriding the hero banner. This exists so the curation survives a re-run
 * of the import pipeline instead of being a one-off hand-edit to the
 * generated JSON that the next `node scripts/transform-smslocal-blogs.mjs`
 * would silently discard.
 *
 * Every entry:
 *   keep:   1-based positions (in document order) of ORIGINAL WordPress
 *           images to leave alone. Everything else is dropped.
 *   insert: new bespoke SVGs (drawn by gen-inner-images.mjs) to splice in
 *           immediately after the named heading — the same position the
 *           original per-section image occupied.
 *
 * The total image count after curation should equal 7 (the fixed count the
 * client asked for across every post). applyInnerImageCuration() in the
 * transform script warns if a post's spec doesn't land on 7.
 */

export const INNER_IMAGE_SPECS = {
  '22395-short-code': {
    keep: [3, 6, 7, 8],
    insert: [
      { afterHeading: 'Understanding Short Codes', id: 'code-length', alt: 'Short codes compared to standard ten-digit numbers' },
      { afterHeading: 'Common Uses of the 22395 Short Code', id: 'common-uses', alt: 'Common uses of the 22395 short code' },
      { afterHeading: 'Is the 22395 Short Code Safe?', id: 'is-it-safe', alt: 'Signs the 22395 short code is safe to trust' },
    ],
  },
  // Drops the generic "SMS-LOCAL-Banner-Image-2.webp" promo screenshot
  // (was position 9, a tilted dashboard mockup unrelated to the area-code
  // topic) and the "Obtaining a 469 Area Code Phone Number" stock graphic
  // (was position 8, a phone-number list mockup). Everything else is
  // untouched pending a full curation pass like post 1's.
  '469-area-code': {
    keep: [1, 2, 3, 4, 5, 6, 7],
    insert: [],
  },
  '216-area-code': {
    keep: [1, 2, 4, 5, 6, 7],
    insert: [
      { afterHeading: 'Benefits of a Local 216 Phone Number', id: 'local-benefits', alt: 'Benefits of a local 216 phone number' },
    ],
  },
  // Keeps the "Common Reasons" and "How to Prevent…in the Future" originals
  // (positions 2 and 8); replaces the definition graphic and all five fix
  // steps the client flagged with bespoke breadcrumb-navigation diagrams.
  'message-blocking-is-active': {
    keep: [2, 8],
    insert: [
      { afterHeading: 'What Does “Message Blocking Is Active” Mean?', id: 'what-is', alt: 'What message blocking is active means' },
      { afterHeading: '1. Check Your Network Connection', id: 'check-network', alt: 'Checking your network connection' },
      { afterHeading: '2. Review Your Blocked Numbers List', id: 'review-blocked', alt: 'Reviewing your blocked numbers list' },
      { afterHeading: '3. Disable Wi-Fi Calling', id: 'disable-wifi-calling', alt: 'Disabling Wi-Fi calling' },
      { afterHeading: '9. Clear Cache for Messages App (Android)', id: 'clear-cache', alt: 'Clearing the Messages app cache on Android' },
      { afterHeading: '10. Reset Your APN Settings', id: 'reset-apn', alt: 'Resetting your APN settings' },
    ],
  },
  // All 4 of this post's images replaced — none kept.
  'what-does-ty-mean': {
    keep: [],
    insert: [
      { afterHeading: 'What Does TY Mean in Text?', id: 'what-is', alt: 'What TY means in text' },
      { afterHeading: 'What Does TY Mean on Snapchat, Instagram, WhatsApp, and TikTok?', id: 'platforms', alt: 'What TY means on Snapchat, Instagram, WhatsApp and TikTok' },
      { afterHeading: 'Best Ways to Respond to “TY” in Texts and Chats', id: 'how-to-respond', alt: 'Best ways to respond to TY' },
      { afterHeading: 'Different Ways to Say “Thank You” in Text: Similar Abbreviations to “TY”', id: 'alternatives', alt: 'Alternative abbreviations to TY' },
    ],
  },
  // All 7 of this post's images replaced — none kept.
  'what-does-otp-mean-in-text': {
    keep: [],
    insert: [
      { afterHeading: 'What Does OTP Mean in Text?', id: 'what-is', alt: 'The four meanings of OTP' },
      { afterHeading: 'How to Determine Which Meaning of OTP Applies', id: 'how-to-determine', alt: 'How to determine which meaning of OTP applies' },
      { afterHeading: 'Understanding OTP Usage on Social Media', id: 'social-media-usage', alt: 'OTP usage across TikTok, Snapchat, Twitter, Instagram and WhatsApp' },
      { afterHeading: 'How to Recognize the Meaning of OTP in Social Media Contexts', id: 'recognize-context', alt: 'Recognizing whether OTP means fan talk or security talk' },
      { afterHeading: 'How to Use OTP in Text Conversations', id: 'security-vs-social', alt: 'OTP in security talk versus social talk' },
      { afterHeading: 'How to Respond to an OTP?', id: 'how-to-respond', alt: 'How to respond to an OTP' },
      { afterHeading: 'How OTP Messages Are Used for 2FA', id: 'otp-for-2fa', alt: 'TOTP versus HOTP for two-factor authentication' },
    ],
  },
  // All 7 of this post's images replaced — none kept.
  'sms-bomber': {
    keep: [],
    insert: [
      { afterHeading: 'What is SMS Bombing?', id: 'what-is', alt: 'What SMS bombing is and its real effects' },
      { afterHeading: 'Common SMS Bomber Tools and Their Risks', id: 'common-tools', alt: 'Common SMS bomber tools and their risks' },
      { afterHeading: 'Types of SMS Bombing (With Examples)', id: 'types', alt: 'The four types of SMS bombing' },
      { afterHeading: 'The Impact of SMS Bombing on Individuals and Businesses', id: 'impact', alt: 'The impact of SMS bombing on individuals and businesses' },
      { afterHeading: 'How to Protect Yourself from SMS Bombing', id: 'protect', alt: 'How to protect yourself from SMS bombing' },
      { afterHeading: 'How to Stop SMS Bombing', id: 'stop', alt: 'How to stop SMS bombing' },
      { afterHeading: 'How to Identify Who is Behind SMS Bombing', id: 'identify', alt: 'How to identify who is behind SMS bombing' },
    ],
  },
  // 8 originals down to 7 — "Area Code Overlays" is dropped since it
  // largely repeats the History section's own overlay explanation.
  '385-area-code': {
    keep: [],
    insert: [
      { afterHeading: 'History of Area Code 385', id: 'history', alt: 'The history of area code 385' },
      { afterHeading: 'Location and Time Zone', id: 'location', alt: 'Area code 385 location and time zone' },
      { afterHeading: 'How to Dial and Send SMS with the 385 Area Code', id: 'dialing', alt: 'How to dial and send SMS with the 385 area code' },
      { afterHeading: 'Scams and Safety', id: 'scams', alt: 'Scams and safety in the 385 area code' },
      { afterHeading: 'Sending and Receiving Texts with the 385 Area Code', id: 'texting', alt: 'Sending and receiving texts with the 385 area code' },
      { afterHeading: 'Business and Economic Impact', id: 'business', alt: 'Business and economic impact of the 385 area code' },
      { afterHeading: 'SMS Marketing and the 385 Area Code', id: 'marketing', alt: 'SMS marketing and the 385 area code' },
    ],
  },
  // 6 originals plus a new 7th at "Popular Related Slang Words" (previously
  // image-less) to hit the client's 7-image target.
  'what-does-tbh-mean': {
    keep: [],
    insert: [
      { afterHeading: 'What Does TBH Mean in Texting?', id: 'what-is', alt: 'What TBH means in texting' },
      { afterHeading: 'What Does TBH Mean on Snapchat, Instagram, and WhatsApp?', id: 'platforms', alt: 'What TBH means on Snapchat, Instagram, and WhatsApp' },
      { afterHeading: 'How to Use “TBH” in Text Conversations', id: 'how-to-use', alt: 'How to use TBH in text conversations' },
      { afterHeading: 'How to Respond to TBH Over Text and on Snapchat', id: 'respond-text', alt: 'How to respond to TBH over text and on Snapchat' },
      { afterHeading: 'How to Respond to TBH on Instagram', id: 'respond-instagram', alt: 'How to respond to TBH on Instagram' },
      { afterHeading: 'All Possible “TBH” Meanings and Their Contexts', id: 'all-meanings', alt: 'All possible TBH meanings and their contexts' },
      { afterHeading: 'Popular Related Slang Words to “TBH”', id: 'related-slang', alt: 'Popular slang words related to TBH' },
    ],
  },
  // Only images 1, 2, and 6 replaced per request; 3, 4, and 5 (their
  // original WordPress positions) are left untouched.
  'what-does-wtw-mean': {
    keep: [3, 4, 5],
    insert: [
      { afterHeading: 'What does WTW mean in text?', id: 'what-is', alt: 'What WTW means in text' },
      { afterHeading: 'WTW on Snapchat, WhatsApp, TikTok, and Instagram', id: 'platforms', alt: 'WTW on Snapchat, WhatsApp, TikTok, and Instagram' },
      { afterHeading: 'How to Respond to WTW in Text?', id: 'how-to-respond', alt: 'How to respond to WTW in text' },
    ],
  },
  // Authored replacement post (see content-overrides.mjs) — no originals to
  // keep, all 7 images are new.
  'how-to-send-a-system-generated-sms': {
    keep: [],
    insert: [
      { afterHeading: 'What Is a System-Generated SMS?', id: 'what-is', alt: 'Manual sending versus system-generated SMS' },
      { afterHeading: 'How Does System-Generated SMS Work?', id: 'how-it-works', alt: 'Trigger, API call, gateway, and recipient pipeline' },
      { afterHeading: 'Common Types of System-Generated SMS', id: 'types', alt: 'Common types of system-generated SMS' },
      { afterHeading: 'How to Send a System-Generated SMS: Step-by-Step', id: 'steps', alt: 'Steps to send a system-generated SMS' },
      { afterHeading: 'Sending System-Generated SMS with Python and PHP', id: 'code', alt: 'Sending system-generated SMS with Python and PHP' },
      { afterHeading: 'Benefits of System-Generated SMS', id: 'benefits', alt: 'Benefits of system-generated SMS' },
      { afterHeading: 'Best Practices for Automated Text Messages', id: 'best-practices', alt: 'Best practices for automated text messages' },
    ],
  },
}

/**
 * Rewrites a post's blocks per its spec. No-op (returns `blocks` unchanged)
 * for any slug without an entry — every other post keeps its original
 * WordPress images until it gets its own curation pass.
 */
export function applyInnerImageCuration(slug, blocks, { coverPath, warn }) {
  const spec = INNER_IMAGE_SPECS[slug]
  if (!spec) return blocks

  const keep = new Set(spec.keep)
  let order = 0
  const filtered = blocks.filter((b) => {
    if (b.type !== 'img') return true
    order += 1
    return keep.has(order)
  })

  const out = []
  for (const block of filtered) {
    out.push(block)
    if (!/^h[234]$/.test(block.type)) continue
    for (const ins of spec.insert) {
      if (block.text !== ins.afterHeading) continue
      out.push({
        type: 'img',
        src: coverPath ? coverPath(slug, ins.id) : `/blog/${slug}/${ins.id}.svg`,
        alt: ins.alt,
        width: 1024,
        height: 576,
      })
    }
  }

  const finalCount = out.filter((b) => b.type === 'img').length
  if (finalCount !== 7) {
    warn?.(`inner-image curation landed on ${finalCount} images, expected 7`)
  }
  return out
}
