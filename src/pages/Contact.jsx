import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'
import { useReveal, fx } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

const info = [
  { icon: MapPin, label: 'Address',      value: '1 Qashqar Street, Fergana, Uzbekistan' },
  { icon: Phone,  label: 'Phone',        value: '+998 73 000 00 00' },
  { icon: Mail,   label: 'Email',        value: 'info@ferganaschool.uz' },
  { icon: Clock,  label: 'Office Hours', value: 'Mon–Fri, 08:00–17:00' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const [headerRef, headerVis] = useReveal()
  const [infoRef,   infoVis]   = useReveal()
  const [formRef,   formVis]   = useReveal()

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#F5F1E8', borderBottom: '1px solid #E5DFCF', padding: '56px 0 52px' }}>
        <div ref={headerRef} className="wrap">
          <p style={{ fontSize: 10, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, ...fx(headerVis, 0) }}>Reach out</p>
          <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(38px, 5vw, 60px)', color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 14, ...fx(headerVis, 100, 28) }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: 15, color: '#6A6A7A', lineHeight: 1.8, maxWidth: 400, ...fx(headerVis, 200) }}>
            Questions about admissions, campus life, or the school — we're here to help.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ padding: '72px 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'start' }}>

          {/* Info */}
          <div ref={infoRef}>
            <div style={{ marginBottom: 40 }}>
              {info.map(({ icon: Icon, label, value }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 0', borderBottom: '1px solid #EDE8DC', ...fx(infoVis, i * 70) }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#F5F1E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon size={14} style={{ color: '#B8882A' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: '#CCC', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 14, color: '#333' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ overflow: 'hidden', border: '1px solid #E5DFCF', ...fx(infoVis, info.length * 70) }}>
              <iframe
                title="School Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=71.75,40.37,71.82,40.41&layer=mapnik"
                style={{ width: '100%', height: 220, border: 'none', display: 'block' }}
              />
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} style={fx(formVis, 80)}>
            {sent ? (
              <div style={{ padding: '56px 0' }}>
                <div style={{ width: 40, height: 1.5, backgroundColor: '#B8882A', marginBottom: 24 }} />
                <h3 style={{ fontFamily: D, fontWeight: 600, fontSize: 28, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 10 }}>Message sent.</h3>
                <p style={{ fontSize: 14.5, color: '#777', lineHeight: 1.8 }}>We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <h2 style={{ fontFamily: D, fontWeight: 600, fontSize: 26, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 32 }}>Send a Message</h2>
                {[
                  { name: 'name',  label: 'Full Name', type: 'text',  placeholder: 'Your name' },
                  { name: 'email', label: 'Email',     type: 'email', placeholder: 'your@email.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name} style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</label>
                    <input type={type} placeholder={placeholder} value={form[name]} required
                      onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                      style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DFCF', borderRadius: 2, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', backgroundColor: '#fff', color: '#111', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = '#B8882A'}
                      onBlur={e => e.target.style.borderColor = '#E5DFCF'}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Message</label>
                  <textarea rows={5} placeholder="Write your message..." value={form.message} required
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DFCF', borderRadius: 2, fontSize: 14, fontFamily: 'Inter, sans-serif', resize: 'vertical', outline: 'none', backgroundColor: '#fff', color: '#111', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#B8882A'}
                    onBlur={e => e.target.style.borderColor = '#E5DFCF'}
                  />
                </div>
                <button type="submit" style={{ backgroundColor: '#0A1628', color: '#fff', padding: '13px 32px', borderRadius: 2, fontWeight: 600, fontSize: 12, border: 'none', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
