import { teachers } from '../data/mock'

export default function Teachers() {
  return (
    <div style={{ padding: '56px 16px', maxWidth: 1100, margin: '0 auto' }}>
      <div className="text-center mb-12">
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 36, color: '#1E3273', marginBottom: 12 }}>Our Teachers</h1>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>Meet the dedicated educators shaping the next generation of leaders.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map(t => (
          <div key={t.id} style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: '32px 24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <img src={t.photo} alt={t.name} style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid #EEF2FF' }} />
            <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 4 }}>{t.name}</h3>
            <div style={{ display: 'inline-block', backgroundColor: '#EEF2FF', color: '#1E3273', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 100, marginBottom: 12 }}>{t.subject}</div>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 12 }}>{t.bio}</p>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>Experience: {t.experience}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
