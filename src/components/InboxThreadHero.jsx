import { useState, useEffect } from 'react'
import './InboxThreadHero.css'
import { IconChat, IconMail, IconMic } from './icons.jsx'

const THREAD = [
  { type: 'msg', ch: 'wa', channel: 'WhatsApp', icon: <IconChat />, text: "Hi — order #4821 still hasn't shipped?", time: '09:14' },
  { type: 'switch', label: 'moved to Email' },
  { type: 'msg', ch: 'email', channel: 'Email', icon: <IconMail />, text: 'Attaching the receipt you asked for.', time: '09:26' },
  { type: 'switch', label: 'called in' },
  { type: 'msg', ch: 'voice', channel: 'Voice', icon: <IconMic />, text: 'Voicemail · "Any update on #4821?"', time: '09:41' },
]

const LockGlyph = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

function prefersReduce() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function InboxThreadHero() {
  const reduce = prefersReduce()
  const [shown, setShown] = useState(reduce ? THREAD.length + 1 : 1)

  useEffect(() => {
    if (reduce) return undefined
    const id = setInterval(() => {
      setShown((s) => (s >= THREAD.length + 1 ? 1 : s + 1))
    }, 1150)
    return () => clearInterval(id)
  }, [reduce])

  const assignShown = shown >= 3
  const noteShown = shown >= 5

  return (
    <div className="ithero" role="img" aria-label="One customer's conversation continuing across WhatsApp, email and voice inside a single shared team thread assigned to Sara">
      <div className="ithero-thread">
        {THREAD.map((item, i) => {
          const on = i < shown
          if (item.type === 'switch') {
            return (
              <div className={`ithero-switch${on ? ' is-shown' : ''}`} key={`sw-${item.label}`}>
                <span className="ithero-switch-rule" />
                <span className="ithero-switch-text">{item.label}</span>
                <span className="ithero-switch-rule" />
              </div>
            )
          }
          return (
            <div className={`ithero-msg${on ? ' is-shown' : ''}`} key={item.channel}>
              <div className="ithero-msg-top">
                <span className={`ithero-ch ch-${item.ch}`}>
                  {item.icon}
                  {item.channel}
                </span>
                <span className="ithero-time">{item.time}</span>
              </div>
              <p className="ithero-text">{item.text}</p>
              <span className="ithero-from">Priya Menon</span>
            </div>
          )
        })}
      </div>

      <div className="ithero-rail">
        <div className="ithero-avatars">
          <span className="ithero-av av-a">SR</span>
          <span className="ithero-av av-b">MK</span>
          <span className="ithero-av av-more">+3</span>
        </div>
        <span className={`ithero-assign${assignShown ? ' is-shown' : ''}`}>
          <span className="ithero-assign-dot" />
          Assigned to <b>Sara</b>
        </span>
        <span className={`ithero-note${noteShown ? ' is-shown' : ''}`}>
          <span className="ithero-note-tag"><LockGlyph /> Internal</span>
          VIP — expedite
        </span>
        <span className="ithero-onethread">one thread</span>
      </div>
    </div>
  )
}

export default InboxThreadHero
