import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { articles } from '../data/mock'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

export default function Articles() {
  const [featured, ...rest] = articles

  const [headerRef,   headerVis]   = useReveal()
  const [featuredRef, featuredVis] = useReveal()
  const [gridRef,     gridVis]     = useReveal()

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div ref={headerRef} className="wrap" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...fx(headerVis, 0) }}>From the school</p>
            <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(38px, 5vw, 60px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, ...fx(headerVis, 100, 28) }}>
              News & Articles
            </h1>
          </div>
          <span style={{ fontSize: 13, color: '#AAA', paddingBottom: 4, ...fx(headerVis, 180) }}>{articles.length} stories</span>
        </div>
      </div>

      <div className="wrap" style={{ padding: '72px 32px 100px' }}>

        {/* Featured */}
        <div ref={featuredRef} style={fx(featuredVis, 0)}>
          <Link to={`/articles/${featured.id}`} style={{ display: 'block', textDecoration: 'none', marginBottom: 72 }}
            onMouseEnter={e => { const h = e.currentTarget.querySelector('[data-h]'); if (h) h.style.color = '#B8882A' }}
            onMouseLeave={e => { const h = e.currentTarget.querySelector('[data-h]'); if (h) h.style.color = '#0A1628' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #E5DFCF', overflow: 'hidden' }}>
              <div style={{ overflow: 'hidden' }}>
                <img src={featured.cover} alt={featured.title}
                  style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FAFAF8' }}>
                <span style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
                  {featured.category} · Featured
                </span>
                <h2 data-h style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 14, transition: 'color 0.15s' }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75, marginBottom: 24 }}>{featured.excerpt}</p>
                <div style={{ fontSize: 12.5, color: '#BBB' }}>{featured.author} · {featured.date}</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: '#E5DFCF' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#CCC', letterSpacing: '0.12em', textTransform: 'uppercase' }}>More stories</span>
          <div style={{ flex: 1, height: 1, backgroundColor: '#E5DFCF' }} />
        </div>

        {/* Grid */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          {rest.map((a, i) => (
            <Link key={a.id} to={`/articles/${a.id}`} style={{ display: 'block', textDecoration: 'none', ...fx(gridVis, i * 70) }}
              onMouseEnter={e => { const h = e.currentTarget.querySelector('[data-h]'); if (h) h.style.color = '#B8882A' }}
              onMouseLeave={e => { const h = e.currentTarget.querySelector('[data-h]'); if (h) h.style.color = '#0A1628' }}
            >
              <div style={{ overflow: 'hidden', marginBottom: 18 }}>
                <img src={a.cover} alt={a.title} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <span style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{a.category}</span>
              <h3 data-h style={{ fontSize: 17, fontWeight: 600, color: '#0A1628', margin: '7px 0 10px', lineHeight: 1.4, letterSpacing: '-0.01em', transition: 'color 0.15s' }}>{a.title}</h3>
              <p style={{ fontSize: 13.5, color: '#888', lineHeight: 1.72, marginBottom: 12 }}>{a.excerpt}</p>
              <div style={{ fontSize: 12, color: '#CCC' }}>{a.author} · {a.date}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
