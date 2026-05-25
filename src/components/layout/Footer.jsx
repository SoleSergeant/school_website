import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111B4A', color: '#CBD5E1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ backgroundColor: '#C9A84C', borderRadius: 10, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#111B4A', fontWeight: 800, fontSize: 18, fontFamily: 'Plus Jakarta Sans' }}>PS</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#fff' }}>Fergana Presidential School</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>Ixtisoslashtirilgan Ta'lim Muassasalari Agentligi</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>Nurturing the next generation of leaders through world-class education.</p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 15 }}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[['/', 'Home'], ['/teachers', 'Teachers'], ['/students', 'Student Results'], ['/admissions', 'Admissions'], ['/echo', 'Echo Surveys']].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: '#94A3B8', textDecoration: 'none', fontSize: 14 }}
                  onMouseEnter={e => e.target.style.color = '#C9A84C'}
                  onMouseLeave={e => e.target.style.color = '#94A3B8'}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 15 }}>Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2" style={{ fontSize: 14 }}>
                <MapPin size={16} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                <span>1 Qashqar Street, Fergana, Uzbekistan</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 14 }}>
                <Phone size={16} style={{ color: '#C9A84C', flexShrink: 0 }} />
                <span>+998 73 000 00 00</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 14 }}>
                <Mail size={16} style={{ color: '#C9A84C', flexShrink: 0 }} />
                <span>info@ferganaschool.uz</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1E3273', marginTop: 40, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13 }}>© 2025 Fergana Presidential School. All rights reserved.</p>
          <Link to="/admin/login" style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}>Admin Login</Link>
        </div>
      </div>
    </footer>
  )
}
