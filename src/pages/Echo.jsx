import { useState, useEffect } from 'react'
import { Shield, CheckCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

function SurveyForm({ survey }) {
  const [answers,   setAnswers]   = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [expanded,  setExpanded]  = useState(false)
  const [error,     setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: err } = await supabase.from('survey_responses').insert({
      survey_id: survey.id,
      answers,
    })
    setSubmitting(false)
    if (err) { setError('Could not submit. Please try again.'); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ padding: '32px 0', borderBottom: '1px solid #EDE8DC', display: 'flex', alignItems: 'center', gap: 14 }}>
        <CheckCircle size={20} style={{ color: '#2E8B57', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: '#0A1628', marginBottom: 2 }}>Response recorded</div>
          <div style={{ fontSize: 13, color: '#999' }}>Your anonymous response has been submitted. Thank you.</div>
        </div>
      </div>
    )
  }

  const questions = survey.survey_questions || []

  return (
    <div style={{ borderBottom: '1px solid #EDE8DC' }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{ width: '100%', padding: '26px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#0A1628', marginBottom: 4, letterSpacing: '-0.01em' }}>{survey.title}</div>
          <div style={{ fontSize: 12.5, color: '#BBB' }}>
            {survey.survey_responses_count ?? 0} responses ·{' '}
            <span style={{ color: survey.is_open ? '#2E8B57' : '#999' }}>{survey.is_open ? 'Open' : 'Closed'}</span>
          </div>
        </div>
        {expanded ? <ChevronUp size={15} style={{ color: '#BBB', flexShrink: 0 }} /> : <ChevronDown size={15} style={{ color: '#BBB', flexShrink: 0 }} />}
      </button>

      {expanded && survey.is_open && (
        <form onSubmit={handleSubmit} style={{ paddingBottom: 32 }}>
          {error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#B91C1C' }}>{error}</div>
          )}
          {questions.map((q, i) => (
            <div key={q.id} style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#333', marginBottom: 12, letterSpacing: '-0.01em' }}>
                {i + 1}. {q.text}
              </label>

              {q.type === 'rating' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <button
                      type="button" key={v}
                      onClick={() => setAnswers(a => ({ ...a, [q.id]: v }))}
                      style={{ width: 44, height: 44, borderRadius: 2, border: `1.5px solid ${answers[q.id] === v ? '#0A1628' : '#E5DFCF'}`, backgroundColor: answers[q.id] === v ? '#0A1628' : '#fff', color: answers[q.id] === v ? '#fff' : '#666', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}
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
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5DFCF', borderRadius: 2, fontSize: 14, fontFamily: 'Inter, sans-serif', resize: 'vertical', outline: 'none', backgroundColor: '#FAFAF8', color: '#333', boxSizing: 'border-box' }}
                />
              )}

              {q.type === 'multiple_choice' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(Array.isArray(q.options) ? q.options : []).map(opt => (
                    <button
                      type="button" key={opt}
                      onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                      style={{ padding: '7px 16px', borderRadius: 2, border: `1.5px solid ${answers[q.id] === opt ? '#0A1628' : '#E5DFCF'}`, backgroundColor: answers[q.id] === opt ? '#0A1628' : '#fff', color: answers[q.id] === opt ? '#fff' : '#555', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}
                    >{opt}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={submitting}
            style={{ backgroundColor: '#0A1628', color: '#fff', padding: '12px 28px', borderRadius: 2, fontWeight: 600, fontSize: 12, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: submitting ? 0.65 : 1, display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            {submitting ? <><Loader2 size={14} className="spin" /> Submitting…</> : 'Submit Anonymously'}
          </button>
        </form>
      )}

      {expanded && !survey.is_open && (
        <div style={{ paddingBottom: 24, fontSize: 13.5, color: '#AAA' }}>
          This survey is now closed. Thank you to all who participated.
        </div>
      )}
    </div>
  )
}

export default function Echo() {
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)

  const [headerRef,  headerVis]  = useReveal()
  const [surveysRef, surveysVis] = useReveal()

  useEffect(() => {
    supabase
      .from('surveys')
      .select('id, title, is_open, survey_questions(id, text, type, options, order_index), survey_responses(id)')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        const enriched = (data || []).map(s => ({
          ...s,
          survey_questions: (s.survey_questions || []).sort((a, b) => a.order_index - b.order_index),
          survey_responses_count: (s.survey_responses || []).length,
        }))
        setSurveys(enriched)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div ref={headerRef} className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 6, ...fx(headerVis, 0) }}>
              <Shield size={18} style={{ color: '#B8882A' }} />
            </div>
            <div>
              <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(36px, 5vw, 58px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 12, ...fx(headerVis, 80, 24) }}>Echo</h1>
              <p style={{ fontSize: 14.5, color: '#6A6A7A', lineHeight: 1.78, maxWidth: 440, ...fx(headerVis, 180) }}>
                Share your honest feedback. No names, no accounts — just your voice. Responses are 100% anonymous.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Surveys */}
      <div ref={surveysRef} style={{ maxWidth: 720, margin: '0 auto', padding: '48px 32px 100px' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#AAA', padding: '40px 0' }}>
            <Loader2 size={18} className="spin" /> Loading surveys…
          </div>
        ) : surveys.length === 0 ? (
          <p style={{ fontSize: 14.5, color: '#CCC', paddingTop: 32 }}>No surveys open right now. Check back later.</p>
        ) : (
          surveys.map((s, i) => (
            <div key={s.id} style={fx(surveysVis, i * 70)}>
              <SurveyForm survey={s} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
