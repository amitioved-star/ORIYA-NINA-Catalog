export default function ItemCard({ item, onClick }) {
  const firstImage = Array.isArray(item.images) ? item.images[0] : item.images

  const availabilityBadge = {
    'פנוי': <span className="badge-available">פנוי</span>,
    'שמור': <span className="badge-reserved">שמור</span>,
    'לא זמין': <span className="badge-unavailable">לא זמין</span>,
  }[item.availability] || null

  const whatsappMsg = encodeURIComponent(`שלום, אני מתעניינת בפריט: ${item.name}`)
  const whatsappUrl = `https://wa.me/972506386895?text=${whatsappMsg}`

  return (
    <div className="card group cursor-pointer animate-fade-in">
      {/* Image */}
      <div
        className="relative overflow-hidden bg-cream-100 aspect-[3/4]"
        onClick={() => onClick(item)}
      >
        {firstImage ? (
          <img
            src={firstImage}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {item.is_new && <span className="badge-new">חדש</span>}
          {item.is_popular && <span className="badge-popular">פופולרי</span>}
        </div>

        {/* Category tag */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/85 backdrop-blur-sm text-stone-700 text-xs px-2.5 py-1 rounded-full font-medium">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-semibold text-stone-800 text-base leading-tight line-clamp-2 cursor-pointer hover:text-gold-600 transition-colors"
            onClick={() => onClick(item)}
          >
            {item.name}
          </h3>
          {availabilityBadge}
        </div>

        {item.description && (
          <p className="text-stone-500 text-sm line-clamp-2 mb-3 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Details row */}
        <div className="flex gap-3 text-xs text-stone-400 mb-3">
          {item.color && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full border border-stone-200 bg-stone-100 inline-block" />
              {item.color}
            </span>
          )}
          {item.size && <span>מידה: {item.size}</span>}
        </div>

        {/* Price */}
        {item.price && (
          <div className="text-gold-600 font-bold text-lg mb-4">
            ₪{item.price}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onClick(item)}
            className="flex-1 border border-gold-400 text-gold-600 text-sm py-2 rounded-full hover:bg-gold-500 hover:text-white transition-all duration-200 font-medium"
          >
            פרטים נוספים
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm py-2 px-3 flex-shrink-0"
            title="פנייה בוואטסאפ"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
