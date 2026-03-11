const BASE_URL = "https://hammaddem.co";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function buildServiceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  city?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@type": "Organization", name: "Hammaddem", url: BASE_URL },
    areaServed: opts.city
      ? { "@type": "City", name: opts.city, containedInPlace: { "@type": "Country", name: "Türkiye" } }
      : "TR",
    url: opts.url.startsWith("http") ? opts.url : `${BASE_URL}${opts.url}`,
  };
}

export function buildLocalBusinessJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  city: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${BASE_URL}${opts.url}`,
    telephone: "+905393308617",
    areaServed: {
      "@type": "City",
      name: opts.city,
      containedInPlace: { "@type": "Country", name: "Türkiye" },
    },
  };
}

export function buildFaqJsonLd(faqItems: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
