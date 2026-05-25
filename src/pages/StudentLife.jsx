const lifeItems = [
  { title: 'Campus & Boarding', desc: 'Modern boarding facilities with comfortable dorms, study rooms, and common areas for collaboration.', emoji: '🏫' },
  { title: 'Clubs & Activities', desc: 'Robotics, debate, chess, music, and over 15 student-led clubs to explore your passions.', emoji: '🎭' },
  { title: 'Sports & Fitness', desc: 'Football, basketball, volleyball, and a fully equipped gym open to all students daily.', emoji: '⚽' },
  { title: 'Science Labs', desc: 'State-of-the-art physics, chemistry, and biology labs for hands-on experiments.', emoji: '🔬' },
  { title: 'TEDx & Events', desc: 'Student-organized conferences, cultural festivals, and open mic nights throughout the year.', emoji: '🎤' },
  { title: 'International Trips', desc: 'Exchange programs and academic trips to partner schools in Kazakhstan, Turkey, and beyond.', emoji: '✈️' },
]

const photos = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80',
  'https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=500&q=80',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&q=80',
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
      <div style={{ background: 'linear-gradient(135deg, #1E3273, #2B4099)', padding: '64px 16px', textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 40, marginBottom: 12 }}>Student Life</h1>
        <p style={{ fontSize: 17, color: '#CBD5E1', maxWidth: 520, margin: '0 auto' }}>Life at Fergana Presidential School is more than academics — it's a full community experience.</p>
      </div>

      {/* Life cards */}
      <div style={{ padding: '64px 16px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifeItems.map(({ title, desc, emoji }) => (
            <div key={title} style={{ backgroundColor: '#F4F6FB', borderRadius: 18, padding: '28px 24px' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{emoji}</div>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#1E3273', marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div style={{ backgroundColor: '#F4F6FB', padding: '64px 16px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273', marginBottom: 32, textAlign: 'center' }}>Campus Moments</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((url, i) => (
              <img key={i} src={url} alt={`Campus ${i + 1}`} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 14 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Daily schedule */}
      <div style={{ padding: '64px 16px', maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273', marginBottom: 32, textAlign: 'center' }}>A Day in the Life</h2>
        <div>
          {schedule.map(({ time, activity }, i) => (
            <div key={i} className="flex items-center gap-4" style={{ padding: '14px 0', borderBottom: i < schedule.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ minWidth: 64, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14, color: '#1E3273' }}>{time}</div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#C9A84C', flexShrink: 0 }} />
              <div style={{ fontSize: 15, color: '#374151' }}>{activity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
