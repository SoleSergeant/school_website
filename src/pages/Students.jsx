import { students } from '../data/mock'

export default function Students() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ backgroundColor: '#0D1B36', padding: '80px 24px' }}>
        <div className="wrap">
          <p style={{ fontSize: 11, color: '#3D5270', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 18 }}>Recognition</p>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(36px, 5vw, 58px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 16, maxWidth: 600 }}>
            Student achievements.
          </h1>
          <p style={{ fontSize: 15, color: '#7A90A8', lineHeight: 1.8, maxWidth: 440 }}>
            Celebrating outstanding accomplishments at national and international competitions.
          </p>
        </div>
      </section>

      {/* 100% placement banner */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5E3DC', padding: '28px 24px' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 28, color: '#111', letterSpacing: '0em' }}>100%</span>
          <div style={{ width: 1, height: 32, backgroundColor: '#E5E3DC' }} />
          <div>
            <div style={{ fontSize: 14, color: '#111', fontWeight: 600 }}>University Placement</div>
            <div style={{ fontSize: 13, color: '#999' }}>Every graduate secures a place at a top national or international university</div>
          </div>
        </div>
      </section>

      {/* Students */}
      <section style={{ padding: '80px 24px' }}>
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', backgroundColor: '#E5E3DC', border: '1px solid #E5E3DC', borderRadius: 12, overflow: 'hidden' }}>
            {students.map(s => (
              <div key={s.id} style={{ backgroundColor: '#fff', padding: '28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <img src={s.photo || `https://i.pravatar.cc/80?u=s${s.id}`} alt={s.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 14.5, color: '#111', letterSpacing: '0em' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#bbb', marginTop: 1 }}>Grade {s.grade}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: '#444', lineHeight: 1.6, fontWeight: 500 }}>{s.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
