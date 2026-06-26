import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  ogImage?: string
  noIndex?: boolean
}

const SITE = 'Fiindt'
const DOMAIN = 'https://fiindt.com'

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export function useSEO({ title, description, ogImage, noIndex }: SEOProps) {
  useEffect(() => {
    const fullTitle = title === SITE ? SITE : `${title} — ${SITE}`
    document.title = fullTitle

    const canonical = `${DOMAIN}${window.location.pathname.replace(/\/$/, '') || '/'}`
    setCanonical(canonical)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', SITE, 'property')
    setMeta('twitter:title', fullTitle, 'name')

    if (description) {
      setMeta('description', description)
      setMeta('og:description', description, 'property')
      setMeta('twitter:description', description, 'name')
    }

    if (ogImage) {
      setMeta('og:image', ogImage, 'property')
      setMeta('twitter:image', ogImage, 'name')
      setMeta('twitter:card', 'summary_large_image', 'name')
    } else {
      setMeta('twitter:card', 'summary', 'name')
    }

    if (noIndex) {
      setMeta('robots', 'noindex, nofollow')
    }
  }, [title, description, ogImage, noIndex])
}
