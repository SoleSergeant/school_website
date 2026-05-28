import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, ExternalLink, FileText, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import ImageUpload from '../components/ImageUpload'

// Convert any Google Drive share link → embeddable preview URL
function toGDriveEmbed(url) {
  if (!url) return ''
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`
  return url
}

const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0',
  borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none',
  fontFamily: 'Plus Jakarta Sans', backgroundColor: '#fff',
}

const EMPTY = {
  title: '', excerpt: '', content: '', cover: '',
  category: 'Magazine', issue_number: '', author: '',
  pdf_url: '', date: new Date().toISOString().split('T')[0], published: true,
}

export default function ArticleEditor() {
  const { id } = useParams()            // undefined = new, UUID string = edit
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(isEdit)  // true while fetching existing
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  // ── Fetch existing article for editing ────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return
    supabase.from('articles').select('*').eq('id', id).single()
      .then(({ data, error: err }) => {
        if (err) { setError('Could not load article: ' + err.message); setLoading(false); return }
        if (data) {
          setForm({
            title:        data.title        || '',
            excerpt:      data.excerpt      || '',
            content:      data.content      || '',
            cover:        data.cover        || '',
            category:     data.category     || 'Magazine',
            issue_number: data.issue_number || '',
            author:       data.author       || '',
            pdf_url:      data.pdf_url      || '',
            date:         data.date         || new Date().toISOString().split('T')[0],
            published:    data.published    ?? true,
          })
        }
        setLoading(false)
      })
  }, [id, isEdit])

  // ── Save (INSERT or UPDATE) ────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required.'); return }
    setSaving(true)
    setError('')

    const payload = {
      title:        form.title.trim(),
      excerpt:      form.excerpt.trim(),
      content:      form.content.trim(),
      cover:        form.cover.trim(),
      category:     form.category,
      issue_number: form.issue_number.trim(),
      author:       form.author.trim(),
      pdf_url:      form.pdf_url.trim(),
      date:         form.date || null,
      published:    true,
    }

    let err
    if (isEdit) {
      ;({ error: err } = await supabase.from('articles').update(payload).eq('id', id))
    } else {
      ;({ error: err } = await supabase.from('articles').insert(payload))
    }

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setSaved(true)
    setTimeout(() => navigate('/admin/articles'), 1200)
  }

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 12, color: '#64748B' }}>
        <Loader2 size={18} className="spin" /> Loading issue…
      </div>
    )
  }

  const embedPreview = toGDriveEmbed(form.pdf_url)

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <button onClick={() => navigate('/admin/articles')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#1E3273', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Magazine
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>
          {isEdit ? 'Edit Issue' : 'New Issue'}
        </h1>
        <button onClick={handleSave} disabled={saving || saved}
          style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: saved ? '#16A34A' : '#1E3273', color: '#fff', padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, transition: 'background 0.2s' }}>
          {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />}
          {saved ? 'Saved!' : saving ? 'Saving…' : 'Save Issue'}
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13.5, color: '#B91C1C' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>

        {/* ── Main content ── */}
        <div>
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Title</label>
              <input value={form.title} onChange={set('title')} placeholder="Issue title…"
                style={{ ...inputStyle, padding: '12px 14px', fontSize: 16, fontWeight: 600 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Excerpt</label>
              <textarea value={form.excerpt} onChange={set('excerpt')} rows={2} placeholder="Short description shown on the magazine listing…"
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                Content <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400 }}>(HTML — optional if a PDF is attached)</span>
              </label>
              <textarea value={form.content} onChange={set('content')} rows={12}
                placeholder="<p>Write content here, or leave blank if using a PDF.</p>"
                style={{ ...inputStyle, padding: '12px 14px', fontFamily: 'monospace', resize: 'vertical', lineHeight: 1.6 }} />
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Details */}
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16 }}>Details</h3>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Category</label>
              <select value={form.category} onChange={set('category')} style={{ ...inputStyle }}>
                {['Magazine', 'Achievements', 'Events', 'Announcements', 'Science', 'Arts', 'Sports'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Issue / Volume</label>
              <input value={form.issue_number} onChange={set('issue_number')} placeholder="e.g. April 2025 · Issue 04"
                style={{ ...inputStyle }} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Publication Date</label>
              <input type="date" value={form.date} onChange={set('date')} style={{ ...inputStyle }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Author / Editor</label>
              <input value={form.author} onChange={set('author')} placeholder="Writer's name"
                style={{ ...inputStyle }} />
            </div>
          </div>

          {/* PDF */}
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 6 }}>PDF (Google Drive)</h3>
            <p style={{ fontSize: 11.5, color: '#9CA3AF', marginBottom: 12, lineHeight: 1.6 }}>
              Upload to Google Drive → Share → Anyone with link → Copy link, then paste below.
            </p>
            <textarea value={form.pdf_url} onChange={set('pdf_url')} rows={3}
              placeholder="https://drive.google.com/file/d/…/view?usp=sharing"
              style={{ ...inputStyle, resize: 'none', fontSize: 12, fontFamily: 'monospace', lineHeight: 1.5 }}
            />
            {form.pdf_url && embedPreview && (
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', backgroundColor: '#F0FDF4', borderRadius: 8, border: '1px solid #BBF7D0' }}>
                <FileText size={14} style={{ color: '#16A34A', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#15803D', fontWeight: 500, flex: 1 }}>PDF link detected</span>
                <a href={embedPreview} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#1E3273', fontWeight: 600, textDecoration: 'none' }}>
                  Preview <ExternalLink size={11} />
                </a>
              </div>
            )}
          </div>

          {/* Cover */}
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16 }}>Cover Image</h3>
            <ImageUpload value={form.cover} onChange={url => setForm(f => ({ ...f, cover: url }))} label="" aspect="wide" />
          </div>

        </div>
      </div>
    </div>
  )
}
