import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Download, BookOpen } from 'lucide-react'
import { articles } from '../data/mock'
import { useState, useEffect } from 'react'
import { fx, fxFade } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"

// Convert Google Drive share link → embeddable preview URL
function getGDriveEmbed(url) {
  if (!url) return null
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`
  return url
}

function getGDriveDownload(url) {
  if (!url) return null
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`
  return url
}

// ─── Full-screen PDF reader ───────────────────────────────────────────────────
function PDFReader({ article }) {
  const embedUrl   = getGDriveEmbed(article.pdf_url)
  const downloadUrl = getGDriveDownload(article.pdf_url)
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 68px)', backgroundColor: '#1C1C2E' }}>

      {/* ── Reader top bar ── */}
      <div style={{
        height: 52,
        backgroundColor: '#0A1628',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', gap: 16, flexShrink: 0,
      }}>
        <Link to="/magazine" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: 11.5, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, flexShrink: 0, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <ArrowLeft size={13} /> Magazine
        </Link>

        <div style={{ fontFamily: D, fontSize: 16, color: '#fff', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          {article.title}
          {article.issue_number && (
            <span style={{ fontSize: 11, color: '#B8882A', marginLeft: 10, fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.06em' }}>
              {article.issue_number}
            </span>
          )}
        </div>

        {downloadUrl && (
          <a href={downloadUrl} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#B8882A', color: '#fff', padding: '7px 16px', borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0, transition: 'background-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a07722'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#B8882A'}
          >
            <Download size={12} /> Download
          </a>
        )}
      </div>

      {/* ── PDF iframe ── */}
      <div style={{ flex: 1, position: 'relative' }}>
        {!loaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#1C1C2E' }}>
            <BookOpen size={36} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em' }}>Loading issue…</span>
          </div>
        )}
        <iframe
          src={embedUrl}
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allow="autoplay"
          title={article.title}
        />
      </div>
    </div>
  )
}

// ─── HTML article (no PDF) ───────────────────────────────────────────────────
function HTMLArticle({ article }) {
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80)
    return () => clearTimeout(t)
  }, [article.id])

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 32px 110px' }}>

        <div style={fx(vis, 0)}>
          <Link to="/magazine"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#AAA', marginBottom: 52, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.color = '#0A1628'}
            onMouseLeave={e => e.currentTarget.style.color = '#AAA'}
          >
            <ArrowLeft size={13} /> Back to Magazine
          </Link>
        </div>

        <span style={{ fontSize: 9.5, color: '#B8882A', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', ...fx(vis, 80) }}>
          {article.category}{article.issue_number ? ` · ${article.issue_number}` : ''}
        </span>

        <h1 style={{ fontFamily: D, fontWeight: 600, fontSize: 'clamp(30px, 5vw, 48px)', color: '#0A1628', margin: '14px 0 20px', lineHeight: 1.12, letterSpacing: '-0.01em', ...fx(vis, 160, 28) }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#BBB', marginBottom: 40, paddingBottom: 36, borderBottom: '1px solid #EDE8DC', alignItems: 'center', ...fx(vis, 260) }}>
          <span style={{ fontWeight: 500, color: '#999' }}>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
        </div>

        <div style={{ marginBottom: 52, ...fxFade(vis, 320) }}>
          <img src={article.cover} alt={article.title}
            style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
        </div>

        {article.excerpt && (
          <p style={{ fontSize: 17, color: '#555', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid #EDE8DC', ...fx(vis, 400) }}>
            {article.excerpt}
          </p>
        )}

        {article.content && (
          <div
            style={{ fontSize: 16.5, color: '#333', lineHeight: 1.95, ...fx(vis, 460) }}
            dangerouslySetInnerHTML={{
              __html: article.content.replace(
                /<p>/g,
                '<p style="margin-bottom:28px; font-size:16.5px; line-height:1.95; color:#333;">'
              ),
            }}
          />
        )}

        {!article.content && !article.pdf_url && (
          <div style={{ textAlign: 'center', padding: '60px 0', ...fx(vis, 400) }}>
            <BookOpen size={32} style={{ color: '#DDD', marginBottom: 16 }} />
            <p style={{ fontSize: 14, color: '#AAA' }}>This issue's content is coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === Number(id))

  if (!article) return <Navigate to="/magazine" />

  // If a PDF is attached — show the full-screen reader
  if (article.pdf_url) return <PDFReader article={article} />

  // Otherwise — show the HTML article layout
  return <HTMLArticle article={article} />
}
