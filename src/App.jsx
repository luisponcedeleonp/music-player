import { useRef, useState, useEffect, useCallback } from 'react'
import Turntable from './components/Turntable'
import Tonearm from './components/Tonearm'
import Controls from './components/Controls'
import ProgressBar from './components/ProgressBar'
import VolumeControl from './components/VolumeControl'
import Playlist from './components/Playlist'
import FileUploader from './components/FileUploader'
import Equalizer from './components/Equalizer'

export default function App() {
  const audioRef       = useRef(null)
  const audioCtxRef    = useRef(null)
  const sourceCreated  = useRef(false)
  const [analyserNode, setAnalyserNode] = useState(null)

  const [tracks, setTracks] = useState([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  const currentTrack = tracks[currentTrackIndex] || null

  // Load track into audio element when it changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    const wasPlaying = isPlaying
    audio.src = currentTrack.url
    audio.load()
    setCurrentTime(0)
    setDuration(0)

    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, currentTrack?.url])

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Setup Web Audio API on first play (requires user gesture)
  const setupAnalyser = useCallback(() => {
    if (sourceCreated.current || !audioRef.current) return
    sourceCreated.current = true
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    const ctx      = new AudioCtx()
    const analyser = ctx.createAnalyser()
    analyser.fftSize              = 256
    analyser.smoothingTimeConstant = 0.8
    const source = ctx.createMediaElementSource(audioRef.current)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    audioCtxRef.current = ctx
    setAnalyserNode(analyser)
  }, [])

  const handlePlay = useCallback(() => {
    if (!currentTrack) return
    setupAnalyser()
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume()
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [currentTrack, setupAnalyser])

  const handlePause = useCallback(() => {
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return
    setCurrentTrackIndex(i => (i + 1) % tracks.length)
  }, [tracks.length])

  const handlePrev = useCallback(() => {
    if (tracks.length === 0) return
    // If more than 3s in, restart current track
    if (currentTime > 3) {
      audioRef.current.currentTime = 0
      return
    }
    setCurrentTrackIndex(i => (i - 1 + tracks.length) % tracks.length)
  }, [tracks.length, currentTime])

  const handleSeek = useCallback((time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  const handleVolumeChange = useCallback((vol) => {
    setVolume(vol)
  }, [])

  const handleFilesUpload = useCallback((files) => {
    const newTracks = Array.from(files).map(file => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name.replace(/\.[^.]+$/, ''),
      url: URL.createObjectURL(file),
      file,
    }))
    setTracks(prev => {
      const combined = [...prev, ...newTracks]
      return combined
    })
    // If no track was loaded, start at 0
    setCurrentTrackIndex(prev => (tracks.length === 0 ? 0 : prev))
  }, [tracks.length])

  const handleSelectTrack = useCallback((index) => {
    if (index === currentTrackIndex) {
      isPlaying ? handlePause() : handlePlay()
    } else {
      setCurrentTrackIndex(index)
      setIsPlaying(true)
    }
  }, [currentTrackIndex, isPlaying, handlePause, handlePlay])

  // Audio events
  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime)
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration)
  const handleEnded = () => handleNext()

  return (
    <div className="app">
      <div className="player-cabinet">

        <div className="cabinet-header">
          <span className="brand">
            <span className={`brand-dot ${isPlaying ? 'active' : ''}`} />
            VINYLWAVE
          </span>
          <FileUploader onFilesUpload={handleFilesUpload} />
        </div>

        <div className="cabinet-body">

          {/* ── Left: player ── */}
          <div className="main-panel">
            <div className="turntable-stage">
              <div className="turntable-area">
                <Turntable
                  isPlaying={isPlaying}
                  trackName={currentTrack?.name}
                  key={currentTrack?.id}
                />
              </div>
              <div className="tonearm-area">
                <Tonearm isPlaying={isPlaying && !!currentTrack} />
              </div>
              <div className={`vu-meters ${isPlaying ? 'active' : ''}`}>
                {[28, 44, 18, 52, 34, 46, 22].map((h, i) => (
                  <div
                    key={i}
                    className="vu-bar"
                    style={{ height: `${h}px`, animationDelay: `${i * 0.065}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="now-playing">
              <span className="np-label">Reproduciendo ahora</span>
              <span className="np-title">{currentTrack?.name || '—'}</span>
            </div>

            <Equalizer analyserNode={analyserNode} isPlaying={isPlaying} />

            <div className="controls-section">
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />
              <div className="controls-row">
                <Controls
                  isPlaying={isPlaying}
                  hasTracks={tracks.length > 0}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
                <VolumeControl volume={volume} onChange={handleVolumeChange} />
              </div>
            </div>
          </div>

          {/* ── Right: playlist ── */}
          <div className="side-panel">
            {tracks.length > 0 ? (
              <Playlist
                tracks={tracks}
                currentIndex={currentTrackIndex}
                isPlaying={isPlaying}
                onSelect={handleSelectTrack}
              />
            ) : (
              <div className="side-empty">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" opacity="0.25">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <p>Sin canciones</p>
                <span>Agrega archivos de audio para comenzar</span>
              </div>
            )}
          </div>

        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        volume={volume}
      />
    </div>
  )
}
