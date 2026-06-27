import { Link } from 'react-router-dom'
import { CheckCircle, Sparkles, MapPin, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import { buildWhatsappUrl } from '../constants'
import { breadcrumbSchema, localBusinessSchema } from '../seoSchemas'

const CONTENT = {
  '/dress-rental-harish': {
    title: 'השכרת שמלות ערב בחריש',
    h1: 'השכרת שמלות ערב בחריש',
    description: 'סטודיו ORIYA NINA מציע השכרת שמלות ערב צנועות ויוקרתיות לנשים ולנערות בחריש והסביבה, כולל אפשרות לקביעת מדידה אישית.',
    intro: 'מחפשת שמלת ערב לאירוע, חתונה, שבת חתן או ערב מיוחד? ב־ORIYA NINA בחריש תמצאי מבחר שמלות אלגנטיות להשכרה, שירות אישי ומחיר נוח.',
    bullets: ['שמלות ערב לנשים ולנערות', 'מחירים החל מ־250 ₪ לנשים ו־200 ₪ לנערות', 'שירות אישי וקביעת מדידה בוואטסאפ', 'מתאים לחריש, חדרה, פרדס חנה וקציר'],
  },
  '/women-evening-dresses-harish': {
    title: 'שמלות ערב לנשים בחריש',
    h1: 'שמלות ערב לנשים בחריש',
    description: 'השכרת שמלות ערב לנשים בחריש – שמלות צנועות, אלגנטיות ויוקרתיות לאירועים, חתונות ושבתות חתן.',
    intro: 'קטלוג שמלות נשים להשכרה עם דגמים מחמיאים, צבעים מגוונים ומידות שונות. אפשר לראות זמינות באתר ולפנות ישירות בוואטסאפ.',
    bullets: ['מבחר שמלות ערב צנועות', 'מידות XS–XXL בהתאם למלאי', 'מחיר פתיחה 250 ₪ כולל ניקוי יבש', 'מתאים לאירועים, חתונות ושבתות חתן'],
  },
  '/girls-dresses-harish': {
    title: 'השכרת שמלות לנערות ובת מצווה בחריש',
    h1: 'השכרת שמלות לנערות בחריש',
    description: 'שמלות לנערות ובת מצווה להשכרה בחריש. דגמים חגיגיים, צנועים ואלגנטיים במחיר נוח.',
    intro: 'לבת מצווה, אירוע משפחתי או ערב חגיגי – בקטלוג תמצאי שמלות נערות יפות ונוחות להשכרה במחיר נגיש.',
    bullets: ['שמלות לנערות ובת מצווה', 'מחיר 200 ₪ בלבד בהתאם למלאי', 'דגמים חגיגיים וצנועים', 'קביעת מדידה מהירה בוואטסאפ'],
  },
}

export default function LandingPage({ type = '/dress-rental-harish' }) {
  const data = CONTENT[type] || CONTENT['/dress-rental-harish']
  const schema = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: 'בית', path: '/' },
      { name: data.h1, path: type },
    ]),
  ]

  return (
    <div className="bg-cream-50">
      <SEO title={`${data.title} | ORIYA NINA`} description={data.description} jsonLd={schema} />

      <section className="bg-gradient-to-b from-cream-100 to-cream-50 px-4 py-16 text-center">
        <p className="mb-3 text-sm font-semibold tracking-widest text-gold-500">ORIYA NINA</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold text-stone-800 md:text-5xl">{data.h1}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-600">{data.intro}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/catalog" className="btn-primary">לצפייה בקטלוג</Link>
          <a href={buildWhatsappUrl(`שלום, אני מעוניינת בפרטים על ${data.h1}`)} target="_blank" rel="noopener noreferrer" className="btn-outline">
            קביעת מדידה
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-cream-200">
          <div className="mb-4 flex items-center gap-2 text-gold-500"><Sparkles size={22} /><span className="font-semibold">למה לבחור בנו?</span></div>
          <ul className="space-y-4 text-stone-700">
            {data.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2"><CheckCircle className="mt-0.5 text-green-600" size={18} /><span>{item}</span></li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-cream-200">
          <div className="mb-4 flex items-center gap-2 text-gold-500"><MapPin size={22} /><span className="font-semibold">אזורי שירות</span></div>
          <p className="leading-8 text-stone-600">
            הסטודיו משרת לקוחות מחריש והסביבה: חדרה, פרדס חנה, קציר, אור עקיבא, בנימינה וזכרון יעקב.
          </p>
          <a href={buildWhatsappUrl('שלום, אשמח לבדוק זמינות למדידה בחריש')} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-green-600 font-semibold">
            <MessageCircle size={18} /> שלחי הודעה בוואטסאפ
          </a>
        </div>
      </section>
    </div>
  )
}
