import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { articles } from '../data/mock'

export default function Articles() {
  return (
    <div style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>From the school</p>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#111827', letterSpacing: '-0.025em', marginBottom: 12 }}>News & Articles</h1>
        <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>Stories, announcements, and updates from Fergana Presidential School.</p>
      </div>

      {/* Featured article */}
      <Link to={`/articles/${articles[0].id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 40 }}>
        <div
          style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #EAECF0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', transition: 'box-shadow 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          <img src={articles[0].cover} alt={articles[0].title} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{articles[0].category}</span>
              <span style={{ fontSize: 10.5, color: '#D1D5DB', fontWeight: 400 }}>·</span>
              <span style={{ fontSize: 10.5, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Featured</span>
            </div>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(18px, 2vw, 22px)', color: '#111827', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: 10 }}>{articles[0].title}</h2>
            <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{articles[0].excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12.5, color: '#9CA3AF' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><User size={12} /> {articles[0].author}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={12} /> {articles[0].date}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(1).map(a => (
          <Link key={a.id} to={`/articles/${a.id}`} style={{ textDecoration: 'none' }}>
            <div
              style={{ backgroundColor: '#fff', border: '1px solid #EAECF0', borderRadius: 14, overflow: 'hidden', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <img src={a.cover} alt={a.title} style={{ width: '100%', height: 188, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '18px 20px 22px' }}>
                <span style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{a.category}</span>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15.5, color: '#111827', margin: '7px 0 8px', lineHeight: 1.4, letterSpacing: '-0.01em' }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, marginBottom: 14 }}>{a.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#9CA3AF' }}>
                  <span>{a.author}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
