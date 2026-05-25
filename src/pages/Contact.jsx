import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ padding: '56px 16px', maxWidth: 1000, margin: '0 auto' }}>
      <div className="text-center mb-12">
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 36, color: '#1E3273', marginBottom: 12 }}>Contact Us</h1>
        <p style={{ color: '#64748B', fontSize: 16 }}>We'd love to hear from you. Reach out with any questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info */}
        <div>
          <div className="flex flex-col gap-5">
            {[
              { icon: MapPin, label: 'Address', value: '1 Qashqar Street, Fergana, Uzbekistan' },
              { icon: Phone, label: 'Phone', value: '+998 73 000 00 00' },
              { icon: Mail, label: 'Email', value: 'info@ferganaschool.uz' },
              { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 08:00 – 17:00' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4" style={{ backgroundColor: '#F4F6FB', borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ backgroundColor: '#1E3273', borderRadius: 10, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} style={{ color: '#fff' }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 15, color: '#111827', fontWeight: 500 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Embedded map placeholder */}
          <div style={{ marginTop: 24, borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            <iframe
              title="School Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=71.75,40.37,71.82,40.41&layer=mapnik"
              style={{ width: '100%', height: 220, border: 'none', display: 'block' }}
            />
          </div>
        </div>

        {/* Form */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: '36px 32px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827', marginBottom: 8 }}>Message Sent!</div>
              <div style={{ color: '#64748B', fontSize: 14 }}>We'll get back to you within 1–2 business days.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 20, color: '#111827', marginBottom: 24 }}>Send a Message</h2>
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                    required
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Inter', outline: 'none' }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '11px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Inter', resize: 'vertical', outline: 'none' }}
                />
              </div>
              <button
                type="submit"
                style={{ width: '100%', backgroundColor: '#1E3273', color: '#fff', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}
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
