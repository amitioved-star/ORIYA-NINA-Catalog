import { useEffect, useState } from 'react'

const STORAGE_KEY = 'oriya-a11y-prefs'

export const DEFAULT_PREFS = { font: 0, contrast: false, gray: false, links: false, readable: false, noMotion: false }

export function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : { ...DEFAULT_PREFS }
  } catch {
    return { ...DEFAULT_PREFS }
  }
}

export function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // storage unavailable (private mode) — preferences simply won't persist
  }
}

export function applyPrefs(prefs) {
  const el = document.documentElement
  el.classList.remove('a11y-font-1', 'a11y-font-2', 'a11y-font-3')
  if (prefs.font > 0) el.classList.add(`a11y-font-${prefs.font}`)
  el.classList.toggle('a11y-contrast', prefs.contrast)
  el.classList.toggle('a11y-gray', prefs.gray)
  el.classList.toggle('a11y-links', prefs.links)
  el.classList.toggle('a11y-readable', prefs.readable)
  el.classList.toggle('a11y-no-motion', prefs.noMotion)
}

// True when the OS asks for reduced motion or the toolbar's "stop animations" mode is on.
export function useReducedMotion() {
  const read = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('a11y-no-motion')

  const [reduced, setReduced] = useState(read)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(read())
    mq.addEventListener('change', update)
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      mq.removeEventListener('change', update)
      observer.disconnect()
    }
  }, [])

  return reduced
}
