import { useState } from 'react'
import { Shield, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { surveys } from '../data/mock'

function SurveyForm({ survey }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (submitted) {
    return (
      <div style={{ padding: '32px 24px', textAlign: 'center', borderBottom: '1px solid #E5E3DC' }}>
        <CheckCircle size={28} style={{ color: '#16A34A', margin: '0 auto 10px', display: 'block' }} />
        <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 15, color: '#111', marginBottom: 4 }}>Response submitted</div>
        <div style={{ fontSize: 13, color: '#999' }}>Your anonymous response has been recorded. Thank you.</div>
      </div>
    )
  }

  return (
    <div style={{ borderBottom: '1px solid #E5E3DC' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: '100%', padding: '28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
      >
        <div>
          <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 600, fontSize: 17, color: '#111', marginBottom: 3, letterSpacing: '0em' }}>{survey.title}</div>
          <div style={{ fontSize: 12.5, color: '#bbb' }}>
            {survey.responses} responses · {survey.isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
        {expanded ? <ChevronUp size={16} style={{ color: '#bbb', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: '#bbb', flexShrink: 0 }} />}
      </button>

      {expanded && survey.isOpen && (
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ paddingBottom: 32 }}>
          {survey.questions.map((q, i) => (
            <div key={q.id} style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12, letterSpacing: '-0.01em' }}>
                {i + 1}. {q.text}
              </label>

              {q.type === 'rating' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <button type="button" key={v} onClick={() => setAnswers(a => ({ ...a, [q.id]: v }))}
                      style={{ width: 44, height: 44, borderRadius: 8, border: `1.5px solid ${answers[q.id] === v ? '#111' : '#E5E3DC'}`, backgroundColor: answers[q.id] === v ? '#111' : '#fff', color: answers[q.id] === v ? '#fff' : '#444', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                    >{v}</button>
                  ))}
                </div>
              )}

              {q.type === 'text' && (
                <textarea rows={3} placeholder="Your answer..." value={answers[q.id] || ''}
                  onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E3DC', borderRadius: 8, fontSize: 14, fontFamily: 'Inter', resize: 'vertical', outline: 'none', backgroundColor: '#FAFAF8', color: '#333' }}
                />
              )}

              {q.type === 'multiple_choice' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {q.options.map(opt => (
                    <button type="button" key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                      style={{ padding: '7px 16px', borderRadius: 100, border: `1.5px solid ${answers[q.id] === opt ? '#111' : '#E5E3DC'}`, backgroundColor: answers[q.id] === opt ? '#111' : '#fff', color: answers[q.id] === opt ? '#fff' : '#444', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                    >{opt}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button type="submit" style={{ backgroundColor: '#0D1B36', color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
            Submit anonymously
          </button>
        </form>
      )}

      {expanded && !survey.isOpen && (
        <div style={{ paddingBottom: 24, fontSize: 13.5, color: '#999' }}>
          This survey is now closed. Thank you to all who participated.
        </div>
      )}
    </div>
  )
}

export default function Echo() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '80px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 64, paddingBottom: 40, borderBottom: '1px solid #E5E3DC' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#0D1B36', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 4 }}>
            <Shield size={18} style={{ color: '#C9A84C' }} />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 44px)', color: '#111', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 10 }}>Echo</h1>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75 }}>
              Share your honest feedback. No names, no accounts — just your voice. Responses are 100% anonymous.
            </p>
          </div>
        </div>

        {/* Surveys */}
        {surveys.map(s => <SurveyForm key={s.id} survey={s} />)}

      </div>
    </div>
  )
}
