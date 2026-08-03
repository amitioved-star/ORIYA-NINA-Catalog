-- ═══════════════════════════════════════════════════════════════════
-- הרחבה: יומן תאריכים תפוסים לכל שמלה
-- הרץ את הסקריפט הזה ב: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS booked_dates (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id       UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  booked_date   DATE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (item_id, booked_date)
);

ALTER TABLE booked_dates ENABLE ROW LEVEL SECURITY;

-- כולם יכולים לקרוא (כדי שהלקוחות יראו תאריכים תפוסים בקטלוג)
CREATE POLICY "Public read access"
  ON booked_dates FOR SELECT
  TO anon, authenticated
  USING (true);

-- כתיבה — anon יכול להוסיף/למחוק (הניהול מוגן בסיסמה בצד הלקוח, כמו בטבלת items)
CREATE POLICY "Anon write access"
  ON booked_dates FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS booked_dates_item_id_idx ON booked_dates (item_id);
CREATE INDEX IF NOT EXISTS booked_dates_date_idx ON booked_dates (booked_date);

SELECT 'Setup complete! ✓ booked_dates table created.' AS status;
