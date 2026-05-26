import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { articles } from '../data/mock'

export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === Number(id))
  if (!article) return <Navigate to="/articles" />

  return (
    <div style={{ padding: '56px 24px 96px', maxWidth: 720, margin: '0 auto' }}>
      {/* Back */}
      <Link
        to="/articles"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#6B7280', textDecoration: 'none', fontSize: 13.5, fontWeight: 500, marginBottom: 40, letterSpacing: '-0.01em' }}
        onMouseEnter={e => e.currentTarget.style.color = '#1E3273'}
        onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
      >
        <ArrowLeft size={15} /> Back to Articles
      </Link>

      {/* Category */}
      <span style={{ fontSize: 11, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{article.category}</span>

      {/* Title */}
      <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 34px)', color: '#111827', margin: '12px 0 16px', lineHeight: 1.2, letterSpacing: '-0.025em' }}>
        {article.title}
      </h1>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#9CA3AF', marginBottom: 32 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><User size={13} /> {article.author}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={13} /> {article.date}</span>
      </div>

      {/* Cover image */}
      <img
        src={article.cover}
        alt={article.title}
        style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 14, marginBottom: 44, display: 'block' }}
      />

      {/* Body */}
      <div
        style={{ fontSize: 16, color: '#374151', lineHeight: 1.85, fontFamily: 'Inter' }}
        dangerouslySetInnerHTML={{
          __html: article.content
            .replace(/<p>/g, '<p style="margin-bottom:22px; font-size:16px; line-height:1.85; color:#374151;">')
        }}
      />
    </div>
  )
}
