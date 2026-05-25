import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { teachers, students, articles, surveys, galleryItems } from '../../data/mock'
import { GraduationCap, Users, FileText, Images, MessageSquare, UserCog } from 'lucide-react'

export default function Dashboard() {
  const { user, hasRole } = useAuth()

  const cards = [
    { label: 'Teachers', value: teachers.length, icon: GraduationCap, to: '/admin/teachers', roles: ['superadmin'] },
    { label: 'Student Records', value: students.length, icon: Users, to: '/admin/students', roles: ['superadmin'] },
    { label: 'Gallery Items', value: galleryItems.length, icon: Images, to: '/admin/gallery', roles: ['superadmin','media'] },
    { label: 'Articles', value: articles.length, icon: FileText, to: '/admin/articles', roles: ['superadmin','writer'] },
    { label: 'Surveys', value: surveys.length, icon: MessageSquare, to: '/admin/surveys', roles: ['superadmin','writer'] },
    { label: 'Admin Users', value: 3, icon: UserCog, to: '/admin/users', roles: ['superadmin'] },
  ].filter(c => hasRole(c.roles))

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#111827', marginBottom: 6 }}>
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#64748B', fontSize: 15 }}>Here's an overview of your admin panel.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '24px 22px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 16, transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)'}
            >
              <div style={{ backgroundColor: '#EEF2FF', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} style={{ color: '#1E3273' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Articles */}
      {hasRole(['superadmin','writer']) && (
        <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111827' }}>Recent Articles</h2>
            <Link to="/admin/articles/new" style={{ backgroundColor: '#1E3273', color: '#fff', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Article</Link>
          </div>
          <div className="flex flex-col">
            {articles.map((a, i) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < articles.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <img src={a.cover} alt="" style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 10 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{a.author} · {a.date}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, backgroundColor: '#EEF2FF', color: '#1E3273' }}>{a.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
