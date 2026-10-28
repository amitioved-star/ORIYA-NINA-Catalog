import SEO from '../components/SEO'
import { ACCESSIBILITY, SITE, buildWhatsappUrl } from '../constants'
import { breadcrumbSchema } from '../seoSchemas'
import { trackWhatsApp, trackPhone } from '../lib/analytics'

const ADAPTATIONS = [
  'ניווט מלא באמצעות מקלדת, כולל קישור "דלג לתוכן הראשי" וסימון ברור של האלמנט הפעיל.',
  'תאימות לקוראי מסך: מבנה כותרות היררכי, אזורי עמוד (landmarks), תוויות לכפתורים ולשדות, והכרזה על שינויים בתוצאות הקטלוג.',
  'טקסט חלופי לתמונות השמלות ולאיקונים.',
  'ניגודיות צבעים בהתאם לרמת AA, ולא הסתמכות על צבע בלבד להעברת מידע (סטטוס זמינות מוצג גם במילים).',
  'חלון פרטי השמלה נפתח כחלון מודאלי נגיש: הפוקוס עובר אליו, נשאר בתוכו, ונסגר גם במקש Escape.',
  'כפתור השהיה והפעלה לסרטוני הרקע; הסרטונים אינם מתנגנים אוטומטית למי שהגדיר "הפחתת תנועה" במערכת ההפעלה.',
  'התאמה לשינוי גודל טקסט והגדלת תצוגה, ותצוגה רספונסיבית למכשירים ניידים.',
  'סרגל נגישות: הגדלה והקטנה של הטקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, גופן קריא ועצירת אנימציות.',
]

const LIMITATIONS = [
  'תמונות שמלות חדשות מועלות על ידי צוות העסק; הטקסט החלופי שלהן נגזר משם השמלה והקטגוריה ועשוי להיות כללי.',
  'הכפתורים לפנייה בוואטסאפ פותחים אפליקציה או אתר חיצוני (WhatsApp) שאינם בשליטתנו.',
  'ייתכן שחלק מהתכנים לא הונגשו במלואם. אנו ממשיכים לבדוק ולשפר את האתר באופן שוטף.',
]

export default function AccessibilityPage() {
  const { coordinatorName, coordinatorEmail, updated } = ACCESSIBILITY

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <SEO
        title="הצהרת נגישות"
        description="הצהרת הנגישות של ORIYA NINA – השכרת שמלות ערב בחריש: התאמות הנגישות שבוצעו באתר ופרטי יצירת קשר לפניות בנושא נגישות."
        jsonLd={breadcrumbSchema([{ name: 'בית', path: '/' }, { name: 'הצהרת נגישות', path: '/accessibility' }])}
      />

      <div className="mb-10 text-center">
        <h1 className="section-title">הצהרת נגישות</h1>
        <div className="gold-divider" />
      </div>

      <div className="space-y-8 leading-8 text-stone-700">
        <p>
          ORIYA NINA רואה חשיבות רבה במתן שירות שוויוני, מכבד ונגיש לכלל הלקוחות, ובכלל זה אנשים עם מוגבלות.
          אנו משקיעים מאמצים בהנגשת האתר כדי שכל אחת תוכל לעיין בקטלוג, לבדוק זמינות ולפנות אלינו בנוחות ובעצמאות.
        </p>

        <section aria-labelledby="a11y-level">
          <h2 id="a11y-level" className="mb-2 text-2xl font-semibold text-stone-900">רמת הנגישות</h2>
          <p>
            האתר הותאם לדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013,
            ולתקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA, תוך שימוש בעקרונות WCAG 2.1 במקומות שבהם הדבר אפשרי.
          </p>
        </section>

        <section aria-labelledby="a11y-done">
          <h2 id="a11y-done" className="mb-2 text-2xl font-semibold text-stone-900">התאמות שבוצעו באתר</h2>
          <ul className="list-disc space-y-2 pr-6">
            {ADAPTATIONS.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section aria-labelledby="a11y-toolbar">
          <h2 id="a11y-toolbar" className="mb-2 text-2xl font-semibold text-stone-900">סרגל הנגישות</h2>
          <p>
            בפינה הימנית התחתונה של כל עמוד נמצא כפתור "תפריט נגישות" (איקון כחול). הבחירות שלך נשמרות במכשיר
            ויחולו גם בביקורים הבאים. לאיפוס ההגדרות יש ללחוץ על "איפוס הגדרות" בתפריט.
          </p>
        </section>

        <section aria-labelledby="a11y-limits">
          <h2 id="a11y-limits" className="mb-2 text-2xl font-semibold text-stone-900">חריגים ומגבלות ידועות</h2>
          <ul className="list-disc space-y-2 pr-6">
            {LIMITATIONS.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section aria-labelledby="a11y-contact">
          <h2 id="a11y-contact" className="mb-2 text-2xl font-semibold text-stone-900">פניות בנושא נגישות</h2>
          <p className="mb-3">
            נתקלת בקושי בגלישה באתר או בהזמנת שירות? נשמח לשמוע ולתקן. ניתן לפנות אלינו בכל אחת מהדרכים הבאות
            (כולל לשאלות לגבי נגישות הסטודיו עצמו):
          </p>
          <ul className="space-y-1">
            {coordinatorName && <li>איש קשר לנושא נגישות: {coordinatorName}</li>}
            <li>
              טלפון:{' '}
              <a href={SITE.phoneTel} onClick={() => trackPhone('accessibility_page')} className="font-medium text-blue-800 underline">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              וואטסאפ:{' '}
              <a
                href={buildWhatsappUrl('שלום, אני פונה בנושא נגישות באתר')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp('accessibility_page')}
                className="font-medium text-blue-800 underline"
              >
                שליחת הודעה
              </a>
            </li>
            {coordinatorEmail && (
              <li>
                דוא"ל:{' '}
                <a href={`mailto:${coordinatorEmail}`} className="font-medium text-blue-800 underline">{coordinatorEmail}</a>
              </li>
            )}
          </ul>
        </section>

        <p className="text-sm text-stone-600">תאריך עדכון ההצהרה: {updated}</p>
      </div>
    </div>
  )
}
