import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Download } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

function getGDriveDownload(url) {
  if (!url) return null
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`
  return url
}

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, excerpt, cover, category, issue_number, pdf_url, date, author')
      .eq('published', true)
      .order('date', { ascending: false, nullsFirst: false })
      .then(({ data }) => { setArticles(data || []); setLoading(false) })
  }, [])

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

        {/* ref always mounted so IntersectionObserver fires even with async data */}
        <div ref={gridRef}>

          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 48px' }}>
              {[1, 2, 3].map(i => (
                <div key={i}>
                  <div style={{ aspectRatio: '3/4', backgroundColor: '#F5F1E8', borderRadius: 2, marginBottom: 20 }} />
                  <div style={{ height: 10, backgroundColor: '#F5F1E8', borderRadius: 4, marginBottom: 10, width: '60%' }} />
                  <div style={{ height: 20, backgroundColor: '#F5F1E8', borderRadius: 4, marginBottom: 16, width: '85%' }} />
                  <div style={{ height: 40, backgroundColor: '#F5F1E8', borderRadius: 2 }} />
                </div>
              ))}
            </div>
          )}

          {!loading && articles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <BookOpen size={36} style={{ color: '#DDD', margin: '0 auto 16px', display: 'block' }} />
              <p style={{ fontSize: 15, color: '#AAA' }}>No issues published yet. Check back soon.</p>
            </div>
          )}

          {!loading && articles.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 48px' }}>
              {articles.map((a, i) => {
                const downloadUrl = getGDriveDownload(a.pdf_url)
                return (
                  <div key={a.id} style={fx(gridVis, i * 80)}>

                  {/* Cover */}
                  <Link to={`/magazine/${a.id}`} style={{ display: 'block', textDecoration: 'none', marginBottom: 20 }}>
                    <div
                      style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)', borderRadius: 2, transition: 'box-shadow 0.4s ease' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.26), 0 4px 12px rgba(0,0,0,0.12)'
                        const img = e.currentTarget.querySelector('img')
                        if (img) img.style.transform = 'scale(1.04)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)'
                        const img = e.currentTarget.querySelector('img')
                        if (img) img.style.transform = 'scale(1)'
                      }}
                    >
                      {a.cover
                        ? <img src={a.cover} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(.16,1,.3,1)' }} />
                        : <div style={{ width: '100%', height: '100%', backgroundColor: '#F5F1E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={32} style={{ color: '#CCC' }} /></div>
                      }
                      {/* Spine shadow */}
                      <div style={{ position: 'absolute', top: 0, left: 0, width: 6, height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.22), transparent)', pointerEvents: 'none' }} />
                    </div>
                  </Link>

                  {/* Info */}
                  <span style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {a.issue_number || (a.date ? new Date(a.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : a.category)}
                  </span>
                  <h3 style={{ fontFamily: D, fontWeight: 600, fontSize: 22, color: '#0A1628', margin: '7px 0 10px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p style={{ fontSize: 13.5, color: '#888', lineHeight: 1.7, marginBottom: 18 }}>{a.excerpt}</p>
                  )}

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link to={`/magazine/${a.id}`}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#0A1628', color: '#fff', padding: '11px 0', borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a2d4a'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0A1628'}
                    >
                      <BookOpen size={12} /> Read Now
                    </Link>
                    {downloadUrl && (
                      <a href={downloadUrl} target="_blank" rel="noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', border: '1.5px solid #E5DFCF', borderRadius: 2, color: '#777', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#B8882A'; e.currentTarget.style.color = '#B8882A' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5DFCF'; e.currentTarget.style.color = '#777' }}
                      >
                        <Download size={12} /> PDF
                      </a>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
