import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { fetchItems } from '../lib/supabase'
import { Sparkles, Crown, Gem, MapPin, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import { buildWhatsappUrl } from '../constants'
import { localBusinessSchema, websiteSchema } from '../seoSchemas'

export default function HomePage({ onItemClick }) {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  const videos = ['/hero1.mp4', '/hero2.mp4', '/hero3.mp4', '/hero4.mp4']
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
      <SEO
        title="השכרת שמלות ערב בחריש לנשים ולנערות"
        description="ORIYA NINA – השכרת שמלות ערב לנשים ולנערות בחריש, חדרה, פרדס חנה והסביבה. שמלות צנועות ויוקרתיות לאירועים החל מ־250 ₪ כולל ניקוי יבש."
        jsonLd={[localBusinessSchema(), websiteSchema()]}
      />

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

        {/* 🎥 VIDEO משופר */}
        <video
          key={currentVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute w-full h-full object-cover brightness-105 contrast-115 saturate-105 scale-105"
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>

        {/* ✨ שכבות יוקרתיות (לא כהה מדי!) */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* HEADER */}
        <div className="absolute top-12 w-full text-center z-10">

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display tracking-[0.3em] text-white whitespace-nowrap">
            ORIYA NINA
          </h1>

          <p className="text-gold-300 text-xs tracking-[0.6em] mt-4 uppercase">
            LUXURY EVENING DRESSES
          </p>

        </div>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-32 items-center text-center px-6 text-white">

          <p className="text-lg md:text-xl text-stone-200 max-w-xl mb-10">
            סטודיו להשכרת שמלות ערב בחריש – שמלות צנועות ויוקרתיות לנשים ולנערות בהתאמה אישית לכל אירוע
          </p>

          <div className="flex gap-4 flex-wrap justify-center">

            <Link
              to="/catalog"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              לצפייה בקטלוג
            </Link>

            <a
              href={buildWhatsappUrl('שלום, אני מעוניינת לקבוע מדידה לשמלה')}
              className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              קביעת מדידה
            </a>

          </div>

        </div>

      </section>

      {/* פרטים חשובים */}
      <section className="py-24 px-6 text-center bg-[#FFF5F2]">

        <h2 className="text-3xl md:text-4xl font-display text-gold-500 mb-14">
          פרטים חשובים
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-[30px] shadow-2xl p-10">

          <div className="flex justify-center gap-6 mb-8 text-gold-500">
            <Crown size={32} />
            <Gem size={32} />
            <Sparkles size={32} />
          </div>

          <h3 className="text-2xl md:text-3xl font-display mb-6">
            חוויית השכרה יוקרתית
          </h3>

          <p className="text-gray-600 mb-6 text-lg">
            סטודיו להשכרת שמלות ערב צנועות ואלגנטיות בהתאמה אישית לכל אירוע
          </p>

          <div className="space-y-3 text-gray-800 text-base">

            <p>
              <span className="text-gold-500 font-semibold">מחיר פתיחה:</span> 250 ₪ בלבד (כולל ניקוי יבש)
            </p>

            <p>
              מתאים לכל אירוע | שבתות חתן | מידות XS–XXL
            </p>

            <p className="text-gold-500 font-semibold">
              חדש! השכרת שמלות בת מצווה – 200 ₪ בלבד
            </p>

          </div>

          <p className="text-sm text-gray-400 mt-6">
            *המחיר אינו כולל תיקונים
          </p>

          <div className="mt-10">
            <a
              href={buildWhatsappUrl('שלום, אשמח לקבוע מדידה אישית')}
              className="bg-gradient-to-r from-[#C9A55A] to-[#E8CFA0] text-white px-10 py-4 rounded-full text-lg"
            >
              קביעת מדידה אישית
            </a>
          </div>

        </div>
      </section>


      {/* SEO Local Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-cream-200 bg-cream-50 p-7 shadow-sm">
            <MapPin className="text-gold-500 mb-4" size={28} />
            <h2 className="text-xl font-semibold text-stone-800 mb-3">השכרת שמלות ערב בחריש</h2>
            <p className="leading-7 text-stone-600">מבחר שמלות ערב צנועות ויוקרתיות לנשים ולנערות באזור חריש, חדרה, פרדס חנה וקציר.</p>
          </div>
          <div className="rounded-3xl border border-cream-200 bg-cream-50 p-7 shadow-sm">
            <Sparkles className="text-gold-500 mb-4" size={28} />
            <h2 className="text-xl font-semibold text-stone-800 mb-3">מחירים ברורים ונוחים</h2>
            <p className="leading-7 text-stone-600">שמלות לנשים החל מ־250 ₪ כולל ניקוי יבש, ושמלות לנערות ובת מצווה ב־200 ₪ בהתאם למלאי.</p>
          </div>
          <div className="rounded-3xl border border-cream-200 bg-cream-50 p-7 shadow-sm">
            <MessageCircle className="text-gold-500 mb-4" size={28} />
            <h2 className="text-xl font-semibold text-stone-800 mb-3">קביעת מדידה מהירה</h2>
            <p className="leading-7 text-stone-600">ראית שמלה שאהבת? לחיצה אחת על וואטסאפ ומקבלים פרטים על זמינות וקביעת מדידה.</p>
          </div>
        </div>
      </section>

      {/* שמלות */}
      <section className="py-24 px-6 max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-gold-500 mb-2 tracking-widest">BEST PICKS</p>
          <h2 className="text-4xl font-display">שמלות נבחרות</h2>
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
          <Link
            to="/catalog"
            className="border border-gold-500 text-gold-500 px-8 py-3 rounded-full hover:bg-gold-500 hover:text-white transition"
          >
            לכל הקטלוג
          </Link>
        </div>

      </section>

    </div>
  )
}