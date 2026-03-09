export default function Controls({ isPlaying, hasTracks, onPlay, onPause, onNext, onPrev }) {
  return (
    <div className="controls">
      <button
        className="control-btn"
        onClick={onPrev}
        disabled={!hasTracks}
        title="Anterior"
        aria-label="Canción anterior"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
        </svg>
      </button>

      <button
        className="control-btn play-btn"
        onClick={isPlaying ? onPause : onPlay}
        disabled={!hasTracks}
        title={isPlaying ? 'Pausa' : 'Reproducir'}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      <button
        className="control-btn"
        onClick={onNext}
        disabled={!hasTracks}
        title="Siguiente"
        aria-label="Canción siguiente"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M6 18l8.5-6L6 6v12zm2.5-6 8.5 6V6z"/>
          <path d="M16 6h2v12h-2z"/>
        </svg>
      </button>
    </div>
  )
}
