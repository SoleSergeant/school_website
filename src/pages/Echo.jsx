import { useState } from 'react'
import { Shield, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { surveys } from '../data/mock'

function SurveyForm({ survey }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ border: '1px solid #EAECF0', borderRadius: 14, backgroundColor: '#fff', padding: '40px 24px', textAlign: 'center', marginBottom: 16 }}>
        <CheckCircle size={32} style={{ color: '#16A34A', margin: '0 auto 12px', display: 'block' }} />
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 6, letterSpacing: '-0.01em' }}>Response submitted</div>
        <div style={{ fontSize: 13.5, color: '#6B7280' }}>Your anonymous response has been recorded. Thank you.</div>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid #EAECF0', borderRadius: 14, backgroundColor: '#fff', overflow: 'hidden', marginBottom: 16 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 3, letterSpacing: '-0.01em' }}>{survey.title}</div>
          <div style={{ fontSize: 12, color: '#9CA3AF' }}>
            {survey.responses} responses · {survey.isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
        {expanded
          ? <ChevronUp size={18} style={{ color: '#9CA3AF', flexShrink: 0 }} />
          : <ChevronDown size={18} style={{ color: '#9CA3AF', flexShrink: 0 }} />
        }
      </button>

      {expanded && survey.isOpen && (
        <form onSubmit={handleSubmit} style={{ padding: '0 24px 28px', borderTop: '1px solid #F3F4F6' }}>
          {survey.questions.map((q, i) => (
            <div key={q.id} style={{ marginTop: 22 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 10, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                {i + 1}. {q.text}
              </label>

              {q.type === 'rating' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setAnswers(a => ({ ...a, [q.id]: v }))}
                      style={{
                        width: 42, height: 42, borderRadius: 10,
                        border: `1.5px solid ${answers[q.id] === v ? '#1E3273' : '#E2E8F0'}`,
                        backgroundColor: answers[q.id] === v ? '#1E3273' : '#fff',
                        color: answers[q.id] === v ? '#fff' : '#374151',
                        fontWeight: 600, fontSize: 15, cursor: 'pointer',
                        fontFamily: 'Plus Jakarta Sans',
                      }}
                    >{v}</button>
                  ))}
                </div>
              )}

              {q.type === 'text' && (
                <textarea
                  rows={3}
                  placeholder="Your answer..."
                  value={answers[q.id] || ''}
                  onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                  style={{ width: '100%', padding: '11px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Inter', resize: 'vertical', outline: 'none', color: '#374151' }}
                />
              )}

              {q.type === 'multiple_choice' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {q.options.map(opt => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                      style={{
                        padding: '7px 16px', borderRadius: 100,
                        border: `1.5px solid ${answers[q.id] === opt ? '#1E3273' : '#E2E8F0'}`,
                        backgroundColor: answers[q.id] === opt ? '#1E3273' : '#fff',
                        color: answers[q.id] === opt ? '#fff' : '#374151',
                        fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      }}
                    >{opt}</button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            style={{ marginTop: 28, backgroundColor: '#1E3273', color: '#fff', padding: '11px 26px', borderRadius: 9, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}
          >
            Submit anonymously
          </button>
        </form>
      )}

      {expanded && !survey.isOpen && (
        <div style={{ padding: '16px 24px', borderTop: '1px solid #F3F4F6', color: '#9CA3AF', fontSize: 13.5 }}>
          This survey is now closed. Thank you to all who participated.
        </div>
      )}
    </div>
  )
}

export default function Echo() {
  return (
    <div style={{ padding: '80px 24px', maxWidth: 680, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, backgroundColor: '#F0F4FF', borderRadius: 100, padding: '6px 14px', marginBottom: 18 }}>
          <Shield size={14} style={{ color: '#1E3273' }} />
          <span style={{ fontSize: 12, color: '#1E3273', fontWeight: 600, letterSpacing: '0.02em' }}>100% Anonymous</span>
        </div>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 38px)', color: '#111827', letterSpacing: '-0.025em', marginBottom: 12 }}>Echo</h1>
        <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 440, margin: '0 auto', lineHeight: 1.75 }}>
          Share your honest feedback. No names, no accounts — just your voice.
        </p>
      </div>

      <div>
        {surveys.map(s => (
          <SurveyForm key={s.id} survey={s} />
        ))}
      </div>
    </div>
  )
}
