import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ItemCard from '../components/ItemCard'
import { fetchItems } from '../lib/supabase'

const CATEGORIES = [
  { value: 'all', label: 'הכל' },
  { value: 'שמלה להשכרה', label: 'שמלות להשכרה' },
  { value: 'מטפחת למכירה', label: 'מטפחות למכירה' },
]

export default function CatalogPage({ onItemClick }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchItems({
        category: category !== 'all' ? category : undefined,
        availability: availableOnly ? 'available' : undefined,
        search: search || undefined,
      })
      setItems(data || [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [category, availableOnly, search])

  useEffect(() => {
    const timer = setTimeout(load, 300)
    return () => clearTimeout(timer)
  }, [load])

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  const handleCategory = (cat) => {
    setCategory(cat)
    if (cat !== 'all') setSearchParams({ category: cat })
    else setSearchParams({})
  }

  const clearSearch = () => setSearch('')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <p className="text-gold-500 text-sm font-medium tracking-wider mb-2">כל הפריטים</p>
        <h1 className="section-title">קטלוג</h1>
        <div className="gold-divider" />
        <p className="text-stone-400 text-sm mt-3">
          {loading ? 'טוען...' : `${items.length} פריטים`}
        </p>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-2xl border border-cream-200 p-4 mb-6 shadow-sm">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="חיפוש לפי שם, צבע, מידה..."
            className="input-field pr-10"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => handleCategory(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                category === cat.value
                  ? 'bg-gold-500 text-white border-gold-500'
                  : 'border-cream-300 text-stone-600 hover:border-gold-400 hover:text-gold-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Available only toggle */}
        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <div
            onClick={() => setAvailableOnly(v => !v)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
              availableOnly ? 'bg-gold-500' : 'bg-stone-200'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                availableOnly ? 'translate-x-0.5' : 'right-0.5 translate-x-0'
              }`}
              style={{ [availableOnly ? 'right' : 'left']: '2px' }}
            />
          </div>
          <span className="text-sm text-stone-600">פנויים בלבד</span>
        </label>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="spinner" />
        </div>
      ) : items.length === 0 ? (
        <EmptyResults onClear={() => { setSearch(''); setCategory('all'); setAvailableOnly(false) }} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map(item => (
            <ItemCard key={item.id} item={item} onClick={onItemClick} />
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyResults({ onClear }) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search size={24} className="text-stone-300" />
      </div>
      <h3 className="text-stone-500 text-lg font-medium mb-2">לא נמצאו פריטים</h3>
      <p className="text-stone-400 text-sm mb-4">נסי לשנות את הסינון או החיפוש</p>
      <button onClick={onClear} className="btn-outline text-sm py-2">
        ניקוי סינון
      </button>
    </div>
  )
}
