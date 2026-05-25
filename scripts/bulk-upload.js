import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

const IMAGES_FOLDER = './dress-images'

const dresses = [
  {
    name: 'שמלת ערב שחורה',
    description: 'שמלת ערב שחורה קלאסית בגזרה מחמיאה ומראה יוקרתי.',
    color: 'שחור',
  },
  {
    name: 'שמלת ערב תכלת',
    description: 'שמלת ערב תכלת עם שרוולים נשפכים ועיצוב אלגנטי.',
    color: 'תכלת',
  },
  {
    name: 'שמלת ערב בורדו',
    description: 'שמלת ערב בגוון בורדו עמוק עם מראה יוקרתי.',
    color: 'בורדו',
  },
  {
    name: 'שמלת ערב לבנה',
    description: 'שמלה לבנה חגיגית ועדינה למראה נסיכותי.',
    color: 'לבן',
  },
  {
    name: 'שמלת ערב ירוקה',
    description: 'שמלת ערב ירוקה עם עיצוב נשי ומרשים.',
    color: 'ירוק',
  },
]

async function uploadAll() {
  const files = fs.readdirSync(IMAGES_FOLDER)

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    const dress = dresses[i] || {
      name: `שמלה ${i + 1}`,
      description: 'שמלת ערב יוקרתית ומרשימה.',
      color: 'לא צוין',
    }

    const filePath = path.join(IMAGES_FOLDER, file)

    const fileBuffer = fs.readFileSync(filePath)

    const fileName = `${Date.now()}-${file}`

    console.log(`Uploading ${fileName}...`)

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('fashion-images')
      .upload(fileName, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      })

    if (uploadError) {
      console.log(uploadError)
      continue
    }

    // Get public URL
    const { data } = supabase.storage
      .from('fashion-images')
      .getPublicUrl(fileName)

    const imageUrl = data.publicUrl

    // Insert item into database
    const { error: insertError } = await supabase
      .from('items')
      .insert({
        name: dress.name,
        category: 'שמלה להשכרה',
        price: 300,
        color: dress.color,
        size: null,
        description: dress.description,
        availability: 'פנוי',
        images: [imageUrl],
        is_new: false,
        is_popular: false,
      })

    if (insertError) {
      console.log(insertError)
      continue
    }

    console.log(`Added: ${dress.name}`)
  }

  console.log('DONE ✅')
}

uploadAll()