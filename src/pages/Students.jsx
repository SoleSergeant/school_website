import { students } from '../data/mock'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

export default function Students() {
  const [headerRef,  headerVis]  = useReveal()
  const [bannerRef,  bannerVis]  = useReveal()
  const [gridRef,    gridVis]    = useReveal()

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
        <div ref={gridRef} className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, backgroundColor: '#E5DFCF', border: '1px solid #E5DFCF', overflow: 'hidden' }}>
            {students.map((s, i) => (
              <div key={s.id} style={{ backgroundColor: '#fff', padding: '32px 28px', ...fx(gridVis, i * 50) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <img src={s.photo || `https://i.pravatar.cc/80?u=s${s.id}`} alt={s.name}
                    style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 2 }}>{s.name}</div>
                    <div style={{ fontSize: 11.5, color: '#AAA' }}>Grade {s.grade}</div>
                  </div>
                </div>
                <div style={{ width: 24, height: 1.5, backgroundColor: '#B8882A', marginBottom: 12 }} />
                <p style={{ fontSize: 13.5, color: '#444', lineHeight: 1.65, fontWeight: 500 }}>{s.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
