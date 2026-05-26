import { galleryItems } from '../data/mock'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Gallery() {
  const [idx, setIdx] = useState(null)

  const prev = () => setIdx(i => (i - 1 + galleryItems.length) % galleryItems.length)
  const next = () => setIdx(i => (i + 1) % galleryItems.length)

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '80px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid #E5E3DC' }}>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(32px, 4.5vw, 52px)', color: '#111', letterSpacing: '-0.01em' }}>
            Gallery
          </h1>
          <span style={{ fontSize: 13, color: '#bbb' }}>{galleryItems.length} photos</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ gap: 8 }}>
          {galleryItems.map((item, i) => (
            <div key={item.id} onClick={() => setIdx(i)} style={{ position: 'relative', cursor: 'pointer', borderRadius: 8, overflow: 'hidden', aspectRatio: '1' }}>
              <img
                src={item.url}
                alt={item.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {idx !== null && (
        <div
          onClick={() => setIdx(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}
        >
          {/* Close */}
          <button onClick={() => setIdx(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); prev() }} style={{ position: 'absolute', left: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={22} />
          </button>
          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 880, width: '100%' }}>
            <img src={galleryItems[idx].url} alt={galleryItems[idx].caption} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 10, display: 'block' }} />
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: 14, fontSize: 13 }}>
              {galleryItems[idx].caption} <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.25)' }}>{idx + 1} / {galleryItems.length}</span>
            </p>
          </div>
          {/* Next */}
          <button onClick={e => { e.stopPropagation(); next() }} style={{ position: 'absolute', right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  )
}
