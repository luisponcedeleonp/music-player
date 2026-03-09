function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function ProgressBar({ currentTime, duration, onSeek }) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const handleChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    onSeek(newTime)
  }

  return (
    <div className="progress-section">
      <span className="time-label">{formatTime(currentTime)}</span>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <input
          type="range"
          className="progress-input"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleChange}
          aria-label="Progreso de canción"
        />
      </div>
      <span className="time-label">{formatTime(duration)}</span>
    </div>
  )
}
