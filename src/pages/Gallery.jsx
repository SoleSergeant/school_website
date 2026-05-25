import { galleryItems } from '../data/mock'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ padding: '56px 16px', maxWidth: 1100, margin: '0 auto' }}>
      <div className="text-center mb-12">
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 36, color: '#1E3273', marginBottom: 12 }}>Gallery</h1>
        <p style={{ color: '#64748B', fontSize: 16 }}>Moments from campus life, events, and competitions.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            style={{ borderRadius: 14, overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}
            onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.05)' }}
            onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)' }}
          >
            <img
              src={item.url}
              alt={item.caption}
              style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '24px 12px 12px', color: '#fff', fontSize: 13, fontWeight: 500 }}>
              {item.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
          >
            <X size={20} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 860, width: '100%' }}>
            <img src={selected.url} alt={selected.caption} style={{ width: '100%', borderRadius: 16, maxHeight: '80vh', objectFit: 'contain' }} />
            <p style={{ textAlign: 'center', color: '#fff', marginTop: 16, fontSize: 15 }}>{selected.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}
