import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { trackWhatsApp } from '../lib/analytics'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'בית' },
    { to: '/catalog', label: 'קטלוג' },
    { to: '/dress-rental-harish', label: 'השכרת שמלות בחריש' },
    { to: '/faq', label: 'שאלות' },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-cream-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">✦</span>
            </div>
            <span className="font-display text-xl text-stone-800 hidden sm:block">
              ORIYA NINA
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? 'text-gold-500 border-b-2 border-gold-400 pb-0.5'
                    : 'text-stone-600 hover:text-gold-500'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/972506386895?text=שלום, אני מעוניינת לשאול על הפריטים שלכם"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('navbar_desktop')}
              className="btn-whatsapp text-sm py-2 px-4"
              aria-label="יצירת קשר בוואטסאפ"
            >
              <WhatsAppIcon />
              <span>צרי קשר</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-stone-600"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-cream-200 px-4 py-3 space-y-2">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium ${
                pathname === l.to ? 'text-gold-500' : 'text-stone-600'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/972506386895?text=שלום, אני מעוניינת לשאול על הפריטים שלכם"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { trackWhatsApp('navbar_mobile'); setOpen(false) }}
            className="btn-whatsapp text-sm py-2 w-full mt-2"
            aria-label="יצירת קשר בוואטסאפ"
          >
            <WhatsAppIcon />
            <span>צרי קשר בוואטסאפ</span>
          </a>
        </div>
      )}
    </nav>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
