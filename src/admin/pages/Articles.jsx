import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, Loader2, FileText } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminArticles() {
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')

  const load = async () => {
    setLoading(true)
    const { data, error: err } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false, nullsFirst: false })
    if (err) { setError(err.message); setLoading(false); return }
    setArticles(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const remove = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    const { error: err } = await supabase.from('articles').delete().eq('id', id)
    if (err) { alert('Delete failed: ' + err.message); return }
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Magazine</h1>
        <Link to="/admin/articles/new"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
          <Plus size={16} /> New Issue
        </Link>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13.5, color: '#B91C1C' }}>
          {error}
        </div>
      )}

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#94A3B8' }}>
            <Loader2 size={18} className="spin" /> Loading issues…
          </div>
        ) : articles.length === 0 ? (
          <div style={{ padding: 64, textAlign: 'center', color: '#94A3B8' }}>
            <FileText size={28} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
            <div style={{ fontSize: 14 }}>No issues yet. Create your first one.</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['Issue', 'Category', 'Author', 'Date', 'PDF', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {a.cover
                        ? <img src={a.cover} alt="" style={{ width: 52, height: 40, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                        : <div style={{ width: 52, height: 40, borderRadius: 6, backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FileText size={16} style={{ color: '#CBD5E1' }} /></div>
                      }
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', maxWidth: 220 }}>{a.title}</div>
                        {a.issue_number && <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{a.issue_number}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 100, backgroundColor: '#EEF2FF', color: '#1E3273' }}>{a.category}</span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#64748B' }}>{a.author || '—'}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#94A3B8', whiteSpace: 'nowrap' }}>
                    {a.date ? new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {a.pdf_url
                      ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#16A34A', padding: '3px 8px', backgroundColor: '#F0FDF4', borderRadius: 100 }}><FileText size={11} /> PDF</span>
                      : <span style={{ fontSize: 11, color: '#CBD5E1' }}>—</span>
                    }
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link to={`/magazine/${a.id}`} target="_blank"
                        style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', color: '#64748B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        <Eye size={14} />
                      </Link>
                      <Link to={`/admin/articles/${a.id}/edit`}
                        style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', color: '#1E3273', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => remove(a.id, a.title)}
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
