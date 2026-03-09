# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (Node.js must be in PATH — installed at C:\Program Files\nodejs\)
powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command "$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH; Set-Location 'C:\Users\felip\Desktop\music-player'; & 'C:\Program Files\nodejs\npm.cmd' install"

# Start dev server (http://localhost:5173)
powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command "$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH; Set-Location 'C:\Users\felip\Desktop\music-player'; & 'C:\Program Files\nodejs\npm.cmd' run dev"

# Production build
powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command "$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH; Set-Location 'C:\Users\felip\Desktop\music-player'; & 'C:\Program Files\nodejs\npm.cmd' run build"
```

Node.js v24 is installed at `C:\Program Files\nodejs\` but is NOT on the bash PATH. Always prepend it explicitly or use `npm.cmd` directly. PowerShell execution policy requires `-ExecutionPolicy Bypass` to run `.ps1` scripts; use `npm.cmd` instead of `npm` to avoid this.

## Architecture

All application state lives in `App.jsx` and flows down as props — there is no context, reducer, or external state library. The `<audio>` element is controlled via `audioRef` directly (imperative API), not through React state.

**State → UI mapping:**
- `isPlaying` drives two CSS class toggles: `.record.playing` (spin animation) and `.tonearm-container.playing/.resting` (rotation)
- `tracks[]` items have shape `{ id, name, url, file }` where `url` is a `URL.createObjectURL()` blob URL created in `FileUploader`
- Track identity uses `id = "${file.name}-${file.lastModified}"` — not a UUID

**Tonearm geometry** (`Tonearm.jsx` + `App.css`):
- SVG viewBox is `0 0 120 200`; pivot circle is at `cx=30 cy=18` (top-left)
- CSS `transform-origin: 30px 18px` must match the pivot coordinates exactly
- Resting angle is `rotate(22deg)` (arm swings right/away); playing is `rotate(0deg)`
- If the pivot is ever moved in the SVG, `transform-origin` in `.tonearm-container` must be updated to match

**Vinyl label color** is hardcoded in the SVG inside `Turntable.jsx` (not a CSS variable). Currently blue (`#1a6fcc`). The CSS `:root` still declares `--vinyl-red: #cc2200` which is unused by the label.

**Prev button behavior:** pressing prev within the first 3 seconds of a track goes to the previous track; after 3 seconds it restarts the current track (handled in `handlePrev` in `App.jsx`).

## Styling conventions

All styles are in a single `src/App.css`. Colors are defined as CSS custom properties in `:root` and used via `var()` throughout — except SVG fill colors inside JSX components, which use hex literals. The design palette: dark wood cabinet (`--wood-dark/mid`), gold accents (`--gold`), off-white text (`--off-white`), dim text (`--text-dim`).

The `.turntable-stage` is `position: relative` with both `.turntable-area` (centered absolutely) and `.tonearm-area` (absolute, `left: 4%, top: -4%`) as absolute children.
