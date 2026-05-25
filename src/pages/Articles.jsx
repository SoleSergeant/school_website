import { Link } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'
import { articles } from '../data/mock'

export default function Articles() {
  return (
    <div style={{ padding: '56px 16px', maxWidth: 1100, margin: '0 auto' }}>
      <div className="text-center mb-12">
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 36, color: '#1E3273', marginBottom: 12 }}>Articles & News</h1>
        <p style={{ color: '#64748B', fontSize: 16 }}>Stay updated with the latest news and stories from our school.</p>
      </div>

      {/* Featured */}
      <Link to={`/articles/${articles[0].id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
        <div style={{ borderRadius: 20, overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
          className="flex-col md:grid"
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          <img src={articles[0].cover} alt={articles[0].title} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
          <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{articles[0].category} · Featured</span>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 24, color: '#111827', marginBottom: 12, lineHeight: 1.35 }}>{articles[0].title}</h2>
            <p style={{ color: '#64748B', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{articles[0].excerpt}</p>
            <div className="flex items-center gap-4" style={{ fontSize: 13, color: '#94A3B8' }}>
              <span className="flex items-center gap-1"><User size={13} /> {articles[0].author}</span>
              <span className="flex items-center gap-1"><Calendar size={13} /> {articles[0].date}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(1).map(a => (
          <Link key={a.id} to={`/articles/${a.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <img src={a.cover} alt={a.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: '20px 20px 24px' }}>
                <span style={{ fontSize: 11, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{a.category}</span>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: '#111827', margin: '8px 0 10px', lineHeight: 1.4 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 16 }}>{a.excerpt}</p>
                <div className="flex items-center gap-3" style={{ fontSize: 12, color: '#94A3B8' }}>
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
