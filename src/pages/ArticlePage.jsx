import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { articles } from '../data/mock'

const D = "'Cormorant Garamond', Georgia, serif"

export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === Number(id))
  if (!article) return <Navigate to="/articles" />

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 32px 110px' }}>

        {/* Back */}
        <Link to="/articles"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#AAA', marginBottom: 52, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}
          onMouseEnter={e => e.currentTarget.style.color = '#0A1628'}
          onMouseLeave={e => e.currentTarget.style.color = '#AAA'}
        >
          <ArrowLeft size={13} /> Back to News
        </Link>

        {/* Category */}
        <span style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{article.category}</span>

        {/* Title */}
        <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(30px, 5vw, 48px)', color: '#0A1628', margin: '14px 0 20px', lineHeight: 1.12, letterSpacing: '-0.01em' }}>
          {article.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#BBB', marginBottom: 40, paddingBottom: 36, borderBottom: '1px solid #EDE8DC', alignItems: 'center' }}>
          <span style={{ fontWeight: 500, color: '#999' }}>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
        </div>

        {/* Cover */}
        <img
          src={article.cover}
          alt={article.title}
          style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block', marginBottom: 52 }}
        />

        {/* Body */}
        <div
          style={{ fontSize: 16.5, color: '#333', lineHeight: 1.95 }}
          dangerouslySetInnerHTML={{
            __html: article.content.replace(
              /<p>/g,
              '<p style="margin-bottom:28px; font-size:16.5px; line-height:1.95; color:#333;">'
            ),
          }}
        />
      </div>
    </div>
  )
}
