import { useState } from 'react'
import { teachers as initialTeachers } from '../../data/mock'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import ImageUpload from '../components/ImageUpload'

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', subject: '', experience: '', bio: '', photo: '' })

  const openNew = () => {
    setForm({ name: '', subject: '', experience: '', bio: '', photo: '' })
    setEditing(null)
    setShowForm(true)
  }

  const openEdit = (t) => {
    setForm({ ...t })
    setEditing(t.id)
    setShowForm(true)
  }

  const save = () => {
    if (editing) {
      setTeachers(ts => ts.map(t => t.id === editing ? { ...form, id: editing } : t))
    } else {
      setTeachers(ts => [...ts, { ...form, id: Date.now() }])
    }
    setShowForm(false)
  }

  const remove = (id) => {
    if (confirm('Delete this teacher?')) setTeachers(ts => ts.filter(t => t.id !== id))
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Teachers</h1>
        <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              {['Teacher', 'Subject', 'Experience', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teachers.map((t, i) => (
              <tr key={t.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div className="flex items-center gap-3">
                    <img src={t.photo || `https://i.pravatar.cc/40?u=${t.id}`} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{t.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: 14, color: '#374151' }}>{t.subject}</td>
                <td style={{ padding: '14px 20px', fontSize: 14, color: '#64748B' }}>{t.experience}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(t)} style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#1E3273' }}><Pencil size={14} /></button>
                    <button onClick={() => remove(t.id)} style={{ padding: '6px 12px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#FFF', cursor: 'pointer', color: '#DC2626' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>{editing ? 'Edit Teacher' : 'Add Teacher'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            {[
              { name: 'name', label: 'Full Name', placeholder: 'Teacher name' },
              { name: 'subject', label: 'Subject', placeholder: 'e.g. Mathematics' },
              { name: 'experience', label: 'Experience', placeholder: 'e.g. 8 years' },
            ].map(({ name, label, placeholder }) => (
              <div key={name} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                <input
                  value={form[name]}
                  onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                  placeholder={placeholder}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <ImageUpload
                value={form.photo}
                onChange={url => setForm(f => ({ ...f, photo: url }))}
                label="Photo"
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Bio</label>
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                rows={3}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '12px', border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Cancel</button>
              <button onClick={save} style={{ flex: 1, padding: '12px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
