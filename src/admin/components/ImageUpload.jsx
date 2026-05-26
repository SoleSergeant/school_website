import { useState, useRef } from 'react'
import { Upload, Link2, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

/**
 * ImageUpload — drag-and-drop / click upload to Supabase Storage.
 *
 * Supabase setup (one-time):
 *   1. Go to Storage → Create bucket → name: "images", Public: ON
 *   2. In bucket Policies, add:
 *      INSERT policy → Target roles: anon, authenticated → allow all
 *      SELECT policy → Target roles: public → allow all
 *
 * Props:
 *   value     — current image URL (string)
 *   onChange  — (url: string) => void
 *   label     — field label (default "Photo")
 *   aspect    — "square" (140px) | "wide" (180px)
 */
export default function ImageUpload({ value, onChange, label = 'Photo', aspect = 'square' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError]       = useState('')
  const [showUrl, setShowUrl]   = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const inputRef = useRef()

  const height = aspect === 'wide' ? 180 : 140

  const upload = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return }
    if (file.size > 8 * 1024 * 1024)    { setError('Max file size is 8 MB'); return }

    setUploading(true)
    setError('')

    const ext  = file.name.split('.').pop().toLowerCase()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('images').getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
  }

  const handleFileChange = (e) => upload(e.target.files[0])

  const handleDrop = (e) => {
    e.preventDefault()
    upload(e.dataTransfer.files[0])
  }

  const applyUrl = () => {
    const trimmed = urlInput.trim()
    if (trimmed) { onChange(trimmed); setShowUrl(false); setUrlInput('') }
  }

  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
          {label}
        </label>
      )}

      {/* Preview or drop-zone */}
      {value ? (
        <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', marginBottom: 8, border: '1px solid #EAECF0' }}>
          <img
            src={value}
            alt="preview"
            style={{ width: '100%', height, objectFit: 'cover', display: 'block' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              position: 'absolute', top: 8, right: 8,
              backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff',
              border: 'none', borderRadius: '50%',
              width: 28, height: 28, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={14} />
          </button>
          {/* Replace button */}
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            style={{
              position: 'absolute', bottom: 8, right: 8,
              backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff',
              border: 'none', borderRadius: 7,
              padding: '4px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <Upload size={11} /> Replace
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => !uploading && inputRef.current.click()}
          style={{
            border: '2px dashed #D1D5DB', borderRadius: 10, height,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: uploading ? 'default' : 'pointer',
            backgroundColor: '#F8F9FC', gap: 8, marginBottom: 8,
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = '#1E3273' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB' }}
        >
          {uploading ? (
            <>
              <Loader2 size={24} style={{ color: '#1E3273' }} className="spin" />
              <span style={{ fontSize: 13, color: '#6B7280' }}>Uploading…</span>
            </>
          ) : (
            <>
              <Upload size={22} style={{ color: '#9CA3AF' }} />
              <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>Click or drag image here</span>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>PNG · JPG · WEBP · max 8 MB</span>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        // Reset so the same file can be re-selected
        onClick={e => { e.target.value = '' }}
      />

      {/* Error */}
      {error && (
        <p style={{ fontSize: 12, color: '#DC2626', margin: '4px 0 8px' }}>{error}</p>
      )}

      {/* URL fallback */}
      {!showUrl ? (
        <button
          type="button"
          onClick={() => { setShowUrl(true); setUrlInput(value || '') }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 2 }}
        >
          <Link2 size={12} /> Use URL instead
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          <input
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            onKeyDown={e => e.key === 'Enter' && applyUrl()}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, outline: 'none' }}
          />
          <button
            type="button"
            onClick={applyUrl}
            style={{ padding: '8px 14px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => setShowUrl(false)}
            style={{ padding: '8px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <X size={14} style={{ color: '#9CA3AF' }} />
          </button>
        </div>
      )}
    </div>
  )
}
