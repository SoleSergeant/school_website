import { teachers } from '../data/mock'

const D = "'Cormorant Garamond', Georgia, serif"

export default function Teachers() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>Our people</p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(40px, 5vw, 64px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 16 }}>
            Faculty
          </h1>
          <p style={{ fontSize: 15, color: '#6A6A7A', lineHeight: 1.8, maxWidth: 480 }}>
            Subject specialists and Cambridge-certified educators committed to developing each student's full potential.
          </p>
        </div>
      </div>

      {/* Teacher list */}
      <div className="wrap" style={{ padding: '0 32px 100px' }}>
        {teachers.map((t, i) => (
          <div key={t.id} style={{
            display: 'grid',
            gridTemplateColumns: '72px 1fr auto',
            gap: 28,
            alignItems: 'flex-start',
            padding: '36px 0',
            borderBottom: '1px solid #EDE8DC',
          }}>
            <img
              src={t.photo || `https://i.pravatar.cc/80?u=${t.id}`}
              alt={t.name}
              style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0A1628', marginBottom: 4, letterSpacing: '-0.01em' }}>{t.name}</h3>
              <span style={{ display: 'inline-block', fontSize: 10.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{t.subject}</span>
              <p style={{ fontSize: 14, color: '#6A6A7A', lineHeight: 1.78, maxWidth: 560 }}>{t.bio}</p>
            </div>
            <span style={{ fontSize: 12.5, color: '#BBB', whiteSpace: 'nowrap', paddingTop: 4 }}>{t.experience}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
