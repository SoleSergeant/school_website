import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

function TelegramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function YoutubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  )
}

const SUBJECTS = ['General Inquiry', 'Admissions', 'Media & Press', 'Partnerships', 'Other']

const socials = [
  { Icon: TelegramIcon,  label: 'Telegram',  handle: '@ferganaschool',             href: 'https://t.me/ferganaschool',               color: '#229ED9' },
  { Icon: InstagramIcon, label: 'Instagram', handle: '@fergana_presidential',       href: 'https://instagram.com/fergana_presidential', color: '#E1306C' },
  { Icon: YoutubeIcon,   label: 'YouTube',   handle: 'Fergana Presidential School', href: 'https://youtube.com/@ferganaschool',        color: '#FF0000' },
]

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [sent,    setSent]    = useState(false)
  const [sending, setSending] = useState(false)
  const [error,   setError]   = useState('')

  const [headerRef, headerVis] = useReveal()
  const [tilesRef,  tilesVis]  = useReveal()
  const [leftRef,   leftVis]   = useReveal()
  const [formRef,   formVis]   = useReveal()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    const { error: err } = await supabase.from('contact_submissions').insert({
      name:    form.name.trim(),
      email:   form.email.trim().toLowerCase(),
      subject: form.subject || 'General Inquiry',
      message: form.message.trim(),
    })
    setSending(false)
    if (err) { setError(err.message || 'Something went wrong. Please try again.'); return }
    setSent(true)
  }

  const inputBase = {
    width: '100%', padding: '12px 14px', border: '1px solid #E5DFCF', borderRadius: 2,
    fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none',
    backgroundColor: '#fff', color: '#111', transition: 'border-color 0.2s', boxSizing: 'border-box',
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ── Hero header ── */}
      <div style={{ backgroundColor: '#0A1628', padding: '80px 0 72px' }}>
        <div ref={headerRef} className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...fx(headerVis, 0) }}>
            Reach out
          </p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(40px, 5vw, 68px)', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.04, marginBottom: 20, ...fx(headerVis, 100, 28) }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, maxWidth: 460, ...fx(headerVis, 200) }}>
            Questions about admissions, campus life, or the school — we're here to help.
          </p>
        </div>
      </div>

      {/* ── Contact tiles ── */}
      <div ref={tilesRef} style={{ borderBottom: '1px solid #E5DFCF' }}>
        <div className="wrap" style={{ padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid #E5DFCF' }}>
            {[
              { icon: MapPin, label: 'Address',      value: '1 Qashqar Street\nFergana, Uzbekistan', delay: 0 },
              { icon: Phone,  label: 'Phone',         value: '+998 73 000 00 00',                     delay: 60 },
              { icon: Mail,   label: 'Email',          value: 'info@ferganaschool.uz',                 delay: 120 },
              { icon: Clock,  label: 'Office Hours',  value: 'Mon–Fri\n08:00 – 17:00',               delay: 180 },
            ].map(({ icon: Icon, label, value, delay }) => (
              <div key={label} style={{ padding: '40px 32px', borderRight: '1px solid #E5DFCF', borderBottom: '1px solid #E5DFCF', ...fx(tilesVis, delay) }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: '#F5F1E8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={15} style={{ color: '#B8882A' }} />
                </div>
                <div style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
                <div style={{ fontSize: 14, color: '#333', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="wrap" style={{ padding: '80px 32px 110px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 88, alignItems: 'start' }}>

          {/* Left — map + socials */}
          <div ref={leftRef}>

            {/* Map */}
            <div style={fx(leftVis, 0)}>
              <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Find Us</p>
              <div style={{ overflow: 'hidden', borderRadius: 2, border: '1px solid #E5DFCF', boxShadow: '0 4px 28px rgba(0,0,0,0.07)' }}>
                <iframe
                  title="School Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=71.760,40.375,71.810,40.405&layer=mapnik&marker=40.389,71.783"
                  style={{ width: '100%', height: 260, border: 'none', display: 'block' }}
                />
              </div>
              <a
                href="https://maps.google.com/?q=Fergana+Presidential+School,+Fergana,+Uzbekistan"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 11.5, fontWeight: 700, color: '#0A1628', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1.5px solid #B8882A', paddingBottom: 3, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#B8882A'}
                onMouseLeave={e => e.currentTarget.style.color = '#0A1628'}
              >
                Open in Google Maps <ArrowUpRight size={12} />
              </a>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: '#E5DFCF', margin: '48px 0' }} />

            {/* Socials */}
            <div style={fx(leftVis, 120)}>
              <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Follow Us</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {socials.map(({ Icon, label, handle, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: '1px solid #E5DFCF', borderRadius: 2, textDecoration: 'none', transition: 'border-color 0.2s, background 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = '#FAFAFA' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5DFCF'; e.currentTarget.style.background = '#fff' }}
                  >
                    <div style={{ color, flexShrink: 0 }}><Icon size={18} /></div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>{label}</div>
                      <div style={{ fontSize: 12, color: '#AAA', marginTop: 1 }}>{handle}</div>
                    </div>
                    <ArrowUpRight size={13} style={{ color: '#CCC', marginLeft: 'auto' }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef} style={fx(formVis, 80)}>
            {sent ? (
              <div style={{ padding: '64px 0' }}>
                <div style={{ width: 48, height: 1.5, backgroundColor: '#B8882A', marginBottom: 32 }} />
                <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>Message received</p>
                <h3 style={{ fontFamily: D, fontWeight: 600, fontSize: 36, color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 14 }}>
                  Thank you for reaching out.
                </h3>
                <p style={{ fontSize: 15, color: '#777', lineHeight: 1.8, maxWidth: 380 }}>
                  We'll get back to you within 1–2 business days at <strong style={{ color: '#444' }}>{form.email}</strong>.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: '#0A1628', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1.5px solid #B8882A', paddingBottom: 3 }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 34, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 8, lineHeight: 1.1 }}>
                  Send a Message
                </h2>
                <p style={{ fontSize: 14, color: '#AAA', lineHeight: 1.7, marginBottom: 36 }}>
                  Fill out the form and our team will be in touch shortly.
                </p>

                {error && (
                  <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 4, padding: '12px 16px', marginBottom: 24, fontSize: 13.5, color: '#B91C1C' }}>
                    {error}
                  </div>
                )}

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  {[
                    { name: 'name',  label: 'Full Name',  type: 'text',  placeholder: 'Your name' },
                    { name: 'email', label: 'Email',       type: 'email', placeholder: 'your@email.com' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 7, letterSpacing: '0.09em', textTransform: 'uppercase' }}>{label} *</label>
                      <input
                        type={type} placeholder={placeholder} value={form[name]} required
                        onChange={set(name)}
                        style={inputBase}
                        onFocus={e => e.target.style.borderColor = '#B8882A'}
                        onBlur={e => e.target.style.borderColor = '#E5DFCF'}
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 7, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Subject</label>
                  <select
                    value={form.subject}
                    onChange={set('subject')}
                    style={{ ...inputBase, color: form.subject ? '#111' : '#AAA', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                    onFocus={e => e.target.style.borderColor = '#B8882A'}
                    onBlur={e => e.target.style.borderColor = '#E5DFCF'}
                  >
                    <option value="">Select a subject…</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 7, letterSpacing: '0.09em', textTransform: 'uppercase' }}>Message *</label>
                  <textarea
                    rows={6} placeholder="Write your message…" value={form.message} required
                    onChange={set('message')}
                    style={{ ...inputBase, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#B8882A'}
                    onBlur={e => e.target.style.borderColor = '#E5DFCF'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  style={{ backgroundColor: '#0A1628', color: '#fff', padding: '14px 36px', borderRadius: 2, fontWeight: 700, fontSize: 12, border: 'none', cursor: sending ? 'not-allowed' : 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: sending ? 0.65 : 1, transition: 'background 0.2s, opacity 0.2s' }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#B8882A' }}
                  onMouseLeave={e => { if (!sending) e.currentTarget.style.background = '#0A1628' }}
                >
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
