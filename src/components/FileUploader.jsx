import { useRef } from 'react'

export default function FileUploader({ onFilesUpload }) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFilesUpload(files)
    }
    // Reset so same files can be re-added
    e.target.value = ''
  }

  return (
    <div className="file-uploader">
      <button
        className="upload-btn"
        onClick={() => inputRef.current.click()}
        title="Subir canciones"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
        </svg>
        <span>Agregar</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        multiple
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-label="Seleccionar archivos de audio"
      />
    </div>
  )
}
