import { galleryItems } from '../data/mock'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ padding: '80px 24px', maxWidth: 1060, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Visual stories</p>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#111827', letterSpacing: '-0.025em', marginBottom: 12 }}>Gallery</h1>
        <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>Moments from campus life, events, and competitions.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {galleryItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative', border: '1px solid #EAECF0' }}
            onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}
          >
            <img
              src={item.url}
              alt={item.caption}
              style={{ width: '100%', height: 192, objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.55))', padding: '28px 12px 10px', color: '#fff', fontSize: 12.5, fontWeight: 500 }}>
              {item.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
          >
            <X size={18} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 820, width: '100%' }}>
            <img src={selected.url} alt={selected.caption} style={{ width: '100%', borderRadius: 14, maxHeight: '80vh', objectFit: 'contain', display: 'block' }} />
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: 14, fontSize: 14 }}>{selected.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}
