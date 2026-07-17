import './BuilderCanvasVisual.css'
import { IconBolt, IconChat, IconBrain, IconCursor, IconRefresh, IconClock, IconGear } from './icons.jsx'

const PALETTE = [
  { icon: <IconChat />, label: 'Text' },
  { icon: <IconRefresh />, label: 'Condition' },
  { icon: <IconClock />, label: 'Delay' },
]

function BuilderCanvasVisual() {
  return (
    <div className="bcv" role="img" aria-label="A chatbot flow already built from a start keyword, welcome message and AI reply, with a Buttons block being dragged in from the block palette to extend it">
      <div className="bcv-palette">
        <span className="bcv-palette-label">Blocks</span>
        {PALETTE.map((p) => (
          <span className="bcv-palette-item" key={p.label}>
            <span className="bcv-palette-ic">{p.icon}</span>
            {p.label}
          </span>
        ))}
      </div>

      <svg className="bcv-lines" viewBox="0 0 460 260" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="bcv-link" d="M95 190 H 125" />
        <path className="bcv-link" d="M215 190 H 245" />
        <path className="bcv-link" d="M335 190 H 365" />
      </svg>

      <div className="bcv-node bcv-node--start">
        <span className="bcv-node-ic bcv-node-ic--start"><IconBolt /></span>
        <strong>Start</strong>
      </div>

      <div className="bcv-node bcv-node--msg">
        <span className="bcv-node-ic"><IconChat /></span>
        <strong>Welcome</strong>
      </div>

      <div className="bcv-node bcv-node--ai">
        <span className="bcv-node-ic bcv-node-ic--ai"><IconBrain /></span>
        <strong>AI reply</strong>
      </div>

      <div className="bcv-slot" />

      <div className="bcv-drag">
        <span className="bcv-node bcv-node--btn">
          <span className="bcv-node-ic bcv-node-ic--btn"><IconGear /></span>
          <strong>Buttons</strong>
        </span>
        <span className="bcv-cursor"><IconCursor /></span>
      </div>
    </div>
  )
}

export default BuilderCanvasVisual
