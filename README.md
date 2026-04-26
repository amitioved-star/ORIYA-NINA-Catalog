# עדינה קולקשן — קטלוג שמלות ומטפחות
**Fashion Catalog Website — Hebrew RTL, React + Supabase + Vercel**

אתר קטלוג מקצועי לעסק אופנה קטן. שמלות להשכרה ומטפחות למכירה.
ללא עגלת קניות, ללא תשלום — רק קטלוג יפה עם יצירת קשר בוואטסאפ.

---

## מבנה הפרויקט

```
fashion-catalog/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # ניווט עליון
│   │   ├── Footer.jsx          # פוטר
│   │   ├── ItemCard.jsx        # כרטיס פריט בקטלוג
│   │   └── ItemModal.jsx       # חלון פרטים מלא
│   ├── pages/
│   │   ├── HomePage.jsx        # דף הבית + Hero
│   │   ├── CatalogPage.jsx     # קטלוג עם סינון וחיפוש
│   │   └── AdminPage.jsx       # לוח ניהול
│   ├── lib/
│   │   └── supabase.js         # חיבור Supabase + כל פונקציות ה-API
│   ├── App.jsx                 # ניתוב ראשי
│   ├── main.jsx                # נקודת כניסה
│   └── index.css               # סגנון גלובלי + RTL
├── supabase-setup.sql          # SQL לאתחול מסד הנתונים
├── vercel.json                 # הגדרות Vercel
├── .env.example                # משתני סביבה לדוגמה
└── package.json
```

---

## הוראות התקנה מלאות

### שלב 1: יצירת פרויקט Supabase

1. כנסי ל-[supabase.com](https://supabase.com) וצרי חשבון חינמי
2. לחצי **New Project**
3. בחרי שם לפרויקט (לדוגמה: `adina-collection`)
4. בחרי region קרוב לישראל (Europe West)
5. המתיני שהפרויקט נוצר (~2 דקות)

### שלב 2: הגדרת מסד הנתונים

1. בדשבורד Supabase → **SQL Editor** → **New Query**
2. העתיקי את כל תוכן הקובץ `supabase-setup.sql`
3. הדביקי ולחצי **Run** (Ctrl+Enter)
4. תראי הודעה: `Setup complete! ✓ Table created with 4 sample items.`

### שלב 3: הגדרת Storage לתמונות

1. בדשבורד Supabase → **Storage** (בתפריט שמאלי)
2. לחצי **Create bucket**
3. שם: `fashion-images`
4. סמני: **Public bucket** ✓
5. לחצי **Create bucket**
6. לאחר היצירה: **Policies** → **New policy** → **For full customization**:
   - שם: `Public read` | Operations: SELECT | Definition: `true` → Save
   - שם: `Allow upload` | Operations: INSERT | Definition: `true` → Save
   - שם: `Allow delete` | Operations: DELETE | Definition: `true` → Save

### שלב 4: קבלת מפתחות API

1. בדשבורד Supabase → **Settings** → **API**
2. העתיקי את:
   - **Project URL** (נראה כמו: `https://abcdefg.supabase.co`)
   - **anon public** key (מפתח ארוך)

### שלב 5: הגדרת משתני סביבה מקומית

```bash
# העתיקי את קובץ הדוגמה
cp .env.example .env

# ערכי את .env עם הערכים שהעתקת:
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_ADMIN_PASSWORD=הסיסמה_שלך_כאן
```

### שלב 6: הרצה מקומית

```bash
# התקנת חבילות
npm install

# הרצת שרת פיתוח
npm run dev

# פתחי http://localhost:5173
```

### שלב 7: עדכון מספר הוואטסאפ

חפשי בקוד `972500000000` והחליפי במספר שלך (בפורמט בינלאומי ללא +):
- `src/components/Navbar.jsx`
- `src/components/ItemCard.jsx`
- `src/components/ItemModal.jsx`
- `src/pages/HomePage.jsx`
- `src/components/Footer.jsx`

או הוסיפי משתנה סביבה:
```bash
VITE_WHATSAPP_NUMBER=972501234567
```

---

## פריסה ב-Vercel (בחינם!)

### אפשרות א׳ — דרך GitHub (מומלץ)

1. העלי את הפרויקט ל-GitHub (repo חדש)
2. כנסי ל-[vercel.com](https://vercel.com) → **Add New Project**
3. בחרי את ה-repo מ-GitHub
4. תחת **Environment Variables** הוסיפי:
   - `VITE_SUPABASE_URL` = הכתובת מ-Supabase
   - `VITE_SUPABASE_ANON_KEY` = המפתח מ-Supabase
   - `VITE_ADMIN_PASSWORD` = הסיסמה שבחרת
5. לחצי **Deploy**
6. לאחר ~1 דקה — האתר חי! 🎉

### אפשרות ב׳ — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
# עקבי אחר ההוראות ובסוף הוסיפי את משתני הסביבה בדשבורד Vercel
```

---

## שימוש בלוח הניהול

1. גלול לתחתית האתר → לחצי **ניהול** (קישור בפוטר)
   - או כנסי ישירות ל: `https://your-site.vercel.app/admin`
2. הזיני את הסיסמה שהגדרת ב-`VITE_ADMIN_PASSWORD`
3. ניתן:
   - להוסיף פריטים חדשים עם תמונות מרובות
   - לשנות זמינות בלחיצה אחת מתוך הטבלה
   - לסמן פריטים כ"חדש" או "פופולרי"
   - לערוך ולמחוק פריטים

---

## התאמות נוספות

### שינוי שם העסק
חפשי `עדינה קולקשן` בכל הקבצים והחליפי בשם שלך.

### שינוי צבעי הזהב
ב-`tailwind.config.js`:
```js
gold: {
  300: '#D4AF7A',
  400: '#C9A55A',
  500: '#B8923A', // צבע ראשי
  600: '#9A7A2E',
}
```

### הוספת שדות
ב-`supabase.js` ו-`AdminPage.jsx` ניתן להוסיף שדות נוספים לטופס.

---

## טכנולוגיות

| טכנולוגיה | שימוש |
|-----------|-------|
| React 18 | ממשק משתמש |
| React Router v6 | ניתוב |
| Tailwind CSS v3 | עיצוב |
| Supabase | מסד נתונים + Storage |
| Vite | בנייה ופיתוח |
| Vercel | פריסה |

---

## אבטחה

- לוח הניהול מוגן בסיסמה (session-based)
- מומלץ: להגביל גישת כתיבה ב-Supabase RLS לאחר מעבר ל-Supabase Auth
- הסיסמה נשמרת ב-sessionStorage (נמחקת עם סגירת הדפדפן)
- לעסק קטן — רמת האבטחה הזו מספיקה

---

## תמיכה

לשאלות ניתן לפנות בוואטסאפ 😊


2kXa83savk?X5P2
