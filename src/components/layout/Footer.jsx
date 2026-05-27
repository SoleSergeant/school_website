import { Link } from 'react-router-dom'

const cols = [
  { title: 'School',     links: [['/', 'Home'], ['/teachers', 'Faculty'], ['/students', 'Students'], ['/life', 'Campus Life']] },
  { title: 'Resources',  links: [['/articles', 'News'], ['/echo', 'Echo'], ['/gallery', 'Gallery'], ['/admissions', 'Admissions']] },
  { title: 'Contact',    text: ['1 Qashqar Street, Fergana', 'info@ferganaschool.uz', '+998 73 000 00 00'] },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A1628' }}>
      <div className="wrap" style={{ padding: '72px 32px 48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/logo.jpg" alt="" style={{ width: 28, height: 28, borderRadius: 4, objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Fergana</div>
                <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Presidential School</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#4A6080', lineHeight: 1.8, maxWidth: 240 }}>
              State-funded boarding school for gifted students aged 11–18. Est. 2020, Fergana, Uzbekistan.
            </p>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, color: '#2E4A68', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links
                  ? col.links.map(([to, label]) => (
                      <Link key={to} to={to}
                        style={{ fontSize: 13, color: '#5A7590', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.target.style.color = '#fff'}
                        onMouseLeave={e => e.target.style.color = '#5A7590'}
                      >{label}</Link>
                    ))
                  : col.text.map(t => (
                      <span key={t} style={{ fontSize: 13, color: '#5A7590' }}>{t}</span>
                    ))
                }
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#2E4A68' }}>© 2025 Fergana Presidential School. All rights reserved.</span>
          <Link to="/admin/login"
            style={{ fontSize: 12, color: '#1E3248' }}
            onMouseEnter={e => e.target.style.color = '#5A7590'}
            onMouseLeave={e => e.target.style.color = '#1E3248'}
          >Admin</Link>
        </div>
      </div>
    </footer>
  )
}
