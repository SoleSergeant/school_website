import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(email, password)
    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.error)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E3273', width: 56, height: 56, borderRadius: 16, marginBottom: 12 }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 20, fontFamily: 'Plus Jakarta Sans' }}>PS</span>
          </div>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 24, color: '#111827', marginBottom: 4 }}>Admin Login</h1>
          <p style={{ color: '#64748B', fontSize: 14 }}>Fergana Presidential School</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '36px 32px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
          {error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#DC2626' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="admin@ferganaschool.uz"
                required
                style={{ width: '100%', padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Inter', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  required
                  style={{ width: '100%', padding: '12px 44px 12px 14px', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 14, fontFamily: 'Inter', outline: 'none', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit"
              style={{ width: '100%', backgroundColor: '#1E3273', color: '#fff', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}>
              Log In
            </button>
          </form>

          <div style={{ marginTop: 24, padding: '16px', backgroundColor: '#F4F6FB', borderRadius: 10, fontSize: 12, color: '#64748B' }}>
            <strong>Test accounts:</strong><br />
            admin@ferganaschool.uz / admin123 (Superadmin)<br />
            media@ferganaschool.uz / media123 (Media)<br />
            writer@ferganaschool.uz / writer123 (Writer)
          </div>
        </div>
      </div>
    </div>
  )
}
