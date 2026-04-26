import { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'

export default function ItemModal({ item, onClose }) {
  const images = Array.isArray(item.images)
    ? item.images.filter(Boolean)
    : item.images
    ? [item.images]
    : []

  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const nextImg = () => setActiveImg(i => (i + 1) % images.length)
  const prevImg = () => setActiveImg(i => (i - 1 + images.length) % images.length)

  const whatsappMsg = encodeURIComponent(`שלום, אני מתעניינת בפריט: ${item.name}`)
  const whatsappUrl = `https://wa.me/972506386895?text=${whatsappMsg}`

  const availabilityConfig = {
    'פנוי': { cls: 'bg-green-50 text-green-700 border-green-200', label: 'פנוי' },
    'שמור': { cls: 'bg-amber-50 text-amber-700 border-amber-200', label: 'שמור' },
    'לא זמין': { cls: 'bg-red-50 text-red-600 border-red-200', label: 'לא זמין' },
  }
  const avail = availabilityConfig[item.availability] || availabilityConfig['פנוי']

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(40,30,20,0.7)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cream-200 sticky top-0 bg-white z-10 rounded-t-3xl">
          <h2 className="text-xl font-semibold text-stone-800 truncate pl-4">{item.name}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-stone-500 hover:bg-cream-200 transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="p-4">
            {/* Main Image */}
            <div className="relative bg-cream-100 rounded-2xl overflow-hidden aspect-[3/4] mb-3">
              {images.length > 0 ? (
                <img
                  src={images[activeImg]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`gallery-thumb flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 ${
                      i === activeImg ? 'active border-gold-400' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.is_new && <span className="badge-new">חדש</span>}
              {item.is_popular && <span className="badge-popular">פופולרי</span>}
              <span className={`text-xs px-3 py-1 rounded-full border font-medium ${avail.cls}`}>
                {avail.label}
              </span>
            </div>

            {/* Category */}
            <p className="text-gold-500 text-sm font-medium mb-1">{item.category}</p>

            {/* Price */}
            {item.price && (
              <div className="text-3xl font-bold text-stone-800 mb-4">₪{item.price}</div>
            )}

            {/* Divider */}
            <div className="w-12 h-0.5 bg-gold-300 mb-4" />

            {/* Specs */}
            <div className="space-y-3 mb-6">
              {item.size && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-800 font-medium">מידה</span>
                  <span className="text-stone-500 bg-cream-100 px-3 py-1 rounded-full">{item.size}</span>
                </div>
              )}
              {item.color && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-800 font-medium">צבע</span>
                  <span className="text-stone-500 bg-cream-100 px-3 py-1 rounded-full">{item.color}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-800 font-medium">קטגוריה</span>
                <span className="text-stone-500 bg-cream-100 px-3 py-1 rounded-full">{item.category}</span>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div className="mb-6">
                <h4 className="text-stone-800 font-medium text-sm mb-2">תיאור</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            )}

            {/* WhatsApp CTA */}
            <div className="mt-auto">
              {item.availability === 'לא זמין' ? (
                <div className="w-full bg-stone-100 text-stone-400 text-center py-3 rounded-full font-medium text-sm">
                  לא זמין כרגע
                </div>
              ) : (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full py-3.5 text-base font-semibold rounded-2xl"
                >
                  <WhatsAppIcon />
                  <span>פנייה בוואטסאפ</span>
                </a>
              )}
              <p className="text-center text-xs text-stone-400 mt-2">
                {item.availability === 'שמור' && 'פריט זה שמור — ניתן לבדוק זמינות'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
