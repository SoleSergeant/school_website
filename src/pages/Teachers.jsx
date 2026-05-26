import { teachers } from '../data/mock'

export default function Teachers() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '80px 24px' }}>

        {/* Header */}
        <div style={{ maxWidth: 560, marginBottom: 72 }}>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', color: '#111', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 16 }}>
            Our Faculty
          </h1>
          <p style={{ fontSize: 15, color: '#777', lineHeight: 1.8 }}>
            Subject specialists and Cambridge-certified educators committed to developing each student's potential.
          </p>
        </div>

        {/* Teacher list */}
        <div>
          {teachers.map((t, i) => (
            <div
              key={t.id}
              style={{
                display: 'flex', gap: 28, alignItems: 'flex-start',
                padding: '32px 0',
                borderTop: '1px solid #E5E3DC',
                borderBottom: i === teachers.length - 1 ? '1px solid #E5E3DC' : 'none',
              }}
            >
              <img
                src={t.photo || `https://i.pravatar.cc/80?u=${t.id}`}
                alt={t.name}
                style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: 2 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 4, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 18, color: '#111', letterSpacing: '0em' }}>{t.name}</h3>
                  <span style={{ fontSize: 12, color: '#bbb', flexShrink: 0 }}>{t.experience} experience</span>
                </div>
                <span style={{ display: 'inline-block', fontSize: 11.5, color: '#1E3273', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>{t.subject}</span>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75 }}>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
