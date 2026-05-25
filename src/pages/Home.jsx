import { Link } from 'react-router-dom'
import { Trophy, Users, BookOpen, Globe, ArrowRight, Star } from 'lucide-react'
import { articles } from '../data/mock'

const stats = [
  { icon: Users, value: '500+', label: 'Students' },
  { icon: Trophy, value: '120+', label: 'Olympiad Medals' },
  { icon: BookOpen, value: '14', label: 'Subjects' },
  { icon: Globe, value: '100%', label: 'University Placement' },
]

const features = [
  { title: 'Cambridge IGCSE', desc: 'Internationally recognized curriculum taught alongside the Uzbek national program.' },
  { title: 'STEAM Focus', desc: 'Science, Technology, Engineering, Arts and Mathematics — integrated and hands-on.' },
  { title: 'Free Boarding', desc: 'All students live on campus with full accommodation and meals provided by the state.' },
  { title: 'CIS Accredited', desc: 'Fully accredited by the Council of International Schools as of April 2025.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1E3273 0%, #2B4099 60%, #1E3273 100%)', color: '#fff', padding: '80px 16px' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: '#E2C46E', fontWeight: 500 }}>🎓 CIS Accredited · Est. 2020</span>
          </div>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1.15, marginBottom: 20, color: '#fff' }}>
            Fergana Presidential School
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: '#CBD5E1', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Nurturing tomorrow's leaders through world-class education, Cambridge curriculum, and a commitment to excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/admissions" style={{ backgroundColor: '#C9A84C', color: '#111B4A', padding: '14px 28px', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
              Apply Now
            </Link>
            <Link to="/about" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: 15, border: '1px solid rgba(255,255,255,0.2)' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: '#F4F6FB', padding: '48px 16px' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '28px 20px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <Icon size={28} style={{ color: '#1E3273', margin: '0 auto 12px' }} />
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 32, color: '#1E3273' }}>{value}</div>
              <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '64px 16px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 32, color: '#1E3273', marginBottom: 12 }}>Why Fergana Presidential School?</h2>
            <p style={{ color: '#64748B', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>A unique environment designed to push gifted students to their full potential.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(({ title, desc }) => (
              <div key={title} style={{ backgroundColor: '#F4F6FB', borderRadius: 16, padding: '28px 24px', borderLeft: '4px solid #1E3273' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} style={{ color: '#C9A84C' }} />
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: '#1E3273' }}>{title}</h3>
                </div>
                <p style={{ color: '#4B5563', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section style={{ backgroundColor: '#F4F6FB', padding: '64px 16px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273' }}>Latest News</h2>
            <Link to="/articles" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1E3273', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map(a => (
              <Link key={a.id} to={`/articles/${a.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <img src={a.cover} alt={a.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  <div style={{ padding: '20px 20px 24px' }}>
                    <span style={{ fontSize: 12, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{a.category}</span>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', margin: '8px 0 8px', lineHeight: 1.4 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{a.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 16px', textAlign: 'center' }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 32, color: '#1E3273', marginBottom: 16 }}>Ready to Join?</h2>
          <p style={{ color: '#64748B', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
            Applications are open for gifted students aged 11–18. Take the admissions test and begin your journey at Fergana Presidential School.
          </p>
          <Link to="/admissions" style={{ backgroundColor: '#1E3273', color: '#fff', padding: '16px 36px', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Start Your Application →
          </Link>
        </div>
      </section>
    </div>
  )
}
