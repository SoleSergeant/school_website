import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { articles } from '../data/mock'

const stats = [
  { n: '500+', label: 'Enrolled students' },
  { n: '120+', label: 'Olympiad medals' },
  { n: '14',   label: 'Subjects offered' },
  { n: '100%', label: 'University placement' },
]

const pillars = [
  { n: '01', title: 'Cambridge IGCSE', desc: 'Internationally recognised curriculum alongside the Uzbek national programme, preparing students for the world\'s top universities.' },
  { n: '02', title: 'STEAM Focus',     desc: 'Science, Technology, Engineering, Arts and Mathematics — integrated, project-driven, and competitive from day one.' },
  { n: '03', title: 'Free Boarding',   desc: 'Full accommodation and meals on campus, fully funded by the state. Admission is merit-based, completely free of charge.' },
  { n: '04', title: 'CIS Accredited',  desc: 'Full accreditation from the Council of International Schools — a standard held by fewer than 1,400 schools worldwide.' },
]

const D = "'Cormorant Garamond', Georgia, serif"

export default function Home() {
  return (
    <div>

      {/* ─── Hero ─── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        marginTop: -68,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#050E1C',
        overflow: 'hidden',
      }}>
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(5,14,28,0.96) 45%, rgba(5,14,28,0.55) 100%)' }} />

        <div className="wrap" style={{ position: 'relative', paddingTop: 140, paddingBottom: 100 }}>
          <p style={{ fontSize: 10.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 30 }}>
            Est. 2020 · CIS Accredited · Fergana, Uzbekistan
          </p>
          <h1 style={{
            fontFamily: D, fontWeight: 600,
            fontSize: 'clamp(52px, 8vw, 96px)',
            color: '#fff',
            lineHeight: 0.97,
            letterSpacing: '-0.01em',
            marginBottom: 32,
            maxWidth: 720,
          }}>
            Where Gifted<br />Minds Find<br />Their Calling.
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, maxWidth: 400, marginBottom: 48 }}>
            Cambridge IGCSE meets Uzbekistan's finest — an exceptional environment for students aged 11–18.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/admissions" style={{
              display: 'inline-block',
              backgroundColor: '#B8882A',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>Apply Now</Link>
            <Link to="/life" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              color: 'rgba(255,255,255,0.62)',
              fontSize: 13,
              textDecoration: 'none',
              padding: '13px 20px',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 2,
            }}>
              Explore campus <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, opacity: 0.35 }}>
          <span style={{ fontSize: 9, color: '#fff', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Scroll</span>
          <ArrowDown size={13} color="#fff" />
        </div>
      </section>

      {/* ─── Stats strip ─── */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5DFCF' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {stats.map(({ n, label }, i) => (
              <div key={label} style={{ padding: '40px 28px', borderRight: i < 3 ? '1px solid #E5DFCF' : 'none' }}>
                <div style={{ fontFamily: D, fontWeight: 600, fontSize: 46, color: '#0A1628', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 6 }}>{n}</div>
                <div style={{ fontSize: 12.5, color: '#999', letterSpacing: '0.02em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About split ─── */}
      <section style={{ backgroundColor: '#F5F1E8', padding: '100px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>About the school</p>
            <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(34px, 4vw, 54px)', color: '#0A1628', lineHeight: 1.08, letterSpacing: '-0.01em', marginBottom: 26 }}>
              A presidential school<br />built on merit.
            </h2>
            <p style={{ fontSize: 15.5, color: '#5C5A6A', lineHeight: 1.85, marginBottom: 16 }}>
              Established in 2020 under the initiative of the President of Uzbekistan, Fergana Presidential School is a state-funded boarding institution for the nation's most gifted students.
            </p>
            <p style={{ fontSize: 15.5, color: '#5C5A6A', lineHeight: 1.85, marginBottom: 40 }}>
              Our graduates compete at international olympiads, gain entry to the world's top universities, and return to lead Uzbekistan's future.
            </p>
            <Link to="/admissions" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: '#0A1628', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1.5px solid #B8882A', paddingBottom: 3 }}>
              Admissions info <ArrowRight size={12} />
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80"
              alt="School"
              style={{ width: '100%', height: 500, objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ─── Pillars ─── */}
      <section style={{ backgroundColor: '#fff', padding: '100px 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60, paddingBottom: 28, borderBottom: '1px solid #E5DFCF' }}>
            <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(30px, 4vw, 50px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.1, maxWidth: 380 }}>
              What makes<br />us different.
            </h2>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.75, maxWidth: 300, paddingBottom: 4 }}>
              Four pillars that define the Fergana Presidential School experience.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>
            {pillars.map(({ n, title, desc }, i) => (
              <div key={n} style={{ padding: '32px 0', borderTop: '1px solid #E5DFCF', display: 'flex', gap: 22 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: '#B8882A', letterSpacing: '0.08em', minWidth: 22, paddingTop: 3, flexShrink: 0 }}>{n}</span>
                <div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 600, color: '#0A1628', marginBottom: 9, letterSpacing: '-0.01em' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#777', lineHeight: 1.8 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── News ─── */}
      <section style={{ backgroundColor: '#F5F1E8', padding: '100px 0' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, paddingBottom: 20, borderBottom: '1px solid #D8D0BE' }}>
            <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(26px, 3vw, 40px)', color: '#0A1628', letterSpacing: '-0.01em' }}>
              Latest News
            </h2>
            <Link to="/articles" style={{ fontSize: 11, fontWeight: 700, color: '#888', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5 }}>
              All articles <ArrowRight size={11} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 36 }}>
            {articles.map(a => (
              <Link key={a.id} to={`/articles/${a.id}`} style={{ textDecoration: 'none', display: 'block' }}
                onMouseEnter={e => { const h = e.currentTarget.querySelector('[data-title]'); if (h) h.style.color = '#B8882A' }}
                onMouseLeave={e => { const h = e.currentTarget.querySelector('[data-title]'); if (h) h.style.color = '#0A1628' }}
              >
                <div style={{ overflow: 'hidden', marginBottom: 18 }}>
                  <img src={a.cover} alt={a.title} style={{ width: '100%', height: 210, objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <span style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{a.category}</span>
                <h3 data-title style={{ fontSize: 16.5, fontWeight: 600, color: '#0A1628', margin: '8px 0 10px', lineHeight: 1.4, letterSpacing: '-0.01em', transition: 'color 0.15s' }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, color: '#888', lineHeight: 1.72 }}>{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ backgroundColor: '#0A1628', padding: '120px 0' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 10.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>Admissions now open</p>
          <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(38px, 6vw, 72px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.02, maxWidth: 560, margin: '0 auto 24px' }}>
            Ready to begin<br />your journey?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.42)', marginBottom: 48, maxWidth: 400, margin: '0 auto 48px' }}>
            For gifted students aged 11–18. Applications are free. Places awarded purely on merit.
          </p>
          <Link to="/admissions" style={{ display: 'inline-block', backgroundColor: '#B8882A', color: '#fff', padding: '16px 44px', borderRadius: 2, fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Start Your Application
          </Link>
        </div>
      </section>

    </div>
  )
}
