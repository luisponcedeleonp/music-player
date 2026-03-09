export default function Playlist({ tracks, currentIndex, isPlaying, onSelect }) {
  return (
    <div className="playlist">
      <div className="playlist-header">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
        <span>En cola</span>
        <span className="playlist-count">{tracks.length}</span>
      </div>
      <ul className="playlist-list">
        {tracks.map((track, index) => {
          const isActive = index === currentIndex
          return (
            <li
              key={track.id}
              className={`playlist-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(index)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onSelect(index)}
            >
              <span className="playlist-num">
                {isActive && isPlaying ? (
                  <span className="eq-bars">
                    <span /><span /><span />
                  </span>
                ) : (
                  <span className="track-number">{index + 1}</span>
                )}
              </span>
              <span className="playlist-name">{track.name}</span>
              {isActive && (
                <span className="active-indicator">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
