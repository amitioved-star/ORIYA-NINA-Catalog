import 'dotenv/config'
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

const ITEM_NAME = process.argv[2]
const LOCAL_FILE = process.argv[3]
const STORAGE_NAME = process.argv[4]

if (!ITEM_NAME || !LOCAL_FILE || !STORAGE_NAME) {
  console.log('Usage: node _add-model-image.mjs "<item name>" <local file path> <storage file name>')
  process.exit(1)
}

const { data: items, error: fetchErr } = await supabase
  .from('items')
  .select('*')
  .eq('name', ITEM_NAME)

if (fetchErr) { console.log('ERROR', fetchErr); process.exit(1) }
if (!items.length) { console.log('No matching item found for name:', ITEM_NAME); process.exit(1) }

const item = items[0]
console.log('Found item:', item.id, item.name, 'current images:', item.images)

const fileBuffer = fs.readFileSync(LOCAL_FILE)

const { error: uploadErr } = await supabase.storage
  .from('fashion-images')
  .upload(STORAGE_NAME, fileBuffer, { contentType: 'image/jpeg', upsert: false })

if (uploadErr) { console.log('Upload error:', uploadErr); process.exit(1) }

const { data: urlData } = supabase.storage.from('fashion-images').getPublicUrl(STORAGE_NAME)
console.log('Uploaded:', urlData.publicUrl)

const newImages = [...(item.images || []), urlData.publicUrl]

const { error: updateErr } = await supabase
  .from('items')
  .update({ images: newImages })
  .eq('id', item.id)

if (updateErr) { console.log('Update error:', updateErr); process.exit(1) }

console.log('Done. New images array:', newImages)
