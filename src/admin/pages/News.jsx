import { useState, useEffect } from 'react'
import { Plus, Trash2, X, Loader2, Newspaper } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const iS = { width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none', fontFamily: 'Plus Jakarta Sans' }

export default function AdminNews() {
  const [news,     setNews]     = useState([])
  const [loading,  setLoading]  = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [form,     setForm]     = useState({ title: '', image_url: '', content: '' })

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('school_news')
      .select('id, title, image_url, content, created_at')
      .order('created_at', { ascending: false })
    setNews(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.title.trim()) { alert('Title is required.'); return }
    if (!form.content.trim()) { alert('Content is required.'); return }
    setSaving(true)
    const { error } = await supabase.from('school_news').insert({
      title:     form.title.trim(),
      image_url: form.image_url.trim() || null,
      content:   form.content.trim(),
    })
    setSaving(false)
    if (error) { alert(error.message); return }
    setForm({ title: '', image_url: '', content: '' })
    setShowForm(false)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this news item?')) return
    await supabase.from('school_news').delete().eq('id', id)
    setNews(ns => ns.filter(n => n.id !== id))
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>School News</h1>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> Add News
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94A3B8', padding: '40px 0' }}>
          <Loader2 size={18} className="spin" /> Loading…
        </div>
      ) : news.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94A3B8' }}>
          <Newspaper size={36} style={{ display: 'block', margin: '0 auto 16px', opacity: 0.3 }} />
          <p style={{ fontSize: 15 }}>No news yet. Add the first item.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {news.map(item => {
            const date = new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
            return (
              <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                {item.image_url && (
                  <img src={item.image_url} alt={item.title}
                    style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>{date}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.content}</p>
                </div>
                <button onClick={() => remove(item.id)} style={{ padding: '7px 10px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Trash2 size={15} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Create modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>Add News</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="News headline" style={iS} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Image URL <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label>
              <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://…" style={iS} />
              {form.image_url && (
                <img src={form.image_url} alt="preview" style={{ marginTop: 10, width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Content *</label>
              <textarea
                rows={6}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Write the news content here…"
                style={{ ...iS, resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 12, border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ flex: 1, padding: 12, backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {saving ? <><Loader2 size={14} className="spin" /> Saving…</> : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
