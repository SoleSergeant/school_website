import { Trophy, Medal } from 'lucide-react'
import { students } from '../data/mock'

export default function Students() {
  return (
    <div>
      {/* Banner */}
      <section style={{ background: 'linear-gradient(150deg, #152760 0%, #1E3273 50%, #243888 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AA5A', marginBottom: 10 }}>Recognition</p>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>Student Achievements</h1>
          <p style={{ fontSize: 15, color: '#94A8D0', maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
            Celebrating the outstanding accomplishments of our students at national and international competitions.
          </p>
        </div>
      </section>

      {/* 100% placement callout */}
      <section style={{ backgroundColor: '#F8F9FC', borderBottom: '1px solid #EAECF0', padding: '32px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Trophy size={28} style={{ color: '#C9A84C', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', letterSpacing: '-0.01em', marginBottom: 2 }}>100% University Placement</div>
            <div style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.6 }}>Every graduate secures a place at a top national or international university.</div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {students.map(s => (
              <div key={s.id} style={{ backgroundColor: '#F8F9FC', border: '1px solid #EAECF0', borderRadius: 14, padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={s.photo} alt={s.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #E2E8F0', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', letterSpacing: '-0.01em' }}>{s.name}</div>
                    <div style={{ fontSize: 12.5, color: '#9CA3AF', marginTop: 1 }}>Grade {s.grade}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, backgroundColor: '#fff', border: '1px solid #EAECF0', borderRadius: 10, padding: '12px 14px' }}>
                  <Medal size={16} style={{ color: '#C9A84C', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13.5, color: '#1E3273', fontWeight: 600, lineHeight: 1.55, letterSpacing: '-0.01em' }}>{s.achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
