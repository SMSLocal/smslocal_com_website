const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...stroke}>
      {children}
    </svg>
  )
}

export const IconBolt = () => (
  <Icon><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></Icon>
)

export const IconGlobe = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Icon>
)

export const IconShield = () => (
  <Icon><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /></Icon>
)

export const IconChart = () => (
  <Icon><path d="M4 20V10M11 20V4M18 20v-7" /></Icon>
)

export const IconLink = () => (
  <Icon>
    <path d="M9 15l6-6" />
    <path d="M8 17H6a4 4 0 0 1 0-8h2M16 7h2a4 4 0 0 1 0 8h-2" />
  </Icon>
)

export const IconPhone = () => (
  <Icon><path d="M5 4h4l1.5 4.5L8 10a11 11 0 0 0 6 6l1.5-2.5L20 15v4a1 1 0 0 1-1 1c-8 0-15-7-15-15a1 1 0 0 1 1-1z" /></Icon>
)

export const IconChat = () => (
  <Icon><path d="M21 11.5a8.4 8.4 0 0 1-3.8 7.4A8.5 8.5 0 0 1 7 20.1L3 21l1.9-4a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 8-8.5h.5a8.5 8.5 0 0 1 8 8v.3z" /></Icon>
)

export const IconRobot = () => (
  <Icon>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 8V4" />
    <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13.5" r="1.1" fill="currentColor" stroke="none" />
    <path d="M9 17h6" />
  </Icon>
)

export const IconBrain = () => (
  <Icon>
    <path d="M9 4a3 3 0 0 0-3 3v.3A3 3 0 0 0 4.5 10a3 3 0 0 0 0 4A3 3 0 0 0 6 17.5V18a3 3 0 0 0 3 3" />
    <path d="M15 4a3 3 0 0 1 3 3v.3A3 3 0 0 1 19.5 10a3 3 0 0 1 0 4A3 3 0 0 1 18 17.5V18a3 3 0 0 1-3 3" />
    <path d="M9 4v14M15 4v14" />
  </Icon>
)

export const IconCheck = () => (
  <Icon><path d="M20 6 9 17l-5-5" /></Icon>
)

export const IconRefresh = () => (
  <Icon>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </Icon>
)

export const IconMic = () => (
  <Icon>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v4M9 21h6" />
  </Icon>
)

export const IconSearch = () => (
  <Icon><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Icon>
)

export const IconCalendar = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icon>
)

export const IconUsers = () => (
  <Icon>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16 6.5a3 3 0 0 1 0 5.8M20 20a6 6 0 0 0-4.3-8" />
  </Icon>
)

export const IconGear = () => (
  <Icon>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1z" />
  </Icon>
)

export const IconPackage = () => (
  <Icon>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" />
    <path d="M3 8v8l9 5 9-5V8M12 13v8" />
  </Icon>
)

export const IconFlask = () => (
  <Icon><path d="M9 2h6M10 2v6l-6 11a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-11V2" /></Icon>
)

export const IconRocket = () => (
  <Icon>
    <path d="M12 2.5c2.7 2.3 3.8 5.7 3.8 8.8V15H8.2v-3.7c0-3.1 1.1-6.5 3.8-8.8z" />
    <path d="M8.2 15l-2.7 2.2v2.4l2.7-1.3" />
    <path d="M15.8 15l2.7 2.2v2.4l-2.7-1.3" />
    <path d="M10.4 16c.3 1.5 1.6 3 1.6 3s1.3-1.5 1.6-3" />
    <circle cx="12" cy="9.2" r="1.5" fill="currentColor" stroke="none" />
  </Icon>
)

export const IconPlug = () => (
  <Icon><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0z" /><path d="M12 17v4" /></Icon>
)

export const IconCart = () => (
  <Icon>
    <path d="M3 4h2l2.2 11.2A2 2 0 0 0 9.2 17H18a2 2 0 0 0 2-1.6L21 9H6" />
    <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
    <circle cx="18" cy="21" r="1" fill="currentColor" stroke="none" />
  </Icon>
)

export const IconClock = () => (
  <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Icon>
)

export const IconMail = () => (
  <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>
)

export const IconBell = () => (
  <Icon><path d="M6 9a6 6 0 0 1 12 0v5l2 3H4l2-3z" /><path d="M10 20a2 2 0 0 0 4 0" /></Icon>
)

export const IconMegaphone = () => (
  <Icon><path d="M3 10v4a1 1 0 0 0 1 1h2l9 4V6L6 10H4a1 1 0 0 0-1 0z" /><path d="M17 9a4 4 0 0 1 0 6" /></Icon>
)

export const IconCode = () => (
  <Icon><path d="M9 8 4 12l5 4M15 8l5 4-5 4" /></Icon>
)

export const IconDollar = () => (
  <Icon><path d="M12 2v20" /><path d="M17 6.5a4 4 0 0 0-4-2.5h-1a3.5 3.5 0 0 0 0 7h1.5a3.5 3.5 0 0 1 0 7H12a4 4 0 0 1-4-2.5" /></Icon>
)

export const IconReceipt = () => (
  <Icon><path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5z" /><path d="M9 8h6M9 12h6" /></Icon>
)

export const IconCursor = () => (
  <Icon><path d="M5 3l6.5 17 2-7 7-2z" /></Icon>
)

export const IconPencil = () => (
  <Icon><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></Icon>
)

export const IconNewspaper = () => (
  <Icon>
    <rect x="3" y="5" width="14" height="15" rx="1.5" />
    <path d="M17 8h3.5a0.5 0.5 0 0 1 0.5 0.5V18a2 2 0 0 1-2 2" />
    <path d="M6.5 9h7M6.5 12.5h7M6.5 16h4" />
  </Icon>
)

export const IconBook = () => (
  <Icon>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v17H6.5A2.5 2.5 0 0 0 4 22.5z" />
    <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v17h5.5a2.5 2.5 0 0 1 2.5 2.5z" />
  </Icon>
)

export const IconInfo = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6" />
    <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
  </Icon>
)

export const IconHandshake = () => (
  <Icon>
    <path d="M2 12l5-4 4 2 3-2 5 4" />
    <path d="M7 8l4 8 3-2" />
    <path d="M11 16l3 3 3-2-2-3" />
    <path d="M2 12v3l4 3M22 12v3l-4 3" />
  </Icon>
)

export const IconBriefcase = () => (
  <Icon>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
  </Icon>
)

export const IconMenu = () => (
  <Icon><path d="M3 6h18M3 12h18M3 18h18" /></Icon>
)
