import { createClient } from '@supabase/supabase-js'

// ─── Init ─────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ חסרים פרטי Supabase (.env)')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Items ────────────────────────────────────────

export async function fetchItems(filters = {}) {
  let query = supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }

  if (filters.availability === 'available') {
    query = query.eq('availability', 'פנוי')
  }

  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,color.ilike.%${filters.search}%,size.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
    )
  }

  const { data, error } = await query

  if (error) {
    console.log('❌ fetchItems error:', error)
    throw error
  }

  return data
}

export async function createItem(item) {
  const { data, error } = await supabase
    .from('items')
    .insert([item])
    .select()
    .single()

  if (error) {
    console.log('❌ createItem error:', error)
    throw error
  }

  return data
}

export async function updateItem(id, updates) {
  const { data, error } = await supabase
    .from('items')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.log('❌ updateItem error:', error)
    throw error
  }

  return data
}

export async function deleteItem(id) {
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id)

  if (error) {
    console.log('❌ deleteItem error:', error)
    throw error
  }
}

// ─── Upload Image (🔥 FIXED) ─────────────────────

export async function uploadImage(file) {
  const ext = file.name.split('.').pop()

  const fileName =
    Date.now() + '-' + Math.random().toString(36).substring(2) + '.' + ext

  const { error } = await supabase.storage
    .from('fashion-images')
    .upload(fileName, file)

  if (error) {
    console.log('❌ Upload error:', error)
    throw error
  }

  const { data } = supabase.storage
    .from('fashion-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

// ─── Delete Image ────────────────────────────────

export async function deleteImage(url) {
  try {
    const path = url.split('/fashion-images/')[1]
    if (!path) return

    const { error } = await supabase.storage
      .from('fashion-images')
      .remove([path])

    if (error) console.log('❌ deleteImage error:', error)
  } catch (err) {
    console.log('❌ deleteImage catch:', err)
  }
}

// ─── Admin Auth ──────────────────────────────────

export async function adminLogin(password) {
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_auth', 'true')
    return true
  }

  return false
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem('admin_auth') === 'true'
}

export function adminLogout() {
  sessionStorage.removeItem('admin_auth')
}