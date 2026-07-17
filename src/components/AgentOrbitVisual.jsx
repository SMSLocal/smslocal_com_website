import { useEffect, useState } from 'react'
import './AgentOrbitVisual.css'
import { IconRobot, IconChat, IconMail, IconMic, IconCart, IconShield, IconCheck } from './icons.jsx'

const TURNS = [
  { reply: 'Namaste! Aapka order kal shaam tak pahunch jaayega.', resolved: 61 },
  { reply: "No worries, I've flagged the damaged item for a swap.", resolved: 68 },
  { reply: "Refund approved — you'll see it in 2-3 days.", resolved: 74 },
  { reply: 'All set! Meera has your full context if you need her.', resolved: 78 },
]

function AgentOrbitVisual() {
  const [turn, setTurn] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTurn((t) => (t + 1) % TURNS.length), 3200)
    return () => clearInterval(id)
  }, [])

  const { reply, resolved } = TURNS[turn]

  return (
    <div className="aov" role="img" aria-label="An AI agent at the center, connected to chat, email, voice, commerce and compliance channels, resolving a conversation and handing off to a human">
      <svg className="aov-lines" viewBox="0 0 460 460" fill="none" aria-hidden="true">
        <circle cx="230" cy="230" r="150" className="aov-ring aov-ring--1" />
        <circle cx="230" cy="230" r="204" className="aov-ring aov-ring--2" />
        <path className="aov-path aov-path--1" d="M230 230 L90 130" />
        <path className="aov-path aov-path--2" d="M230 230 L370 120" />
        <path className="aov-path aov-path--3" d="M230 230 L60 300" />
        <path className="aov-path aov-path--4" d="M230 230 L380 300" />
        <path className="aov-path aov-path--5" d="M230 230 L230 40" />
      </svg>

      <div className="aov-core">
        <span className="aov-core-ic"><IconRobot /></span>
        <span className="aov-core-pulse" />
      </div>

      <div className="aov-node aov-node--chat"><IconChat /></div>
      <div className="aov-node aov-node--mail"><IconMail /></div>
      <div className="aov-node aov-node--voice"><IconMic /></div>
      <div className="aov-node aov-node--cart"><IconCart /></div>
      <div className="aov-node aov-node--shield"><IconShield /></div>

      <div className="aov-chip aov-chip--reply" key={turn}>
        <span className="aov-chip-dot" />
        {reply}
      </div>

      <div className="aov-chip aov-chip--handoff">
        <span className="aov-chip-ic"><IconCheck /></span>
        Handed to Meera · full context
      </div>

      <div className="aov-stat aov-stat--a"><strong key={resolved}>{resolved}%</strong><span>auto-resolved</span></div>
      <div className="aov-stat aov-stat--b"><strong>300+</strong><span>apps connected</span></div>
    </div>
  )
}

export default AgentOrbitVisual
