// Sibling pages for the "related pages" row (components/RelatedPages.jsx). Each group
// lists every page in the section, and the row leaves out the page it sits on, so
// the pages in a section link to each other instead of only to their hub.
export const RELATED_GROUPS = {
  industry: {
    eyebrow: 'Industries',
    title: 'See how other industries use it',
    items: [
      { title: 'Retail', desc: 'Product questions, abandoned carts and order issues.', href: '/solutions/industry/retail/' },
      { title: 'Travel & Hospitality', desc: 'Bookings, itinerary changes and guest questions.', href: '/solutions/industry/travel-and-hospitality/' },
      { title: 'Fintech', desc: 'Onboarding, transactions and time-sensitive alerts.', href: '/solutions/industry/fintech/' },
      { title: 'Education', desc: 'Admissions questions and deadline reminders.', href: '/solutions/industry/education/' },
      { title: 'Media & Entertainment', desc: 'Ticketing, billing and subscriber questions.', href: '/solutions/industry/media-entertainment/' },
      { title: 'Healthcare', desc: 'Scheduling, reminders and patient questions.', href: '/solutions/industry/healthcare/' },
      { title: 'Insurance', desc: 'Quotes, claims status and renewal reminders.', href: '/solutions/industry/insurance/' },
      { title: 'Mortgage', desc: 'Lead pre-qualification and document follow-up.', href: '/solutions/industry/mortgage/' },
      { title: 'Telecom', desc: 'Billing, plan and outage questions.', href: '/solutions/industry/telecom/' },
      { title: 'Real Estate', desc: 'Enquiries, listings and viewing bookings.', href: '/solutions/industry/real-estate/' },
    ],
  },
  channel: {
    eyebrow: 'More channels',
    title: 'Message customers on other apps too',
    items: [
      { title: 'Instagram', desc: 'Automated replies and DMs in one shared inbox.', href: '/products/social-and-apps/instagram/' },
      { title: 'Facebook Messenger', desc: 'Automated replies for Messenger conversations.', href: '/products/social-and-apps/messenger/' },
      { title: 'Viber', desc: 'Verified broadcasts and two-way replies.', href: '/products/social-and-apps/viber/' },
      { title: 'Telegram', desc: 'Two-way conversations and channel broadcasts.', href: '/products/social-and-apps/telegram/' },
      { title: 'LINE', desc: 'Two-way chat, flex messages and rich menus.', href: '/products/social-and-apps/line/' },
      { title: 'Apple Messages', desc: 'Rich links, list pickers and Apple Pay.', href: '/products/social-and-apps/apple-messages/' },
      { title: 'KakaoTalk', desc: 'Verified notices and two-way replies.', href: '/products/social-and-apps/kakaotalk/' },
    ],
  },
}
