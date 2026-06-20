import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/teachers',   label: 'Faculty' },
  { to: '/students',   label: 'Students' },
  { to: '/magazine',   label: 'FPS Chronicles' },
  { to: '/committees', label: 'Committees' },
  { to: '/news',       label: 'News' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const solid = !isHome || scrolled

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 68,
        backgroundColor: solid ? '#fff' : 'transparent',
        borderBottom: solid ? '1px solid #EDE8DC' : 'none',
        boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <img src="/logo.jpg" alt="" style={{ width: 30, height: 30, borderRadius: 5, objectFit: 'cover' }} />
            <div style={{ lineHeight: 1.25 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: solid ? '#0A1628' : '#fff', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
                Fergana
              </div>
              <div style={{ fontSize: 9, color: solid ? '#AAA' : 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.3s' }}>
                Presidential School
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center" style={{ gap: 2 }}>
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to}
                style={({ isActive }) => ({
                  padding: '6px 12px',
                  fontSize: 12.5,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? (solid ? '#0A1628' : '#fff')
                    : (solid ? '#666' : 'rgba(255,255,255,0.72)'),
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s',
                  borderBottom: isActive ? `1.5px solid ${solid ? '#B8882A' : 'rgba(255,255,255,0.7)'}` : '1.5px solid transparent',
                })}
              >{label}</NavLink>
            ))}
            <Link to="/echo" style={{
              marginLeft: 12,
              backgroundColor: solid ? '#0A1628' : 'rgba(255,255,255,0.14)',
              color: '#fff',
              padding: '7px 16px',
              borderRadius: 2,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: solid ? 'none' : '1px solid rgba(255,255,255,0.28)',
              transition: 'background-color 0.3s',
            }}>Echo</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)}
            className="lg:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: solid ? '#333' : '#fff', padding: 6 }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          backgroundColor: '#fff',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ height: 68, borderBottom: '1px solid #EDE8DC', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: '#0A1628', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Menu</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333', padding: 6 }}>
              <X size={22} />
            </button>
          </div>
          <nav style={{ flex: 1, padding: '12px 32px', overflowY: 'auto' }}>
            {[{ to: '/', label: 'Home' }, ...links].map(({ to, label }) => (
              <Link key={to} to={to}
                style={{ display: 'block', fontSize: 22, fontWeight: 400, color: '#0A1628', padding: '13px 0', borderBottom: '1px solid #F0ECE4', textDecoration: 'none', letterSpacing: '-0.01em' }}
              >{label}</Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
