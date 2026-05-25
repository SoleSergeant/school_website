import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles as initial } from '../../data/mock'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'

export default function AdminArticles() {
  const [articles, setArticles] = useState(initial)
  const remove = (id) => { if (confirm('Delete article?')) setArticles(as => as.filter(a => a.id !== id)) }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Articles</h1>
        <Link to="/admin/articles/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
          <Plus size={16} /> New Article
        </Link>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              {['Article', 'Category', 'Author', 'Date', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map(a => (
              <tr key={a.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div className="flex items-center gap-3">
                    <img src={a.cover} alt="" style={{ width: 52, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#111827', maxWidth: 240, display: 'block' }}>{a.title}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 100, backgroundColor: '#EEF2FF', color: '#1E3273' }}>{a.category}</span>
                </td>
                <td style={{ padding: '14px 20px', fontSize: 14, color: '#64748B' }}>{a.author}</td>
                <td style={{ padding: '14px 20px', fontSize: 13, color: '#94A3B8' }}>{a.date}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div className="flex gap-2">
                    <Link to={`/articles/${a.id}`} target="_blank" style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', color: '#64748B', textDecoration: 'none', display: 'inline-flex' }}><Eye size={14} /></Link>
                    <Link to={`/admin/articles/${a.id}/edit`} style={{ padding: '6px 12px', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', color: '#1E3273', textDecoration: 'none', display: 'inline-flex' }}><Pencil size={14} /></Link>
                    <button onClick={() => remove(a.id)} style={{ padding: '6px 12px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
