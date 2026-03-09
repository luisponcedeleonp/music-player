# VINYLWAVE 🎵

A retro-futuristic turntable music player built with React + Vite. Load your local audio files and watch the vinyl spin.

![VINYLWAVE](referencias/Captura%20de%20pantalla%202026-03-08%20221327.png)

## Features

- **Spinning vinyl record** — animates while playing, pauses on stop
- **Tonearm** — pivots smoothly between resting and playing position
- **Real-time spectrum analyzer** — Web Audio API with 46 bars, peak indicators, and logarithmic frequency distribution
- **VU meters** — 7 animated bars that appear when music is playing
- **Playlist** — side panel with track list, animated EQ bars on the active song
- **Progress bar** — draggable scrubber with current / total time
- **Volume control** — slider with dynamic speaker icon
- **Local file loading** — no server needed, files are read directly via `URL.createObjectURL()`

## Stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- HTML5 `<audio>` + Web Audio API (`AnalyserNode`)
- Pure CSS animations (`@keyframes`, `animation-play-state`)
- No UI libraries

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), click **Subir canciones**, and select any MP3/AAC/FLAC files from your computer.

## Project Structure

```
src/
├── App.jsx                  # Global state, Web Audio setup, layout
├── App.css                  # All styles and animations
└── components/
    ├── Turntable.jsx        # SVG vinyl record with iridescent grooves
    ├── Tonearm.jsx          # SVG tonearm that pivots on play/pause
    ├── Equalizer.jsx        # Canvas-based real-time spectrum analyzer
    ├── Controls.jsx         # Play / Pause / Prev / Next buttons
    ├── ProgressBar.jsx      # Seek bar + time display
    ├── VolumeControl.jsx    # Volume slider
    ├── Playlist.jsx         # Track list with EQ bar animation
    └── FileUploader.jsx     # Local file picker
```

## Design

Retro-futuristic Japanese hi-fi aesthetic — inspired by vintage Technics/Marantz equipment.

- **Fonts:** [Orbitron](https://fonts.google.com/specimen/Orbitron) (headers, labels) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) (track names)
- **Palette:** Near-black `#06060a` · Orange accent `#ff6200` · Amber `#ff8c3a`
- **Textures:** CRT scan-line overlay, iridescent vinyl grooves, layered chrome tonearm
