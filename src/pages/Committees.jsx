import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

export default function Committees() {
  const [committees, setCommittees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('committees')
      .select('id, name, slug, tagline, cover')
      .order('created_at', { ascending: true })
      .then(({ data }) => { setCommittees(data || []); setLoading(false) })
  }, [])

  const [headerRef, headerVis] = useReveal()
  const [cardsRef,  cardsVis]  = useReveal()

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div ref={headerRef} className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...fx(headerVis, 0) }}>
            Student-led groups
          </p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(38px, 5vw, 60px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 14, ...fx(headerVis, 100, 28) }}>
            Committees
          </h1>
          <p style={{ fontSize: 15, color: '#6A6A7A', lineHeight: 1.8, maxWidth: 460, ...fx(headerVis, 200) }}>
            Two student-run groups shaping campus life — from flagship events to sustainability initiatives.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="wrap" style={{ padding: '72px 32px 100px' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[1, 2].map(i => (
              <div key={i}>
                <div style={{ aspectRatio: '16/9', backgroundColor: '#F5F1E8', borderRadius: 2, marginBottom: 24 }} />
                <div style={{ height: 10, backgroundColor: '#F5F1E8', borderRadius: 4, marginBottom: 12, width: '40%' }} />
                <div style={{ height: 24, backgroundColor: '#F5F1E8', borderRadius: 4, marginBottom: 12, width: '70%' }} />
                <div style={{ height: 14, backgroundColor: '#F5F1E8', borderRadius: 4, width: '85%' }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {committees.map((c, i) => (
              <div key={c.id} style={{ ...fx(cardsVis, i * 120) }}>
                {/* Cover */}
                <Link to={`/committees/${c.slug}`} style={{ display: 'block', textDecoration: 'none', marginBottom: 24 }}>
                  <div
                    style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: 2, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
                    onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.04)' }}
                    onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)' }}
                  >
                    {c.cover
                      ? <img src={c.cover} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(.16,1,.3,1)' }} />
                      : <div style={{ width: '100%', height: '100%', backgroundColor: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={32} style={{ color: 'rgba(255,255,255,0.2)' }} /></div>
                    }
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 55%)', pointerEvents: 'none' }} />
                  </div>
                </Link>

                {/* Info */}
                <p style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Committee
                </p>
                <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 28, color: '#0A1628', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 12 }}>
                  {c.name}
                </h2>
                {c.tagline && (
                  <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75, marginBottom: 24 }}>{c.tagline}</p>
                )}
                <Link to={`/committees/${c.slug}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: '#0A1628', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1.5px solid #B8882A', paddingBottom: 3, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#B8882A'}
                  onMouseLeave={e => e.currentTarget.style.color = '#0A1628'}
                >
                  View Committee <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
