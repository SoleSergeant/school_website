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
      <div style={{ textAlign: 'center', padding: '32px 24px' }}>
        <CheckCircle size={40} style={{ color: '#16A34A', margin: '0 auto 12px' }} />
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111827', marginBottom: 6 }}>Response Submitted!</div>
        <div style={{ fontSize: 14, color: '#64748B' }}>Your anonymous response has been recorded. Thank you.</div>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 16, backgroundColor: '#fff', overflow: 'hidden', marginBottom: 20 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 17, color: '#111827', marginBottom: 4 }}>{survey.title}</div>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>{survey.responses} responses · {survey.isOpen ? '✅ Open' : '🔒 Closed'}</div>
        </div>
        {expanded ? <ChevronUp size={20} style={{ color: '#94A3B8' }} /> : <ChevronDown size={20} style={{ color: '#94A3B8' }} />}
      </button>

      {expanded && survey.isOpen && (
        <form onSubmit={handleSubmit} style={{ padding: '0 24px 24px', borderTop: '1px solid #F1F5F9' }}>
          {survey.questions.map((q, i) => (
            <div key={q.id} style={{ marginTop: 20 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 10 }}>
                {i + 1}. {q.text}
              </label>
              {q.type === 'rating' && (
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(v => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setAnswers(a => ({ ...a, [q.id]: v }))}
                      style={{
                        width: 44, height: 44, borderRadius: 10, border: `2px solid ${answers[q.id] === v ? '#1E3273' : '#E2E8F0'}`,
                        backgroundColor: answers[q.id] === v ? '#1E3273' : '#fff',
                        color: answers[q.id] === v ? '#fff' : '#374151',
                        fontWeight: 600, fontSize: 16, cursor: 'pointer'
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
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Inter', resize: 'vertical', outline: 'none' }}
                />
              )}
              {q.type === 'multiple_choice' && (
                <div className="flex flex-wrap gap-2">
                  {q.options.map(opt => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                      style={{
                        padding: '8px 16px', borderRadius: 100,
                        border: `2px solid ${answers[q.id] === opt ? '#1E3273' : '#E2E8F0'}`,
                        backgroundColor: answers[q.id] === opt ? '#1E3273' : '#fff',
                        color: answers[q.id] === opt ? '#fff' : '#374151',
                        fontSize: 13, fontWeight: 500, cursor: 'pointer'
                      }}
                    >{opt}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            style={{ marginTop: 24, backgroundColor: '#1E3273', color: '#fff', padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}
          >
            Submit Anonymously
          </button>
        </form>
      )}

      {expanded && !survey.isOpen && (
        <div style={{ padding: '20px 24px', borderTop: '1px solid #F1F5F9', color: '#94A3B8', fontSize: 14 }}>
          This survey is now closed. Thank you to all who participated.
        </div>
      )}
    </div>
  )
}

export default function Echo() {
  return (
    <div style={{ padding: '56px 16px', maxWidth: 720, margin: '0 auto' }}>
      <div className="text-center mb-12">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#EEF2FF', borderRadius: 100, padding: '8px 18px', marginBottom: 16 }}>
          <Shield size={16} style={{ color: '#1E3273' }} />
          <span style={{ fontSize: 13, color: '#1E3273', fontWeight: 600 }}>100% Anonymous</span>
        </div>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 36, color: '#1E3273', marginBottom: 12 }}>Echo</h1>
        <p style={{ color: '#64748B', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Share your honest feedback. No names, no accounts — just your voice. Your responses are completely anonymous.
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
