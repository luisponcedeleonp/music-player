export default function Tonearm({ isPlaying }) {
  return (
    <div className={`tonearm-container ${isPlaying ? 'playing' : 'resting'}`}>
      <svg
        viewBox="0 0 120 200"
        xmlns="http://www.w3.org/2000/svg"
        className="tonearm-svg"
      >
        {/* ── Pivot assembly ── */}
        {/* Outer ring */}
        <circle cx="30" cy="18" r="12" fill="#0c0c14" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        {/* Mid ring */}
        <circle cx="30" cy="18" r="8"  fill="#08080f" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        {/* Accent core */}
        <circle cx="30" cy="18" r="4.5" fill="#fc3c44" opacity="0.95" />
        {/* Center dot */}
        <circle cx="30" cy="18" r="2"   fill="#ff6b70" />
        <circle cx="30" cy="18" r="0.8" fill="#fff"    opacity="0.6" />

        {/* ── Arm body — layered for chrome depth ── */}
        {/* Shadow layer */}
        <line x1="30" y1="18" x2="92" y2="160" stroke="#000008"    strokeWidth="8"   strokeLinecap="round" />
        {/* Base */}
        <line x1="30" y1="18" x2="92" y2="160" stroke="#0e0e18"    strokeWidth="6"   strokeLinecap="round" />
        {/* Mid tone */}
        <line x1="30" y1="18" x2="92" y2="160" stroke="#1c1c28"    strokeWidth="4"   strokeLinecap="round" />
        {/* Highlight */}
        <line x1="30" y1="18" x2="92" y2="160" stroke="#2e2e40"    strokeWidth="2.2" strokeLinecap="round" />
        {/* Chrome edge */}
        <line x1="30" y1="18" x2="92" y2="160" stroke="rgba(255,255,255,0.13)" strokeWidth="0.9" strokeLinecap="round" />

        {/* ── Headshell ── */}
        <rect x="81" y="157" width="22" height="7"  rx="2"   fill="#111120" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <rect x="83" y="155" width="18" height="4"  rx="1.5" fill="#1a1a2a" />
        {/* Cartridge body */}
        <rect x="85" y="158" width="14" height="5"  rx="1"   fill="#0e0e1c" />

        {/* ── Stylus needle ── */}
        <line x1="92" y1="164" x2="92" y2="174" stroke="#fc3c44" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="92" cy="175"  r="1.8" fill="#fc3c44" />
        <circle cx="92" cy="175"  r="0.8" fill="#ff8080" />

        {/* ── Counterweight ── */}
        <rect x="18" y="10" width="18" height="8" rx="3"   fill="#131320" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <rect x="21" y="12" width="12" height="4" rx="1.5" fill="#1e1e2e" />
        <line x1="21" y1="14" x2="33" y2="14"    stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}
