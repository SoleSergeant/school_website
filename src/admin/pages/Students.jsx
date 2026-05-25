import { useState } from 'react'
import { students as initialStudents } from '../../data/mock'
import { Pencil, Trash2, Plus, X } from 'lucide-react'

export default function AdminStudents() {
  const [students, setStudents] = useState(initialStudents)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', grade: '', achievement: '', photo: '' })

  const openNew = () => { setForm({ name: '', grade: '', achievement: '', photo: '' }); setEditing(null); setShowForm(true) }
  const openEdit = (s) => { setForm({ ...s }); setEditing(s.id); setShowForm(true) }
  const save = () => {
    if (editing) setStudents(ss => ss.map(s => s.id === editing ? { ...form, id: editing } : s))
    else setStudents(ss => [...ss, { ...form, id: Date.now() }])
    setShowForm(false)
  }
  const remove = (id) => { if (confirm('Delete?')) setStudents(ss => ss.filter(s => s.id !== id)) }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Student Results</h1>
        <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> Add Student
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              {['Student', 'Grade', 'Achievement', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div className="flex items-center gap-3">
                    <img src={s.photo || `https://i.pravatar.cc/40?u=s${s.id}`} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: 14, color: '#374151' }}>{s.grade}</td>
                <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748B', maxWidth: 300 }}>{s.achievement}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(s)} style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#1E3273' }}><Pencil size={14} /></button>
                    <button onClick={() => remove(s.id)} style={{ padding: '6px 12px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 460 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>{editing ? 'Edit Student' : 'Add Student'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            {[
              { name: 'name', label: 'Full Name', placeholder: 'Student name' },
              { name: 'grade', label: 'Grade', placeholder: '9, 10, 11, or 12' },
              { name: 'photo', label: 'Photo URL', placeholder: 'https://...' },
            ].map(({ name, label, placeholder }) => (
              <div key={name} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                <input value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} placeholder={placeholder}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Achievement</label>
              <textarea value={form.achievement} onChange={e => setForm(f => ({ ...f, achievement: e.target.value }))} rows={3}
                placeholder="e.g. Gold Medal – National Math Olympiad"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '12px', border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={save} style={{ flex: 1, padding: '12px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
