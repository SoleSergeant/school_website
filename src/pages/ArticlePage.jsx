import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { articles } from '../data/mock'

export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === Number(id))
  if (!article) return <Navigate to="/articles" />

  return (
    <div style={{ padding: '48px 16px', maxWidth: 780, margin: '0 auto' }}>
      <Link to="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#1E3273', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 32 }}>
        <ArrowLeft size={16} /> Back to Articles
      </Link>

      <span style={{ fontSize: 12, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{article.category}</span>
      <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: '#111827', margin: '12px 0 16px', lineHeight: 1.25 }}>{article.title}</h1>

      <div className="flex items-center gap-4" style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
        <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
        <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
      </div>

      <img src={article.cover} alt={article.title} style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 16, marginBottom: 36 }} />

      <div
        style={{ fontSize: 16, color: '#374151', lineHeight: 1.85 }}
        dangerouslySetInnerHTML={{ __html: article.content.replace(/<p>/g, '<p style="margin-bottom:20px">') }}
      />
    </div>
  )
}
