import { useState, useEffect } from 'react'
import { Loader2, Trash2, Mail, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const SUBJECT_COLORS = {
  'General Inquiry': { bg: '#F1F5F9', text: '#475569' },
  'Admissions':      { bg: '#EEF2FF', text: '#3730A3' },
  'Media & Press':   { bg: '#FEF3C7', text: '#92400E' },
  'Partnerships':    { bg: '#D1FAE5', text: '#065F46' },
  'Other':           { bg: '#F3F4F6', text: '#4B5563' },
}

function Badge({ subject }) {
  const style = SUBJECT_COLORS[subject] || SUBJECT_COLORS['Other']
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, backgroundColor: style.bg, color: style.text, whiteSpace: 'nowrap' }}>
      {subject || 'General Inquiry'}
    </span>
  )
}

function MessageRow({ msg, onDelete }) {
  const [open, setOpen] = useState(false)
  const date = new Date(msg.created_at)
  const dateStr = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', transition: 'box-shadow 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Header row */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', cursor: 'pointer', userSelect: 'none' }}
      >
        {/* Avatar */}
        <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1E3273' }}>{msg.name?.[0]?.toUpperCase() || '?'}</span>
        </div>

        {/* Name + email */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 2 }}>{msg.name}</div>
          <div style={{ fontSize: 12, color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.email}</div>
        </div>

        {/* Subject badge */}
        <Badge subject={msg.subject} />

        {/* Date */}
        <div style={{ fontSize: 12, color: '#94A3B8', textAlign: 'right', flexShrink: 0 }}>
          <div>{dateStr}</div>
          <div>{timeStr}</div>
        </div>

        {/* Expand toggle */}
        <div style={{ color: '#CBD5E1', marginLeft: 4 }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded body */}
      {open && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid #F1F5F9' }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginTop: 16, marginBottom: 20 }}>
            {msg.message}
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Your message')}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: '#1E3273', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              <Mail size={13} /> Reply via Email
            </a>
            <button
              onClick={() => onDelete(msg.id)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#B91C1C', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ContactSubmissions() {
  const [messages, setMessages] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('All')

  const [dbError, setDbError] = useState('')

  const load = async () => {
    setLoading(true)
    setDbError('')
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setDbError(error.message)
    setMessages(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await supabase.from('contact_submissions').delete().eq('id', id)
    setMessages(ms => ms.filter(m => m.id !== id))
  }

  const subjects = ['All', ...Array.from(new Set(messages.map(m => m.subject || 'General Inquiry')))]
  const visible  = filter === 'All' ? messages : messages.filter(m => (m.subject || 'General Inquiry') === filter)

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 26, color: '#111827', marginBottom: 4 }}>
            Contact Messages
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            {loading ? '…' : `${messages.length} message${messages.length !== 1 ? 's' : ''} received`}
          </p>
        </div>
        <button
          onClick={load}
          style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#F8FAFC', color: '#374151', padding: '10px 16px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: '1px solid #E2E8F0', cursor: 'pointer' }}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* DB error */}
      {dbError && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 13.5, color: '#B91C1C' }}>
          <strong>Database error:</strong> {dbError}
          <div style={{ marginTop: 6, fontSize: 12.5, color: '#DC2626' }}>
            Make sure you've created the <code>contact_submissions</code> table in Supabase and added the required RLS policies (see below).
          </div>
        </div>
      )}

      {/* Subject filter chips */}
      {!loading && messages.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.15s',
                backgroundColor: filter === s ? '#1E3273' : '#F1F5F9',
                color: filter === s ? '#fff' : '#64748B',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94A3B8', padding: '40px 0' }}>
          <Loader2 size={18} className="spin" /> Loading messages…
        </div>
      ) : visible.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94A3B8' }}>
          <Mail size={36} style={{ display: 'block', margin: '0 auto 16px', opacity: 0.3 }} />
          <p style={{ fontSize: 15 }}>{messages.length === 0 ? 'No messages yet.' : 'No messages in this category.'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.map(msg => (
            <MessageRow key={msg.id} msg={msg} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
