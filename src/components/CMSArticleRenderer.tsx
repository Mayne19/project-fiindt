import type { CSSProperties } from 'react'
import { parseFaqJson, parseCalloutsJson, type CMSArticle } from '../lib/ideasStudio'

interface Props {
  article: CMSArticle
  verticalColor?: string
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function CMSArticleRenderer({ article, verticalColor }: Props) {
  const faqs = parseFaqJson(article.faq_json)
  const callouts = parseCalloutsJson(article.callouts_json)
  const accentColor = verticalColor ?? article.category_color ?? '#47c971'

  return (
    <div
      className="cms-article"
      style={{ '--article-color': accentColor } as CSSProperties}
    >
      {article.cover_image_url && (
        <img
          className="cms-cover"
          src={article.cover_image_url}
          alt={article.title}
        />
      )}

      <div className="cms-header">
        {article.category && (
          <span
            className="cms-category-badge"
            style={{ '--badge-color': accentColor } as CSSProperties}
          >
            {article.category.name}
          </span>
        )}
        <h1 className="cms-title">{article.title}</h1>
        {article.excerpt && (
          <p className="cms-excerpt">{article.excerpt}</p>
        )}
        <div className="cms-meta">
          {article.author_name && <span>{article.author_name}</span>}
          {article.published_at && <span>{formatDate(article.published_at)}</span>}
          {article.reading_time_minutes != null && (
            <span>{article.reading_time_minutes} min de lecture</span>
          )}
        </div>
      </div>

      {callouts.length > 0 && (
        <div className="cms-callouts">
          {callouts.map((callout, i) => (
            <div
              key={i}
              className="cms-callout"
              style={{
                background: callout.colors?.background,
                borderColor: callout.colors?.border,
                color: callout.colors?.text,
              }}
            >
              {callout.title && (
                <p className="cms-callout-title">{callout.title}</p>
              )}
              {callout.body_html && (
                <div
                  className="cms-callout-body"
                  dangerouslySetInnerHTML={{ __html: callout.body_html }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {article.content && (
        <div
          className="cms-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      )}

      {faqs.length > 0 && (
        <div className="cms-faq">
          <h2 className="cms-faq-title">Questions fréquentes</h2>
          <div className="cms-faq-list">
            {faqs.map((item, i) => (
              <div key={i} className="cms-faq-item">
                <h3 className="cms-faq-question">{item.question}</h3>
                <p className="cms-faq-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
