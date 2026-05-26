import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { articles } from '../data/mock'

export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === Number(id))
  if (!article) return <Navigate to="/articles" />

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px 96px' }}>

        <Link
          to="/articles"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#999', marginBottom: 48 }}
          onMouseEnter={e => e.currentTarget.style.color = '#111'}
          onMouseLeave={e => e.currentTarget.style.color = '#999'}
        >
          <ArrowLeft size={14} /> Back
        </Link>

        <span style={{ fontSize: 10.5, color: '#C9A84C', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{article.category}</span>

        <h1 style={{ fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, fontSize: 'clamp(26px, 4vw, 38px)', color: '#111', margin: '12px 0 20px', lineHeight: 1.15, letterSpacing: '0em' }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#bbb', marginBottom: 36, paddingBottom: 32, borderBottom: '1px solid #E5E3DC' }}>
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
        </div>

        <img
          src={article.cover}
          alt={article.title}
          style={{ width: '100%', height: 340, objectFit: 'cover', borderRadius: 10, marginBottom: 48 }}
        />

        <div
          style={{ fontSize: 16, color: '#444', lineHeight: 1.9 }}
          dangerouslySetInnerHTML={{
            __html: article.content.replace(/<p>/g, '<p style="margin-bottom:24px; font-size:16px; line-height:1.9; color:#444;">')
          }}
        />

      </div>
    </div>
  )
}
