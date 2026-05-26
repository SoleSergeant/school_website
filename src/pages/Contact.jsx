import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '1 Qashqar Street, Fergana, Uzbekistan' },
  { icon: Phone, label: 'Phone', value: '+998 73 000 00 00' },
  { icon: Mail, label: 'Email', value: 'info@ferganaschool.uz' },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 08:00 – 17:00' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10 }}>Get in touch</p>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 36px)', color: '#111827', letterSpacing: '-0.025em', marginBottom: 12 }}>Contact Us</h1>
        <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>Reach out with any questions about admissions, campus life, or the school.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info column */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, backgroundColor: '#F8F9FC', border: '1px solid #EAECF0', borderRadius: 12, padding: '14px 18px' }}>
                <div style={{ backgroundColor: '#1E3273', borderRadius: 9, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} style={{ color: '#fff' }} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 1 }}>{label}</div>
                  <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #EAECF0' }}>
            <iframe
              title="School Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=71.75,40.37,71.82,40.41&layer=mapnik"
              style={{ width: '100%', height: 220, border: 'none', display: 'block' }}
            />
          </div>
        </div>

        {/* Form column */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #EAECF0', borderRadius: 14, padding: '32px 28px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 18, color: '#111827', letterSpacing: '-0.01em', marginBottom: 8 }}>Message sent</div>
              <div style={{ color: '#6B7280', fontSize: 14 }}>We'll get back to you within 1–2 business days.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18, color: '#111827', letterSpacing: '-0.015em', marginBottom: 24 }}>Send a message</h2>
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6, letterSpacing: '0.01em' }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                    required
                    style={{ width: '100%', padding: '10px 13px', border: '1px solid #E2E8F0', borderRadius: 9, fontSize: 14, fontFamily: 'Inter', outline: 'none', color: '#111827' }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#374151', marginBottom: 6, letterSpacing: '0.01em' }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '10px 13px', border: '1px solid #E2E8F0', borderRadius: 9, fontSize: 14, fontFamily: 'Inter', resize: 'vertical', outline: 'none', color: '#111827' }}
                />
              </div>
              <button
                type="submit"
                style={{ width: '100%', backgroundColor: '#1E3273', color: '#fff', padding: '12px', borderRadius: 9, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
