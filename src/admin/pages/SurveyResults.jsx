import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function SurveyResults() {
  const { id } = useParams()
  const [survey,    setSurvey]    = useState(null)
  const [questions, setQuestions] = useState([])
  const [responses, setResponses] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')

  useEffect(() => {
    const load = async () => {
      const [{ data: sv, error: e1 }, { data: qs, error: e2 }, { data: rs, error: e3 }] = await Promise.all([
        supabase.from('surveys').select('id, title, is_open').eq('id', id).single(),
        supabase.from('survey_questions').select('*').eq('survey_id', id).order('order_index'),
        supabase.from('survey_responses').select('answers').eq('survey_id', id),
      ])
      if (e1 || e2 || e3) { setError((e1 || e2 || e3).message); setLoading(false); return }
      setSurvey(sv)
      setQuestions(qs || [])
      setResponses(rs || [])
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return (
    <div style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 12, color: '#94A3B8' }}>
      <Loader2 size={18} className="spin" /> Loading results…
    </div>
  )

  if (error || !survey) return (
    <div style={{ padding: 32 }}>
      <Link to="/admin/surveys" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1E3273', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
        <ArrowLeft size={16} /> Back
      </Link>
      <div style={{ color: '#B91C1C', fontSize: 14 }}>{error || 'Survey not found.'}</div>
    </div>
  )

  // Aggregate answers per question
  const aggregate = (q) => {
    const all = responses.map(r => r.answers?.[q.id]).filter(v => v !== undefined && v !== null && v !== '')
    if (q.type === 'rating') {
      const counts = [0, 0, 0, 0, 0]
      all.forEach(v => { const n = Number(v); if (n >= 1 && n <= 5) counts[n - 1]++ })
      const total = counts.reduce((a, b) => a + b, 0)
      const avg = total > 0 ? (counts.reduce((s, c, i) => s + c * (i + 1), 0) / total).toFixed(1) : '—'
      return { counts, total, avg }
    }
    if (q.type === 'text') return { texts: all }
    if (q.type === 'multiple_choice') {
      const opts = Array.isArray(q.options) ? q.options : []
      const counts = {}
      opts.forEach(o => { counts[o] = 0 })
      all.forEach(v => { if (counts[v] !== undefined) counts[v]++ })
      return { counts, total: all.length }
    }
    return {}
  }

  return (
    <div style={{ padding: 32, maxWidth: 760, margin: '0 auto' }}>
      <Link to="/admin/surveys" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1E3273', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Surveys
      </Link>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827', marginBottom: 8 }}>{survey.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748B' }}>
          <Users size={14} /> {responses.length} anonymous response{responses.length !== 1 ? 's' : ''}
          <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, backgroundColor: survey.is_open ? '#F0FDF4' : '#F1F5F9', color: survey.is_open ? '#16A34A' : '#64748B' }}>
            {survey.is_open ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {responses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#94A3B8', fontSize: 14 }}>No responses yet.</div>
      )}

      {questions.map((q, i) => {
        const agg = aggregate(q)
        return (
          <div key={q.id} style={{ backgroundColor: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>
              Q{i + 1}: {q.text}
            </div>

            {q.type === 'rating' && (
              <div>
                <div style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
                  Average: <strong style={{ color: '#1E3273', fontSize: 18 }}>{agg.avg}</strong>
                  <span style={{ color: '#94A3B8' }}> / 5</span>
                  <span style={{ marginLeft: 12, color: '#94A3B8' }}>({agg.total} answer{agg.total !== 1 ? 's' : ''})</span>
                </div>
                {[1,2,3,4,5].map(v => {
                  const count = agg.counts[v - 1]
                  const pct = agg.total > 0 ? Math.round((count / agg.total) * 100) : 0
                  return (
                    <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                      <span style={{ width: 16, fontSize: 13, color: '#64748B', textAlign: 'right', flexShrink: 0 }}>{v}</span>
                      <div style={{ flex: 1, backgroundColor: '#F1F5F9', borderRadius: 100, height: 14, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, backgroundColor: '#1E3273', height: '100%', borderRadius: 100, transition: 'width 0.5s' }} />
                      </div>
                      <span style={{ fontSize: 13, color: '#64748B', width: 48, textAlign: 'right' }}>{count} ({pct}%)</span>
                    </div>
                  )
                })}
              </div>
            )}

            {q.type === 'text' && (
              agg.texts?.length === 0 ? (
                <div style={{ fontSize: 13, color: '#94A3B8' }}>No text responses yet.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(agg.texts || []).map((r, ri) => (
                    <div key={ri} style={{ backgroundColor: '#F4F6FB', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#374151' }}>
                      &ldquo;{r}&rdquo;
                    </div>
                  ))}
                </div>
              )
            )}

            {q.type === 'multiple_choice' && (
              <div>
                {Object.entries(agg.counts || {}).map(([opt, count]) => {
                  const pct = agg.total > 0 ? Math.round((count / agg.total) * 100) : 0
                  return (
                    <div key={opt} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                        <span style={{ fontWeight: 500, color: '#374151' }}>{opt}</span>
                        <span style={{ color: '#64748B' }}>{count} ({pct}%)</span>
                      </div>
                      <div style={{ backgroundColor: '#F1F5F9', borderRadius: 100, height: 12, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, backgroundColor: '#C9A84C', height: '100%', borderRadius: 100 }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
