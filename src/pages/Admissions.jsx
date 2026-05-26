import { CheckCircle, ClipboardList, UserCheck, BookOpen, Award } from 'lucide-react'

const steps = [
  { icon: ClipboardList, title: 'Check Eligibility', desc: 'Applicants must be between 11–18 years old and demonstrate strong academic performance.' },
  { icon: BookOpen, title: 'Take the Entrance Test', desc: 'Sit the Cambridge Assessment Admissions Test covering math, science, logic, and English.' },
  { icon: UserCheck, title: 'Interview Round', desc: 'Shortlisted candidates attend a personal interview to assess motivation and aptitude.' },
  { icon: Award, title: 'Receive Your Offer', desc: 'Successful applicants receive an offer letter and begin enrollment paperwork.' },
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
  { q: 'Can students from all regions of Uzbekistan apply?', a: 'Yes. The Fergana Presidential School accepts students from across the country, with priority for Fergana region applicants.' },
  { q: 'What is the school year schedule?', a: 'The academic year runs September–June, with breaks for Nowruz, national holidays, and summer.' },
]

export default function Admissions() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(150deg, #152760 0%, #1E3273 50%, #243888 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AA5A', marginBottom: 10 }}>Admissions open</p>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>Join the School</h1>
          <p style={{ fontSize: 15, color: '#94A8D0', maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
            Applications are open for gifted students aged 11–18. Take the admissions test and begin your journey.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Process</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#111827', letterSpacing: '-0.025em' }}>How to Apply</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} style={{ backgroundColor: '#F8F9FC', border: '1px solid #EAECF0', borderRadius: 14, padding: '24px 22px', display: 'flex', gap: 16 }}>
                <div style={{ backgroundColor: '#1E3273', borderRadius: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Icon size={20} style={{ color: '#fff' }} />
                </div>
                <div>
                  <div style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Step {i + 1}</div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15.5, color: '#111827', letterSpacing: '-0.01em', marginBottom: 6 }}>{title}</h3>
                  <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section style={{ backgroundColor: '#F8F9FC', borderTop: '1px solid #EAECF0', borderBottom: '1px solid #EAECF0', padding: '80px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Eligibility</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#111827', letterSpacing: '-0.025em' }}>Requirements</h2>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #EAECF0', borderRadius: 14, overflow: 'hidden' }}>
            {requirements.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 22px',
                  borderBottom: i < requirements.length - 1 ? '1px solid #F3F4F6' : 'none',
                }}
              >
                <CheckCircle size={16} style={{ color: '#16A34A', flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#374151' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>FAQ</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#111827', letterSpacing: '-0.025em' }}>Common Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ backgroundColor: '#F8F9FC', border: '1px solid #EAECF0', borderRadius: 12, padding: '20px 22px' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 14.5, color: '#111827', letterSpacing: '-0.01em', marginBottom: 8 }}>{q}</div>
                <div style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.7 }}>{a}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <a
              href="mailto:admissions@ferganaschool.uz"
              style={{ display: 'inline-block', backgroundColor: '#1E3273', color: '#fff', padding: '13px 30px', borderRadius: 9, fontWeight: 600, textDecoration: 'none', fontSize: 14, letterSpacing: '-0.01em' }}
            >
              Contact Admissions Office
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
