import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/teachers', label: 'Teachers' },
  { to: '/students', label: 'Students' },
  { to: '/articles', label: 'Articles' },
  { to: '/echo', label: 'Echo' },
  { to: '/life', label: 'Campus Life' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ backgroundColor: '#FAFAF8', borderBottom: '1px solid #E5E3DC', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
          <img src="/logo.jpg" alt="ITMA" style={{ width: 30, height: 30, borderRadius: 6, objectFit: 'cover' }} />
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13.5, color: '#111', letterSpacing: '-0.01em' }}>
            Fergana Presidential School
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center" style={{ gap: 0 }}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 400,
                textDecoration: 'none',
                color: isActive ? '#111' : '#999',
                letterSpacing: '-0.01em',
                borderBottom: isActive ? '1.5px solid #C9A84C' : '1.5px solid transparent',
                transition: 'color 0.15s',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: 4 }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid #E5E3DC', backgroundColor: '#FAFAF8', padding: '16px 24px 20px' }} className="lg:hidden">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 0',
                fontSize: 15,
                fontWeight: isActive ? 600 : 400,
                textDecoration: 'none',
                color: isActive ? '#111' : '#666',
                borderBottom: '1px solid #ECEAE4',
              })}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/admissions"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: 16, backgroundColor: '#0D1B36', color: '#fff', padding: '11px 0', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}
          >
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  )
}
