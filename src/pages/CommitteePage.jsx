import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, Users, Calendar, ChevronDown, ChevronUp, Leaf } from 'lucide-react'
import { supabase } from '../lib/supabase'

const D = "'Cormorant Garamond', Georgia, serif"

function LinkedInIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function TelegramIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

// ── Tab: About ────────────────────────────────────────────────────────────────
function AboutTab({ committee }) {
  const [memberCount, setMemberCount] = useState(null)
  const [eventCount,  setEventCount]  = useState(null)

  useEffect(() => {
    supabase.from('committee_members').select('id', { count: 'exact', head: true })
      .eq('committee_id', committee.id)
      .then(({ count }) => setMemberCount(count ?? 0))
    supabase.from('committee_events').select('id', { count: 'exact', head: true })
      .eq('committee_id', committee.id)
      .then(({ count }) => setEventCount(count ?? 0))
  }, [committee.id])

  const stats = [
    committee.schools_count      > 0 ? { label: 'Schools Reached',    value: committee.schools_count,      suffix: '+' } : null,
    eventCount                   > 0 ? { label: 'Events Organized',    value: eventCount                               } : null,
    memberCount                  > 0 ? { label: 'Members',             value: memberCount                              } : null,
    committee.participants_count > 0 ? { label: 'Participants',        value: committee.participants_count, suffix: '+' } : null,
    committee.initiatives_count  > 0 ? { label: 'Eco Initiatives',     value: committee.initiatives_count              } : null,
    committee.waste_collected_kg > 0 ? { label: 'Waste Collected (kg)', value: committee.waste_collected_kg, suffix: 'kg', noSuffix: true } : null,
    committee.founded_year           ? { label: 'Est.',                 value: committee.founded_year,       isYear: true } : null,
  ].filter(Boolean)

  return (
    <div>
      {/* Stats row */}
      {stats.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: '1px solid #E5DFCF', borderLeft: '1px solid #E5DFCF', marginBottom: 64 }}>
          {stats.map(({ label, value, suffix, isYear, noSuffix }) => (
            <div key={label} style={{ flex: '1 1 160px', padding: '40px 36px', borderRight: '1px solid #E5DFCF', borderBottom: '1px solid #E5DFCF' }}>
              <div style={{ fontFamily: D, fontWeight: 600, fontSize: isYear ? 38 : 52, color: '#0A1628', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {value}{!isYear && !noSuffix && suffix}
              </div>
              <div style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 12 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* About text */}
      {committee.about ? (
        <p style={{ fontSize: 16.5, color: '#333', lineHeight: 1.9, maxWidth: 680 }}>{committee.about}</p>
      ) : (
        <p style={{ fontSize: 15, color: '#AAA' }}>No description added yet.</p>
      )}
    </div>
  )
}

// ── Tab: Members ──────────────────────────────────────────────────────────────
function MembersTab({ committeeId }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('committee_members')
      .select('*')
      .eq('committee_id', committeeId)
      .order('created_at', { ascending: true })
      .then(({ data }) => { setMembers(data || []); setLoading(false) })
  }, [committeeId])

  if (loading) return (
    <div style={{ padding: '40px 0', display: 'flex', alignItems: 'center', gap: 10, color: '#AAA' }}>
      <Loader2 size={18} className="spin" /> Loading members…
    </div>
  )

  if (members.length === 0) return (
    <div style={{ padding: '60px 0', textAlign: 'center' }}>
      <Users size={32} style={{ color: '#DDD', marginBottom: 16, display: 'block', margin: '0 auto 16px' }} />
      <p style={{ fontSize: 14, color: '#AAA' }}>No members listed yet.</p>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {members.map(m => (
        <div key={m.id} style={{ backgroundColor: '#fff', border: '1px solid #E5DFCF', borderRadius: 4, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <img src={m.photo || `https://i.pravatar.cc/80?u=cm${m.id}`} alt={m.name}
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 2 }}>{m.name}</div>
              {m.role && <div style={{ fontSize: 11.5, color: '#B8882A', fontWeight: 600, letterSpacing: '0.04em' }}>{m.role}</div>}
            </div>
          </div>
          {m.contribution && (
            <>
              <div style={{ width: 24, height: 1.5, backgroundColor: '#B8882A', marginBottom: 12 }} />
              <p style={{ fontSize: 13.5, color: '#555', lineHeight: 1.65, marginBottom: (m.linkedin_url || m.telegram_url) ? 16 : 0 }}>{m.contribution}</p>
            </>
          )}
          {(m.linkedin_url || m.telegram_url) && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap', marginTop: 'auto', paddingTop: 16 }}>
              {m.linkedin_url && (
                <a href={m.linkedin_url} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#0A1628', textDecoration: 'none', padding: '5px 11px', border: '1.5px solid #E5DFCF', borderRadius: 4, transition: 'border-color 0.2s, color 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0077B5'; e.currentTarget.style.color = '#0077B5' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5DFCF'; e.currentTarget.style.color = '#0A1628' }}
                ><LinkedInIcon size={12} /> LinkedIn</a>
              )}
              {m.telegram_url && (
                <a href={m.telegram_url} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#0A1628', textDecoration: 'none', padding: '5px 11px', border: '1.5px solid #E5DFCF', borderRadius: 4, transition: 'border-color 0.2s, color 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#229ED9'; e.currentTarget.style.color = '#229ED9' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5DFCF'; e.currentTarget.style.color = '#0A1628' }}
                ><TelegramIcon size={12} /> Telegram</a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Tab: Events ───────────────────────────────────────────────────────────────
function EventsTab({ committeeId }) {
  const [events,   setEvents]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    supabase
      .from('committee_events')
      .select('*')
      .eq('committee_id', committeeId)
      .order('date', { ascending: false, nullsFirst: false })
      .then(({ data }) => { setEvents(data || []); setLoading(false) })
  }, [committeeId])

  if (loading) return (
    <div style={{ padding: '40px 0', display: 'flex', alignItems: 'center', gap: 10, color: '#AAA' }}>
      <Loader2 size={18} className="spin" /> Loading events…
    </div>
  )

  if (events.length === 0) return (
    <div style={{ padding: '60px 0', textAlign: 'center' }}>
      <Calendar size={32} style={{ color: '#DDD', display: 'block', margin: '0 auto 16px' }} />
      <p style={{ fontSize: 14, color: '#AAA' }}>No events yet.</p>
    </div>
  )

  const visible = expanded ? events : events.slice(0, 3)
  const hasMore = events.length > 3

  const EventRow = ({ ev, i, list }) => (
    <div key={ev.id} style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 48, padding: '48px 0', borderBottom: i < list.length - 1 ? '1px solid #E5DFCF' : 'none', alignItems: 'flex-start' }}>
      <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', borderRadius: 2, backgroundColor: '#F5F1E8', boxShadow: '0 2px 16px rgba(0,0,0,0.09)' }}>
        {ev.cover
          ? <img src={ev.cover} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={28} style={{ color: '#CCC' }} /></div>
        }
      </div>
      <div style={{ paddingTop: 4 }}>
        {ev.date && (
          <span style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {new Date(ev.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        )}
        <h3 style={{ fontFamily: D, fontWeight: 600, fontSize: 26, color: '#0A1628', margin: '10px 0 16px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{ev.title}</h3>
        {ev.description && <p style={{ fontSize: 14.5, color: '#555', lineHeight: 1.85, marginBottom: ev.telegram_url ? 20 : 0 }}>{ev.description}</p>}
        {ev.telegram_url && (
          <a href={ev.telegram_url} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', backgroundColor: '#229ED9', color: '#fff', borderRadius: 4, fontSize: 12.5, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.03em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <TelegramIcon size={14} /> More photos &amp; details on Telegram
          </a>
        )}
      </div>
    </div>
  )

  return (
    <div>
      {/* Latest 3 — always visible */}
      <div>
        {visible.map((ev, i) => <EventRow key={ev.id} ev={ev} i={i} list={visible} />)}
      </div>

      {/* Toggle */}
      {hasMore && (
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', border: '1.5px solid #0A1628', borderRadius: 2, background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#0A1628', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'background 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0A1628'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0A1628' }}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Show Less' : `Show ${events.length - 3} More Event${events.length - 3 !== 1 ? 's' : ''}`}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
const TABS = ['About', 'Members', 'Events']

export default function CommitteePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [committee, setCommittee] = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [activeTab, setActiveTab] = useState('About')

  useEffect(() => {
    setLoading(true)
    setActiveTab('About')
    supabase.from('committees').select('*').eq('slug', slug).single()
      .then(({ data, error }) => {
        if (error || !data) { navigate('/committees'); return }
        setCommittee(data)
        setLoading(false)
      })
  }, [slug, navigate])

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#AAA' }}>
      <Loader2 size={20} className="spin" /> Loading…
    </div>
  )

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: committee.has_green_flag ? 'linear-gradient(135deg, #0A1628 0%, #071C11 100%)' : '#0A1628', padding: '56px 0 0' }}>
        <div className="wrap" style={{ paddingBottom: 0 }}>
          <Link to="/committees"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: 32, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
          >
            <ArrowLeft size={13} /> Committees
          </Link>

          {/* Green Flag badge */}
          {committee.has_green_flag && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '7px 14px', marginBottom: 20 }}>
              <Leaf size={13} style={{ color: '#4ADE80' }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: '#4ADE80', letterSpacing: '0.12em', textTransform: 'uppercase' }}>International Green Flag Certified</span>
            </div>
          )}

          <p style={{ fontSize: 10, color: committee.has_green_flag ? '#4ADE80' : '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>
            Student committee
          </p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(34px, 5vw, 56px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 12 }}>
            {committee.name}
          </h1>
          {committee.tagline && (
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 480, marginBottom: 40 }}>
              {committee.tagline}
            </p>
          )}

          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 28px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? `2px solid ${committee.has_green_flag ? '#4ADE80' : '#B8882A'}` : '2px solid transparent',
                  color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.45)',
                  fontSize: 13,
                  fontWeight: activeTab === tab ? 700 : 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { if (activeTab !== tab) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
                onMouseLeave={e => { if (activeTab !== tab) e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="wrap" style={{ padding: '56px 32px 100px' }}>
        {activeTab === 'About'   && <AboutTab   committee={committee} />}
        {activeTab === 'Members' && <MembersTab committeeId={committee.id} />}
        {activeTab === 'Events'  && <EventsTab  committeeId={committee.id} />}
      </div>
    </div>
  )
}
