-- ═══════════════════════════════════════════════════════════════════
-- עדינה קולקשן — SQL Setup Script for Supabase
-- הרץ את הסקריפט הזה ב: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════

-- 1. יצירת טבלת הפריטים
-- ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS items (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('שמלה להשכרה', 'מטפחת למכירה')),
  price         NUMERIC(10, 2),
  size          TEXT,
  color         TEXT,
  description   TEXT,
  availability  TEXT NOT NULL DEFAULT 'פנוי' CHECK (availability IN ('פנוי', 'שמור', 'לא זמין')),
  images        JSONB DEFAULT '[]'::jsonb,
  is_new        BOOLEAN DEFAULT false,
  is_popular    BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. הפעלת Row Level Security (RLS)
-- ─────────────────────────────────────────────────
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- כולם יכולים לקרוא (הקטלוג ציבורי)
CREATE POLICY "Public read access"
  ON items FOR SELECT
  TO anon, authenticated
  USING (true);

-- כתיבה — anon יכול גם להוסיף/לערוך/למחוק (הניהול מוגן בסיסמה בצד הלקוח)
-- לחלופין: הגבלה על authenticated בלבד אם משתמשים ב-Supabase Auth
CREATE POLICY "Anon write access"
  ON items FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- 3. אינדקסים לביצועים
-- ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS items_category_idx    ON items (category);
CREATE INDEX IF NOT EXISTS items_availability_idx ON items (availability);
CREATE INDEX IF NOT EXISTS items_created_at_idx  ON items (created_at DESC);

-- 4. דוגמת נתונים ראשוניים (אופציונלי)
-- ─────────────────────────────────────────────────
INSERT INTO items (name, category, price, size, color, description, availability, is_new, is_popular, images)
VALUES
  (
    'שמלת ערב שחורה אלגנטית',
    'שמלה להשכרה',
    180,
    'M',
    'שחור',
    'שמלת ערב מחשוף גב, בד משי איכותי, מתאימה לאירועים רשמיים וחתונות.',
    'פנוי',
    true,
    true,
    '[]'
  ),
  (
    'שמלת כלה שמפניה',
    'שמלה להשכרה',
    350,
    'S',
    'שמפניה',
    'שמלת כלה מרהיבה עם תחרה ואבנים, זנב קצר, עיצוב מודרני.',
    'שמור',
    false,
    true,
    '[]'
  ),
  (
    'מטפחת משי ורדים',
    'מטפחת למכירה',
    95,
    'אחיד',
    'ורוד עדין',
    'מטפחת משי טבעי 100%, הדפס ורדים עדין, ניתן לקשירה בדרכים שונות.',
    'פנוי',
    true,
    false,
    '[]'
  ),
  (
    'מטפחת שיפון זהב',
    'מטפחת למכירה',
    75,
    'אחיד',
    'זהב',
    'מטפחת שיפון קלה ואוורירית, גוון זהב מבריק, מושלמת לשבת ולאירועים.',
    'פנוי',
    false,
    false,
    '[]'
  );

-- ═══════════════════════════════════════════════════════════════════
-- 5. Storage Bucket — הגדרה ידנית בדשבורד Supabase
-- ═══════════════════════════════════════════════════════════════════
-- לאחר הרצת ה-SQL:
-- 1. לך ל: Storage → Create bucket
-- 2. שם: fashion-images
-- 3. סמן: Public bucket ✓
-- 4. לחץ: Create bucket
--
-- לאחר יצירת ה-bucket, הוסף פוליסי:
-- Storage → fashion-images → Policies → New Policy → For full customization:
--
-- Policy name: Public read
-- Allowed operations: SELECT
-- Policy definition: true
--
-- Policy name: Anon upload
-- Allowed operations: INSERT
-- Policy definition: true
-- ═══════════════════════════════════════════════════════════════════

SELECT 'Setup complete! ✓ Table created with ' || COUNT(*) || ' sample items.' AS status
FROM items;
