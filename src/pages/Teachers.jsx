import { teachers } from '../data/mock'

export default function Teachers() {
  return (
    <div style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Our faculty</p>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#111827', letterSpacing: '-0.025em', marginBottom: 12 }}>Meet the Teachers</h1>
        <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>Dedicated educators and subject specialists committed to unlocking each student's potential.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map(t => (
          <div key={t.id} style={{ backgroundColor: '#F8F9FC', border: '1px solid #EAECF0', borderRadius: 14, padding: '28px 24px', textAlign: 'center' }}>
            <img
              src={t.photo}
              alt={t.name}
              style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 14px', display: 'block', border: '2px solid #E2E8F0' }}
            />
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', letterSpacing: '-0.01em', marginBottom: 4 }}>{t.name}</h3>
            <div style={{ display: 'inline-block', backgroundColor: '#EEF2FF', color: '#1E3273', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, marginBottom: 12, letterSpacing: '0.02em' }}>{t.subject}</div>
            <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7, marginBottom: 10 }}>{t.bio}</p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>{t.experience} experience</p>
          </div>
        ))}
      </div>
    </div>
  )
}
