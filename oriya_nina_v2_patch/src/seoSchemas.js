import { SITE, absoluteUrl } from './constants'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ClothingStore'],
    name: SITE.legalName,
    url: SITE.url,
    image: SITE.defaultImage,
    description: SITE.description,
    telephone: SITE.phone,
    priceRange: SITE.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'חריש',
      addressCountry: 'IL',
    },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [SITE.url],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'he-IL',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/catalog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function itemProductSchema(item) {
  const image = Array.isArray(item.images) ? item.images[0] : item.images
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.name,
    description: item.description || `${item.name} להשכרה בסטודיו ORIYA NINA בחריש`,
    image: image ? [image] : [SITE.defaultImage],
    category: item.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ILS',
      price: item.price || undefined,
      availability: item.availability === 'פנוי' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
      seller: { '@type': 'LocalBusiness', name: SITE.name },
    },
  }
}
