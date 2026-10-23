/**
 * The two restored RCS posts (what-is-rcs-messaging, how-to-change-from-rcs-to-sms)
 * were recovered from the Wayback Machine, which kept the hero images but not
 * the in-body ones. Those are rebuilt as SVGs by scripts/gen-rcs-post-images.mjs;
 * this swaps each in-body .webp reference for the matching .svg so a re-run of
 * the import keeps pointing at files that exist. Hero images stay as .webp.
 */
const SWAP = {
  'what-is-rcs-messaging': /^(.*\/)(What-is-an-RCS-message|Where-is-RCS-messaging-used-1|RCS-vs\.-SMS-and-MMS-vs\.-OTT-messaging-apps|Why-RCS-chat-is-a-game-changer-for-your-company-and-for-your|How-can-RCS-messaging-grow-your-business|Challenges-and-Limitations-of-RCS-Messaging)\.webp$/,
  'how-to-change-from-rcs-to-sms': /^(.*\/)(What-is-RCS|How-to-change-rcs-to-sms-chats-on-Android-Step-by-Step-Guide|Troubleshooting_-RCS-Messages-Still-Sending|Why-People-Choose-to-Change-from-RCS-to-SMS)\.webp$/,
}

export function swapRestoredImages(slug, blocks) {
  const re = SWAP[slug]
  if (!re) return blocks
  return blocks.map((b) => {
    if (b.type !== 'img') return b
    const m = re.exec(b.src)
    if (!m) return b
    const id = m[2] === 'Where-is-RCS-messaging-used-1' ? 'Where-is-RCS-messaging-used' : m[2]
    return { ...b, src: `${m[1]}${id}.svg` }
  })
}
