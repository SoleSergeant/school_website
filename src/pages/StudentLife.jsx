import { Home, Music, Dumbbell, FlaskConical, Mic2, Globe } from 'lucide-react'

const lifeItems = [
  { icon: Home,        title: 'Campus & Boarding',  desc: 'Modern boarding facilities with comfortable dorms, study rooms, and common areas for collaboration.' },
  { icon: Music,       title: 'Clubs & Activities', desc: 'Robotics, debate, chess, music, and over 15 student-led clubs to explore your passions.' },
  { icon: Dumbbell,    title: 'Sports & Fitness',   desc: 'Football, basketball, volleyball, and a fully equipped gym open to all students daily.' },
  { icon: FlaskConical,title: 'Science Labs',       desc: 'State-of-the-art physics, chemistry, and biology labs for hands-on experiments.' },
  { icon: Mic2,        title: 'TEDx & Events',      desc: 'Student-organized conferences, cultural festivals, and open mic nights throughout the year.' },
  { icon: Globe,       title: 'International Trips',desc: 'Exchange programs and academic trips to partner schools in Kazakhstan, Turkey, and beyond.' },
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
    <div style={{ backgroundColor: '#FAFAF8' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0D1B36', padding: '80px 24px' }}>
        <div className="wrap">
          <p style={{ fontSize: 11, color: '#3D5270', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 18 }}>On campus</p>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(36px, 5vw, 58px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 16, maxWidth: 560 }}>
            Life at Fergana<br />Presidential School.
          </h1>
          <p style={{ fontSize: 15, color: '#7A90A8', lineHeight: 1.8, maxWidth: 420 }}>
            More than academics — a full community experience that shapes character alongside intellect.
          </p>
        </div>
      </section>

      {/* Activities — two column list */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5E3DC', padding: '88px 24px' }}>
        <div className="wrap">
          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', color: '#111', letterSpacing: '0em', marginBottom: 52 }}>
            Everything on campus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0px' }}>
            {lifeItems.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} style={{ display: 'flex', gap: 18, padding: '28px 0', borderBottom: '1px solid #E5E3DC', paddingRight: i % 2 === 0 ? 40 : 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: '#F4F2EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Icon size={16} style={{ color: '#555' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 15, color: '#111', letterSpacing: '0em', marginBottom: 5 }}>{title}</h3>
                  <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section style={{ padding: '88px 24px' }}>
        <div className="wrap">
          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', color: '#111', letterSpacing: '0em', marginBottom: 36 }}>
            Campus moments
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 8 }}>
            {photos.map((url, i) => (
              <img key={i} src={url} alt={`Campus ${i + 1}`} style={{ width: '100%', height: i === 0 ? 280 : 200, objectFit: 'cover', borderRadius: 8 }} />
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E3DC', padding: '88px 24px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', color: '#111', letterSpacing: '0em', marginBottom: 48 }}>
            A day in the life
          </h2>
          {schedule.map(({ time, activity }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderBottom: i < schedule.length - 1 ? '1px solid #F0EEE8' : 'none' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#C9A84C', minWidth: 46, letterSpacing: '0.04em' }}>{time}</span>
              <span style={{ fontSize: 14, color: '#444' }}>{activity}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
