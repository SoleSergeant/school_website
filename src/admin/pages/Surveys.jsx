import { useState } from 'react'
import { Link } from 'react-router-dom'
import { surveys as initial } from '../../data/mock'
import { Plus, BarChart2, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react'

export default function AdminSurveys() {
  const [surveys, setSurveys] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', questions: [{ text: '', type: 'rating' }] })

  const toggleOpen = (id) => setSurveys(ss => ss.map(s => s.id === id ? { ...s, isOpen: !s.isOpen } : s))
  const remove = (id) => { if (confirm('Delete survey?')) setSurveys(ss => ss.filter(s => s.id !== id)) }

  const addQuestion = () => setForm(f => ({ ...f, questions: [...f.questions, { text: '', type: 'rating' }] }))
  const updateQ = (i, field, val) => setForm(f => ({ ...f, questions: f.questions.map((q, qi) => qi === i ? { ...q, [field]: val } : q) }))
  const removeQ = (i) => setForm(f => ({ ...f, questions: f.questions.filter((_, qi) => qi !== i) }))

  const save = () => {
    setSurveys(ss => [...ss, { id: Date.now(), title: form.title, isOpen: true, questions: form.questions.map((q, i) => ({ ...q, id: i + 1 })), responses: 0 }])
    setShowForm(false)
    setForm({ title: '', questions: [{ text: '', type: 'rating' }] })
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Surveys (Echo)</h1>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> New Survey
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {surveys.map(s => (
          <div key={s.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#64748B' }}>{s.questions.length} questions · {s.responses} responses</div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggleOpen(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1px solid ${s.isOpen ? '#BBF7D0' : '#E2E8F0'}`, backgroundColor: s.isOpen ? '#F0FDF4' : '#F8FAFC', color: s.isOpen ? '#16A34A' : '#64748B', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {s.isOpen ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                {s.isOpen ? 'Open' : 'Closed'}
              </button>
              <Link to={`/admin/surveys/${s.id}/results`} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#1E3273', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                <BarChart2 size={15} /> Results
              </Link>
              <button onClick={() => remove(s.id)} style={{ padding: '7px 12px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626' }}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>New Survey</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Survey Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="What do you want to ask students?"
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Questions</label>
              {form.questions.map((q, i) => (
                <div key={i} style={{ backgroundColor: '#F4F6FB', borderRadius: 12, padding: '14px 16px', marginBottom: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <input value={q.text} onChange={e => updateQ(i, 'text', e.target.value)} placeholder={`Question ${i + 1}`}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none', marginBottom: 8 }} />
                    <select value={q.type} onChange={e => updateQ(i, 'type', e.target.value)}
                      style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, outline: 'none' }}>
                      <option value="rating">Rating (1–5)</option>
                      <option value="text">Text answer</option>
                      <option value="multiple_choice">Multiple choice</option>
                    </select>
                  </div>
                  {form.questions.length > 1 && (
                    <button onClick={() => removeQ(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', marginTop: 4 }}><X size={16} /></button>
                  )}
                </div>
              ))}
              <button onClick={addQuestion} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px dashed #CBD5E1', borderRadius: 10, background: '#fff', cursor: 'pointer', color: '#1E3273', fontSize: 13, fontWeight: 600 }}>
                <Plus size={14} /> Add Question
              </button>
            </div>

            <div className="flex gap-3" style={{ marginTop: 24 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '12px', border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={save} style={{ flex: 1, padding: '12px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Create Survey</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
