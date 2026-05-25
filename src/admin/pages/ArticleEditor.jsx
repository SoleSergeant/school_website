import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { articles } from '../../data/mock'
import { ArrowLeft, Save } from 'lucide-react'

export default function ArticleEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const existing = id ? articles.find(a => a.id === Number(id)) : null

  const [form, setForm] = useState({
    title: existing?.title || '',
    excerpt: existing?.excerpt || '',
    content: existing?.content || '',
    cover: existing?.cover || '',
    category: existing?.category || 'News',
    author: existing?.author || '',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => navigate('/admin/articles'), 1200)
  }

  return (
    <div style={{ padding: 32, maxWidth: 860, margin: '0 auto' }}>
      <button onClick={() => navigate('/admin/articles')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#1E3273', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Articles
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>
          {existing ? 'Edit Article' : 'New Article'}
        </h1>
        <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: saved ? '#16A34A' : '#1E3273', color: '#fff', padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Article'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }} className="flex flex-col lg:grid">
        {/* Main */}
        <div>
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Article title..."
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: 600, boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Excerpt</label>
              <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} placeholder="Short summary..."
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Content (HTML supported)</label>
              <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={16} placeholder="<p>Start writing your article...</p>"
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box', outline: 'none', lineHeight: 1.6 }} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16 }}>Details</h3>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, outline: 'none' }}>
                {['News', 'Achievements', 'Events', 'Announcements'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6 }}>Author</label>
              <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Your name"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 16 }}>Cover Image</h3>
            <input value={form.cover} onChange={e => setForm(f => ({ ...f, cover: e.target.value }))} placeholder="https://..."
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 13, boxSizing: 'border-box', outline: 'none', marginBottom: 12 }} />
            {form.cover && (
              <img src={form.cover} alt="cover" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10 }} onError={e => e.target.style.display='none'} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
