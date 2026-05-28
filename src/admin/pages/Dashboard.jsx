import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { GraduationCap, Users, FileText, MessageSquare, UserCog, Loader2 } from 'lucide-react'

export default function Dashboard() {
  const { user, hasRole } = useAuth()
  const [counts,   setCounts]   = useState({})
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)

  // Committee leaders go straight to their committee
  if (user?.role === 'committee_leader') return <Navigate to="/admin/my-committee" replace />

  useEffect(() => {
    const fetchAll = async () => {
      const queries = [
        supabase.from('teachers').select('id', { count: 'exact', head: true }),
        supabase.from('students').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('surveys').select('id', { count: 'exact', head: true }),
        supabase.from('admin_users').select('id', { count: 'exact', head: true }),
        supabase.from('committees').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id, title, author, date, cover, category').order('date', { ascending: false }).limit(3),
      ]
      const [teachers, students, arts, surveys, admins, committees, recentArts] = await Promise.all(queries)
      setCounts({
        teachers:   teachers.count  ?? 0,
        students:   students.count  ?? 0,
        articles:   arts.count      ?? 0,
        surveys:    surveys.count   ?? 0,
        adminUsers: admins.count    ?? 0,
        committees: committees.count ?? 0,
      })
      setArticles(recentArts.data || [])
      setLoading(false)
    }
    fetchAll()
  }, [])

  const cards = [
    { label: 'Teachers',    value: counts.teachers,   icon: GraduationCap, to: '/admin/teachers',   roles: ['superadmin'] },
    { label: 'Students',    value: counts.students,   icon: Users,         to: '/admin/students',   roles: ['superadmin'] },
    { label: 'Committees',  value: counts.committees, icon: Users,         to: '/admin/committees', roles: ['superadmin'] },
    { label: 'FPS Chronicles', value: counts.articles, icon: FileText,     to: '/admin/articles',   roles: ['superadmin','writer'] },
    { label: 'Surveys',     value: counts.surveys,    icon: MessageSquare, to: '/admin/surveys',    roles: ['superadmin','writer'] },
    { label: 'Admin Users', value: counts.adminUsers, icon: UserCog,       to: '/admin/users',      roles: ['superadmin'] },
  ].filter(c => hasRole(c.roles))

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 6 }}>
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#64748B', fontSize: 15 }}>Here's an overview of your admin panel.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94A3B8', marginBottom: 32 }}>
          <Loader2 size={18} className="spin" /> Loading stats…
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {cards.map(({ label, value, icon: Icon, to }) => (
            <Link key={label} to={to} style={{ textDecoration: 'none' }}>
              <div
                style={{ backgroundColor: '#fff', borderRadius: 16, padding: '24px 22px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 16, transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)'}
              >
                <div style={{ backgroundColor: '#EEF2FF', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={22} style={{ color: '#1E3273' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273', lineHeight: 1 }}>{value ?? '—'}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Recent Articles */}
      {hasRole(['superadmin','writer']) && (
        <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111827' }}>Recent Articles</h2>
            <Link to="/admin/articles/new" style={{ backgroundColor: '#1E3273', color: '#fff', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Article</Link>
          </div>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94A3B8', padding: '12px 0' }}>
              <Loader2 size={16} className="spin" /> Loading…
            </div>
          ) : articles.length === 0 ? (
            <p style={{ color: '#94A3B8', fontSize: 14 }}>No articles yet.</p>
          ) : (
            <div>
              {articles.map((a, i) => (
                <Link key={a.id} to={`/admin/articles/${a.id}/edit`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < articles.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    {a.cover
                      ? <img src={a.cover} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                      : <div style={{ width: 52, height: 52, borderRadius: 10, backgroundColor: '#F1F5F9', flexShrink: 0 }} />
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{a.author} · {a.date}</div>
                    </div>
                    {a.category && (
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, backgroundColor: '#EEF2FF', color: '#1E3273', flexShrink: 0 }}>{a.category}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
