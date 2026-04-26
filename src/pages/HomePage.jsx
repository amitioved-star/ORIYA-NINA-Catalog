import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { fetchItems } from '../lib/supabase'
import Catalog from "../components/Catalog";

export default function HomePage({ onItemClick }) {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
      .then(data => setFeatured((data || []).slice(0, 6)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FAF5EB 0%, #F5ECD6 40%, #EDD8B8 100%)',
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #D4AF7A 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-20 right-16 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #C9A55A 0%, transparent 70%)' }}
          />
          {/* Ornamental lines */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 800 600">
            <circle cx="400" cy="300" r="280" fill="none" stroke="#B8923A" strokeWidth="0.5" />
            <circle cx="400" cy="300" r="240" fill="none" stroke="#B8923A" strokeWidth="0.3" />
          </svg>
        </div>

        <div className="relative text-center px-4 max-w-3xl mx-auto py-20 animate-fade-in">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold-400" />
            <span className="text-gold-500 text-lg">✦</span>
            <div className="h-px w-16 bg-gold-400" />
          </div>

          {/* Subtitle tag */}
          <div className="inline-block bg-gold-500/10 text-gold-600 border border-gold-300 rounded-full px-5 py-1.5 text-sm font-medium mb-6">
            שמלות להשכרה · מטפחות למכירה
          </div>

          {/* Main title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-stone-800 leading-tight mb-6">
            ORIYA NINA
            <br />
            <span className="text-gold-500 italic">קולקשן</span>
          </h1>

          <p className="text-stone-600 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
            קטלוג שמלות אלגנטיות להשכרה ומטפחות יוקרתיות למכירה.
            <br />
            כל פריט נבחר בקפידה לאירועים מיוחדים.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/catalog?category=שמלה להשכרה"
              className="btn-primary text-sm"
            >
              צפייה בשמלות
            </Link>
            <Link
              to="/catalog?category=מטפחת למכירה"
              className="btn-outline text-sm"
            >
              צפייה במטפחות
            </Link>
            <a
              href="https://wa.me/972506386895?text=שלום, אני מעוניינת לשאול על הפריטים שלכם"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              <WhatsAppIcon />
              יצירת קשר בוואטסאפ
            </a>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-4 mt-12 opacity-40">
            <div className="h-px w-24 bg-gold-500" />
            <span className="text-gold-500 text-sm">◆</span>
            <div className="h-px w-24 bg-gold-500" />
          </div>
        </div>
      </section>

      {/* ── Category Cards ────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-gold-500 text-sm font-medium tracking-wider uppercase mb-2">הקולקציות שלנו</p>
          <h2 className="section-title">מה תמצאי אצלנו</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dresses */}
          <Link
            to="/catalog?category=שמלה להשכרה"
            className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-cream-200 to-cream-300 flex items-end cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl opacity-20">👗</div>
            </div>
            <div className="relative w-full p-6 bg-gradient-to-t from-stone-800/60 to-transparent">
              <h3 className="text-white text-2xl font-semibold mb-1">שמלות להשכרה</h3>
              <p className="text-stone-200 text-sm mb-3">שמלות אלגנטיות לכל אירוע</p>
              <span className="inline-block bg-gold-500 text-white text-sm px-4 py-1.5 rounded-full group-hover:bg-gold-400 transition-colors">
                לצפייה בשמלות ←
              </span>
            </div>
          </Link>

          {/* Scarves */}
          <Link
            to="/catalog?category=מטפחת למכירה"
            className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-rose-50 to-cream-200 flex items-end cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl opacity-20">🧣</div>
            </div>
            <div className="relative w-full p-6 bg-gradient-to-t from-stone-800/60 to-transparent">
              <h3 className="text-white text-2xl font-semibold mb-1">מטפחות למכירה</h3>
              <p className="text-stone-200 text-sm mb-3">מטפחות יוקרתיות ואיכותיות</p>
              <span className="inline-block bg-gold-500 text-white text-sm px-4 py-1.5 rounded-full group-hover:bg-gold-400 transition-colors">
                לצפייה במטפחות ←
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Featured Items ─────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-gold-500 text-sm font-medium tracking-wider uppercase mb-2">הפריטים שלנו</p>
          <h2 className="section-title">פריטים נבחרים</h2>
          <div className="gold-divider" />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="spinner" />
          </div>
        ) : featured.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
              {featured.map(item => (
                <ItemCard key={item.id} item={item} onClick={onItemClick} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/catalog" className="btn-outline">
                לכל הקטלוג ←
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ── Why Us ─────────────────────────────────────────────── */}
      <section className="bg-stone-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-2">למה לבחור בנו?</h2>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: '✦', title: 'איכות גבוהה', desc: 'כל פריט נבחר בקפידה ומוקפד על כל פרט' },
              { icon: '◆', title: 'מחירים הוגנים', desc: 'השכרה ומכירה במחירים נגישים ומשתלמים' },
              { icon: '❋', title: 'שירות אישי', desc: 'ליווי אישי ועזרה בבחירת הפריט המתאים' },
            ].map(f => (
              <div key={f.title} className="text-center">
                <div className="text-gold-400 text-3xl mb-4">{f.icon}</div>
                <h3 className="text-gold-300 font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp Banner ─────────────────────────────────────── */}
      <section className="py-12 px-4 text-center bg-cream-100">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-stone-800 mb-3">יש לך שאלה?</h2>
          <p className="text-stone-500 mb-6 text-sm">נשמח לעזור לך בבחירת הפריט המתאים</p>
          <a
            href="https://wa.me/972506386895?text=שלום, אני מעוניינת לשאול על הפריטים שלכם"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex text-base py-3 px-8 mx-auto"
          >
            <WhatsAppIcon />
            <span>שלחי הודעה בוואטסאפ</span>
          </a>
        </div>
      </section>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🌸</span>
      </div>
      <p className="text-stone-400 text-lg mb-2">הקטלוג מתעדכן בקרוב</p>
      <p className="text-stone-300 text-sm">פריטים ייתוספו בקרוב — בינתיים ניתן לפנות בוואטסאפ</p>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
