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
