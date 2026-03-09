export default function Turntable({ isPlaying, trackName }) {
  const label = trackName || '— — —'
  const shortLabel = label.length > 20 ? label.slice(0, 19) + '…' : label

  return (
    <div className="turntable-wrapper">
      <div className={`record ${isPlaying ? 'playing' : ''}`}>
        <svg
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          className="record-svg"
        >
          <defs>
            {/* Iridescent surface sheen */}
            <radialGradient id="vsheen" cx="38%" cy="32%" r="72%">
              <stop offset="0%"   stopColor="#1828ff" stopOpacity="0.08" />
              <stop offset="30%"  stopColor="#ff4400" stopOpacity="0.04" />
              <stop offset="65%"  stopColor="#00ddaa" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            {/* Specular highlight */}
            <radialGradient id="vspec" cx="42%" cy="36%" r="50%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            {/* Edge fade */}
            <radialGradient id="vedge" cx="50%" cy="50%" r="50%">
              <stop offset="80%"  stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </radialGradient>
          </defs>

          {/* ── Vinyl body ── */}
          <circle cx="150" cy="150" r="148" fill="#07070d" />

          {/* Fine groove rings — varying weight and shade */}
          {Array.from({ length: 24 }, (_, i) => {
            const r = 140 - i * 5.2
            const isWide = i % 5 === 0
            return (
              <circle
                key={i}
                cx="150" cy="150" r={r}
                fill="none"
                stroke={isWide ? '#1e1e2c' : '#111118'}
                strokeWidth={isWide ? '1.4' : '0.65'}
              />
            )
          })}

          {/* Iridescent overlay */}
          <circle cx="150" cy="150" r="148" fill="url(#vsheen)" />

          {/* Specular highlight */}
          <circle cx="150" cy="150" r="148" fill="url(#vspec)" />

          {/* Edge darkening */}
          <circle cx="150" cy="150" r="148" fill="url(#vedge)" />

          {/* ── Label ── */}
          <circle cx="150" cy="150" r="42" fill="#080810" />
          {/* Outer orange ring */}
          <circle cx="150" cy="150" r="40" fill="none" stroke="#ff6200" strokeWidth="0.9" opacity="0.75" />
          {/* Inner thin ring */}
          <circle cx="150" cy="150" r="36" fill="none" stroke="#ff6200" strokeWidth="0.35" opacity="0.3" />

          {/* Brand name */}
          <text
            x="150" y="143"
            textAnchor="middle"
            fill="#ff6200"
            fontSize="6.5"
            fontFamily="Orbitron, monospace"
            fontWeight="700"
            letterSpacing="3"
            opacity="0.9"
          >VINYLWAVE</text>

          {/* Divider */}
          <line x1="128" y1="149" x2="172" y2="149" stroke="#ff6200" strokeWidth="0.4" opacity="0.3" />

          {/* Track name */}
          <text
            x="150" y="160"
            textAnchor="middle"
            fill="#7a7a8c"
            fontSize="6.2"
            fontFamily="DM Mono, monospace"
            fontWeight="300"
            letterSpacing="0.5"
          >{shortLabel}</text>

          {/* ── Center spindle ── */}
          <circle cx="150" cy="150" r="5"   fill="#000005" />
          <circle cx="150" cy="150" r="3"   fill="#14141c" />
          <circle cx="150" cy="150" r="1.2" fill="#2a2a38" />

          {/* Rim highlight */}
          <circle
            cx="150" cy="150" r="147.5"
            fill="none"
            stroke="rgba(255,255,255,0.035)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="platter" />
    </div>
  )
}
