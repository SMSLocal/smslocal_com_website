import { useState } from 'react'
import './GuideTrackPicker.css'

/**
 * Bespoke "learning tracks" section for /resources/guides.
 * An interactive picker: choose a track from the tab row and its stops appear
 * below as clean numbered steps — no stacked rail lines, one track at a time.
 * De-boxed, light.
 */
function GuideTrackPicker({ tracks = [] }) {
  const [active, setActive] = useState(0)
  const track = tracks[active] || {}

  return (
    <section className="section gtp-section" id="tracks">
      <div className="container">
        <span className="section-kicker">Find your track</span>
        <h2 className="section-title">Pick a path and follow it end to end</h2>
        <p className="section-subtitle">
          Choose a track, then work through its guides in order — from the first stop to the last.
        </p>

        <div className="gtp-tabs" role="tablist" aria-label="Learning tracks">
          {tracks.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={active === i ? 'gtp-tab is-active' : 'gtp-tab'}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="gtp-tab-icon">{t.icon}</span>
              {t.name}
            </button>
          ))}
        </div>

        <div className="gtp-panel" role="tabpanel" key={track.name}>
          <div className="gtp-panel-head">
            <span className="gtp-panel-name">{track.name}</span>
            <span className="gtp-panel-tag">{track.tag}</span>
            <span className="gtp-panel-count">{(track.stops || []).length} guides</span>
          </div>

          <div className="gtp-steps">
            {(track.stops || []).map((s, i, arr) => (
              <div className="gtp-step" key={s}>
                <span className="gtp-num">{i + 1}</span>
                <span className="gtp-step-label">{s}</span>
                {i < arr.length - 1 && <span className="gtp-step-arrow" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuideTrackPicker
