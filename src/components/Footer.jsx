import { Link } from 'react-router-dom'
import { SITE } from '../constants'
import { trackWhatsApp, trackPhone } from '../lib/analytics'

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-gold-300 font-display text-xl mb-3">ORIYA NINA</h3>
            <p className="text-sm leading-relaxed text-stone-400">
              השכרת שמלות ערב לנשים ולנערות בחריש והסביבה.<br />
              אלגנטיות, צניעות ויוקרה לכל אירוע.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-stone-200 font-semibold mb-3">ניווט</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-gold-300 transition-colors">דף הבית</Link></li>
              <li><Link to="/catalog" className="hover:text-gold-300 transition-colors">קטלוג מלא</Link></li>
              <li><Link to="/dress-rental-harish" className="hover:text-gold-300 transition-colors">השכרת שמלות חריש</Link></li>
              <li><Link to="/women-evening-dresses-harish" className="hover:text-gold-300 transition-colors">שמלות ערב לנשים</Link></li>
              <li><Link to="/girls-dresses-harish" className="hover:text-gold-300 transition-colors">שמלות לנערות</Link></li>
              <li><Link to="/faq" className="hover:text-gold-300 transition-colors">שאלות ותשובות</Link></li>
              <li>
                <Link
                  to="/catalog?category=שמלה להשכרה"
                  className="hover:text-gold-300 transition-colors"
                >
                  שמלות להשכרה לנשים
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=שמלה להשכרה לנערות"
                  className="hover:text-gold-300 transition-colors"
                >
                  שמלות להשכרה לנערות
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog?category=מטפחת למכירה"
                  className="hover:text-gold-300 transition-colors"
                >
                  מטפחות למכירה
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-stone-200 font-semibold mb-3">יצירת קשר</h4>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://wa.me/972506386895?text=שלום, אני מעוניינת לשאול על הפריטים שלכם"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('footer')}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors"
                aria-label="יצירת קשר בוואטסאפ"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                וואטסאפ
              </a>
              <a
                href={SITE.phoneTel}
                onClick={() => trackPhone('footer')}
                className="inline-flex items-center gap-2 border border-stone-500 text-stone-200 px-4 py-2 rounded-full text-sm hover:bg-stone-700 hover:border-gold-300 hover:text-gold-200 transition-colors"
                aria-label={`התקשרי לסטודיו ${SITE.phoneDisplay}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {SITE.phoneDisplay}
              </a>
            </div>
            <p className="text-stone-400 text-xs mt-3">שעות פעילות: א׳–ה׳ 9:00–19:00</p>
            <p className="text-stone-400 text-xs mt-2">אזור שירות: חריש, חדרה, פרדס חנה, קציר והסביבה</p>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} ORIYA NINA. כל הזכויות שמורות.</span>
          <Link to="/admin" className="hover:text-stone-400 transition-colors">ניהול</Link>
        </div>
      </div>
    </footer>
  )
}
