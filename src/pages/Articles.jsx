import { Link } from 'react-router-dom'
import { BookOpen, Download } from 'lucide-react'
import { articles } from '../data/mock'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

// Extract Google Drive file ID and build download URL
function getGDriveDownload(url) {
  if (!url) return null
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`
  return url
}

export default function Articles() {
  const [headerRef, headerVis] = useReveal()
  const [gridRef,   gridVis]   = useReveal()

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div ref={headerRef} className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...fx(headerVis, 0) }}>
            From our writers
          </p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(38px, 5vw, 60px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 14, ...fx(headerVis, 100, 28) }}>
            Magazine
          </h1>
          <p style={{ fontSize: 15, color: '#6A6A7A', lineHeight: 1.8, maxWidth: 440, ...fx(headerVis, 200) }}>
            A student-written publication covering school life, science, culture, and achievements — published monthly.
          </p>
        </div>
      </div>

      {/* ── Issues grid ── */}
      <div className="wrap" style={{ padding: '72px 32px 100px' }}>
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 48px' }}>
          {articles.map((a, i) => {
            const downloadUrl = getGDriveDownload(a.pdf_url)
            return (
              <div key={a.id} style={fx(gridVis, i * 80)}>

                {/* ── Cover ── */}
                <Link to={`/magazine/${a.id}`} style={{ display: 'block', textDecoration: 'none', marginBottom: 20 }}>
                  <div style={{
                    position: 'relative',
                    aspectRatio: '3 / 4',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
                    borderRadius: 2,
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'
                      e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.26), 0 4px 12px rgba(0,0,0,0.12)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)'
                    }}
                    style={{
                      position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
                      borderRadius: 2, transition: 'box-shadow 0.4s ease',
                    }}
                  >
                    <img
                      src={a.cover}
                      alt={a.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(.16,1,.3,1)' }}
                    />
                    {/* Spine shadow for magazine feel */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 6, height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.25), transparent)', pointerEvents: 'none' }} />
                    {/* Read overlay on hover */}
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10,22,40,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(10,22,40,0.45)'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(10,22,40,0)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0, transition: 'opacity 0.3s', padding: '10px 20px', border: '1.5px solid rgba(255,255,255,0.7)', borderRadius: 2 }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                      >
                        <BookOpen size={13} /> Read Now
                      </div>
                    </div>
                  </div>
                </Link>

                {/* ── Info ── */}
                <div>
                  <span style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {a.issue_number || a.date}
                  </span>
                  <h3 style={{ fontFamily: D, fontWeight: 600, fontSize: 22, color: '#0A1628', margin: '7px 0 10px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p style={{ fontSize: 13.5, color: '#888', lineHeight: 1.7, marginBottom: 18 }}>{a.excerpt}</p>
                  )}

                  {/* ── Buttons ── */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link
                      to={`/magazine/${a.id}`}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#0A1628', color: '#fff', padding: '11px 0', borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a2d4a'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0A1628'}
                    >
                      <BookOpen size={12} /> Read Now
                    </Link>
                    {downloadUrl && (
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', border: '1.5px solid #E5DFCF', borderRadius: 2, color: '#777', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8882A'; e.currentTarget.style.color = '#B8882A' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5DFCF'; e.currentTarget.style.color = '#777' }}
                      >
                        <Download size={12} /> PDF
                      </a>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
