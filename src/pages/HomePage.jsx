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

      {/* 🔥 HERO עם וידאו */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">

        {/* וידאו */}
        <video autoPlay muted loop className="absolute w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* fallback תמונה */}
        <div
          className="absolute w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />

        {/* שכבת כהות */}
        <div className="absolute inset-0 bg-black/60" />

        {/* תוכן */}
        <div className="relative z-10 max-w-3xl px-4 text-white">

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            ORIYA NINA
          </h1>

          <p className="text-xl md:text-2xl mb-4">
            סטודיו להשכרת שמלות ערב צנועות ויוקרתיות
          </p>

          <p className="text-lg text-stone-200 mb-8">
            מצאי את השמלה המושלמת מתוך קטלוג יוקרתי ומוקפד
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalog" className="bg-gold-500 hover:bg-gold-600 px-8 py-3 rounded-full font-semibold">
              גלי את הקולקציה
            </Link>

            <a
              href="https://wa.me/972506386895"
              className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full font-semibold"
            >
              צרי קשר
            </a>
          </div>
        </div>
      </section>

      {/* 💎 מידע מחירים */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">✨ פרטים חשובים ✨</h2>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-4 text-lg">

          <p className="text-2xl font-bold text-gold-600">
            מחיר פתיחה: 300 ₪ בלבד
          </p>

          <p className="text-stone-600">
            כולל ניקוי יבש
          </p>

          <p>
            מתאים לכל אירוע | שבתות חתן | מידות XS–XXL
          </p>

          <p className="text-green-600 font-bold text-xl">
            חדש!!! השכרת שמלות בת מצווה – 200 ₪ בלבד
          </p>

          <p className="text-sm text-stone-500">
            * המחיר לא כולל תיקונים
          </p>
        </div>

        <div className="mt-8">
          <a
            href="https://wa.me/972506386895"
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold"
          >
            קביעת מדידה אישית
          </a>
        </div>
      </section>

      {/* 👗 שמלות נבחרות */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold-600 font-medium mb-2">הכי נצפות</p>
          <h2 className="text-4xl font-bold">שמלות נבחרות</h2>
        </div>

        {loading ? (
          <div className="text-center py-16">טוען...</div>
        ) : featured.length === 0 ? (
          <div className="text-center text-stone-400 py-16">אין פריטים עדיין</div>
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

      {/* 🧭 איך זה עובד */}
      <section className="py-20 px-4 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">איך זה עובד?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['1', 'בחרי שמלה', 'עייני בקטלוג ובחרי את הסגנון שלך'],
              ['2', 'שלחי הודעה', 'לחצי וואטסאפ ושלחי התעניינות'],
              ['3', 'קבעי מדידה', 'נתאם זמן ונמצא את המידה המושלמת'],
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

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-[#f8ead2]">
        <h2 className="text-4xl font-bold mb-4">
          מוכנה למצוא את השמלה המושלמת?
        </h2>

        <p className="text-stone-600 mb-8">
          הקטלוג פתוח לצפייה — ללא רכישה באתר
        </p>

        <Link to="/catalog" className="btn-primary px-10 py-4">
          לקולקציה המלאה
        </Link>
      </section>

    </div>
  )
}