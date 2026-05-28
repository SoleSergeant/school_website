import { createContext, useContext, useState } from 'react'
import { supabase } from '../../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admin_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    // Fetch user from Supabase admin_users table
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, name, email, password_hash, role, committee_slug')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (error || !data) return { success: false, error: 'Invalid email or password' }
    if (data.password_hash !== password) return { success: false, error: 'Invalid email or password' }

    const safeUser = { id: data.id, name: data.name, email: data.email, role: data.role, committee_slug: data.committee_slug || null }
    setUser(safeUser)
    localStorage.setItem('admin_user', JSON.stringify(safeUser))
    return { success: true, user: safeUser }
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
