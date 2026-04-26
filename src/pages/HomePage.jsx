import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { fetchItems } from '../lib/supabase'

export default function HomePage({ onItemClick }) {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
      .then(data => setFeatured((data || []).slice(0, 8)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-[#fbf7ef] text-stone-900">
      <section className="min-h-[82vh] flex items-center justify-center px-4 text-center bg-gradient-to-br from-[#fffaf0] via-[#f8ead2] to-[#ead0a6]">
        <div className="max-w-4xl">
          <p className="inline-block mb-5 px-5 py-2 rounded-full bg-white/70 border border-gold-300 text-gold-700 text-sm">
            שמלות להשכרה · מטפחות למכירה
          </p>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-5">
            ORIYA NINA
          </h1>

          <p className="text-xl md:text-2xl text-stone-700 mb-10 leading-relaxed">
            מצאי את השמלה המושלמת לאירוע שלך מתוך קטלוג יוקרתי, פשוט ונוח.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalog" className="btn-primary px-8 py-3">
              גלי את הקולקציה
            </Link>

            <Link to="/catalog?category=שמלה להשכרה" className="btn-outline px-8 py-3 bg-white/60">
              כל השמלות
            </Link>

            <a
              href="https://wa.me/972506386895?text=שלום, אני מעוניינת לשאול על שמלה"
              className="btn-whatsapp px-8 py-3"
            >
              צרי קשר
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold-600 font-medium mb-2">הכי נצפות</p>
          <h2 className="text-4xl font-bold">שמלות נבחרות</h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full" />
        </div>

        {loading ? (
          <div className="text-center py-16">טוען...</div>
        ) : featured.length === 0 ? (
          <div className="text-center text-stone-400 py-16">הקטלוג יתעדכן בקרוב</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(item => (
              <ItemCard key={item.id} item={item} onClick={onItemClick} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/catalog" className="btn-outline px-8 py-3">
            לכל הקטלוג
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold-600 font-medium mb-2">מה את מחפשת?</p>
            <h2 className="text-4xl font-bold">בחרי קטגוריה</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/catalog?category=שמלה להשכרה" className="group rounded-3xl p-10 bg-[#f7ead5] hover:shadow-xl transition">
              <div className="text-6xl mb-6">👗</div>
              <h3 className="text-3xl font-bold mb-3">שמלות להשכרה</h3>
              <p className="text-stone-600">שמלות ערב, אירועים ושבתות.</p>
            </Link>

            <Link to="/catalog?category=מטפחת למכירה" className="group rounded-3xl p-10 bg-[#f7ead5] hover:shadow-xl transition">
              <div className="text-6xl mb-6">🧣</div>
              <h3 className="text-3xl font-bold mb-3">מטפחות למכירה</h3>
              <p className="text-stone-600">מטפחות יוקרתיות במגוון צבעים.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">איך זה עובד?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['1', 'בחרי פריט', 'עייני בקטלוג ובחרי את הפריט שמתאים לך.'],
              ['2', 'שלחי הודעה', 'לחצי על וואטסאפ ושלחי התעניינות.'],
              ['3', 'תאמי פרטים', 'נסגור זמינות, מחיר ואיסוף בצורה פשוטה.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="bg-white/10 rounded-3xl p-8">
                <div className="w-12 h-12 rounded-full bg-gold-500 mx-auto mb-5 flex items-center justify-center font-bold">
                  {num}
                </div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-stone-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-[#f8ead2]">
        <h2 className="text-4xl font-bold mb-4">מוכנה למצוא את השמלה המושלמת?</h2>
        <p className="text-stone-600 mb-8">הקטלוג פתוח לצפייה — ללא רכישה באתר.</p>
        <Link to="/catalog" className="btn-primary px-10 py-4">
          לקולקציה המלאה
        </Link>
      </section>
    </div>
  )
}