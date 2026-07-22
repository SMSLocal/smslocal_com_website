import { useMemo } from 'react'
import DottedMap from 'dotted-map'
import './BulkWorldMap.css'

/**
 * A flat, static dot-matrix world map — looks like "a globe" at a glance but
 * is just a 2D image, no rotation, no WebGL. Uses the `dotted-map` library
 * for a geographically-accurate dot grid (real coastline data), instead of
 * the earlier hand-authored approximate mask. No arc/line animation — just
 * the background dot map plus labeled hub markers.
 */

const MARKERS = [
  { code: 'NY', label: 'New York', lat: 40.7128, lng: -74.006 },
  { code: 'LON', label: 'London', lat: 51.5074, lng: -0.1278, hub: true },
  { code: 'DXB', label: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { code: 'SIN', label: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { code: 'NRT', label: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { code: 'SYD', label: 'Sydney', lat: -33.8688, lng: 151.2093 },
]

function BulkWorldMap() {
  const { svg, width, height, markerPoints } = useMemo(() => {
    const map = new DottedMap({ height: 60, grid: 'diagonal' })

    MARKERS.forEach((m) => {
      map.addPin({
        lat: m.lat,
        lng: m.lng,
        svgOptions: { color: m.hub ? '#fb7185' : '#4f5bd5', radius: 0.7 },
        data: { code: m.code },
      })
    })

    const svgString = map.getSVG({
      radius: 0.22,
      color: '#cbd5e1',
      shape: 'circle',
      backgroundColor: 'transparent',
    })

    const viewBox = svgString.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
    const w = viewBox ? parseFloat(viewBox[1]) : 800
    const h = viewBox ? parseFloat(viewBox[2]) : 400

    const points = map.getPoints()
    const marks = MARKERS.map((m) => {
      const p = points.find((pt) => pt.data?.code === m.code)
      return { ...m, x: p ? p.x : 0, y: p ? p.y : 0 }
    })

    return { svg: svgString, width: w, height: h, markerPoints: marks }
  }, [])

  return (
    <div className="bwm-wrap" aria-hidden="true">
      <img
        className="bwm-img"
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
        alt=""
        draggable={false}
      />

      {markerPoints.map((m) => {
        const left = `${(m.x / width) * 100}%`
        const top = `${(m.y / height) * 100}%`
        return (
          <span key={m.code}>
            <span
              className={m.hub ? 'bwm-pulse bwm-pulse--hub' : 'bwm-pulse'}
              style={{ left, top }}
            />
            <span
              className={m.hub ? 'bwm-label bwm-label--hub' : 'bwm-label'}
              style={{ left, top }}
            >
              {m.label}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default BulkWorldMap
