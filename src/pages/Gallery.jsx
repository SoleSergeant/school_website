import { galleryItems } from '../data/mock'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

export default function Gallery() {
  const [idx, setIdx] = useState(null)
  const prev = () => setIdx(i => (i - 1 + galleryItems.length) % galleryItems.length)
  const next = () => setIdx(i => (i + 1) % galleryItems.length)

  const [headerRef, headerVis] = useReveal()
  const [gridRef,   gridVis]   = useReveal()

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div ref={headerRef} className="wrap" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...fx(headerVis, 0) }}>Visual archive</p>
            <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(38px, 5vw, 60px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, ...fx(headerVis, 100, 28) }}>
              Gallery
            </h1>
          </div>
          <span style={{ fontSize: 13, color: '#AAA', paddingBottom: 4, ...fx(headerVis, 180) }}>{galleryItems.length} photos</span>
        </div>
      </div>

      {/* Grid */}
      <div className="wrap" style={{ padding: '56px 32px 100px' }}>
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
          {galleryItems.map((item, i) => (
            <div key={item.id} onClick={() => setIdx(i)}
              style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', aspectRatio: '1', ...fx(gridVis, i * 30) }}>
              <img src={item.url} alt={item.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {idx !== null && (
        <div onClick={() => setIdx(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}>
          <button onClick={() => setIdx(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
          <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 24, background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 46, height: 46, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={22} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: '100%' }}>
            <img src={galleryItems[idx].url} alt={galleryItems[idx].caption} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block' }} />
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', marginTop: 16, fontSize: 13 }}>
              {galleryItems[idx].caption}
              <span style={{ marginLeft: 10, color: 'rgba(255,255,255,0.22)' }}>{idx + 1} / {galleryItems.length}</span>
            </p>
          </div>
          <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 24, background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%', width: 46, height: 46, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  )
}
