import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Loader2, Users } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminCommittees() {
  const [committees, setCommittees] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')

  const load = async () => {
    setLoading(true)
    const { data, error: err } = await supabase
      .from('committees')
      .select('*')
      .order('created_at', { ascending: true })
    if (err) { setError(err.message); setLoading(false); return }
    setCommittees(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const remove = async (id, name) => {
    if (!confirm(`Delete "${name}" and all its members and events?`)) return
    const { error: err } = await supabase.from('committees').delete().eq('id', id)
    if (err) { alert('Delete failed: ' + err.message); return }
    setCommittees(cs => cs.filter(c => c.id !== id))
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Committees</h1>
        <Link to="/admin/committees/new"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
          <Plus size={16} /> New Committee
        </Link>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13.5, color: '#B91C1C' }}>{error}</div>
      )}

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#94A3B8' }}>
            <Loader2 size={18} className="spin" /> Loading…
          </div>
        ) : committees.length === 0 ? (
          <div style={{ padding: 64, textAlign: 'center', color: '#94A3B8' }}>
            <Users size={28} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
            <div style={{ fontSize: 14 }}>No committees yet.</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Committee', 'Slug', 'Tagline', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {committees.map(c => (
                <tr key={c.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {c.cover
                        ? <img src={c.cover} alt="" style={{ width: 52, height: 36, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                        : <div style={{ width: 52, height: 36, borderRadius: 6, backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Users size={16} style={{ color: '#CBD5E1' }} /></div>
                      }
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <code style={{ fontSize: 12, backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: 6, color: '#475569' }}>{c.slug}</code>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748B', maxWidth: 280 }}>{c.tagline || '—'}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link to={`/admin/committees/${c.id}/edit`}
                        style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', color: '#1E3273', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => remove(c.id, c.name)}
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
    </div>
  )
}
