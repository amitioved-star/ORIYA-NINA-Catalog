// Centralized analytics for GA4 + (optional) Google Ads.
// GA4 base tag is loaded once in index.html; this module only sends events.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-JKLZYEZXQT'
const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || null

const ADS_LABELS = {
  whatsapp: import.meta.env.VITE_ADS_LABEL_WHATSAPP || null,
  phone: import.meta.env.VITE_ADS_LABEL_PHONE || null,
  measurement: import.meta.env.VITE_ADS_LABEL_MEASUREMENT || null,
  contact: import.meta.env.VITE_ADS_LABEL_CONTACT || null,
}

export const ANALYTICS_CONFIG = { GA_ID, ADS_ID }

function rawGtag(...args) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  window.gtag(...args)
}

export function trackEvent(name, params = {}) {
  if (!name) return
  rawGtag('event', name, params)
}

function trackAdsConversion(labelKey, value) {
  if (!ADS_ID) return
  const label = ADS_LABELS[labelKey]
  if (!label) return
  rawGtag('event', 'conversion', {
    send_to: `${ADS_ID}/${label}`,
    value: value ?? undefined,
    currency: 'ILS',
  })
}

export function trackPageView(path, title) {
  if (!path) return
  rawGtag('event', 'page_view', {
    page_path: path,
    page_title: title || (typeof document !== 'undefined' ? document.title : undefined),
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
  })
}

export function trackWhatsApp(source, extra = {}) {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
    source,
    ...extra,
  })
  // WhatsApp click is the primary lead action — also fire the contact conversion
  trackAdsConversion('whatsapp')
  trackAdsConversion('contact')
}

export function trackPhone(source, extra = {}) {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: source,
    source,
    ...extra,
  })
  trackAdsConversion('phone')
  trackAdsConversion('contact')
}

export function trackContact(source, channel, extra = {}) {
  trackEvent('contact_click', {
    event_category: 'engagement',
    event_label: source,
    source,
    channel,
    ...extra,
  })
  trackAdsConversion('contact')
}

export function trackCatalogView(params = {}) {
  trackEvent('catalog_view', {
    event_category: 'catalog',
    ...params,
  })
}

export function trackDressView(item, source = 'catalog') {
  if (!item) return
  trackEvent('dress_view', {
    event_category: 'catalog',
    item_id: item.id,
    item_name: item.name,
    item_category: item.category,
    price: item.price ?? undefined,
    availability: item.availability,
    source,
  })
  // GA4 enhanced ecommerce mirror — view_item
  trackEvent('view_item', {
    currency: 'ILS',
    value: item.price ?? undefined,
    items: [
      {
        item_id: String(item.id),
        item_name: item.name,
        item_category: item.category,
        price: item.price ?? undefined,
      },
    ],
  })
}

export function trackBookMeasurement(source = 'unknown', extra = {}) {
  trackEvent('book_measurement', {
    event_category: 'lead',
    source,
    ...extra,
  })
  trackAdsConversion('measurement')
}

export function trackScroll(depth, path) {
  trackEvent(depth === 100 ? 'scroll_100' : 'scroll_75', {
    event_category: 'engagement',
    page_path: path,
    percent_scrolled: depth,
  })
}

export function trackTimeOnSite(seconds = 60) {
  trackEvent(`time_on_site_${seconds}`, {
    event_category: 'engagement',
    seconds,
  })
}

// Initialize Google Ads gtag config if an Ads account is configured.
// GA4 is already loaded in index.html — this only adds the Ads "config" call
// so that `gtag('event','conversion',{ send_to: 'AW-.../label' })` works.
if (typeof window !== 'undefined' && ADS_ID) {
  const ensureAdsConfig = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', ADS_ID)
    }
  }
  if (typeof window.gtag === 'function') ensureAdsConfig()
  else window.addEventListener('load', ensureAdsConfig, { once: true })
}

// Legacy global for any inline handlers / quick console debugging
if (typeof window !== 'undefined') {
  window.trackEvent = trackEvent
}
