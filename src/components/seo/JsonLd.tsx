import { site } from "@/data/site";

/**
 * Schema.org JSON-LD para negócio local de beleza/estética.
 * Melhora a compreensão do Google sobre o negócio (SEO local).
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "BeautySalon"],
    name: site.legalName,
    description: "Clínica de estética avançada, emagrecimento, beleza e bem-estar em Cotia e Granja Viana.",
    url: site.url,
    telephone: site.phoneDisplay,
    image: `${site.url}/images/og.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "BR",
    },
    areaServed: site.address.serviceAreas.map((a) => ({ "@type": "City", name: a })),
    openingHoursSpecification: site.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Schema FAQPage — usa a lista de perguntas fornecida. */
export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
