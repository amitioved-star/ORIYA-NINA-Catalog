import { useState, useEffect, useRef } from 'react'
import {
  Plus, Edit2, Trash2, X, Check, Eye, EyeOff, LogOut,
  Upload, Star, Sparkles, Package, ChevronDown,
  Calendar as CalendarIcon, ChevronLeft, ChevronRight
} from 'lucide-react'
import SEO from '../components/SEO'
import {
  fetchItems, createItem, updateItem, deleteItem,
  uploadImage, deleteImage,
  fetchBookedDatesForItem, addBookedDate, deleteBookedDate, fetchAllBookedDates,
  adminLogin, isAdminLoggedIn, adminLogout
} from '../lib/supabase'
import { formatBookedDate } from '../constants'

const EMPTY_FORM = {
  name: '',
  category: 'שמלה להשכרה',
  price: '',
  size: '',
  color: '',
  description: '',
  availability: 'פנוי',
  images: [],
  is_new: false,
  is_popular: false,
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn())

  if (!loggedIn) return (
    <>
      <SEO title="ניהול" description="כניסה לניהול ORIYA NINA" noindex />
      <LoginScreen onLogin={() => setLoggedIn(true)} />
    </>
  )
  return (
    <>
      <SEO title="לוח ניהול" description="לוח ניהול ORIYA NINA" noindex />
      <Dashboard onLogout={() => { adminLogout(); setLoggedIn(false) }} />
    </>
  )
}

