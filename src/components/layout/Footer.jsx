import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'School',
    links: [['/', 'Home'], ['/teachers', 'Teachers'], ['/students', 'Students'], ['/life', 'Campus Life']],
  },
  {
    title: 'Resources',
    links: [['/articles', 'Articles'], ['/echo', 'Echo'], ['/gallery', 'Gallery'], ['/admissions', 'Admissions']],
  },
  {
    title: 'Contact',
    text: ['1 Qashqar Street, Fergana', 'info@ferganaschool.uz', '+998 73 000 00 00'],
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0D1B36', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="wrap" style={{ padding: '60px 24px 40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <img src="/logo.jpg" alt="ITMA" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#fff', letterSpacing: '-0.01em' }}>Fergana Presidential School</span>
            </div>
            <p style={{ fontSize: 13, color: '#4A6080', lineHeight: 1.75 }}>Nurturing tomorrow's leaders through world-class education and a commitment to excellence.</p>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, color: '#3D5270', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</div>
              {col.links ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {col.links.map(([to, label]) => (
                    <Link key={to} to={to} style={{ fontSize: 13.5, color: '#6B82A0', textDecoration: 'none' }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = '#6B82A0'}
                    >{label}</Link>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {col.text.map(t => <span key={t} style={{ fontSize: 13.5, color: '#6B82A0' }}>{t}</span>)}
                </div>
              )}
            </div>
          ))}

        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 12.5, color: '#3D5270' }}>© 2025 Fergana Presidential School. All rights reserved.</span>
          <Link to="/admin/login" style={{ fontSize: 12.5, color: '#2A3A52' }}
            onMouseEnter={e => e.target.style.color = '#6B82A0'}
            onMouseLeave={e => e.target.style.color = '#2A3A52'}
          >Admin</Link>
        </div>
      </div>
    </footer>
  )
}
