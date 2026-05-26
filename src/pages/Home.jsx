import { Link } from 'react-router-dom'
import { Trophy, Users, BookOpen, Globe, ArrowRight } from 'lucide-react'
import { articles } from '../data/mock'

const stats = [
  { icon: Users, value: '500+', label: 'Students enrolled' },
  { icon: Trophy, value: '120+', label: 'Olympiad medals' },
  { icon: BookOpen, value: '14', label: 'Subjects offered' },
  { icon: Globe, value: '100%', label: 'University placement' },
]

const features = [
  { title: 'Cambridge IGCSE', desc: 'Internationally recognised curriculum alongside the Uzbek national programme.' },
  { title: 'STEAM Focus', desc: 'Science, Technology, Engineering, Arts and Mathematics — integrated and hands-on.' },
  { title: 'Free Boarding', desc: 'Full accommodation and meals provided on campus, funded by the state.' },
  { title: 'CIS Accredited', desc: 'Accredited by the Council of International Schools as of April 2025.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(150deg, #152760 0%, #1E3273 50%, #243888 100%)', color: '#fff', padding: '96px 24px 88px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 28 }}>
            <span style={{ fontSize: 12, color: '#D4AA5A', fontWeight: 500, letterSpacing: '0.02em' }}>CIS Accredited · Est. 2020</span>
          </div>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(34px, 5.5vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 22, color: '#fff' }}>
            Fergana Presidential School
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: '#94A8D0', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75, fontWeight: 400 }}>
            Nurturing tomorrow's leaders through world-class education, Cambridge curriculum, and a commitment to excellence.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            <Link to="/admissions" style={{ backgroundColor: '#C9A84C', color: '#111', padding: '13px 28px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 14, letterSpacing: '-0.01em' }}>
              Apply Now
            </Link>
            <Link to="/life" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', padding: '13px 28px', borderRadius: 8, fontWeight: 500, textDecoration: 'none', fontSize: 14, border: '1px solid rgba(255,255,255,0.15)', letterSpacing: '-0.01em' }}>
              Explore campus
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: '#F8F9FC', padding: '56px 24px', borderBottom: '1px solid #EAECF0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={label} style={{ padding: '28px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid #EAECF0' : 'none' }}>
              <Icon size={20} style={{ color: '#1E3273', margin: '0 auto 10px', opacity: 0.7 }} />
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 30, color: '#111827', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 12.5, color: '#6B7280', marginTop: 6, letterSpacing: '0.01em' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Why choose us</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 30px)', color: '#111827', letterSpacing: '-0.025em', marginBottom: 12 }}>Built for excellence</h2>
            <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>A unique environment designed to push gifted students to their full potential.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {features.map(({ title, desc }) => (
              <div key={title} style={{ backgroundColor: '#F8F9FC', borderRadius: 14, padding: '28px 26px', border: '1px solid #EAECF0' }}>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', letterSpacing: '-0.015em', marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section style={{ backgroundColor: '#F8F9FC', borderTop: '1px solid #EAECF0', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8 }}>From the school</p>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 26px)', color: '#111827', letterSpacing: '-0.02em' }}>Latest news</h2>
            </div>
            <Link to="/articles" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#1E3273', textDecoration: 'none', fontWeight: 500, fontSize: 13.5, letterSpacing: '-0.01em' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {articles.map(a => (
              <Link key={a.id} to={`/articles/${a.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #EAECF0', transition: 'box-shadow 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <img src={a.cover} alt={a.title} style={{ width: '100%', height: 168, objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '18px 20px 22px' }}>
                    <span style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{a.category}</span>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', margin: '7px 0 8px', lineHeight: 1.4, letterSpacing: '-0.01em' }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{a.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 14 }}>Admissions open</p>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: '#111827', letterSpacing: '-0.025em', marginBottom: 16, lineHeight: 1.2 }}>Ready to join?</h2>
          <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 36, lineHeight: 1.75 }}>
            Applications are open for gifted students aged 11–18. Take the admissions test and begin your journey.
          </p>
          <Link to="/admissions" style={{ backgroundColor: '#1E3273', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 14, letterSpacing: '-0.01em' }}>
            Start your application →
          </Link>
        </div>
      </section>
    </div>
  )
}
