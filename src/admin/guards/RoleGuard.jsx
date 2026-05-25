import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RoleGuard({ children, roles }) {
  const { user, hasRole } = useAuth()

  if (!user) return <Navigate to="/admin/login" replace />
  if (!hasRole(roles)) return <Navigate to="/admin" replace />

  return children
}
