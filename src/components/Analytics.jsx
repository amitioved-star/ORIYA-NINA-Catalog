import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView, trackScroll, trackTimeOnSite } from '../lib/analytics'

// Drives SPA page_view, scroll-depth (75/100) and time_on_site_60 events.
// Mounted once at the App root.
export default function Analytics() {
  const location = useLocation()
  const scrollFlags = useRef({ s75: false, s100: false })
  const timeFiredRef = useRef(false)

  // page_view on every route change (initial load included)
  useEffect(() => {
    const path = location.pathname + (location.search || '')
    trackPageView(path)
    scrollFlags.current = { s75: false, s100: false }
  }, [location.pathname, location.search])

  // scroll depth tracking
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = Math.max(doc.scrollHeight - doc.clientHeight, 1)
      const ratio = Math.min(1, (window.scrollY) / total)
      if (!scrollFlags.current.s75 && ratio >= 0.75) {
        scrollFlags.current.s75 = true
        trackScroll(75, location.pathname)
      }
      if (!scrollFlags.current.s100 && ratio >= 0.98) {
        scrollFlags.current.s100 = true
        trackScroll(100, location.pathname)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // time_on_site_60 — once per session
  useEffect(() => {
    const t = setTimeout(() => {
      if (timeFiredRef.current) return
      timeFiredRef.current = true
      trackTimeOnSite(60)
    }, 60_000)
    return () => clearTimeout(t)
  }, [])

  return null
}
