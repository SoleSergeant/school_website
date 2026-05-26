import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { articles } from '../data/mock'

const stats = [
  { value: '500+', label: 'Students enrolled' },
  { value: '120+', label: 'Olympiad medals' },
  { value: '14', label: 'Subjects offered' },
  { value: '100%', label: 'University placement' },
]

const features = [
  { n: '01', title: 'Cambridge IGCSE', desc: 'Internationally recognised curriculum alongside the Uzbek national programme.' },
  { n: '02', title: 'STEAM Focus', desc: 'Science, Technology, Engineering, Arts and Mathematics — integrated and hands-on.' },
  { n: '03', title: 'Free Boarding', desc: 'Full accommodation and meals provided on campus, funded by the state.' },
  { n: '04', title: 'CIS Accredited', desc: 'Accredited by the Council of International Schools as of April 2025.' },
]

export default function Home() {
  return (
    <div>

      {/* ── Hero ── */}
      <section style={{ backgroundColor: '#0D1B36', padding: '108px 24px 96px' }}>
        <div className="wrap">
          <p style={{ fontSize: 11, color: '#3D5270', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 36 }}>
            Est. 2020 · CIS Accredited · Fergana, Uzbekistan
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800,
            fontSize: 'clamp(44px, 7vw, 80px)',
            color: '#fff', lineHeight: 1.02,
            letterSpacing: '-0.02em', marginBottom: 28,
            maxWidth: 740,
          }}>
            Where gifted minds<br />find their calling.
          </h1>
          <p style={{ fontSize: 16, color: '#7A90A8', lineHeight: 1.8, maxWidth: 460, marginBottom: 48 }}>
            Cambridge IGCSE meets Uzbekistan's national programme — giving exceptional students aged 11–18 a path to the world's finest universities.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/admissions" style={{ backgroundColor: '#C9A84C', color: '#0D1B36', padding: '12px 26px', borderRadius: 7, fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>
              Apply Now
            </Link>
            <Link to="/life" style={{ color: '#7A90A8', padding: '12px 26px', borderRadius: 7, fontWeight: 400, fontSize: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
              Campus life →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5E3DC' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{ padding: '36px 24px', borderRight: i < 3 ? '1px solid #E5E3DC' : 'none' }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 38, color: '#111', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12.5, color: '#999', marginTop: 7 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features — editorial two-col ── */}
      <section style={{ backgroundColor: '#FAFAF8', padding: '104px 24px' }}>
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '80px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 52px)', color: '#111', letterSpacing: '-0.01em', lineHeight: 1.08, marginBottom: 20 }}>
                Built for<br />excellence.
              </h2>
              <p style={{ fontSize: 15, color: '#777', lineHeight: 1.8, maxWidth: 360 }}>
                A unique environment designed to push gifted students to their full potential — academically, creatively, and personally.
              </p>
            </div>
            <div>
              {features.map(({ n, title, desc }, i) => (
                <div key={n} style={{ display: 'flex', gap: 20, paddingBottom: 28, marginBottom: 28, borderBottom: i < features.length - 1 ? '1px solid #E5E3DC' : 'none' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, color: '#C9A84C', letterSpacing: '0.06em', paddingTop: 3, flexShrink: 0, minWidth: 20 }}>{n}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: 15.5, color: '#111', letterSpacing: '0em', marginBottom: 5 }}>{title}</h3>
                    <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E3DC', padding: '104px 24px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48, paddingBottom: 20, borderBottom: '1px solid #E5E3DC' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', color: '#111', letterSpacing: '0em' }}>
              Latest news
            </h2>
            <Link to="/articles" style={{ fontSize: 13, color: '#999', display: 'flex', alignItems: 'center', gap: 4 }}>
              All articles <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 36 }}>
            {articles.map(a => (
              <Link key={a.id} to={`/articles/${a.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  onMouseEnter={e => e.currentTarget.querySelector('h3').style.color = '#C9A84C'}
                  onMouseLeave={e => e.currentTarget.querySelector('h3').style.color = '#111'}
                >
                  <img src={a.cover} alt={a.title} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
                  <span style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{a.category}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: 16, color: '#111', margin: '6px 0 8px', lineHeight: 1.35, letterSpacing: '0em', transition: 'color 0.15s' }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: '#999', lineHeight: 1.65 }}>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: '#0D1B36', padding: '100px 24px' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
          <div>
            <p style={{ fontSize: 11, color: '#3D5270', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 18 }}>Admissions open</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(30px, 4.5vw, 52px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 12 }}>
              Ready to begin<br />your journey?
            </h2>
            <p style={{ fontSize: 15, color: '#7A90A8', lineHeight: 1.7 }}>For gifted students aged 11–18. Applications are free.</p>
          </div>
          <Link to="/admissions" style={{ backgroundColor: '#C9A84C', color: '#0D1B36', padding: '14px 30px', borderRadius: 7, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
            Start your application
          </Link>
        </div>
      </section>

    </div>
  )
}
