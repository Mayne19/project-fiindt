import { useEffect, useState } from 'react'
import { fetchCMSArticle, type CMSArticle } from '../lib/ideasStudio'

export interface UseCMSArticleResult {
  article: CMSArticle | null
  loading: boolean
  error: string | null
}

export function useCMSArticle(
  vertical: string | undefined,
  slug: string | undefined,
): UseCMSArticleResult {
  const [article, setArticle] = useState<CMSArticle | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!vertical || !slug) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setArticle(null)
    fetchCMSArticle(vertical, slug)
      .then((data) => { if (!cancelled) setArticle(data) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'CMS error')
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [vertical, slug])

  return { article, loading, error }
}
