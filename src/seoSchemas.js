import { SITE, absoluteUrl } from './constants'

const ORG_ID = `${SITE.url}#organization`
const BUSINESS_ID = `${SITE.url}#localbusiness`
const WEBSITE_ID = `${SITE.url}#website`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: SITE.defaultImage,
    image: SITE.defaultImage,
    telephone: SITE.phone,
    sameAs: [SITE.url],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        contactType: 'customer service',
        areaServed: 'IL',
        availableLanguage: ['he', 'en'],
      },
    ],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ClothingStore'],
    '@id': BUSINESS_ID,
    name: SITE.legalName,
    url: SITE.url,
    image: SITE.defaultImage,
    logo: SITE.defaultImage,
    description: SITE.description,
    telephone: SITE.phone,
    priceRange: SITE.priceRange,
    currenciesAccepted: 'ILS',
    paymentAccepted: 'מזומן, אשראי, ביט, העברה בנקאית',
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
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
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'קטלוג השכרת שמלות',
      url: absoluteUrl('/catalog'),
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'שמלות ערב לנשים',
          url: absoluteUrl('/catalog?category=שמלה להשכרה'),
        },
        {
          '@type': 'OfferCatalog',
          name: 'שמלות לנערות ובת מצווה',
          url: absoluteUrl('/catalog?category=שמלה להשכרה לנערות'),
        },
        {
          '@type': 'OfferCatalog',
          name: 'מטפחות למכירה',
          url: absoluteUrl('/catalog?category=מטפחת למכירה'),
        },
      ],
    },
    makesOffer: [
      {
        '@type': 'Offer',
        priceCurrency: 'ILS',
        price: 250,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'ILS',
          price: 250,
          valueAddedTaxIncluded: true,
        },
        itemOffered: {
          '@type': 'Service',
          name: 'השכרת שמלת ערב לנשים',
          areaServed: SITE.areaServed,
        },
      },
      {
        '@type': 'Offer',
        priceCurrency: 'ILS',
        price: 200,
        itemOffered: {
          '@type': 'Service',
          name: 'השכרת שמלה לנערות ובת מצווה',
          areaServed: SITE.areaServed,
        },
      },
    ],
    sameAs: [SITE.url],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'he-IL',
    publisher: { '@id': ORG_ID },
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
    brand: { '@type': 'Brand', name: SITE.name },
    sku: item.id ? `ON-${item.id}` : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ILS',
      price: item.price || undefined,
      availability:
        item.availability === 'פנוי'
          ? 'https://schema.org/InStock'
          : item.availability === 'שמור'
          ? 'https://schema.org/LimitedAvailability'
          : 'https://schema.org/OutOfStock',
      url: absoluteUrl('/catalog'),
      seller: { '@id': BUSINESS_ID },
    },
  }
}

export function catalogItemListSchema(items, basePath = '/catalog') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'קטלוג השכרת שמלות ORIYA NINA',
    itemListElement: items.slice(0, 30).map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: absoluteUrl(`${basePath}#item-${item.id}`),
      name: item.name,
    })),
  }
}
