import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import ItemCard from '../components/ItemCard'
import SEO from '../components/SEO'
import { breadcrumbSchema, catalogItemListSchema } from '../seoSchemas'
import { fetchItems, fetchBookedDatesMap } from '../lib/supabase'
import { computeEffectiveAvailability } from '../constants'
import { trackCatalogView } from '../lib/analytics'

const CATEGORIES = [
  { value: 'all', label: 'הכל' },
  { value: 'שמלה להשכרה', label: 'שמלות להשכרה - נשים' },
  { value: 'שמלה להשכרה לנערות', label: 'שמלות להשכרה - נערות' },
  { value: 'מטפחת למכירה', label: 'מטפחות למכירה' },
]

// Women's dresses before girls' dresses when showing everything together.
const CATEGORY_SORT_ORDER = { 'שמלה להשכרה': 0, 'שמלה להשכרה לנערות': 1 }

// Within each category, group same-color dresses next to each other, in this order.
const COLOR_GROUP_ORDER = ['שמפניה', 'כחול', 'תכלת', 'ירוק', 'שחור']
const COLOR_GROUP_KEYWORDS = {
  'שמפניה': ['שמפניה'],
  'כחול': ['כחול', 'נייבי'],
  'תכלת': ['תכלת'],
  'ירוק': ['ירוק', 'אמרלד', 'זית', 'מרווה'],
  'שחור': ['שחור'],
}

function colorGroupIndex(color) {
  if (!color) return COLOR_GROUP_ORDER.length
  const match = COLOR_GROUP_ORDER.findIndex(group =>
    COLOR_GROUP_KEYWORDS[group].some(keyword => color.includes(keyword))
  )
  return match === -1 ? COLOR_GROUP_ORDER.length : match
}

const sortByCategoryAndColor = (items) =>
  [...items].sort((a, b) => {
    const catDiff = (CATEGORY_SORT_ORDER[a.category] ?? 2) - (CATEGORY_SORT_ORDER[b.category] ?? 2)
    if (catDiff !== 0) return catDiff
    return colorGroupIndex(a.color) - colorGroupIndex(b.color)
  })

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
      const [data, bookedDatesMap] = await Promise.all([
        fetchItems({
          category: category !== 'all' ? category : undefined,
          search: search || undefined,
        }),
        fetchBookedDatesMap(),
      ])
      const withBookedDates = (data || []).map(item => ({
        ...item,
        bookedDates: bookedDatesMap[item.id] || [],
      }))
      // Filtered here (not via the server query) so an active booking window is accounted for too.
      const filtered = availableOnly
        ? withBookedDates.filter(item => computeEffectiveAvailability(item) === 'פנוי')
        : withBookedDates
      setItems(sortByCategoryAndColor(filtered))
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

  // Fire catalog_view whenever the visible set changes meaningfully.
  const lastViewKey = useRef('')
  useEffect(() => {
    if (loading) return
    const key = `${category}|${availableOnly}|${search}|${items.length}`
    if (key === lastViewKey.current) return
    lastViewKey.current = key
    trackCatalogView({
      category,
      available_only: availableOnly,
      search_term: search || undefined,
      results_count: items.length,
    })
  }, [loading, category, availableOnly, search, items.length])

  const handleCategory = (cat) => {
    setCategory(cat)
    if (cat !== 'all') setSearchParams({ category: cat })
    else setSearchParams({})
  }

  const clearSearch = () => setSearch('')

  const seoTitle = category === 'שמלה להשכרה לנערות' ? 'קטלוג שמלות לנערות ובת מצווה בחריש' : category === 'שמלה להשכרה' ? 'קטלוג שמלות ערב לנשים בחריש' : 'קטלוג שמלות ערב להשכרה בחריש'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SEO
        title={seoTitle}
        description="קטלוג ORIYA NINA להשכרת שמלות ערב לנשים ולנערות בחריש והסביבה. חיפוש לפי צבע, מידה, קטגוריה וזמינות."
        jsonLd={[
          breadcrumbSchema([{ name: 'בית', path: '/' }, { name: 'קטלוג', path: '/catalog' }]),
          ...(items.length ? [catalogItemListSchema(items)] : []),
        ]}
      />
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
            aria-label="חיפוש בקטלוג"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500"
              aria-label="ניקוי חיפוש"
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
