export const SITE = {
  name: 'ORIYA NINA',
  legalName: 'ORIYA NINA - השכרת שמלות ערב בחריש',
  url: 'https://oriya-nina-catalog.vercel.app',
  phone: '+972506386895',
  phoneDisplay: '050-638-6895',
  phoneTel: 'tel:+972506386895',
  whatsapp: '972506386895',
  city: 'חריש',
  region: 'מחוז חיפה',
  country: 'IL',
  areaServed: ['חריש', 'חדרה', 'פרדס חנה', 'כרכור', 'קציר', 'אור עקיבא', 'בנימינה', 'זכרון יעקב', 'קיסריה'],
  geo: { latitude: 32.4669, longitude: 35.05 },
  defaultImage: 'https://oriya-nina-catalog.vercel.app/og-image.svg',
  priceRange: '₪₪',
  description:
    'השכרת שמלות ערב לנשים ולנערות בחריש, חדרה, פרדס חנה והסביבה. שמלות צנועות ויוקרתיות לאירועים, חתונות ובת מצווה החל מ־250 ₪ כולל ניקוי יבש.',
  keywords: [
    'השכרת שמלות חריש',
    'שמלות ערב חריש',
    'השכרת שמלות ערב בחריש',
    'השכרת שמלות לנערות בחריש',
    'שמלות בת מצווה חריש',
    'שמלות צנועות להשכרה',
    'השכרת שמלות חדרה',
    'השכרת שמלות פרדס חנה',
  ],
}

export function buildWhatsappUrl(message = 'שלום, אני מעוניינת לקבוע מדידה לשמלה') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

// 'YYYY-MM-DD' -> 'DD.MM.YYYY', formatted without Date parsing to avoid timezone shifts.
export function formatBookedDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}.${month}.${year}`
}

function localISODate(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDays(isoDate, days) {
  const [y, m, d] = isoDate.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + days)
  return localISODate(dt)
}

const AVAILABILITY_LEVEL = { 'פנוי': 0, 'שמור': 1, 'לא זמין': 2 }

// A dress automatically shows as "שמור" starting the day before a booked date and through
// the booked date itself, then reverts to its manual status the day after — no admin action needed.
// A manual status stricter than "שמור" (i.e. "לא זמין") always wins and is never loosened.
export function computeEffectiveAvailability(item) {
  const manual = item.availability || 'פנוי'
  const bookedDates = item.bookedDates || []
  const today = localISODate()

  const hasActiveBooking = bookedDates.some(bookedDate => {
    const windowStart = addDays(bookedDate, -1)
    return today >= windowStart && today <= bookedDate
  })

  if (!hasActiveBooking) return manual
  return (AVAILABILITY_LEVEL[manual] ?? 0) >= AVAILABILITY_LEVEL['שמור'] ? manual : 'שמור'
}
