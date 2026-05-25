import { useState } from 'react'
import { Plus, Trash2, X } from 'lucide-react'

const initial = [
  { id: 1, name: 'Admin Superadmin', email: 'admin@ferganaschool.uz', role: 'superadmin' },
  { id: 2, name: 'Media Manager', email: 'media@ferganaschool.uz', role: 'media' },
  { id: 3, name: 'Content Writer', email: 'writer@ferganaschool.uz', role: 'writer' },
]

const roleColors = {
  superadmin: { bg: '#FEF3C7', text: '#92400E', label: 'Superadmin' },
  media: { bg: '#DBEAFE', text: '#1E40AF', label: 'Media' },
  writer: { bg: '#D1FAE5', text: '#065F46', label: 'Writer' },
}

export default function AdminUsers() {
  const [users, setUsers] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'writer' })

  const add = () => {
    setUsers(us => [...us, { ...form, id: Date.now() }])
    setShowForm(false)
    setForm({ name: '', email: '', role: 'writer' })
  }
  const remove = (id) => { if (id === 1) { alert('Cannot delete the main superadmin.'); return } if (confirm('Delete user?')) setUsers(us => us.filter(u => u.id !== id)) }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Admin Users</h1>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> Add User
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              {['Name', 'Email', 'Role', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const rs = roleColors[u.role]
              return (
                <tr key={u.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600, color: '#111827' }}>{u.name}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#64748B' }}>{u.email}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, backgroundColor: rs.bg, color: rs.text }}>{rs.label}</span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <button onClick={() => remove(u.id)} style={{ padding: '6px 12px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626' }}><Trash2 size={14} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 420 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>Add Admin User</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            {[
              { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'user@ferganaschool.uz' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                <input type={type} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} placeholder={placeholder}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Role</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, outline: 'none' }}>
                <option value="superadmin">Superadmin</option>
                <option value="media">Media</option>
                <option value="writer">Writer</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '12px', border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={add} style={{ flex: 1, padding: '12px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
