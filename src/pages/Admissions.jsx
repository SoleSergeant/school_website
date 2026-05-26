import { CheckCircle } from 'lucide-react'

const steps = [
  { n: '01', title: 'Check Eligibility', desc: 'Applicants must be between 11–18 years old and demonstrate strong academic performance.' },
  { n: '02', title: 'Take the Entrance Test', desc: 'Sit the Cambridge Assessment Admissions Test covering math, science, logic, and English.' },
  { n: '03', title: 'Interview Round', desc: 'Shortlisted candidates attend a personal interview to assess motivation and aptitude.' },
  { n: '04', title: 'Receive Your Offer', desc: 'Successful applicants receive an offer letter and begin enrollment paperwork.' },
]

const requirements = [
  'Age: 11–18 years old at time of enrollment',
  'Minimum GPA of 4.5/5.0 from previous school',
  'No existing medical conditions that prevent boarding',
  'Strong performance in math and/or natural sciences',
  'Parental consent and completed application form',
]

const faqs = [
  { q: 'Is studying at the Presidential School free?', a: 'Yes. All tuition, boarding, and meals are fully funded by the state.' },
  { q: 'What subjects are covered in the entrance test?', a: 'The test covers mathematics, logical reasoning, natural sciences, and English language.' },
  { q: 'Can students from all regions of Uzbekistan apply?', a: 'Yes. The school accepts students from across the country, with priority for Fergana region applicants.' },
  { q: 'What is the school year schedule?', a: 'The academic year runs September–June, with breaks for Nowruz, national holidays, and summer.' },
]

export default function Admissions() {
  return (
    <div style={{ backgroundColor: '#FAFAF8' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0D1B36', padding: '80px 24px' }}>
        <div className="wrap">
          <p style={{ fontSize: 11, color: '#3D5270', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 18 }}>Admissions open</p>
          <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(36px, 5vw, 58px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 16, maxWidth: 560 }}>
            Join the school.
          </h1>
          <p style={{ fontSize: 15, color: '#7A90A8', lineHeight: 1.8, maxWidth: 400 }}>
            Applications are open for gifted students aged 11–18. The process is free, and places are awarded on merit.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5E3DC', padding: '88px 24px' }}>
        <div className="wrap">
          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', color: '#111', letterSpacing: '0em', marginBottom: 52 }}>
            How to apply
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1px', backgroundColor: '#E5E3DC', border: '1px solid #E5E3DC', borderRadius: 10, overflow: 'hidden' }}>
            {steps.map(({ n, title, desc }) => (
              <div key={n} style={{ backgroundColor: '#fff', padding: '32px 28px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 11, color: '#C9A84C', letterSpacing: '0.06em', display: 'block', marginBottom: 12 }}>{n}</span>
                <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 16.5, color: '#111', letterSpacing: '0em', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section style={{ padding: '88px 24px' }}>
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', color: '#111', letterSpacing: '0em', marginBottom: 16 }}>
                Eligibility
              </h2>
              <p style={{ fontSize: 15, color: '#777', lineHeight: 1.8 }}>
                All applicants are evaluated on academic merit. There are no fees at any stage.
              </p>
            </div>
            <div>
              {requirements.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0', borderBottom: i < requirements.length - 1 ? '1px solid #E5E3DC' : 'none' }}>
                  <CheckCircle size={15} style={{ color: '#16A34A', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: '#444' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E3DC', padding: '88px 24px' }}>
        <div className="wrap">
          <h2 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', color: '#111', letterSpacing: '0em', marginBottom: 52 }}>
            Common questions
          </h2>
          <div style={{ maxWidth: 680 }}>
            {faqs.map(({ q, a }, i) => (
              <div key={i} style={{ padding: '24px 0', borderBottom: '1px solid #E5E3DC' }}>
                <h3 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 15.5, color: '#111', letterSpacing: '0em', marginBottom: 8 }}>{q}</h3>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75 }}>{a}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 52 }}>
            <a href="mailto:admissions@ferganaschool.uz" style={{ display: 'inline-block', backgroundColor: '#0D1B36', color: '#fff', padding: '13px 28px', borderRadius: 7, fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em' }}>
              Contact Admissions Office
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
