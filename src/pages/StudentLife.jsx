import { Home, Music, Dumbbell, FlaskConical, Mic2, Globe } from 'lucide-react'

const D = "'Cormorant Garamond', Georgia, serif"

const lifeItems = [
  { icon: Home,        title: 'Campus & Boarding',   desc: 'Modern boarding with comfortable dorms, study rooms, and common areas for collaboration.' },
  { icon: Music,       title: 'Clubs & Activities',  desc: 'Robotics, debate, chess, music, and over 15 student-led clubs to explore every passion.' },
  { icon: Dumbbell,    title: 'Sports & Fitness',     desc: 'Football, basketball, volleyball, and a fully-equipped gym open daily to all students.' },
  { icon: FlaskConical,'title': 'Science Labs',       desc: 'State-of-the-art physics, chemistry, and biology labs for hands-on experiments.' },
  { icon: Mic2,        title: 'TEDx & Events',        desc: 'Student-organised conferences, cultural festivals, and open mic nights throughout the year.' },
  { icon: Globe,       title: 'International Trips',  desc: 'Exchange programmes and academic trips to partner schools in Kazakhstan, Turkey, and beyond.' },
]

const photos = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80',
  'https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=700&q=80',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=700&q=80',
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
    <div style={{ backgroundColor: '#fff' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0A1628', padding: '64px 0 60px' }}>
        <div className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18 }}>On campus</p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(40px, 5.5vw, 68px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.02, marginBottom: 18, maxWidth: 560 }}>
            Life at Fergana<br />Presidential School.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.8, maxWidth: 420 }}>
            More than academics — a full community that shapes character alongside intellect.
          </p>
        </div>
      </section>

      {/* Activities */}
      <section style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '88px 0' }}>
        <div className="wrap">
          <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 56 }}>
            Everything on campus
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>
            {lifeItems.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} style={{ display: 'flex', gap: 18, padding: '28px 0', borderTop: '1px solid #DDD8CC' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Icon size={15} style={{ color: '#B8882A' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 6 }}>{title}</h3>
                  <p style={{ fontSize: 13.5, color: '#6A6A7A', lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section style={{ padding: '88px 0' }}>
        <div className="wrap">
          <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 36 }}>
            Campus Moments
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
            {photos.map((url, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <img src={url} alt={`Campus ${i + 1}`}
                  style={{ width: '100%', height: i === 0 ? 300 : 220, objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily schedule */}
      <section style={{ backgroundColor: '#F5F1E8', borderTop: '1px solid #E5DFCF', padding: '88px 0' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 52 }}>
            A Day in the Life
          </h2>
          {schedule.map(({ time, activity }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '13px 0', borderBottom: i < schedule.length - 1 ? '1px solid #DDD8CC' : 'none' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#B8882A', minWidth: 44, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
              <span style={{ fontSize: 14, color: '#444' }}>{activity}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
