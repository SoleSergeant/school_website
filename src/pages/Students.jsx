import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useReveal, fx } from '../hooks/useReveal'
const D = "'Cormorant Garamond', Georgia, serif"

function LinkedInIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function TelegramIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    supabase
      .from('students')
      .select('id, name, grade, achievement, photo, linkedin_url, telegram_url')
      .order('created_at', { ascending: true })
      .then(({ data }) => { setStudents(data || []); setLoading(false) })
  }, [])

  const [headerRef, headerVis] = useReveal()
  const [bannerRef, bannerVis] = useReveal()

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Dark header */}
      <section style={{ backgroundColor: '#0A1628', padding: '64px 0 60px' }}>
        <div ref={headerRef} className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18, ...fx(headerVis, 0) }}>Recognition</p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(40px, 5.5vw, 68px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.02, marginBottom: 18, maxWidth: 560, ...fx(headerVis, 120, 28) }}>
            Student Achievements.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.8, maxWidth: 440, ...fx(headerVis, 240) }}>
            Celebrating outstanding results at national and international competitions.
          </p>
        </div>
      </section>

      {/* Placement banner */}
      <section style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '28px 0' }}>
        <div ref={bannerRef} className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 20, ...fx(bannerVis, 0) }}>
          <span style={{ fontFamily: D, fontWeight: 600, fontSize: 34, color: '#0A1628', letterSpacing: '-0.01em' }}>100%</span>
          <div style={{ width: 1, height: 36, backgroundColor: '#DDD' }} />
          <div>
            <div style={{ fontSize: 13.5, color: '#0A1628', fontWeight: 600, marginBottom: 1 }}>University Placement</div>
            <div style={{ fontSize: 13, color: '#888' }}>Every graduate secures a place at a top national or international university</div>
          </div>
        </div>
      </section>

      {/* Students grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          {loading ? (
            /* skeleton — always 3 columns */
            <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff', border: '1px solid #E5DFCF', overflow: 'hidden' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={{ backgroundColor: '#fff', padding: '32px 28px', flex: '0 0 calc(100% / 3)', boxSizing: 'border-box', borderRight: '1px solid #E5DFCF', borderBottom: '1px solid #E5DFCF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#F5F1E8', flexShrink: 0 }} />
                    <div>
                      <div style={{ height: 14, backgroundColor: '#F5F1E8', borderRadius: 4, marginBottom: 6, width: 120 }} />
                      <div style={{ height: 11, backgroundColor: '#F5F1E8', borderRadius: 4, width: 60 }} />
                    </div>
                  </div>
                  <div style={{ width: 24, height: 1.5, backgroundColor: '#E5DFCF', marginBottom: 12 }} />
                  <div style={{ height: 13, backgroundColor: '#F5F1E8', borderRadius: 4, marginBottom: 6, width: '90%' }} />
                  <div style={{ height: 13, backgroundColor: '#F5F1E8', borderRadius: 4, width: '70%' }} />
                </div>
              ))}
            </div>
          ) : (
            /* real data — flexbox so last row centres automatically */
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: '#fff', border: '1px solid #E5DFCF', overflow: 'hidden' }}>
              {students.map(s => (
                <div key={s.id} style={{ backgroundColor: '#fff', padding: '32px 28px', flex: '0 0 calc(100% / 3)', boxSizing: 'border-box', borderRight: '1px solid #E5DFCF', borderBottom: '1px solid #E5DFCF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <img src={s.photo || `https://i.pravatar.cc/80?u=s${s.id}`} alt={s.name}
                      style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 2 }}>{s.name}</div>
                      <div style={{ fontSize: 11.5, color: '#AAA' }}>{s.grade ? `Grade ${s.grade}` : ''}</div>
                    </div>
                  </div>
                  <div style={{ width: 24, height: 1.5, backgroundColor: '#B8882A', marginBottom: 12 }} />
                  <p style={{ fontSize: 13.5, color: '#B8882A', lineHeight: 1.65, fontWeight: 500, marginBottom: (s.linkedin_url || s.telegram_url) ? 16 : 0 }}>
                    {s.achievement}
                  </p>
                  {(s.linkedin_url || s.telegram_url) && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {s.linkedin_url && (
                        <a href={s.linkedin_url} target="_blank" rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#0A1628', textDecoration: 'none', padding: '5px 11px', border: '1.5px solid #E5DFCF', borderRadius: 4, transition: 'border-color 0.2s, color 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#0077B5'; e.currentTarget.style.color = '#0077B5' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5DFCF'; e.currentTarget.style.color = '#0A1628' }}
                        >
                          <LinkedInIcon size={12} /> LinkedIn
                        </a>
                      )}
                      {s.telegram_url && (
                        <a href={s.telegram_url} target="_blank" rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#0A1628', textDecoration: 'none', padding: '5px 11px', border: '1.5px solid #E5DFCF', borderRadius: 4, transition: 'border-color 0.2s, color 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#229ED9'; e.currentTarget.style.color = '#229ED9' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5DFCF'; e.currentTarget.style.color = '#0A1628' }}
                        >
                          <TelegramIcon size={12} /> Telegram
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
