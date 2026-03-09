import { useRef, useEffect } from 'react'

const BAR_COUNT = 46
const GAP = 2

export default function Equalizer({ analyserNode, isPlaying }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const heights   = useRef(new Float32Array(BAR_COUNT).fill(0))
  const peaks     = useRef(new Float32Array(BAR_COUNT).fill(0))

  // Sync canvas buffer size to CSS display size
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const sync = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let dataArray   = null
    let binCount    = 0

    if (analyserNode) {
      binCount  = analyserNode.frequencyBinCount
      dataArray = new Uint8Array(binCount)
    }

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      const w = canvas.width
      const h = canvas.height
      if (!w || !h) return

      const bw = (w - GAP * (BAR_COUNT - 1)) / BAR_COUNT

      ctx.clearRect(0, 0, w, h)

      // Subtle horizontal grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth   = 1
      for (let row = 1; row <= 4; row++) {
        const y = Math.round(h * (row / 4)) - 0.5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      for (let i = 0; i < BAR_COUNT; i++) {
        let target = 0

        if (dataArray && isPlaying) {
          const step = Math.floor(binCount / BAR_COUNT)
          // Use logarithmic-ish distribution: lower bars cover fewer bins
          const start = Math.floor((i / BAR_COUNT) * (i / BAR_COUNT) * binCount * 0.7)
          const end   = Math.min(start + step + i, binCount - 1)
          let   sum   = 0
          for (let j = start; j <= end; j++) sum += dataArray[j]
          const avg = sum / (end - start + 1)
          target = (avg / 255) * h
        }

        // Quick attack, slow decay
        const prev   = heights.current[i]
        const rising = target > prev
        heights.current[i] = prev + (target - prev) * (rising ? 0.75 : 0.12)
        const barH = Math.max(heights.current[i], isPlaying ? 1 : 0)

        const x = i * (bw + GAP)
        const y = h - barH

        // Bar gradient
        const grad = ctx.createLinearGradient(0, h, 0, 0)
        grad.addColorStop(0,    '#fc3c44')
        grad.addColorStop(0.55, '#ff6b70')
        grad.addColorStop(1,    'rgba(255,255,255,0.55)')
        ctx.fillStyle = grad
        ctx.fillRect(x, y, bw, barH)

        // Peak indicator
        if (barH > peaks.current[i]) peaks.current[i] = barH
        else peaks.current[i] *= 0.978   // slow fall

        if (peaks.current[i] > 3) {
          const peakY = h - peaks.current[i] - 2
          ctx.fillStyle = 'rgba(255, 255, 255, 0.50)'
          ctx.fillRect(x, peakY, bw, 2)
        }
      }
    }

    if (analyserNode && isPlaying) analyserNode.getByteFrequencyData(dataArray)
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [analyserNode, isPlaying])

  return (
    <div className="equalizer">
      <div className="eq-header">
        <span className="eq-tag">SPECTRUM</span>
        <div className="eq-dots">
          {['20', '200', '2k', '20k'].map(f => (
            <span key={f} className="eq-freq">{f}</span>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className="eq-canvas" />
    </div>
  )
}
