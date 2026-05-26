import { Link } from 'react-router-dom'
import { articles } from '../data/mock'

export default function Articles() {
  const [featured, ...rest] = articles

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '80px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 56, paddingBottom: 24, borderBottom: '1px solid #E5E3DC' }}>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 52px)', color: '#111', letterSpacing: '-0.01em' }}>
            News & Articles
          </h1>
          <span style={{ fontSize: 13, color: '#bbb' }}>{articles.length} stories</span>
        </div>

        {/* Featured */}
        <Link to={`/articles/${featured.id}`} style={{ display: 'block', marginBottom: 64 }}>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #E5E3DC', backgroundColor: '#fff' }}
            onMouseEnter={e => { e.currentTarget.querySelector('h2').style.color = '#C9A84C' }}
            onMouseLeave={e => { e.currentTarget.querySelector('h2').style.color = '#111' }}
          >
            <img src={featured.cover} alt={featured.title} style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                {featured.category} · Featured
              </span>
              <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#111', letterSpacing: '0em', lineHeight: 1.25, marginBottom: 12, transition: 'color 0.15s' }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7, marginBottom: 24 }}>{featured.excerpt}</p>
              <div style={{ fontSize: 12.5, color: '#bbb' }}>{featured.author} · {featured.date}</div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 40 }}>
          {rest.map(a => (
            <Link key={a.id} to={`/articles/${a.id}`} style={{ display: 'block' }}
              onMouseEnter={e => { e.currentTarget.querySelector('h3').style.color = '#C9A84C' }}
              onMouseLeave={e => { e.currentTarget.querySelector('h3').style.color = '#111' }}
            >
              <img src={a.cover} alt={a.title} style={{ width: '100%', height: 196, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
              <span style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{a.category}</span>
              <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 16, color: '#111', margin: '6px 0 8px', lineHeight: 1.35, letterSpacing: '0em', transition: 'color 0.15s' }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: '#999', lineHeight: 1.65, marginBottom: 12 }}>{a.excerpt}</p>
              <div style={{ fontSize: 12, color: '#bbb' }}>{a.author} · {a.date}</div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
