import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

const IMAGES_FOLDER = path.join(__dirname, '..', 'dress-images')
const CATALOG_PATH = path.join(__dirname, 'catalog-data.json')

const CATEGORY_MAP = {
  'נשים': 'שמלה להשכרה',
  'נערות': 'שמלה להשכרה לנערות',
}

const DRY_RUN = process.argv.includes('--dry-run')
const DELETE_OLD = process.argv.includes('--delete-old')
const ONLY_FILE = process.argv.find(a => a.startsWith('--only='))?.split('=')[1]

async function deleteOldItems() {
  const { data: items, error } = await supabase.from('items').select('*')
  if (error) throw error

  console.log(`\n=== Deleting ${items.length} old placeholder items ===`)
  for (const item of items) {
    console.log(`  - ${item.name} (${item.color}) [${item.id}]`)
    if (DRY_RUN) continue

    if (Array.isArray(item.images)) {
      for (const url of item.images) {
        const storagePath = url.split('/fashion-images/')[1]
        if (storagePath) {
          const { error: rmErr } = await supabase.storage.from('fashion-images').remove([storagePath])
          if (rmErr) console.log(`    ! image delete failed: ${rmErr.message}`)
        }
      }
    }

    const { error: delErr } = await supabase.from('items').delete().eq('id', item.id)
    if (delErr) console.log(`    ! item delete failed: ${delErr.message}`)
  }
}

async function importCatalog() {
  let rows = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'))
  if (ONLY_FILE) rows = rows.filter(r => r['שם קובץ'] === ONLY_FILE)
  console.log(`\n=== Importing ${rows.length} new items from catalog ===`)

  let created = 0
  let skipped = 0
  const errors = []

  for (const row of rows) {
    const fileName = row['שם קובץ']
    const category = CATEGORY_MAP[row['קטגוריה']]
    const name = row['שם השמלה']
    const description = row['תיאור יוקרתי']
    const price = row['מחיר (₪)']
    const color = row['צבע']

    if (!fileName || !category || !name) {
      errors.push(`Skipping incomplete row: ${JSON.stringify(row)}`)
      skipped++
      continue
    }

    const filePath = path.join(IMAGES_FOLDER, fileName)
    if (!fs.existsSync(filePath)) {
      errors.push(`Missing image file: ${fileName}`)
      skipped++
      continue
    }

    console.log(`  - ${fileName} -> "${name}" (${category}, ₪${price})`)
    if (DRY_RUN) {
      created++
      continue
    }

    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(fileName).slice(1) || 'jpeg'
    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`

    const { error: uploadError } = await supabase.storage
      .from('fashion-images')
      .upload(fileName, fileBuffer, { contentType, upsert: false })

    if (uploadError) {
      errors.push(`Upload failed for ${fileName}: ${uploadError.message}`)
      skipped++
      continue
    }

    const { data: urlData } = supabase.storage.from('fashion-images').getPublicUrl(fileName)

    const { error: insertError } = await supabase.from('items').insert({
      name,
      category,
      price,
      color,
      description,
      availability: 'פנוי',
      images: [urlData.publicUrl],
      is_new: false,
      is_popular: false,
    })

    if (insertError) {
      errors.push(`Insert failed for ${fileName}: ${insertError.message}`)
      skipped++
      continue
    }

    created++
  }

  console.log(`\n=== Done: ${created} created, ${skipped} skipped ===`)
  if (errors.length) {
    console.log('\nErrors:')
    errors.forEach(e => console.log('  ! ' + e))
  }
}

async function main() {
  if (DRY_RUN) console.log('*** DRY RUN — no writes will be made ***')

  if (DELETE_OLD) await deleteOldItems()
  await importCatalog()
}

main()
