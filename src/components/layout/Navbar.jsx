import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/teachers', label: 'Teachers' },
  { to: '/students', label: 'Students' },
  { to: '/articles', label: 'Articles' },
  { to: '/echo', label: 'Echo' },
  { to: '/life', label: 'Student Life' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #E2E8F0' }} className="sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/logo.jpg" alt="ITMA" style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: '#111827', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Fergana Presidential School</div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center" style={{ gap: 2 }}>
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  padding: '5px 11px',
                  borderRadius: 6,
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 450,
                  textDecoration: 'none',
                  color: isActive ? '#1E3273' : '#6B7280',
                  backgroundColor: isActive ? '#F0F4FF' : 'transparent',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.15s',
                })}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Admin button */}
          <Link
            to="/admin"
            style={{ backgroundColor: '#1E3273', color: '#fff', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'none' }}
            className="hidden lg:block"
          >
            Admin
          </Link>

          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" style={{ color: '#1E3273' }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid #E2E8F0', backgroundColor: '#fff', padding: '12px 16px' }} className="lg:hidden">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? '#1E3273' : '#374151',
                backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                marginBottom: 4,
              })}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: 8, backgroundColor: '#1E3273', color: '#fff', padding: '10px 12px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}
          >
            Admin Panel
          </Link>
        </div>
      )}
    </nav>
  )
}
