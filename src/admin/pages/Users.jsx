import { useState, useEffect } from 'react'
import { Plus, Trash2, X, Loader2, RefreshCw } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const roleColors = {
  superadmin:        { bg: '#FEF3C7', text: '#92400E',  label: 'Superadmin' },
  media:             { bg: '#DBEAFE', text: '#1E40AF',  label: 'Media' },
  writer:            { bg: '#D1FAE5', text: '#065F46',  label: 'Writer' },
  committee_leader:  { bg: '#EDE9FE', text: '#5B21B6',  label: 'Committee Leader' },
}

const inputStyle = {
  width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0',
  borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none',
}

const EMPTY_FORM = { name: '', email: '', password: '', role: 'writer', committee_slug: '' }

export default function AdminUsers() {
  const [users,     setUsers]     = useState([])
  const [slugs,     setSlugs]     = useState([])   // committee slugs for dropdown
  const [loading,   setLoading]   = useState(true)
  const [showForm,  setShowForm]  = useState(false)
  const [form,      setForm]      = useState(EMPTY_FORM)
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState('')

  const load = async () => {
    setLoading(true)
    const [{ data: u }, { data: c }] = await Promise.all([
      supabase.from('admin_users').select('id, name, email, role, committee_slug').order('id'),
      supabase.from('committees').select('slug, name').order('name'),
    ])
    setUsers(u || [])
    setSlugs(c || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleAdd = async () => {
    setError('')
    if (!form.name.trim())     { setError('Name is required.');     return }
    if (!form.email.trim())    { setError('Email is required.');    return }
    if (!form.password.trim()) { setError('Password is required.'); return }
    if (form.role === 'committee_leader' && !form.committee_slug) {
      setError('Committee slug is required for Committee Leader role.'); return
    }
    setSaving(true)
    const payload = {
      name:           form.name.trim(),
      email:          form.email.trim().toLowerCase(),
      password_hash:  form.password,   // plain-text, matching existing auth pattern
      role:           form.role,
      committee_slug: form.role === 'committee_leader' ? form.committee_slug : null,
    }
    const { error: err } = await supabase.from('admin_users').insert(payload)
    setSaving(false)
    if (err) { setError(err.message); return }
    setShowForm(false)
    setForm(EMPTY_FORM)
    load()
  }

  const handleDelete = async (u) => {
    if (!confirm(`Delete "${u.name}"?`)) return
    await supabase.from('admin_users').delete().eq('id', u.id)
    load()
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Admin Users</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#F8FAFC', color: '#374151', padding: '10px 16px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: '1px solid #E2E8F0', cursor: 'pointer' }}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => { setShowForm(true); setError('') }} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, color: '#94A3B8' }}>
            <Loader2 size={18} className="spin" /> Loading…
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Name', 'Email', 'Role', 'Committee', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const rs = roleColors[u.role] || { bg: '#F1F5F9', text: '#475569', label: u.role }
                return (
                  <tr key={u.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600, color: '#111827' }}>{u.name}</td>
                    <td style={{ padding: '14px 20px', fontSize: 14, color: '#64748B' }}>{u.email}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, backgroundColor: rs.bg, color: rs.text }}>{rs.label}</span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748B' }}>
                      {u.committee_slug ? (
                        <code style={{ backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: 6, fontSize: 12 }}>{u.committee_slug}</code>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <button onClick={() => handleDelete(u)} style={{ padding: '6px 12px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626' }}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })}
              {users.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '40px 20px', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>No admin users found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 460, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>Add Admin User</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>

            {error && (
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#B91C1C' }}>{error}</div>
            )}

            {[
              { name: 'name',     label: 'Full Name', type: 'text',     placeholder: 'Jane Doe' },
              { name: 'email',    label: 'Email',     type: 'email',    placeholder: 'user@ferganaschool.uz' },
              { name: 'password', label: 'Password',  type: 'password', placeholder: 'Set initial password' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                <input type={type} value={form[name]} onChange={set(name)} placeholder={placeholder} style={inputStyle} />
              </div>
            ))}

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Role</label>
              <select value={form.role} onChange={set('role')} style={inputStyle}>
                <option value="superadmin">Superadmin</option>
                <option value="media">Media</option>
                <option value="writer">Writer</option>
                <option value="committee_leader">Committee Leader</option>
              </select>
            </div>

            {form.role === 'committee_leader' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Assigned Committee</label>
                <select value={form.committee_slug} onChange={set('committee_slug')} style={inputStyle}>
                  <option value="">— select committee —</option>
                  {slugs.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name} ({c.slug})</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '12px', border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleAdd} disabled={saving} style={{ flex: 1, padding: '12px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: saving ? 0.7 : 1 }}>
                {saving ? <><Loader2 size={15} className="spin" /> Saving…</> : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
