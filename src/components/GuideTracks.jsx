import './GuideTracks.css'

/**
 * Bespoke, simplified "learning tracks" section for /resources/guides.
 * A cleaner take on the railway rails: a small gradient track header, then the
 * stops as light dots on a thin connecting line — no numbered circles, no
 * per-track tints. De-boxed, light, deliberately quiet.
 */
function GuideTracks({ tracks = [] }) {
  return (
    <section className="section gtrk-section" id="tracks">
      <div className="container">
        <span className="section-kicker">Find your track</span>
        <h2 className="section-title">Pick a path and follow it end to end</h2>
        <p className="section-subtitle">
          Each track is an ordered set of guides — start at the first stop and work along the line.
        </p>

        <div className="gtrk">
          {tracks.map((t) => (
            <div className="gtrk-row" key={t.name}>
              <div className="gtrk-head">
                <span className="gtrk-icon">{t.icon}</span>
                <span className="gtrk-name">{t.name}</span>
                <span className="gtrk-tag">{t.tag}</span>
              </div>
              <div className="gtrk-line">
                {t.stops.map((s) => (
                  <span className="gtrk-stop" key={s}>
                    <span className="gtrk-dot" aria-hidden="true" />
                    <span className="gtrk-label">{s}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GuideTracks
