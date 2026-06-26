import { getProjectId } from './verticalProjects'

const BASE_URL = 'https://ideas-studio-six.vercel.app'

// ─── CMS types ────────────────────────────────────────────────────────────────

export interface CMSCategory {
  id: string
  name: string
  slug: string
  color: string | null
}

export interface CMSArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: CMSCategory | null
  category_slug: string | null
  category_color: string | null
  main_keyword: string | null
  meta_title: string | null
  meta_description: string | null
  cover_image_url: string | null
  author_name: string | null
  reading_time_minutes: number | null
  faq_json: string | null
  callouts_json: string | null
  published_at: string | null
  updated_at: string
  has_draft_changes: boolean | null
  // Fields coming soon from Ideas Studio (not yet in public API):
  sub_niche?: string | null
  featured?: boolean | null
}

export interface CMSArticleListItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: CMSCategory | null
  category_slug: string | null
  category_color: string | null
  cover_image_url: string | null
  author_name: string | null
  reading_time_minutes: number | null
  published_at: string | null
  sub_niche?: string | null
  featured?: boolean | null
}

export interface CMSFAQItem {
  question: string
  answer: string
}

export interface CMSCallout {
  template_id?: string
  template_key?: string
  label?: string
  title?: string
  style?: string
  source?: string
  body_html?: string
  body_text?: string
  colors?: {
    background?: string
    border?: string
    text?: string
  }
}

// ─── JSON parsers ─────────────────────────────────────────────────────────────

export function parseFaqJson(faqJson: string | null): CMSFAQItem[] {
  if (!faqJson) return []
  try {
    const parsed: unknown = JSON.parse(faqJson)
    return Array.isArray(parsed) ? (parsed as CMSFAQItem[]) : []
  } catch {
    return []
  }
}

export function parseCalloutsJson(calloutsJson: string | null): CMSCallout[] {
  if (!calloutsJson) return []
  try {
    const parsed: unknown = JSON.parse(calloutsJson)
    return Array.isArray(parsed) ? (parsed as CMSCallout[]) : []
  } catch {
    return []
  }
}

// ─── API params ───────────────────────────────────────────────────────────────

export interface FetchArticlesParams {
  limit?: number
  offset?: number
  sub_niche?: string
  category_slug?: string
}

// ─── API functions ────────────────────────────────────────────────────────────

// Articles list for a single vertical (one Ideas Studio project)
export async function fetchCMSArticles(
  vertical: string,
  params?: FetchArticlesParams,
): Promise<CMSArticleListItem[]> {
  const projectId = getProjectId(vertical)
  if (!projectId) return []

  const url = new URL(`${BASE_URL}/api/public/projects/${projectId}/articles`)
  if (params?.limit != null) url.searchParams.set('limit', String(params.limit))
  if (params?.offset != null) url.searchParams.set('offset', String(params.offset))
  if (params?.sub_niche) url.searchParams.set('sub_niche', params.sub_niche)
  if (params?.category_slug) url.searchParams.set('category_slug', params.category_slug)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`[CMS] articles fetch failed (${vertical}): ${res.status}`)
  const data = (await res.json()) as { articles?: CMSArticleListItem[] } | CMSArticleListItem[]
  return Array.isArray(data) ? data : ((data as { articles?: CMSArticleListItem[] }).articles ?? [])
}

// Single article by slug within a vertical
export async function fetchCMSArticle(
  vertical: string,
  slug: string,
): Promise<CMSArticle | null> {
  const projectId = getProjectId(vertical)
  if (!projectId) return null

  const res = await fetch(`${BASE_URL}/api/public/projects/${projectId}/articles/${slug}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`[CMS] article fetch failed (${vertical}/${slug}): ${res.status}`)
  return res.json() as Promise<CMSArticle>
}

// Categories for a vertical
export async function fetchCMSCategories(vertical: string): Promise<CMSCategory[]> {
  const projectId = getProjectId(vertical)
  if (!projectId) return []

  const res = await fetch(`${BASE_URL}/api/public/projects/${projectId}/categories`)
  if (!res.ok) throw new Error(`[CMS] categories fetch failed (${vertical}): ${res.status}`)
  const data = (await res.json()) as { categories?: CMSCategory[] } | CMSCategory[]
  return Array.isArray(data) ? data : ((data as { categories?: CMSCategory[] }).categories ?? [])
}

// Aggregate articles from all verticals (for homepage feed)
export async function fetchAllCMSArticles(limit = 12): Promise<CMSArticleListItem[]> {
  const { VERTICAL_PROJECTS } = await import('./verticalProjects')
  const activeVerticals = Object.keys(VERTICAL_PROJECTS).filter(
    (v) => VERTICAL_PROJECTS[v] !== '',
  )
  if (activeVerticals.length === 0) return []

  const results = await Promise.allSettled(
    activeVerticals.map((v) => fetchCMSArticles(v, { limit })),
  )

  const all: CMSArticleListItem[] = []
  for (const r of results) {
    if (r.status === 'fulfilled') all.push(...r.value)
  }

  all.sort((a, b) => {
    const da = a.published_at ? new Date(a.published_at).getTime() : 0
    const db = b.published_at ? new Date(b.published_at).getTime() : 0
    return db - da
  })

  return all
}
