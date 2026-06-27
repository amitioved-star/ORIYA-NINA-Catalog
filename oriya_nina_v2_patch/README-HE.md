# ORIYA NINA v2 — חבילת שדרוג SEO ומוצר מוגמר

## מה החבילה עושה
החבילה משדרגת את האתר הקיים בלי לגעת ב-Supabase ובלי לשנות את הנתונים של השמלות.

### SEO וגוגל
- כותרות ותיאורי SEO חזקים יותר עם הביטויים: השכרת שמלות חריש, שמלות ערב בחריש, שמלות לנערות בחריש.
- Open Graph לשיתוף יפה בוואטסאפ/פייסבוק.
- Canonical URL לכל עמוד.
- robots.txt שחוסם את `/admin` מגוגל.
- sitemap.xml עם כל העמודים החשובים.
- Schema.org לעסק מקומי, אתר, FAQ, Breadcrumbs ומוצרים במודל פריט.

### עמודים חדשים
- `/dress-rental-harish` — עמוד נחיתה לביטוי השכרת שמלות ערב בחריש.
- `/women-evening-dresses-harish` — עמוד נחיתה לשמלות ערב לנשים בחריש.
- `/girls-dresses-harish` — עמוד נחיתה לשמלות לנערות ובת מצווה בחריש.
- `/faq` — שאלות ותשובות עם FAQ Schema.

### שיפור חוויית משתמש
- כפתור וואטסאפ צף בכל האתר.
- קישורי ניווט חדשים.
- ALT טוב יותר לתמונות.
- Schema למוצר כאשר פותחים שמלה.

### ביצועים ואבטחה
- Manifest בסיסי לאתר.
- OG image ייעודי.
- Headers משופרים ב-Vercel.
- Cache לאססטים.

## התקנה
1. חלץ את קובץ ה-ZIP.
2. העתק את כל הקבצים שבתיקייה אל:
   `D:\Developer Dress\fashion-catalog\fashion-catalog`
3. אשר החלפת קבצים קיימים.
4. הרץ:

```powershell
cd "D:\Developer Dress\fashion-catalog\fashion-catalog"
npm run build
npm run dev
```

5. בדוק בדפדפן:
- `http://localhost:5173/`
- `http://localhost:5173/catalog`
- `http://localhost:5173/dress-rental-harish`
- `http://localhost:5173/women-evening-dresses-harish`
- `http://localhost:5173/girls-dresses-harish`
- `http://localhost:5173/faq`

6. אם הכל תקין:

```powershell
git add .
git commit -m "ORIYA NINA v2 SEO and local search upgrade"
git push origin main
```

## בדיקה שבוצעה
בוצע `npm run build` בהצלחה על הקוד לאחר השדרוג.

## חשוב
- אין שינוי ב-Supabase.
- אין שינוי במחירי השמלות במסד הנתונים.
- אין מחיקה של תמונות.
- `/admin` נשאר קיים, אבל מוגדר כ-noindex וחסום ב-robots כדי שגוגל לא יאנדקס אותו.
