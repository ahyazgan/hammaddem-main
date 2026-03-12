/**
 * SEO Metadata Utility
 * Dinamik meta etiketleri ve yapısal veriler oluşturmak için yardımcı fonksiyonlar
 */

const BASE_URL = "https://hammaddem.co";

export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
}

export interface ProductMetadata extends MetadataConfig {
  productName: string;
  category: string;
  city?: string;
}

export interface ServiceMetadata extends MetadataConfig {
  serviceName: string;
  serviceCategory: string;
  city?: string;
  areaServed?: string;
}

/**
 * Malzeme (ürün) sayfaları için meta veriler oluştur
 */
export function generateProductMetadata(config: ProductMetadata): MetadataConfig {
  const keywords = [
    `${config.productName} silobas taşıma`,
    `${config.productName} fiyatları`,
    `${config.productName} tedariği`,
    `toptan ${config.productName}`,
    ...(config.city ? [`${config.city} ${config.productName}`] : []),
    ...(config.keywords || []),
  ];

  return {
    title: config.title,
    description: config.description,
    keywords,
    canonical: config.canonical,
    ogImage: config.ogImage || `${BASE_URL}/og-image.png`,
    ogType: "product",
  };
}

/**
 * Hizmet sayfaları için meta veriler oluştur
 */
export function generateServiceMetadata(config: ServiceMetadata): MetadataConfig {
  const keywords = [
    `${config.serviceName} hizmeti`,
    `${config.serviceName} fiyatları`,
    ...(config.city ? [`${config.city} ${config.serviceName}`] : []),
    ...(config.keywords || []),
  ];

  return {
    title: config.title,
    description: config.description,
    keywords,
    canonical: config.canonical,
    ogImage: config.ogImage || `${BASE_URL}/og-image.png`,
    ogType: "website",
  };
}

/**
 * Bölge sayfaları için meta veriler oluştur
 */
export function generateCityMetadata(
  city: string,
  productName: string,
  baseDescription: string
): MetadataConfig {
  return {
    title: `${city} ${productName} Silobas Taşıma | Hammaddem`,
    description: baseDescription,
    keywords: [
      `${city} ${productName}`,
      `${city} silobas taşıma`,
      `${city} hafriyat`,
      `${city} inşaat malzemeleri`,
    ],
    canonical: `${BASE_URL}/malzeme/${productName.toLowerCase()}/${city.toLowerCase()}`,
    ogImage: `${BASE_URL}/og-image.png`,
    ogType: "website",
  };
}

/**
 * Yapılandırılmış veri: Ürün şeması
 */
export function buildProductJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
  city?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    category: opts.category || "Construction Materials",
    ...(opts.city && {
      areaServed: {
        "@type": "City",
        name: opts.city,
        containedInPlace: { "@type": "Country", name: "Türkiye" },
      },
    }),
    brand: {
      "@type": "Brand",
      name: "Hammaddem",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };
}

/**
 * Yapılandırılmış veri: Hizmet şeması (geliştirilmiş)
 */
export function buildEnhancedServiceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  city?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType || "Logistics",
    provider: {
      "@type": "Organization",
      name: "Hammaddem",
      url: BASE_URL,
      telephone: "+905393308617",
      email: "info@hammaddem.co",
    },
    ...(opts.city && {
      areaServed: {
        "@type": "City",
        name: opts.city,
        containedInPlace: { "@type": "Country", name: "Türkiye" },
      },
    }),
    availableLanguage: "tr",
  };
}

/**
 * Yapılandırılmış veri: Teklif şeması
 */
export function buildOfferJsonLd(opts: {
  priceCurrency?: string;
  priceRange?: string;
  availability?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    priceCurrency: opts.priceCurrency || "TRY",
    price: opts.priceRange || "Kontrol için teklif alın",
    availability: opts.availability || "https://schema.org/InStock",
    url: BASE_URL,
  };
}

/**
 * Meta etiketlerini HTML'e dönüştür (Helmet için)
 */
export function metadataToHelmetTags(metadata: MetadataConfig) {
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords?.join(", ") || "",
    canonical: metadata.canonical,
    ogTitle: metadata.title,
    ogDescription: metadata.description,
    ogImage: metadata.ogImage,
    ogType: metadata.ogType || "website",
  };
}
