import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, Users, GraduationCap,
  FileText, MessageSquare, UserCog, LogOut, ExternalLink, Shield, Inbox
} from 'lucide-react'

const allLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['superadmin','media','writer'], end: true },
  { to: '/admin/teachers', label: 'Teachers', icon: GraduationCap, roles: ['superadmin'] },
  { to: '/admin/students', label: 'Students', icon: Users, roles: ['superadmin'] },
  { to: '/admin/users', label: 'Admin Users', icon: UserCog, roles: ['superadmin'] },
  { to: '/admin/committees', label: 'Committees', icon: Users, roles: ['superadmin'] },
  { to: '/admin/articles', label: 'FPS Chronicles', icon: FileText, roles: ['superadmin','writer'] },
  { to: '/admin/surveys', label: 'Surveys (Echo)', icon: MessageSquare, roles: ['superadmin','writer'] },
  { to: '/admin/messages', label: 'Messages', icon: Inbox, roles: ['superadmin'] },
  { to: '/admin/my-committee', label: 'My Committee', icon: Shield, roles: ['committee_leader'] },
]

const roleColors = {
  superadmin: { bg: '#FEF3C7', text: '#92400E', label: 'Superadmin' },
  media: { bg: '#DBEAFE', text: '#1E40AF', label: 'Media' },
  writer: { bg: '#D1FAE5', text: '#065F46', label: 'Writer' },
  committee_leader: { bg: '#EDE9FE', text: '#5B21B6', label: 'Committee Leader' },
}

export default function AdminLayout() {
  const { user, logout, hasRole } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const visibleLinks = allLinks.filter(l => hasRole(l.roles))
  const roleStyle = roleColors[user?.role] || {}

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F6FB' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, backgroundColor: '#111B4A', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 16, color: '#fff' }}>Fergana PS</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {visibleLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10, marginBottom: 4,
                textDecoration: 'none', fontSize: 14, fontWeight: 500,
                color: isActive ? '#fff' : '#94A3B8',
                backgroundColor: isActive ? '#1E3273' : 'transparent',
              })}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginBottom: 4 }}>{user?.name}</div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, backgroundColor: roleStyle.bg, color: roleStyle.text }}>
              {roleStyle.label}
            </span>
          </div>
          <Link to="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, color: '#64748B', textDecoration: 'none', fontSize: 13, marginBottom: 4 }}>
            <ExternalLink size={14} /> View Site
          </Link>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, color: '#F87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, width: '100%' }}
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
