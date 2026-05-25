import { useParams, Link } from 'react-router-dom'
import { surveys } from '../../data/mock'
import { ArrowLeft, Users } from 'lucide-react'

export default function SurveyResults() {
  const { id } = useParams()
  const survey = surveys.find(s => s.id === Number(id))
  if (!survey) return <div style={{ padding: 32 }}>Survey not found.</div>

  // Mock result data
  const mockResults = {
    rating: [12, 8, 10, 9, 8],
    text: ['Better variety please', 'More vegetarian options', 'Food is good!', 'Love the breakfast', 'Soup needs improvement'],
    mc: { Math: 18, Physics: 14, Biology: 8, English: 12, CS: 10 },
  }

  return (
    <div style={{ padding: 32, maxWidth: 760, margin: '0 auto' }}>
      <Link to="/admin/surveys" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1E3273', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to Surveys
      </Link>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827', marginBottom: 8 }}>{survey.title}</h1>
        <div className="flex items-center gap-2" style={{ fontSize: 14, color: '#64748B' }}>
          <Users size={14} /> {survey.responses} anonymous responses
        </div>
      </div>

      {survey.questions.map((q, i) => (
        <div key={q.id} style={{ backgroundColor: '#fff', borderRadius: 18, padding: '24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 20 }}>
            Q{i + 1}: {q.text}
          </div>

          {q.type === 'rating' && (
            <div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>Average: <strong style={{ color: '#1E3273' }}>3.8 / 5</strong></div>
              {[1,2,3,4,5].map(v => {
                const count = mockResults.rating[v - 1]
                const pct = Math.round((count / survey.responses) * 100)
                return (
                  <div key={v} className="flex items-center gap-3" style={{ marginBottom: 8 }}>
                    <span style={{ width: 20, fontSize: 13, color: '#64748B', textAlign: 'right' }}>{v}</span>
                    <div style={{ flex: 1, backgroundColor: '#F1F5F9', borderRadius: 100, height: 12, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, backgroundColor: '#1E3273', height: '100%', borderRadius: 100, transition: 'width 0.5s' }} />
                    </div>
                    <span style={{ fontSize: 13, color: '#64748B', width: 32 }}>{pct}%</span>
                  </div>
                )
              })}
            </div>
          )}

          {q.type === 'text' && (
            <div className="flex flex-col gap-2">
              {mockResults.text.map((r, ri) => (
                <div key={ri} style={{ backgroundColor: '#F4F6FB', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#374151' }}>"{r}"</div>
              ))}
            </div>
          )}

          {q.type === 'multiple_choice' && (
            <div>
              {Object.entries(mockResults.mc).map(([opt, count]) => {
                const total = Object.values(mockResults.mc).reduce((a, b) => a + b, 0)
                const pct = Math.round((count / total) * 100)
                return (
                  <div key={opt} style={{ marginBottom: 10 }}>
                    <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 4 }}>
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
      ))}
    </div>
  )
}
