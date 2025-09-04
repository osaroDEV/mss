import { type SiteSettings, type Service } from '@/lib/sanity'

interface StructuredDataProps {
  siteSettings?: SiteSettings | null
  services?: Service[]
}

export default function StructuredData({ siteSettings, services }: StructuredDataProps) {
  if (!siteSettings) return null

  const contactInfo = siteSettings.contactInfo
  const address = contactInfo?.address

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": siteSettings.title || "Michael Stevens Solicitors",
    "description": siteSettings.description || "Professional legal services",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "logo": siteSettings.logo ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?logo=${siteSettings.logo.asset._ref}` : null,
    "image": siteSettings.seo?.ogImage ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?image=${siteSettings.seo.ogImage.asset._ref}` : null,
    "telephone": contactInfo?.phone,
    "email": contactInfo?.email,
    "address": contactInfo?.address,
    "openingHours": contactInfo?.hours?.map(h => `${h.days} ${h.hours}`) || [],
    "areaServed": {
      "@type": "City",
      "name": "London"
    },
    "serviceType": "Legal Services",
    "priceRange": "$$",
    "sameAs": [
      siteSettings.socialMedia?.linkedin,
      siteSettings.socialMedia?.twitter,
      siteSettings.socialMedia?.facebook,
    ].filter(Boolean)
  }

  // Services structured data
  const servicesData = services?.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDescription,
    "provider": {
      "@type": "LegalService",
      "name": siteSettings.title || "Michael Stevens Solicitors"
    },
    "serviceType": "Legal Service",
    "areaServed": {
      "@type": "City", 
      "name": "London"
    }
  })) || []

  // Website structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteSettings.title || "Michael Stevens Solicitors",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://michaelstevenssolicitors.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://michaelstevenssolicitors.com"}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      {servicesData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesData)
          }}
        />
      )}
    </>
  )
}