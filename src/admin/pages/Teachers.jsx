import { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import ImageUpload from '../components/ImageUpload'

const EMPTY = { name: '', subject: '', experience: '', bio: '', photo: '' }

const inputStyle = {
  width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0',
  borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none',
  fontFamily: 'Plus Jakarta Sans',
}

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState(null)   // UUID or null
  const [form,     setForm]     = useState(EMPTY)

  // ── Load ──────────────────────────────────────────────────────────────────
  const load = async () => {
    setLoading(true)
    const { data, error: err } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: true })
    if (err) { setError(err.message); setLoading(false); return }
    setTeachers(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  // ── Open form ─────────────────────────────────────────────────────────────
  const openNew  = () => { setForm(EMPTY); setEditing(null); setError(''); setShowForm(true) }
  const openEdit = (t) => { setForm({ name: t.name, subject: t.subject, experience: t.experience || '', bio: t.bio || '', photo: t.photo || '' }); setEditing(t.id); setError(''); setShowForm(true) }

  // ── Save ──────────────────────────────────────────────────────────────────
  const save = async () => {
    if (!form.name.trim()) { setError('Name is required.'); return }
    if (!form.subject.trim()) { setError('Subject is required.'); return }
    setSaving(true)
    setError('')

    const payload = {
      name:       form.name.trim(),
      subject:    form.subject.trim(),
      experience: form.experience.trim(),
      bio:        form.bio.trim(),
      photo:      form.photo.trim(),
    }

    let err
    if (editing) {
      ;({ error: err } = await supabase.from('teachers').update(payload).eq('id', editing))
    } else {
      ;({ error: err } = await supabase.from('teachers').insert(payload))
    }

    if (err) { setError(err.message); setSaving(false); return }

    setSaving(false)
    setShowForm(false)
    load()
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  const remove = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return
    const { error: err } = await supabase.from('teachers').delete().eq('id', id)
    if (err) { alert('Delete failed: ' + err.message); return }
    setTeachers(ts => ts.filter(t => t.id !== id))
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Teachers</h1>
        <button onClick={openNew}
          style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      {error && !showForm && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13.5, color: '#B91C1C' }}>{error}</div>
      )}

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#94A3B8' }}>
            <Loader2 size={18} className="spin" /> Loading teachers…
          </div>
        ) : teachers.length === 0 ? (
          <div style={{ padding: 64, textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
            No teachers yet. Add the first one.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Teacher', 'Subject', 'Experience', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={t.photo || `https://i.pravatar.cc/40?u=${t.id}`} alt=""
                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{t.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#374151' }}>{t.subject}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#64748B' }}>{t.experience || '—'}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(t)}
                        style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#1E3273', display: 'inline-flex', alignItems: 'center' }}>
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => remove(t.id, t.name)}
                        style={{ padding: '6px 10px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626', display: 'inline-flex', alignItems: 'center' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modal ── */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>{editing ? 'Edit Teacher' : 'Add Teacher'}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>

            {error && (
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#B91C1C' }}>{error}</div>
            )}

            {[
              { key: 'name',       label: 'Full Name',   placeholder: 'Teacher name' },
              { key: 'subject',    label: 'Subject',     placeholder: 'e.g. Mathematics' },
              { key: 'experience', label: 'Experience',  placeholder: 'e.g. 8 years' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder} style={inputStyle} />
              </div>
            ))}

            <div style={{ marginBottom: 16 }}>
              <ImageUpload value={form.photo} onChange={url => setForm(f => ({ ...f, photo: url }))} label="Photo" />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Bio</label>
              <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowForm(false)}
                style={{ flex: 1, padding: 12, border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                Cancel
              </button>
              <button onClick={save} disabled={saving}
                style={{ flex: 1, padding: 12, backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14, opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {saving ? <><Loader2 size={15} className="spin" /> Saving…</> : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
