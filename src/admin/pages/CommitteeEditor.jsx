import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, Plus, Pencil, Trash2, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import ImageUpload from '../components/ImageUpload'

const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0',
  borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none',
  fontFamily: 'Plus Jakarta Sans', backgroundColor: '#fff',
}

const TABS = ['Info', 'Members', 'Events']

// ─── Member modal ─────────────────────────────────────────────────────────────
function MemberModal({ committeeId, existing, onClose, onSaved }) {
  const isEdit = Boolean(existing)
  const [form, setForm] = useState({
    name: existing?.name || '', role: existing?.role || '',
    contribution: existing?.contribution || '', photo: existing?.photo || '',
    linkedin_url: existing?.linkedin_url || '', telegram_url: existing?.telegram_url || '',
  })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

  const save = async () => {
    if (!form.name.trim()) { setError('Name required.'); return }
    setSaving(true)
    const payload = { ...form, name: form.name.trim(), committee_id: committeeId }
    let err
    if (isEdit) {
      ;({ error: err } = await supabase.from('committee_members').update(payload).eq('id', existing.id))
    } else {
      ;({ error: err } = await supabase.from('committee_members').insert(payload))
    }
    if (err) { setError(err.message); setSaving(false); return }
    onSaved()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
      <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111827' }}>{isEdit ? 'Edit Member' : 'Add Member'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
        </div>
        {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#B91C1C' }}>{error}</div>}
        {[{ k: 'name', l: 'Full Name', p: 'Member name' }, { k: 'role', l: 'Role', p: 'e.g. President' }].map(({ k, l, p }) => (
          <div key={k} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{l}</label>
            <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={p} style={inputStyle} />
          </div>
        ))}
        <div style={{ marginBottom: 14 }}>
          <ImageUpload value={form.photo} onChange={url => setForm(f => ({ ...f, photo: url }))} label="Photo" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Contribution</label>
          <textarea value={form.contribution} onChange={e => setForm(f => ({ ...f, contribution: e.target.value }))} rows={3} placeholder="What this member contributes…" style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        {[{ k: 'linkedin_url', l: 'LinkedIn URL', p: 'https://linkedin.com/in/…' }, { k: 'telegram_url', l: 'Telegram URL', p: 'https://t.me/…' }].map(({ k, l, p }) => (
          <div key={k} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{l} <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></label>
            <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={p} style={inputStyle} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 12, border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Cancel</button>
          <button onClick={save} disabled={saving} style={{ flex: 1, padding: 12, backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14, opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {saving ? <><Loader2 size={14} className="spin" /> Saving…</> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Event modal ──────────────────────────────────────────────────────────────
function EventModal({ committeeId, existing, onClose, onSaved }) {
  const isEdit = Boolean(existing)
  const [form, setForm] = useState({
    title: existing?.title || '', description: existing?.description || '',
    date: existing?.date || '', cover: existing?.cover || '',
  })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

  const save = async () => {
    if (!form.title.trim()) { setError('Title required.'); return }
    setSaving(true)
    const payload = { ...form, title: form.title.trim(), committee_id: committeeId, date: form.date || null }
    let err
    if (isEdit) {
      ;({ error: err } = await supabase.from('committee_events').update(payload).eq('id', existing.id))
    } else {
      ;({ error: err } = await supabase.from('committee_events').insert(payload))
    }
    if (err) { setError(err.message); setSaving(false); return }
    onSaved()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 20 }}>
      <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111827' }}>{isEdit ? 'Edit Event' : 'Add Event'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
        </div>
        {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#B91C1C' }}>{error}</div>}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Title</label>
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Event name" style={inputStyle} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Date</label>
          <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Description</label>
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <ImageUpload value={form.cover} onChange={url => setForm(f => ({ ...f, cover: url }))} label="Cover Image" aspect="wide" />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 12, border: '1px solid #E2E8F0', borderRadius: 10, background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Cancel</button>
          <button onClick={save} disabled={saving} style={{ flex: 1, padding: 12, backgroundColor: '#1E3273', color: '#fff', borderRadius: 10, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: 14, opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {saving ? <><Loader2 size={14} className="spin" /> Saving…</> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Members tab ──────────────────────────────────────────────────────────────
function MembersTab({ committeeId }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)  // null | 'new' | member object

  const load = async () => {
    const { data } = await supabase.from('committee_members').select('*').eq('committee_id', committeeId).order('created_at')
    setMembers(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [committeeId])

  const remove = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return
    await supabase.from('committee_members').delete().eq('id', id)
    setMembers(ms => ms.filter(m => m.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={() => setModal('new')} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>
          <Plus size={14} /> Add Member
        </button>
      </div>
      {loading ? <div style={{ padding: 32, textAlign: 'center', color: '#94A3B8' }}><Loader2 size={16} className="spin" /></div> : members.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>No members yet.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <thead><tr style={{ backgroundColor: '#F8FAFC' }}>{['Member', 'Role', 'Contribution', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>)}</tr></thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={m.photo || `https://i.pravatar.cc/32?u=cm${m.id}`} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{m.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748B' }}>{m.role || '—'}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#94A3B8', maxWidth: 220 }}>{m.contribution ? m.contribution.slice(0, 80) + (m.contribution.length > 80 ? '…' : '') : '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setModal(m)} style={{ padding: '5px 8px', border: '1px solid #E2E8F0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#1E3273', display: 'inline-flex' }}><Pencil size={13} /></button>
                    <button onClick={() => remove(m.id, m.name)} style={{ padding: '5px 8px', border: '1px solid #FEE2E2', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#DC2626', display: 'inline-flex' }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modal !== null && (
        <MemberModal committeeId={committeeId} existing={modal === 'new' ? null : modal}
          onClose={() => setModal(null)} onSaved={() => { setModal(null); load() }} />
      )}
    </div>
  )
}

// ─── Events tab ───────────────────────────────────────────────────────────────
function EventsTab({ committeeId }) {
  const [events,  setEvents]  = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)

  const load = async () => {
    const { data } = await supabase.from('committee_events').select('*').eq('committee_id', committeeId).order('date', { ascending: false, nullsFirst: false })
    setEvents(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [committeeId])

  const remove = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    await supabase.from('committee_events').delete().eq('id', id)
    setEvents(es => es.filter(e => e.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button onClick={() => setModal('new')} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#1E3273', color: '#fff', padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>
          <Plus size={14} /> Add Event
        </button>
      </div>
      {loading ? <div style={{ padding: 32, textAlign: 'center', color: '#94A3B8' }}><Loader2 size={16} className="spin" /></div> : events.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>No events yet.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <thead><tr style={{ backgroundColor: '#F8FAFC' }}>{['Event', 'Date', 'Description', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>)}</tr></thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {ev.cover ? <img src={ev.cover} alt="" style={{ width: 48, height: 32, objectFit: 'cover', borderRadius: 4 }} /> : <div style={{ width: 48, height: 32, borderRadius: 4, backgroundColor: '#F1F5F9' }} />}
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{ev.title}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#94A3B8', whiteSpace: 'nowrap' }}>
                  {ev.date ? new Date(ev.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#94A3B8', maxWidth: 220 }}>{ev.description ? ev.description.slice(0, 80) + (ev.description.length > 80 ? '…' : '') : '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setModal(ev)} style={{ padding: '5px 8px', border: '1px solid #E2E8F0', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#1E3273', display: 'inline-flex' }}><Pencil size={13} /></button>
                    <button onClick={() => remove(ev.id, ev.title)} style={{ padding: '5px 8px', border: '1px solid #FEE2E2', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#DC2626', display: 'inline-flex' }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modal !== null && (
        <EventModal committeeId={committeeId} existing={modal === 'new' ? null : modal}
          onClose={() => setModal(null)} onSaved={() => { setModal(null); load() }} />
      )}
    </div>
  )
}

// ─── Main editor ──────────────────────────────────────────────────────────────
const EMPTY = { name: '', slug: '', tagline: '', about: '', cover: '', schools_count: '', founded_year: '', participants_count: '' }

export default function CommitteeEditor({ overrideId, hideBack }) {
  const { id: paramId } = useParams()
  const id = overrideId || paramId
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(isEdit)
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [error,   setError]   = useState('')
  const [tab,     setTab]     = useState('Info')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  useEffect(() => {
    if (!isEdit) return
    supabase.from('committees').select('*').eq('id', id).single()
      .then(({ data, error: err }) => {
        if (err) { setError('Could not load committee.'); setLoading(false); return }
        if (data) setForm({ name: data.name || '', slug: data.slug || '', tagline: data.tagline || '', about: data.about || '', cover: data.cover || '', schools_count: data.schools_count ?? '', founded_year: data.founded_year ?? '', participants_count: data.participants_count ?? '' })
        setLoading(false)
      })
  }, [id, isEdit])

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required.'); return }
    if (!form.slug.trim()) { setError('Slug is required.'); return }
    setSaving(true); setError('')
    const payload = { name: form.name.trim(), slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-'), tagline: form.tagline.trim(), about: form.about.trim(), cover: form.cover.trim(), schools_count: form.schools_count !== '' ? parseInt(form.schools_count) : null, founded_year: form.founded_year !== '' ? parseInt(form.founded_year) : null, participants_count: form.participants_count !== '' ? parseInt(form.participants_count) : null }
    let err
    if (isEdit) {
      ;({ error: err } = await supabase.from('committees').update(payload).eq('id', id))
    } else {
      ;({ error: err } = await supabase.from('committees').insert(payload))
    }
    if (err) { setError(err.message); setSaving(false); return }
    setSaved(true)
    if (!hideBack) setTimeout(() => navigate('/admin/committees'), 1200)
    else setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 12, color: '#64748B' }}><Loader2 size={18} className="spin" /> Loading…</div>

  return (
    <div style={{ padding: 32, maxWidth: 860, margin: '0 auto' }}>
      {!hideBack && (
        <button onClick={() => navigate('/admin/committees')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#1E3273', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back to Committees
        </button>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827' }}>
          {isEdit ? 'Edit Committee' : 'New Committee'}
        </h1>
        {tab === 'Info' && (
          <button onClick={handleSave} disabled={saving || saved}
            style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: saved ? '#16A34A' : '#1E3273', color: '#fff', padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, transition: 'background 0.2s' }}>
            {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />}
            {saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}
          </button>
        )}
      </div>

      {error && <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13.5, color: '#B91C1C' }}>{error}</div>}

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: 28 }}>
        {(isEdit ? TABS : ['Info']).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid #1E3273' : '2px solid transparent', color: tab === t ? '#1E3273' : '#64748B', fontWeight: tab === t ? 700 : 500, fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Info' && (
        <div style={{ backgroundColor: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          {[{ k: 'name', l: 'Name', p: 'e.g. Events Origin Committee' }, { k: 'slug', l: 'Slug', p: 'e.g. events-origin' }, { k: 'tagline', l: 'Tagline', p: 'One-line description' }].map(({ k, l, p }) => (
            <div key={k} style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{l}</label>
              <input value={form[k]} onChange={set(k)} placeholder={p} style={inputStyle} />
            </div>
          ))}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>About</label>
            <textarea value={form.about} onChange={set('about')} rows={5} placeholder="Mission and description…" style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {/* Stats */}
          <div style={{ marginBottom: 18, padding: '18px 20px', backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>About Page Stats</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { k: 'schools_count',      l: 'Schools Reached',  p: 'e.g. 5' },
                { k: 'participants_count', l: 'Participants',      p: 'e.g. 300' },
                { k: 'founded_year',       l: 'Founded Year',     p: 'e.g. 2022' },
              ].map(({ k, l, p }) => (
                <div key={k}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{l}</label>
                  <input type="number" value={form[k]} onChange={set(k)} placeholder={p} style={inputStyle} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 10 }}>Events and Members counts are auto-calculated. Leave a field blank to hide that stat.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Cover Image</label>
            <ImageUpload value={form.cover} onChange={url => setForm(f => ({ ...f, cover: url }))} label="" aspect="wide" />
          </div>
        </div>
      )}

      {tab === 'Members' && isEdit && <MembersTab committeeId={id} />}
      {tab === 'Events'  && isEdit && <EventsTab  committeeId={id} />}
    </div>
  )
}
