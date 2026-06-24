export interface Author {
  id: string
  name: string
  slug: string
  bio: string
  avatarUrl: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  categorySlug: string
  author: Author
  publishedAt: string
  readingTime: number
  vertical: string
  subNiche: string
  tags: string[]
  coverImageUrl?: string
  featured?: boolean
  viewCount?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  articleCount: number
  icon?: string
}

export interface Vertical {
  id: string
  name: string
  slug: string
  description: string
  subNiches: SubNiche[]
}

export interface SubNiche {
  id: string
  name: string
  slug: string
  description: string
  categories: Category[]
}

export type ArticleBlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "cover_image"
  | "callout"
  | "faq"
  | "table"
  | "unordered_list"
  | "ordered_list"
  | "blockquote"
  | "code"
  | "embed"
  | "cta"
  | "internal_link"
  | "external_link"

export interface ArticleBlock {
  type: ArticleBlockType
  content?: string
  level?: number
  src?: string
  alt?: string
  caption?: string
  items?: string[]
  rows?: string[][]
  headers?: string[]
  url?: string
  label?: string
  language?: string
  embedType?: string
  faqs?: Array<{ question: string; answer: string }>
  calloutType?: "info" | "warning" | "tip" | "danger"
}

export const SUPPORTED_BLOCKS: ArticleBlockType[] = [
  "heading",
  "paragraph",
  "image",
  "cover_image",
  "callout",
  "faq",
  "table",
  "unordered_list",
  "ordered_list",
  "blockquote",
  "code",
  "embed",
  "cta",
  "internal_link",
  "external_link",
]
