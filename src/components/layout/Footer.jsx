import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

const quickLinks = [
  ['/', 'Home'],
  ['/teachers', 'Teachers'],
  ['/students', 'Student Results'],
  ['/admissions', 'Admissions'],
  ['/echo', 'Echo'],
  ['/gallery', 'Gallery'],
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F1A3E', color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: '56px 24px 40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/logo.jpg" alt="ITMA" style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Fergana Presidential School</div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.75, color: '#64748B' }}>Nurturing the next generation of leaders through world-class education and a commitment to excellence.</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 13.5, letterSpacing: '-0.01em' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {quickLinks.map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  style={{ color: '#64748B', textDecoration: 'none', fontSize: 13.5, transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = '#C9A84C'}
                  onMouseLeave={e => e.target.style.color = '#64748B'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 13.5, letterSpacing: '-0.01em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13.5 }}>
                <MapPin size={14} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                <span>1 Qashqar Street, Fergana, Uzbekistan</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5 }}>
                <Phone size={14} style={{ color: '#C9A84C', flexShrink: 0 }} />
                <span>+998 73 000 00 00</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5 }}>
                <Mail size={14} style={{ color: '#C9A84C', flexShrink: 0 }} />
                <span>info@ferganaschool.uz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 40, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: 12.5, color: '#475569' }}>© 2025 Fergana Presidential School. All rights reserved.</p>
          <Link to="/admin/login" style={{ fontSize: 12.5, color: '#334155', textDecoration: 'none' }}
            onMouseEnter={e => e.target.style.color = '#94A3B8'}
            onMouseLeave={e => e.target.style.color = '#334155'}
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
