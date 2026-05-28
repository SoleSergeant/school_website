import { useState, useRef } from 'react'
import { FileText, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

/**
 * PDFUpload — drag-and-drop / click upload of a PDF to Supabase Storage.
 *
 * Supabase setup (one-time):
 *   1. Storage → New bucket → name: "magazine-pdfs", Public: ON
 *   2. Add INSERT policy for anon/authenticated + SELECT for public
 *
 * Props:
 *   value    — current PDF URL (string)
 *   onChange — (url: string) => void
 */
export default function PDFUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError]       = useState('')
  const [fileName, setFileName] = useState('')
  const inputRef = useRef()

  const upload = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') { setError('Please select a PDF file.'); return }
    if (file.size > 100 * 1024 * 1024)  { setError('Max file size is 100 MB.'); return }

    setUploading(true)
    setError('')

    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`

    const { error: uploadError } = await supabase.storage
      .from('magazine-pdfs')
      .upload(path, file, { cacheControl: '3600', upsert: false, contentType: 'application/pdf' })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('magazine-pdfs').getPublicUrl(path)
    onChange(data.publicUrl)
    setFileName(file.name)
    setUploading(false)
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
        Magazine PDF
      </label>

      {value ? (
        <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, backgroundColor: '#F8FAFC' }}>
          <div style={{ width: 38, height: 38, borderRadius: 8, backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={18} style={{ color: '#1E3273' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fileName || 'PDF uploaded'}
            </div>
            <div style={{ fontSize: 11, color: '#16A34A', marginTop: 2, fontWeight: 500 }}>✓ Ready to publish</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button type="button" onClick={() => inputRef.current.click()}
              style={{ padding: '5px 10px', border: '1px solid #E2E8F0', borderRadius: 7, background: '#fff', color: '#1E3273', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
              Replace
            </button>
            <button type="button" onClick={() => { onChange(''); setFileName('') }}
              style={{ padding: '5px 8px', border: '1px solid #E2E8F0', borderRadius: 7, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <X size={13} style={{ color: '#9CA3AF' }} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { setFileName(f.name); upload(f) } }}
          onDragOver={e => e.preventDefault()}
          onClick={() => !uploading && inputRef.current.click()}
          style={{
            border: '2px dashed #D1D5DB', borderRadius: 10,
            padding: '28px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            cursor: uploading ? 'default' : 'pointer',
            backgroundColor: '#F8F9FC', gap: 8,
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = '#1E3273' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB' }}
        >
          {uploading ? (
            <>
              <Loader2 size={26} style={{ color: '#1E3273' }} className="spin" />
              <span style={{ fontSize: 13, color: '#6B7280' }}>Uploading PDF…</span>
            </>
          ) : (
            <>
              <FileText size={28} style={{ color: '#9CA3AF' }} />
              <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>Click or drag PDF here</span>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>PDF only · max 100 MB</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        onChange={e => { const f = e.target.files[0]; if (f) { setFileName(f.name); upload(f) } }}
        onClick={e => { e.target.value = '' }}
      />

      {error && <p style={{ fontSize: 12, color: '#DC2626', margin: '6px 0 0' }}>{error}</p>}
    </div>
  )
}
