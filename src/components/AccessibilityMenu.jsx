import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Accessibility, X } from 'lucide-react'
import { DEFAULT_PREFS, applyPrefs, loadPrefs, savePrefs } from '../lib/a11y'

const MAX_FONT_LEVEL = 3

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState(loadPrefs)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    applyPrefs(prefs)
    savePrefs(prefs)
  }, [prefs])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }))
  const changeFont = (delta) =>
    setPrefs((p) => ({ ...p, font: Math.min(MAX_FONT_LEVEL, Math.max(0, p.font + delta)) }))
  const reset = () => setPrefs({ ...DEFAULT_PREFS })

  const options = [
    { key: 'contrast', label: 'ניגודיות גבוהה' },
    { key: 'gray', label: 'גווני אפור' },
    { key: 'links', label: 'הדגשת קישורים' },
    { key: 'readable', label: 'גופן קריא' },
    { key: 'noMotion', label: 'עצירת אנימציות' },
  ]

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="תפריט נגישות"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-800 text-white shadow-xl transition hover:bg-blue-900"
      >
        <Accessibility size={26} aria-hidden="true" />
      </button>

      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-label="תפריט נגישות"
          tabIndex={-1}
          className="fixed bottom-20 right-5 z-[60] w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-stone-300 bg-white p-4 text-stone-800 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">נגישות</h2>
            <button
              type="button"
              onClick={() => { setOpen(false); buttonRef.current?.focus() }}
              aria-label="סגירת תפריט הנגישות"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-stone-200 p-2">
            <span className="text-sm font-medium">גודל טקסט</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeFont(-1)}
                disabled={prefs.font === 0}
                aria-label="הקטנת טקסט"
                className="h-9 w-9 rounded-full border border-stone-400 text-lg font-bold disabled:opacity-40"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => changeFont(1)}
                disabled={prefs.font === MAX_FONT_LEVEL}
                aria-label="הגדלת טקסט"
                className="h-9 w-9 rounded-full border border-stone-400 text-lg font-bold disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          <ul className="space-y-2">
            {options.map((o) => (
              <li key={o.key}>
                <button
                  type="button"
                  aria-pressed={prefs[o.key]}
                  onClick={() => toggle(o.key)}
                  className={`w-full rounded-xl border px-3 py-2 text-right text-sm font-medium ${
                    prefs[o.key]
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between text-sm">
            <button type="button" onClick={reset} className="font-medium text-blue-800 underline">
              איפוס הגדרות
            </button>
            <Link to="/accessibility" onClick={() => setOpen(false)} className="font-medium text-blue-800 underline">
              הצהרת נגישות
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
