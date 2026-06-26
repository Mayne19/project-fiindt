import { useEffect, useState } from 'react'
import { fetchCMSArticles, type CMSArticleListItem, type FetchArticlesParams } from '../lib/ideasStudio'

export interface UseCMSArticlesResult {
  articles: CMSArticleListItem[]
  loading: boolean
  error: string | null
}

export function useCMSArticles(
  vertical: string | undefined,
  params?: FetchArticlesParams,
): UseCMSArticlesResult {
  const [articles, setArticles] = useState<CMSArticleListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Stringify params to use as stable dep (objects change reference every render)
  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    if (!vertical) return
    let cancelled = false
    setLoading(true)
    setError(null)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const p = paramsKey ? (JSON.parse(paramsKey) as FetchArticlesParams) : undefined
    fetchCMSArticles(vertical, p)
      .then((data) => { if (!cancelled) setArticles(data) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'CMS error')
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  // paramsKey is the stable serialization of params — intentional
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertical, paramsKey])

  return { articles, loading, error }
}