// ─── Login ─────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const handleSubmit = async () => {
    if (!password) return
    setLoading(true)
    setError('')
    const ok = await adminLogin(password)
    if (ok) onLogin()
    else setError('סיסמה שגויה. נסי שוב.')
    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #FAF5EB 0%, #F5ECD6 100%)' }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✦</span>
          </div>
          <h1 className="text-2xl font-semibold text-stone-800">כניסה לניהול</h1>
          <p className="text-stone-400 text-sm mt-1">ORIYA NINA</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">סיסמת כניסה</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="הזיני סיסמה"
                className="input-field pl-10"
              />
              <button
                type="button"
                onClick={() => setShow(v => !v)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'מתחברת...' : 'כניסה'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ─────────────────────────────────────────────────────────────

function Dashboard({ onLogout }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [filterCat, setFilterCat] = useState('all')
  const [toast, setToast] = useState(null)
  const [hoverPreview, setHoverPreview] = useState(null)
  const [view, setView] = useState('items')

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const load = async () => {
    setLoading(true)
    try { setItems(await fetchItems()) }
    catch { showToast('שגיאה בטעינת פריטים', 'error') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleSave = async (formData) => {
    try {
      if (editItem) {
        await updateItem(editItem.id, formData)
        showToast('פריט עודכן בהצלחה')
      } else {
        await createItem(formData)
        showToast('פריט נוסף בהצלחה')
      }
      setShowForm(false)
      setEditItem(null)
      load()
    } catch (err) {
      showToast('שגיאה בשמירה: ' + err.message, 'error')
    }
  }

  const handleDelete = async (item) => {
    try {
      if (Array.isArray(item.images)) {
        for (const url of item.images) await deleteImage(url)
      }
      await deleteItem(item.id)
      showToast('פריט נמחק')
      setDeleteConfirm(null)
      load()
    } catch (err) {
      showToast('שגיאה במחיקה', 'error')
    }
  }

  const handleQuickUpdate = async (id, patch) => {
    try {
      await updateItem(id, patch)
      setItems(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it))
    } catch {
      showToast('שגיאת עדכון', 'error')
    }
  }

  const filtered = filterCat === 'all' ? items : items.filter(it => it.category === filterCat)

  // Stats
  const dressesWomen = items.filter(it => it.category === 'שמלה להשכרה').length
  const dressesGirls = items.filter(it => it.category === 'שמלה להשכרה לנערות').length
  const scarves = items.filter(it => it.category === 'מטפחת למכירה').length
  const available = items.filter(it => it.availability === 'פנוי').length

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-cream-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">✦</span>
            </div>
            <span className="font-semibold text-stone-800">לוח ניהול</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm transition-colors"
          >
            <LogOut size={15} />
            יציאה
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* View tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('items')}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              view === 'items'
                ? 'bg-gold-500 text-white border-gold-500'
                : 'border-cream-300 text-stone-600 hover:border-gold-300'
            }`}
          >
            פריטים
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              view === 'calendar'
                ? 'bg-gold-500 text-white border-gold-500'
                : 'border-cream-300 text-stone-600 hover:border-gold-300'
            }`}
          >
            <CalendarIcon size={14} />
            יומן
          </button>
        </div>

        {view === 'calendar' ? (
          <BookingCalendar />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: 'סה"כ פריטים', value: items.length, icon: Package },
                { label: 'שמלות לנשים', value: dressesWomen, icon: Sparkles },
                { label: 'שמלות לנערות', value: dressesGirls, icon: Sparkles },
                { label: 'מטפחות', value: scarves, icon: Star },
                { label: 'פנויים', value: available, icon: Check },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-cream-200 p-4 text-center">
                  <div className="w-9 h-9 bg-cream-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <s.icon size={18} className="text-gold-500" />
                  </div>
                  <div className="text-2xl font-bold text-stone-800">{s.value}</div>
                  <div className="text-xs text-stone-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Actions bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'all', label: 'הכל' },
                  { value: 'שמלה להשכרה', label: 'שמלות לנשים' },
                  { value: 'שמלה להשכרה לנערות', label: 'שמלות לנערות' },
                  { value: 'מטפחת למכירה', label: 'מטפחות' },
                ].map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setFilterCat(cat.value)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      filterCat === cat.value
                        ? 'bg-gold-500 text-white border-gold-500'
                        : 'border-cream-300 text-stone-600 hover:border-gold-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setEditItem(null); setShowForm(true) }}
                className="btn-primary flex items-center gap-2 text-sm py-2.5"
              >
                <Plus size={16} />
                הוספת פריט
              </button>
            </div>

            {/* Items table */}
            {loading ? (
              <div className="flex justify-center py-20"><div className="spinner" /></div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-cream-200">
                <Package size={36} className="text-stone-200 mx-auto mb-3" />
                <p className="text-stone-400">אין פריטים להצגה</p>
                <button
                  onClick={() => { setEditItem(null); setShowForm(true) }}
                  className="btn-primary mt-4 text-sm py-2"
                >
                  הוספת פריט ראשון
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-cream-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-cream-50 border-b border-cream-200">
                      <tr>
                        <th className="text-right px-4 py-3 text-stone-500 font-medium">פריט</th>
                        <th className="text-right px-4 py-3 text-stone-500 font-medium hidden sm:table-cell">קטגוריה</th>
                        <th className="text-right px-4 py-3 text-stone-500 font-medium hidden md:table-cell">מחיר</th>
                        <th className="text-right px-4 py-3 text-stone-500 font-medium">זמינות</th>
                        <th className="text-right px-4 py-3 text-stone-500 font-medium hidden lg:table-cell">תגיות</th>
                        <th className="text-right px-4 py-3 text-stone-500 font-medium">פעולות</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {filtered.map(item => (
                        <AdminRow
                          key={item.id}
                          item={item}
                          onEdit={() => { setEditItem(item); setShowForm(true) }}
                          onDelete={() => setDeleteConfirm(item)}
                          onQuickUpdate={handleQuickUpdate}
                          onHoverImage={setHoverPreview}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating image preview on hover */}
      {hoverPreview && (
        <div
          className="fixed z-[60] pointer-events-none transition-opacity duration-150"
          style={{
            top: hoverPreview.top,
            left: hoverPreview.left - 16,
            transform: 'translate(-100%, -50%)',
          }}
        >
          <img
            src={hoverPreview.url}
            alt=""
            className="w-72 h-auto max-h-[28rem] object-cover rounded-2xl shadow-2xl border-2 border-white"
          />
        </div>
      )}

      {/* Item Form Modal */}
      {showForm && (
        <ItemFormModal
          item={editItem}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditItem(null) }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(40,30,20,0.6)' }}
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-stone-800 mb-2">מחיקת פריט</h3>
            <p className="text-stone-500 text-sm mb-5">
              האם למחוק את "<strong>{deleteConfirm.name}</strong>"? פעולה זו אינה הפיכה.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                מחיקה
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-cream-100 text-stone-700 py-2.5 rounded-xl hover:bg-cream-200 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Admin Row ─────────────────────────────────────────────────────────────

function AdminRow({ item, onEdit, onDelete, onQuickUpdate, onHoverImage }) {
  const firstImage = Array.isArray(item.images) ? item.images[0] : null

  const availColors = {
    'פנוי': 'bg-green-50 text-green-700',
    'שמור': 'bg-amber-50 text-amber-700',
    'לא זמין': 'bg-red-50 text-red-600',
  }

  return (
    <tr className="hover:bg-cream-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-12 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0 cursor-zoom-in"
            onMouseEnter={e => {
              if (!firstImage) return
              const rect = e.currentTarget.getBoundingClientRect()
              onHoverImage({ url: firstImage, top: rect.top + rect.height / 2, left: rect.left })
            }}
            onMouseLeave={() => onHoverImage(null)}
          >
            {firstImage ? (
              <img src={firstImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">
                🖼
              </div>
            )}
          </div>
          <span className="font-medium text-stone-800 line-clamp-1">{item.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-stone-500 hidden sm:table-cell">{item.category}</td>
      <td className="px-4 py-3 text-gold-600 font-medium hidden md:table-cell">
        {item.price ? `₪${item.price}` : '—'}
      </td>
      <td className="px-4 py-3">
        <select
          value={item.availability}
          onChange={e => onQuickUpdate(item.id, { availability: e.target.value })}
          className={`text-xs px-2.5 py-1 rounded-full border-0 font-medium cursor-pointer ${availColors[item.availability]}`}
        >
          <option value="פנוי">פנוי</option>
          <option value="שמור">שמור</option>
          <option value="לא זמין">לא זמין</option>
        </select>
      </td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="flex gap-1">
          <button
            onClick={() => onQuickUpdate(item.id, { is_new: !item.is_new })}
            className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
              item.is_new
                ? 'bg-gold-500 text-white border-gold-500'
                : 'border-stone-200 text-stone-400 hover:border-gold-300'
            }`}
          >
            חדש
          </button>
          <button
            onClick={() => onQuickUpdate(item.id, { is_popular: !item.is_popular })}
            className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
              item.is_popular
                ? 'bg-rose-400 text-white border-rose-400'
                : 'border-stone-200 text-stone-400 hover:border-rose-300'
            }`}
          >
            פופולרי
          </button>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-stone-500 transition-all"
            title="עריכה"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center text-stone-500 transition-all"
            title="מחיקה"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ─── Item Form Modal ────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function ItemFormModal({ item, onSave, onClose }) {
  const [form, setForm] = useState(
    item
      ? {
          ...item,
          images: Array.isArray(item.images)
            ? item.images
            : item.images
            ? [item.images]
            : [],
        }
      : { ...EMPTY_FORM }
  )

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleFiles = async (files) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!arr.length) return
    setUploading(true)
    try {
      const urls = await Promise.all(arr.map(f => uploadImage(f)))
      set('images', [...form.images, ...urls])
    } catch (err) {
      alert('שגיאה בהעלאת תמונה: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = async (url, idx) => {
    await deleteImage(url).catch(() => {})
    set('images', form.images.filter((_, i) => i !== idx))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.category) return alert('נא למלא שם וקטגוריה')
    setSaving(true)
    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: form.price ? Number(form.price) : null,
      size: form.size?.trim() || null,
      color: form.color?.trim() || null,
      description: form.description?.trim() || null,
      availability: form.availability,
      images: form.images,
      is_new: form.is_new,
      is_popular: form.is_popular,
    }
    await onSave(payload)
    setSaving(false)
  }

 

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto modal-backdrop"
      style={{ background: 'rgba(40,30,20,0.65)' }}
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl mb-8 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-cream-200">
          <h2 className="text-xl font-semibold text-stone-800">
            {item ? 'עריכת פריט' : 'הוספת פריט חדש'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-stone-500 hover:bg-cream-200">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">תמונות</label>

            {/* Existing images */}
            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt="" className="w-20 h-24 object-cover rounded-xl border border-cream-200" />
                    <button
                      onClick={() => removeImage(url, i)}
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload area */}
            <div
              className={`upload-area p-6 text-center cursor-pointer ${dragOver ? 'drag-over' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="spinner" style={{ width: 28, height: 28 }} />
                  <span className="text-sm text-stone-400">מעלה תמונות...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} className="text-gold-400" />
                  <span className="text-sm text-stone-500">לחצי להעלאת תמונות או גררי לכאן</span>
                  <span className="text-xs text-stone-300">JPG, PNG — ניתן לבחור מספר תמונות</span>
                </div>
              )}
            </div>
          </div>

          {/* Two column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="שם הפריט *">
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="לדוגמה: שמלת ערב שחורה"
                className="input-field"
              />
            </Field>

            <Field label="קטגוריה *">
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="input-field"
              >
                <option value="שמלה להשכרה">שמלה להשכרה לנשים</option>
                <option value="שמלה להשכרה לנערות">שמלה להשכרה לנערות</option>
                <option value="מטפחת למכירה">מטפחת למכירה</option>
              </select>
            </Field>

            <Field label="מחיר (₪)">
              <input
                type="number"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="150"
                min="0"
                className="input-field"
              />
            </Field>

            <Field label="זמינות">
              <select
                value={form.availability}
                onChange={e => set('availability', e.target.value)}
                className="input-field"
              >
                <option value="פנוי">פנוי</option>
                <option value="שמור">שמור</option>
                <option value="לא זמין">לא זמין</option>
              </select>
            </Field>

            <Field label="מידה">
              <input
                type="text"
                value={form.size}
                onChange={e => set('size', e.target.value)}
                placeholder="S / M / L / XL / 36 / 38..."
                className="input-field"
              />
            </Field>

            <Field label="צבע">
              <input
                type="text"
                value={form.color}
                onChange={e => set('color', e.target.value)}
                placeholder="שחור, לבן, זהב..."
                className="input-field"
              />
            </Field>
          </div>

          <Field label="תיאור">
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              placeholder="תיאור הפריט, חומר, עיצוב, מתאים ל..."
              className="input-field resize-none"
            />
          </Field>

          {/* Toggles */}
          <div className="flex gap-6">
            {[
              { key: 'is_new', label: 'סמן כ"חדש"', color: 'gold' },
              { key: 'is_popular', label: 'סמן כ"פופולרי"', color: 'rose' },
            ].map(({ key, label, color }) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => set(key, !form[key])}
                  className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${
                    form[key]
                      ? color === 'gold' ? 'bg-gold-500' : 'bg-rose-400'
                      : 'bg-stone-200'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                    form[key] ? 'left-5' : 'left-1'
                  }`} />
                </div>
                <span className="text-sm text-stone-700">{label}</span>
              </label>
            ))}
          </div>

          {/* Booked dates */}
          {item?.id && <BookedDatesSection itemId={item.id} />}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-cream-200">
          <button
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                שומר...
              </>
            ) : (
              <>
                <Check size={16} />
                שמירה
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-cream-300 text-stone-600 hover:bg-cream-100 transition-colors"
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Booked Dates ───────────────────────────────────────────────────────────

function BookedDatesSection({ itemId }) {
  const [dates, setDates] = useState([])
  const [newDate, setNewDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      setDates(await fetchBookedDatesForItem(itemId))
      setError('')
    } catch {
      setError('שגיאה בטעינת תאריכים')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [itemId])

  const handleAdd = async () => {
    if (!newDate) return
    setSaving(true)
    setError('')
    try {
      await addBookedDate(itemId, newDate)
      setNewDate('')
      await load()
    } catch (err) {
      setError(err.code === '23505' ? 'התאריך הזה כבר מסומן כתפוס' : 'שגיאה בהוספת תאריך')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteBookedDate(id)
      setDates(prev => prev.filter(d => d.id !== id))
    } catch {
      setError('שגיאה במחיקת תאריך')
    }
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="pt-2">
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        תאריכים תפוסים (יומן השכרה)
      </label>

      <div className="flex gap-2 mb-3">
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          min={today}
          className="input-field flex-1"
        />
        <button
          onClick={handleAdd}
          disabled={!newDate || saving}
          className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          הוספה
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs mb-2">{error}</p>
      )}

      {loading ? (
        <div className="flex justify-center py-3"><div className="spinner" style={{ width: 20, height: 20 }} /></div>
      ) : dates.length === 0 ? (
        !error && <p className="text-stone-400 text-sm">אין תאריכים תפוסים רשומים</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {dates.map(d => {
            const isPast = d.booked_date < today
            return (
              <span
                key={d.id}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${
                  isPast ? 'bg-stone-100 text-stone-400 border-stone-200' : 'bg-red-50 text-red-600 border-red-200'
                }`}
              >
                {formatBookedDate(d.booked_date)}
                <button onClick={() => handleDelete(d.id)} className="hover:text-red-800" aria-label="מחיקת תאריך">
                  <X size={12} />
                </button>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Booking Calendar (all dresses, whole month) ───────────────────────────

const WEEKDAY_LABELS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']

function BookingCalendar() {
  const [monthDate, setMonthDate] = useState(() => new Date())
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAllBookedDates()
      .then(setBookings)
      .catch(() => setError('שגיאה בטעינת היומן'))
      .finally(() => setLoading(false))
  }, [])

  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startWeekday = new Date(year, month, 1).getDay()
  const monthLabel = monthDate.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })
  const today = new Date().toISOString().slice(0, 10)

  const isoDate = (day) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const byDate = {}
  for (const b of bookings) {
    if (!byDate[b.booked_date]) byDate[b.booked_date] = []
    byDate[b.booked_date].push(b.items?.name || 'פריט')
  }

  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const changeMonth = (delta) => setMonthDate(new Date(year, month + delta, 1))

  return (
    <div className="bg-white rounded-2xl border border-cream-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => changeMonth(-1)}
          className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-stone-500 hover:bg-cream-200 transition-colors"
          aria-label="חודש קודם"
        >
          <ChevronRight size={16} />
        </button>
        <h3 className="text-lg font-semibold text-stone-800">{monthLabel}</h3>
        <button
          onClick={() => changeMonth(1)}
          className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-stone-500 hover:bg-cream-200 transition-colors"
          aria-label="חודש הבא"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><div className="spinner" /></div>
      ) : error ? (
        <p className="text-red-500 text-sm text-center py-6">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs text-stone-400 font-medium">
            {WEEKDAY_LABELS.map(w => <div key={w}>{w}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />
              const date = isoDate(day)
              const dayBookings = byDate[date] || []
              const isToday = date === today
              return (
                <div
                  key={i}
                  className={`rounded-xl p-2 min-h-[76px] border text-xs ${
                    dayBookings.length > 0 ? 'bg-red-50 border-red-200' : 'bg-cream-50 border-cream-200'
                  } ${isToday ? 'ring-2 ring-gold-400' : ''}`}
                >
                  <div className={`font-semibold mb-1 ${dayBookings.length > 0 ? 'text-red-600' : 'text-stone-500'}`}>
                    {day}
                  </div>
                  {dayBookings.slice(0, 2).map((name, idx) => (
                    <div key={idx} className="text-red-600 truncate leading-tight">{name}</div>
                  ))}
                  {dayBookings.length > 2 && (
                    <div className="text-red-500 leading-tight">{`+${dayBookings.length - 2}`}</div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-50 border border-red-200 inline-block" />
              תפוס
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-cream-50 border border-cream-200 inline-block" />
              פנוי
            </span>
          </div>
        </>
      )}
    </div>
  )
}
