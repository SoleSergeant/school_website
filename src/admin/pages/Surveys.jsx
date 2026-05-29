import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, BarChart2, Trash2, ToggleLeft, ToggleRight, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const iS = { width: '100%', padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none', fontFamily: 'Plus Jakarta Sans' }

export default function AdminSurveys() {
  const [surveys,  setSurveys]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')
  const [showForm, setShowForm] = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [form,     setForm]     = useState({ title: '', questions: [{ text: '', type: 'rating', options: '' }] })

  const load = async () => {
    setLoading(true)
    const { data, error: err } = await supabase
      .from('surveys')
      .select('id, title, is_open, created_at, survey_questions(id), survey_responses(id)')
      .order('created_at', { ascending: false })
    if (err) { setError(err.message); setLoading(false); return }
    setSurveys(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const toggleOpen = async (s) => {
    const { error: err } = await supabase.from('surveys').update({ is_open: !s.is_open }).eq('id', s.id)
    if (err) { alert(err.message); return }
    setSurveys(ss => ss.map(x => x.id === s.id ? { ...x, is_open: !x.is_open } : x))
  }

  const remove = async (id, title) => {
    if (!confirm('Delete survey and all responses?')) return
    const { error: err } = await supabase.from('surveys').delete().eq('id', id)
    if (err) { alert(err.message); return }
    setSurveys(ss => ss.filter(s => s.id !== id))
  }

  const addQ    = () => setForm(f => ({ ...f, questions: [...f.questions, { text: '', type: 'rating', options: '' }] }))
  const removeQ = (i) => setForm(f => ({ ...f, questions: f.questions.filter((_, qi) => qi !== i) }))
  const updateQ = (i, k, v) => setForm(f => ({ ...f, questions: f.questions.map((q, qi) => qi === i ? { ...q, [k]: v } : q) }))

  const save = async () => {
    if (!form.title.trim()) { alert('Title required.'); return }
    if (form.questions.some(q => !q.text.trim())) { alert('All questions need text.'); return }
    setSaving(true)
    const { data: sv, error: e1 } = await supabase.from('surveys').insert({ title: form.title.trim(), is_open: true }).select('id').single()
    if (e1) { alert(e1.message); setSaving(false); return }
    const qp = form.questions.map((q, i) => ({
      survey_id: sv.id, text: q.text.trim(), type: q.type,
      options: q.type === 'multiple_choice' ? q.options.split(',').map(o => o.trim()).filter(Boolean) : [],
      order_index: i,
    }))
    const { error: e2 } = await supabase.from('survey_questions').insert(qp)
    if (e2) { alert(e2.message); setSaving(false); return }
    setSaving(false); setShowForm(false)
    setForm({ title: '', questions: [{ text: '', type: 'rating', options: '' }] })
    load()
  }

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>Surveys (Echo)</h1>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
          <Plus size={16} /> New Survey
        </button>
      </div>

      {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13.5, color: '#B91C1C' }}>{error}</div>}

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94A3B8', padding: '40px 0' }}><Loader2 size={18} className="spin" /> Loading…</div>
      ) : surveys.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: '#94A3B8', fontSize: 14 }}>No surveys yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {surveys.map(s => (
            <div key={s.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#64748B' }}>{(s.survey_questions||[]).length} questions · {(s.survey_responses||[]).length} responses</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => toggleOpen(s)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: `1px solid ${s.is_open ? '#BBF7D0' : '#E2E8F0'}`, backgroundColor: s.is_open ? '#F0FDF4' : '#F8FAFC', color: s.is_open ? '#16A34A' : '#64748B', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  {s.is_open ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}{s.is_open ? 'Open' : 'Closed'}
                </button>
                <Link to={`/admin/surveys/${s.id}/results`} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#1E3273', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                  <BarChart2 size={15} /> Results
                </Link>
                <button onClick={() => remove(s.id, s.title)} style={{ padding: '7px 12px', border: '1px solid #FEE2E2', borderRadius: 8, background: '#fff', cursor: 'pointer', color: '#DC2626', display: 'flex', alignItems: 'center' }}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827' }}>New Survey</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Survey Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="What do you want to ask students?" style={iS} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Questions</label>
              {form.questions.map((q, i) => (
                <div key={i} style={{ backgroundColor: '#F4F6FB', borderRadius: 12, padding: '14px 16px', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <input value={q.text} onChange={e => updateQ(i, 'text', e.target.value)} placeholder={`Question ${i + 1}`} style={{ ...iS, marginBottom: 8, padding: '8px 12px', fontSize: 13 }} />
                      <select value={q.type} onChange={e => updateQ(i, 'type', e.target.value)} style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, outline: 'none' }}>
                        <option value="rating">Rating (1–5)</option>
                        <option value="text">Text answer</option>
                        <option value="multiple_choice">Multiple choice</option>
                      </select>
                      {q.type === 'multiple_choice' && (
                        <input value={q.options} onChange={e => updateQ(i, 'options', e.target.value)} placeholder="Options, comma-separated: Math, Physics, Biology" style={{ ...iS, marginTop: 8, padding: '7px 12px', fontSize: 12 }} />
                      )}
                    </div>
                    {form.questions.length > 1 && (
                      <button onClick={() => removeQ(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', marginTop: 4 }}><X size={16} /></button>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={addQ} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px dashed #CBD5E1', borderRadius: 10, background: '#fff', cursor: 'pointer', color: '#1E3273', fontSize: 13, fontWeight: 600 }}>
                <Plus size={14} /> Add Question
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: 12, border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ flex: 1, padding: 12, backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {saving ? <><Loader2 size={14} className="spin" /> Creating…</> : 'Create Survey'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
