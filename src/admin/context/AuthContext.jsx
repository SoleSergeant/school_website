import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock admin users for MVP
const MOCK_USERS = [
  { id: 1, name: 'Admin Superadmin', email: 'admin@ferganaschool.uz', password: 'admin123', role: 'superadmin' },
  { id: 2, name: 'Media Manager', email: 'media@ferganaschool.uz', password: 'media123', role: 'media' },
  { id: 3, name: 'Content Writer', email: 'writer@ferganaschool.uz', password: 'writer123', role: 'writer' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admin_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      localStorage.setItem('admin_user', JSON.stringify(safeUser))
      return { success: true, user: safeUser }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('admin_user')
  }

  const hasRole = (roles) => {
    if (!user) return false
    if (!roles || roles.length === 0) return true
    return roles.includes(user.role)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
