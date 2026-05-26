import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'

const info = [
  { icon: MapPin, label: 'Address',      value: '1 Qashqar Street, Fergana, Uzbekistan' },
  { icon: Phone,  label: 'Phone',        value: '+998 73 000 00 00' },
  { icon: Mail,   label: 'Email',        value: 'info@ferganaschool.uz' },
  { icon: Clock,  label: 'Office Hours', value: 'Mon–Fri, 08:00–17:00' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '80px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 64, paddingBottom: 32, borderBottom: '1px solid #E5E3DC' }}>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 52px)', color: '#111', letterSpacing: '-0.04em', marginBottom: 12 }}>
            Get in touch
          </h1>
          <p style={{ fontSize: 15, color: '#777', lineHeight: 1.8, maxWidth: 400 }}>
            Reach out with any questions about admissions, campus life, or the school.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 72, alignItems: 'start' }}>

          {/* Info */}
          <div>
            <div style={{ marginBottom: 36 }}>
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 0', borderBottom: '1px solid #E5E3DC' }}>
                  <Icon size={15} style={{ color: '#C9A84C', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: '#bbb', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, color: '#333' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #E5E3DC' }}>
              <iframe
                title="School Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=71.75,40.37,71.82,40.41&layer=mapnik"
                style={{ width: '100%', height: 220, border: 'none', display: 'block' }}
              />
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ padding: '48px 0' }}>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 22, color: '#111', letterSpacing: '-0.02em', marginBottom: 8 }}>Message sent</h3>
                <p style={{ fontSize: 14, color: '#777' }}>We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111', letterSpacing: '-0.015em', marginBottom: 28 }}>Send a message</h2>
                {[
                  { name: 'name',  label: 'Full Name', type: 'text',  placeholder: 'Your name' },
                  { name: 'email', label: 'Email',     type: 'email', placeholder: 'your@email.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#555', marginBottom: 6, letterSpacing: '0.02em' }}>{label}</label>
                    <input
                      type={type} placeholder={placeholder} value={form[name]} required
                      onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E3DC', borderRadius: 7, fontSize: 14, fontFamily: 'Inter', outline: 'none', backgroundColor: '#fff', color: '#111' }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#555', marginBottom: 6, letterSpacing: '0.02em' }}>Message</label>
                  <textarea
                    rows={5} placeholder="Write your message..." value={form.message} required
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E3DC', borderRadius: 7, fontSize: 14, fontFamily: 'Inter', resize: 'vertical', outline: 'none', backgroundColor: '#fff', color: '#111' }}
                  />
                </div>
                <button type="submit" style={{ backgroundColor: '#0D1B36', color: '#fff', padding: '12px 24px', borderRadius: 7, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
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
