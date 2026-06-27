import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE, absoluteUrl } from '../constants'

function setMeta(selector, attr, value) {
  if (!value) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const match = selector.match(/meta\[(name|property)="(.+)"\]/)
    if (match) el.setAttribute(match[1], match[2])
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function SEO({
  title = 'השכרת שמלות ערב בחריש לנשים ולנערות',
  description = SITE.description,
  image = SITE.defaultImage,
  noindex = false,
  jsonLd,
}) {
  const location = useLocation()
  const canonical = absoluteUrl(location.pathname)
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`

  useEffect(() => {
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[name="keywords"]', 'content', SITE.keywords.join(', '))
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    setLink('canonical', canonical)

    setMeta('meta[property="og:locale"]', 'content', 'he_IL')
    setMeta('meta[property="og:type"]', 'content', 'website')
    setMeta('meta[property="og:site_name"]', 'content', SITE.name)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[property="og:image"]', 'content', image)

    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', image)

    if (jsonLd) upsertJsonLd('page-schema', jsonLd)
  }, [fullTitle, description, canonical, image, noindex, jsonLd])

  return null
}
