import SEO from '../components/SEO'
import { buildWhatsappUrl } from '../constants'
import { faqSchema, breadcrumbSchema } from '../seoSchemas'
import { trackWhatsApp } from '../lib/analytics'

const FAQS = [
  { q: 'איפה נמצא הסטודיו?', a: 'הסטודיו נמצא בחריש ומשרת לקוחות מחריש, חדרה, פרדס חנה והסביבה.' },
  { q: 'כמה עולה השכרת שמלה?', a: 'שמלות לנשים החל מ־250 ₪ כולל ניקוי יבש. שמלות לנערות ובת מצווה 200 ₪ בהתאם למלאי.' },
  { q: 'איך קובעים מדידה?', a: 'ניתן לקבוע מדידה אישית דרך כפתור הוואטסאפ באתר.' },
  { q: 'האם המחיר כולל תיקונים?', a: 'המחיר אינו כולל תיקונים. ניתן לבדוק אפשרויות התאמה בעת המדידה.' },
  { q: 'איך יודעים אם שמלה פנויה?', a: 'בקטלוג מוצג סטטוס זמינות לכל פריט: פנוי, שמור או לא זמין.' },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <SEO
        title="שאלות ותשובות על השכרת שמלות בחריש"
        description="שאלות נפוצות על השכרת שמלות ערב לנשים ולנערות בחריש: מחירים, מדידות, זמינות וניקוי יבש."
        jsonLd={[faqSchema(FAQS), breadcrumbSchema([{ name: 'בית', path: '/' }, { name: 'שאלות ותשובות', path: '/faq' }])]}
      />
      <div className="text-center mb-10">
        <p className="text-gold-500 text-sm font-medium tracking-wider mb-2">FAQ</p>
        <h1 className="section-title">שאלות ותשובות</h1>
        <div className="gold-divider" />
      </div>

      <div className="space-y-4">
        {FAQS.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-cream-200 bg-white p-5 shadow-sm">
            <summary className="cursor-pointer font-semibold text-stone-800">{item.q}</summary>
            <p className="mt-3 leading-7 text-stone-600">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          className="btn-whatsapp inline-flex"
          href={buildWhatsappUrl('שלום, יש לי שאלה לגבי השכרת שמלה')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp('faq_cta')}
          aria-label="שאלה נוספת בוואטסאפ"
        >שאלה נוספת בוואטסאפ</a>
      </div>
    </div>
  )
}
