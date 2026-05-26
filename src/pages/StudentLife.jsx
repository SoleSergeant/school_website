import { Home, Music, Dumbbell, FlaskConical, Mic2, Globe } from 'lucide-react'

const lifeItems = [
  { icon: Home, title: 'Campus & Boarding', desc: 'Modern boarding facilities with comfortable dorms, study rooms, and common areas for collaboration.' },
  { icon: Music, title: 'Clubs & Activities', desc: 'Robotics, debate, chess, music, and over 15 student-led clubs to explore your passions.' },
  { icon: Dumbbell, title: 'Sports & Fitness', desc: 'Football, basketball, volleyball, and a fully equipped gym open to all students daily.' },
  { icon: FlaskConical, title: 'Science Labs', desc: 'State-of-the-art physics, chemistry, and biology labs for hands-on experiments.' },
  { icon: Mic2, title: 'TEDx & Events', desc: 'Student-organized conferences, cultural festivals, and open mic nights throughout the year.' },
  { icon: Globe, title: 'International Trips', desc: 'Exchange programs and academic trips to partner schools in Kazakhstan, Turkey, and beyond.' },
]

const photos = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
  'https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=600&q=80',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80',
]

const schedule = [
  { time: '07:00', activity: 'Wake-up & Morning Routine' },
  { time: '07:30', activity: 'Breakfast' },
  { time: '08:00', activity: 'Classes Begin' },
  { time: '13:00', activity: 'Lunch Break' },
  { time: '14:00', activity: 'Afternoon Classes' },
  { time: '17:00', activity: 'Clubs & Sports' },
  { time: '19:00', activity: 'Dinner' },
  { time: '20:00', activity: 'Self-Study / Library' },
  { time: '22:30', activity: 'Lights Out' },
]

export default function StudentLife() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(150deg, #152760 0%, #1E3273 50%, #243888 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AA5A', marginBottom: 10 }}>On campus</p>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>Student Life</h1>
          <p style={{ fontSize: 15, color: '#94A8D0', maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
            Life at Fergana Presidential School is more than academics — it's a full community experience.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Beyond the classroom</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#111827', letterSpacing: '-0.025em' }}>Everything on campus</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lifeItems.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: '#F8F9FC', border: '1px solid #EAECF0', borderRadius: 14, padding: '24px 22px' }}>
                <div style={{ backgroundColor: '#EEF2FF', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={18} style={{ color: '#1E3273' }} />
                </div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15.5, color: '#111827', letterSpacing: '-0.01em', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section style={{ backgroundColor: '#F8F9FC', borderTop: '1px solid #EAECF0', borderBottom: '1px solid #EAECF0', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Gallery</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#111827', letterSpacing: '-0.025em' }}>Campus Moments</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Campus moment ${i + 1}`}
                style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 12, display: 'block' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Daily schedule */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Routine</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#111827', letterSpacing: '-0.025em' }}>A Day in the Life</h2>
          </div>
          <div style={{ backgroundColor: '#F8F9FC', border: '1px solid #EAECF0', borderRadius: 14, overflow: 'hidden' }}>
            {schedule.map(({ time, activity }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 22px',
                  borderBottom: i < schedule.length - 1 ? '1px solid #EAECF0' : 'none',
                }}
              >
                <div style={{ minWidth: 52, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 13, color: '#1E3273', letterSpacing: '0.02em' }}>{time}</div>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C9A84C', flexShrink: 0 }} />
                <div style={{ fontSize: 14, color: '#374151' }}>{activity}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
