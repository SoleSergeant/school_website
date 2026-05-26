import { useState } from 'react'
import { galleryItems as initial } from '../../data/mock'
import { Plus, Trash2, X } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'

export default function AdminGallery() {
  const [items, setItems] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ url: '', caption: '' })

  const add = () => {
    if (!form.url) return
    setItems(is => [...is, { ...form, id: Date.now() }])
    setForm({ url: '', caption: '' })
    setShowForm(false)
  }
  const remove = (id) => { if (confirm('Remove photo?')) setItems(is => is.filter(i => i.id !== id)) }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Gallery</h1>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> Add Photo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
            <img src={item.url} alt={item.caption} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '10px 12px', backgroundColor: '#fff' }}>
              <div style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{item.caption}</div>
            </div>
            <button
              onClick={() => remove(item.id)}
              style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(220,38,38,0.9)', color: '#fff', border: 'none', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 420 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>Add Photo</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <ImageUpload
                value={form.url}
                onChange={url => setForm(f => ({ ...f, url }))}
                label="Photo"
                aspect="wide"
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Caption</label>
              <input value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} placeholder="Event or description"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '12px', border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={add} style={{ flex: 1, padding: '12px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
