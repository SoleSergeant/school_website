import { CheckCircle } from 'lucide-react'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

const steps = [
  { n: '01', title: 'Check Eligibility',    desc: 'Applicants must be aged 11–18 with strong academic performance. Admissions are free; places are awarded on merit alone.' },
  { n: '02', title: 'Entrance Test',         desc: 'Sit the Cambridge Assessment Admissions Test covering mathematics, science, logic, and English language.' },
  { n: '03', title: 'Interview Round',       desc: 'Shortlisted candidates attend a personal interview to assess motivation, curiosity, and aptitude.' },
  { n: '04', title: 'Receive Your Offer',    desc: 'Successful applicants receive an offer letter and begin the enrollment process.' },
]

const requirements = [
  'Age: 11–18 years old at time of enrollment',
  'Minimum GPA of 4.5/5.0 from previous school',
  'No medical conditions preventing boarding',
  'Strong performance in math and/or natural sciences',
  'Parental consent and completed application form',
]

const faqs = [
  { q: 'Is studying at the Presidential School free?', a: 'Yes. All tuition, boarding, and meals are fully funded by the state.' },
  { q: 'What subjects are covered in the entrance test?', a: 'Mathematics, logical reasoning, natural sciences, and English language.' },
  { q: 'Can students from all regions apply?', a: 'Yes. The school accepts students from across Uzbekistan, with priority for Fergana region applicants.' },
  { q: 'What is the academic year schedule?', a: 'The year runs September–June, with breaks for Nowruz, national holidays, and summer.' },
]

export default function Admissions() {
  const [heroRef,        heroVis]        = useReveal()
  const [stepsRef,       stepsVis]       = useReveal()
  const [eligibilityRef, eligibilityVis] = useReveal()
  const [faqRef,         faqVis]         = useReveal()

  return (
    <div style={{ backgroundColor: '#fff' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#0A1628', padding: '64px 0 60px' }}>
        <div ref={heroRef} className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 18, ...fx(heroVis, 0) }}>Admissions open</p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(40px, 5.5vw, 68px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.02, marginBottom: 18, maxWidth: 520, ...fx(heroVis, 120, 28) }}>
            Join the school.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.8, maxWidth: 400, ...fx(heroVis, 240) }}>
            Applications open for gifted students aged 11–18. The process is free. Places are awarded purely on merit.
          </p>
        </div>
      </section>

      {/* How to apply */}
      <section style={{ backgroundColor: '#fff', padding: '88px 0', borderBottom: '1px solid #E5DFCF' }}>
        <div ref={stepsRef} className="wrap">
          <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 52, ...fx(stepsVis, 0) }}>
            How to Apply
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, backgroundColor: '#E5DFCF', border: '1px solid #E5DFCF', overflow: 'hidden' }}>
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} style={{ backgroundColor: '#fff', padding: '36px 32px', ...fx(stepsVis, 80 + i * 80) }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: '#B8882A', letterSpacing: '0.1em', display: 'block', marginBottom: 14 }}>{n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.78 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section style={{ backgroundColor: '#F5F1E8', padding: '88px 0', borderBottom: '1px solid #E5DFCF' }}>
        <div ref={eligibilityRef} className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <div style={fx(eligibilityVis, 0)}>
              <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 18 }}>
                Eligibility
              </h2>
              <p style={{ fontSize: 15, color: '#6A6A7A', lineHeight: 1.8 }}>
                All applicants are evaluated on academic merit. There are no fees at any stage of the process.
              </p>
            </div>
            <div>
              {requirements.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, padding: '14px 0', borderBottom: i < requirements.length - 1 ? '1px solid #DDD8CC' : 'none', ...fx(eligibilityVis, 80 + i * 55) }}>
                  <CheckCircle size={15} style={{ color: '#2E8B57', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: '#444', lineHeight: 1.65 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: '#fff', padding: '88px 0' }}>
        <div ref={faqRef} className="wrap">
          <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 52, ...fx(faqVis, 0) }}>
            Common Questions
          </h2>
          <div style={{ maxWidth: 720 }}>
            {faqs.map(({ q, a }, i) => (
              <div key={i} style={{ padding: '26px 0', borderBottom: '1px solid #E5DFCF', ...fx(faqVis, 60 + i * 60) }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 9 }}>{q}</h3>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.8 }}>{a}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 52, ...fx(faqVis, 60 + faqs.length * 60) }}>
            <a href="mailto:admissions@ferganaschool.uz" style={{ display: 'inline-block', backgroundColor: '#0A1628', color: '#fff', padding: '14px 32px', borderRadius: 2, fontWeight: 600, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Contact Admissions Office
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
