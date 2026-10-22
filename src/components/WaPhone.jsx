import './WaPhone.css'

/**
 * A phone showing the WhatsApp chat screen as the customer sees it: slim bezel,
 * status bar, green header with avatar, name, verified tick and call icons, a
 * wallpapered chat area with tailed bubbles, template buttons and ticks, and the
 * message bar with the green mic button. All sizes are in cqw, so the phone
 * scales with whatever width its parent gives it.
 */

const I = {
  back: <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
  video: <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h8A2.5 2.5 0 0 1 16 7.5v2.2l4.6-2.7a.8.8 0 0 1 1.2.7v9.6a.8.8 0 0 1-1.2.7L16 14.3v2.2a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 3 16.5z" fill="currentColor" />,
  call: <path d="M6.6 3.2c.5-.5 1.3-.5 1.8 0l2 2.3c.4.5.4 1.200 0 1.700L9.300 8.500a12 12 0 0 0 6.200 6.200l1.300-1.100c.5-.4 1.200-.4 1.700 0l2.300 2c.5.5.5 1.300 0 1.800l-1.100 1.200c-.9.9-2.300 1.300-3.600.9A17.500 17.500 0 0 1 3.900 8.700c-.4-1.300 0-2.700.9-3.600z" fill="currentColor" />,
  more: <><circle cx="12" cy="5" r="2" fill="currentColor" /><circle cx="12" cy="12" r="2" fill="currentColor" /><circle cx="12" cy="19" r="2" fill="currentColor" /></>,
  emoji: <><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="9" cy="10" r="1.2" fill="currentColor" /><circle cx="15" cy="10" r="1.2" fill="currentColor" /><path d="M8 14.200c1 1.500 2.300 2.200 4 2.200s3-.7 4-2.200" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  clip: <path d="M16.500 7.500v8a4.500 4.500 0 0 1-9 0V6a3 3 0 0 1 6 0v9a1.500 1.500 0 0 1-3 0V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  camera: <><path d="M4 8.500A2.500 2.500 0 0 1 6.500 6H8l1.200-1.600c.2-.3.600-.4.900-.4h3.800c.3 0 .7.200.9.400L16 6h1.500A2.500 2.500 0 0 1 20 8.500v8A2.500 2.500 0 0 1 17.500 19h-11A2.500 2.500 0 0 1 4 16.500z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="12.500" r="3.200" fill="none" stroke="currentColor" strokeWidth="1.8" /></>,
  mic: <path d="M12 3.500a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0v-5a3 3 0 0 0-3-3zM6.500 11.500a5.500 5.500 0 0 0 11 0M12 17v3.500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  reply: <path d="M10 8V5L3.500 11.500 10 18v-3.200c5 0 8.200 1.500 10.500 5 -.700-5.500-3.800-10.500-10.500-11.800z" fill="currentColor" />,
  link: <path d="M10 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-4M14 4h6v6M20 4l-9 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
}

function Ico({ n, className }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">{I[n]}</svg>
}

export function Ticks({ state = 'read' }) {
  if (state === 'sent') {
    return <svg className="wap-ticks" viewBox="0 0 16 11" aria-hidden="true"><path d="M1 5.500L4.500 9 11.500 1.500" fill="none" stroke="#8696a0" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" /></svg>
  }
  const c = state === 'read' ? '#53bdeb' : '#8696a0'
  return (
    <svg className="wap-ticks" viewBox="0 0 18 11" aria-hidden="true">
      <path d="M1 5.500L4.500 9 11.500 1.500M7 8.800l.7.700L14.700 1.500" fill="none" stroke={c} strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WaDay({ children }) {
  return <p className="wap-day"><span>{children}</span></p>
}

export function WaSys({ children }) {
  return <p className="wap-sys"><span>{children}</span></p>
}

/** A message from the business (left, white). */
export function WaIn({ children, time = '9:41', tail = true, className = '', style }) {
  return (
    <div className={`wap-b in${tail ? ' tail' : ''} ${className}`} style={style}>
      <div className="wap-t">{children}</div>
      <span className="wap-time">{time}</span>
    </div>
  )
}

/** A message from the customer (right, green). */
export function WaOut({ children, time = '9:41', ticks = 'read', tail = true, className = '', style }) {
  return (
    <div className={`wap-b out${tail ? ' tail' : ''} ${className}`} style={style}>
      <div className="wap-t">{children}</div>
      <span className="wap-time">{time}<Ticks state={ticks} /></span>
    </div>
  )
}

/** A template button hanging under a business message. */
export function WaBtn({ children, icon = 'reply', primary }) {
  return <div className={`wap-btn${primary ? ' primary' : ''}`}><Ico n={icon} />{children}</div>
}

export function WaPhone({ name, status = 'online', verified = true, unknown = false, children, className = '' }) {
  return (
    <div className={`wap ${unknown ? 'unknown' : ''} ${className}`}>
      <div className="wap-body">
        <div className="wap-screen">
          <div className="wap-status">
            <span>9:41</span>
            <i className="wap-cam" />
            <span className="wap-sig" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M2 20h3v-4H2zM7 20h3v-8H7zM12 20h3V8h-3zM17 20h3V4h-3z" fill="currentColor" /></svg>
              <svg viewBox="0 0 24 24"><path d="M12 19.500l2.200-2.600a3.400 3.400 0 0 0-4.400 0zM5.500 12.800a9 9 0 0 1 13 0l-1.600 1.800a6.600 6.600 0 0 0-9.800 0zM2 9.200a14 14 0 0 1 20 0l-1.600 1.800a11.600 11.600 0 0 0-16.800 0z" fill="currentColor" /></svg>
              <svg viewBox="0 0 28 24"><rect x="2" y="6.500" width="21" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.600" /><rect x="4" y="8.500" width="14" height="7" rx="1.500" fill="currentColor" /><rect x="24" y="10" width="2" height="4" rx="1" fill="currentColor" /></svg>
            </span>
          </div>

          <div className="wap-head">
            <Ico n="back" className="wap-back" />
            <span className="wap-av">{unknown ? '?' : name.slice(0, 1)}</span>
            <div className="wap-who">
              <strong>{name}{verified && !unknown && <svg className="wap-ver" viewBox="0 0 24 24" aria-label="Verified business"><circle cx="12" cy="12" r="10" fill="#25d366" /><path d="M7.500 12.300l3 3 6-6.300" fill="none" stroke="#fff" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" /></svg>}</strong>
              <small>{unknown ? 'last seen recently' : status}</small>
            </div>
            <Ico n="video" className="wap-hi" />
            <Ico n="call" className="wap-hi" />
            <Ico n="more" className="wap-hi" />
          </div>

          <div className="wap-chat">{children}</div>

          <div className="wap-bar">
            <div className="wap-field">
              <Ico n="emoji" className="wap-fi" />
              <span>Message</span>
              <Ico n="clip" className="wap-fi" />
              <Ico n="camera" className="wap-fi" />
            </div>
            <span className="wap-mic"><Ico n="mic" /></span>
          </div>
          <span className="wap-home" />
        </div>
      </div>
    </div>
  )
}
