import { Trophy, Medal } from 'lucide-react'
import { students } from '../data/mock'

export default function Students() {
  return (
    <div style={{ padding: '56px 16px', maxWidth: 1100, margin: '0 auto' }}>
      <div className="text-center mb-12">
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 36, color: '#1E3273', marginBottom: 12 }}>Student Achievements</h1>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 540, margin: '0 auto' }}>Celebrating the outstanding accomplishments of our students at national and international levels.</p>
      </div>

      {/* Banner */}
      <div style={{ backgroundColor: '#1E3273', borderRadius: 20, padding: '32px 36px', marginBottom: 48, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <Trophy size={48} style={{ color: '#C9A84C', flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 24, color: '#fff', marginBottom: 6 }}>100% University Placement</div>
          <div style={{ color: '#CBD5E1', fontSize: 15 }}>Every graduate from Fergana Presidential School secures a place at a top national or international university.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(s => (
          <div key={s.id} style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: '28px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-3 mb-4">
              <img src={s.photo} alt={s.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #EEF2FF' }} />
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827' }}>{s.name}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>Grade {s.grade}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, backgroundColor: '#F4F6FB', borderRadius: 12, padding: '14px 16px' }}>
              <Medal size={18} style={{ color: '#C9A84C', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14, color: '#1E3273', fontWeight: 600, lineHeight: 1.5 }}>{s.achievement}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
