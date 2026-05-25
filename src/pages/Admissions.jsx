import { CheckCircle, ClipboardList, UserCheck, BookOpen, Award } from 'lucide-react'

const steps = [
  { icon: ClipboardList, title: 'Check Eligibility', desc: 'Applicants must be between 11–18 years old and demonstrate strong academic performance.' },
  { icon: BookOpen, title: 'Take the Entrance Test', desc: 'Sit the Cambridge Assessment Admissions Test covering math, science, logic, and English.' },
  { icon: UserCheck, title: 'Interview Round', desc: 'Shortlisted candidates attend a personal interview to assess motivation and aptitude.' },
  { icon: Award, title: 'Receive Your Offer', desc: 'Successful applicants receive an offer letter and begin enrollment paperwork.' },
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
      <div style={{ background: 'linear-gradient(135deg, #1E3273, #2B4099)', padding: '64px 16px', textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 40, marginBottom: 12 }}>Admissions</h1>
        <p style={{ fontSize: 17, color: '#CBD5E1', maxWidth: 520, margin: '0 auto' }}>Join one of Uzbekistan's most prestigious schools. Applications are open for gifted students aged 11–18.</p>
      </div>

      {/* Steps */}
      <div style={{ padding: '64px 16px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273', marginBottom: 40, textAlign: 'center' }}>How to Apply</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} style={{ backgroundColor: '#F4F6FB', borderRadius: 18, padding: '28px 24px', display: 'flex', gap: 16 }}>
              <div style={{ backgroundColor: '#1E3273', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} style={{ color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#C9A84C', fontWeight: 700, marginBottom: 4 }}>Step {i + 1}</div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: '#111827', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div style={{ backgroundColor: '#F4F6FB', padding: '64px 16px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273', marginBottom: 32, textAlign: 'center' }}>Requirements</h2>
          <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: '32px' }}>
            {[
              'Age: 11–18 years old at time of enrollment',
              'Minimum GPA of 4.5/5.0 from previous school',
              'No existing medical conditions that prevent boarding',
              'Strong performance in math and/or natural sciences',
              'Parental consent and completed application form',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3" style={{ padding: '12px 0', borderBottom: i < 4 ? '1px solid #F1F5F9' : 'none' }}>
                <CheckCircle size={18} style={{ color: '#16A34A', flexShrink: 0 }} />
                <span style={{ fontSize: 15, color: '#374151' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '64px 16px', maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 28, color: '#1E3273', marginBottom: 32, textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <div key={q} style={{ backgroundColor: '#F4F6FB', borderRadius: 14, padding: '20px 24px' }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>{q}</div>
              <div style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>{a}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="mailto:admissions@ferganaschool.uz" style={{ backgroundColor: '#1E3273', color: '#fff', padding: '16px 36px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Contact Admissions Office
          </a>
        </div>
      </div>
    </div>
  )
}
