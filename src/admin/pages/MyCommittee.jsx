import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../context/AuthContext'
import CommitteeEditor from './CommitteeEditor'

export default function MyCommittee() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [committeeId, setCommitteeId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.committee_slug) { navigate('/admin'); return }
    supabase
      .from('committees')
      .select('id')
      .eq('slug', user.committee_slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { navigate('/admin'); return }
        setCommitteeId(data.id)
        setLoading(false)
      })
  }, [user, navigate])

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: '#94A3B8' }}>
      <Loader2 size={20} className="spin" /> Loading your committee…
    </div>
  )

  // Render CommitteeEditor with the committee id injected via URL param trick:
  // We pass it directly as a prop override
  return <CommitteeEditor overrideId={committeeId} hideBack />
}
