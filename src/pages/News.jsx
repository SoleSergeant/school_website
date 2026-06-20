import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

export default function News() {
  const [news,    setNews]    = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('school_news')
      .select('id, title, image_url, content, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setNews(data || []); setLoading(false) })
  }, [])

  const [headerRef, headerVis] = useReveal()
  const [listRef,   listVis]   = useReveal()

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div ref={headerRef} className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...fx(headerVis, 0) }}>
            Latest updates
          </p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(38px, 5vw, 60px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 14, ...fx(headerVis, 100, 28) }}>
            School News
          </h1>
          <p style={{ fontSize: 15, color: '#6A6A7A', lineHeight: 1.8, maxWidth: 440, ...fx(headerVis, 200) }}>
            Stay up to date with the latest events, achievements, and announcements from Fergana Presidential School.
          </p>
        </div>
      </div>

      {/* News list */}
      <div ref={listRef} className="wrap" style={{ padding: '64px 32px 100px' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, paddingBottom: 40, borderBottom: '1px solid #EDE8DC' }}>
                <div style={{ aspectRatio: '16/9', backgroundColor: '#F5F1E8', borderRadius: 2 }} />
                <div style={{ paddingTop: 8 }}>
                  <div style={{ height: 10, backgroundColor: '#F5F1E8', borderRadius: 4, width: '30%', marginBottom: 16 }} />
                  <div style={{ height: 24, backgroundColor: '#F5F1E8', borderRadius: 4, width: '75%', marginBottom: 14 }} />
                  <div style={{ height: 14, backgroundColor: '#F5F1E8', borderRadius: 4, width: '90%', marginBottom: 8 }} />
                  <div style={{ height: 14, backgroundColor: '#F5F1E8', borderRadius: 4, width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 15, color: '#CCC' }}>No news posted yet. Check back soon.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {news.map((item, i) => {
              const date = new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
              return (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: item.image_url ? '320px 1fr' : '1fr', gap: 40, padding: '48px 0', borderBottom: '1px solid #EDE8DC', ...fx(listVis, i * 70) }}>
                  {item.image_url && (
                    <div style={{ overflow: 'hidden', borderRadius: 2 }}>
                      <img src={item.image_url} alt={item.title}
                        style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                  <div style={{ alignSelf: 'center' }}>
                    <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>{date}</p>
                    <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 16 }}>{item.title}</h2>
                    {item.content && (
                      <p style={{ fontSize: 15, color: '#555', lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>{item.content}</p>
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
