import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { fetchItems } from '../lib/supabase'

export default function HomePage({ onItemClick }) {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  const videos = ['/hero1.mp4', '/hero2.mp4', '/hero3.mp4']
  const [currentVideo, setCurrentVideo] = useState(0)

  useEffect(() => {
    fetchItems()
      .then(data => setFeatured((data || []).slice(0, 8)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  return (
    <div className="bg-[#fffaf5] text-stone-900">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

        <video
          key={currentVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute w-full h-full object-cover"
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        {/* לוגו */}
        <div className="absolute top-10 w-full text-center z-10">
          <h1 className="font-display text-white text-3xl md:text-4xl tracking-[0.35em]">
            ORIYA NINA
          </h1>

          <p className="text-gold-300 text-sm tracking-[0.5em] mt-2 uppercase">
            LUXURY EVENING DRESSES
          </p>
        </div>

        {/* תוכן */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-28 items-center text-center px-6 text-white">

          <p className="text-lg text-stone-200 max-w-xl mb-10 leading-relaxed">
            סטודיו להשכרת שמלות ערב צנועות ויוקרתיות בהתאמה אישית לכל אירוע
          </p>

          <div className="flex gap-4 flex-wrap justify-center">

            {/* כפתור זהב */}
            <Link
              to="/catalog"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              לצפייה בקטלוג
            </Link>

            {/* כפתור outline יוקרתי */}
            <a
              href="https://wa.me/972506386895"
              className="border border-white/80 px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              קביעת מדידה
            </a>

          </div>
        </div>

        <div className="absolute bottom-10 w-full text-center text-white/70 text-sm tracking-widest">
          XS — XXL | החל מ־300₪
        </div>

      </section>

      {/* מחירים */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gold-500">פרטים חשובים</h2>

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

          <p className="text-gold-600 font-bold text-2x1">
            חדש!!! השכרת שמלות בת מצווה – 200 ₪ בלבד
          </p>

          <p className="text-sm text-stone-500">
            * המחיר לא כולל תיקונים
          </p>
        </div>

        <div className="mt-8">
          <a
            href="https://wa.me/972506386895"
            className="bg-gold-500 hover:bg-gold-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition"
          >
            קביעת מדידה אישית
          </a>
        </div>
      </section>

      {/* שמלות */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold-500 font-medium mb-2">הכי נצפות</p>
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
          <Link to="/catalog" className="border border-gold-500 text-gold-500 px-8 py-3 rounded-full hover:bg-gold-500 hover:text-white transition">
            לכל הקטלוג
          </Link>
        </div>
      </section>

      {/* איך זה עובד */}
      <section className="py-20 px-4 bg-[#1c1c1c] text-white">
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
      <section className="py-20 px-4 text-center bg-rose-blush">
        <h2 className="text-4xl font-bold mb-4">
          מוכנה למצוא את השמלה המושלמת?
        </h2>

        <p className="text-stone-600 mb-8">
          הקטלוג פתוח לצפייה — ללא רכישה באתר
        </p>

        <Link to="/catalog" className="bg-gold-500 text-white px-10 py-4 rounded-full hover:bg-gold-600 transition">
          לקולקציה המלאה
        </Link>
      </section>

    </div>
  )
}