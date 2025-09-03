import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import { getSiteSettings, getServicesData, urlFor } from "@/lib/sanity"
import StructuredData from "@/components/StructuredData"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()

  const metadataTitle =
    siteSettings?.seo?.metaTitle ||
    siteSettings?.title ||
    "Michael Stevens Solicitors - Expert Legal Services in London"
  const metadataDescription =
    siteSettings?.seo?.metaDescription ||
    siteSettings?.description ||
    "Professional legal services in immigration law, employment law, family law, wills and probate law, and family law."
  const metadataKeywords =
    siteSettings?.seo?.keywords?.join(", ") ||
    "solicitors, legal services, London law firm, corporate law, employment law, commercial property, litigation"
  const metadataFavicon = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : "/favicon.ico"
  const metadataOgImage = siteSettings?.seo?.ogImage
    ? urlFor(siteSettings.seo.ogImage).width(1200).height(630).url()
    : null // Standard size for Open Graph images

  // Default robots content for the entire site. Individual pages can override this.
  const robotsContent = siteSettings?.seo?.noIndex ? "noindex, nofollow" : "index, follow"

  return {
    title: {
      default: metadataTitle,
      template: `%s | ${siteSettings?.title || "Michael Stevens Solicitors"}`
    },
    description: metadataDescription,
    keywords: metadataKeywords,
    authors: [{ name: siteSettings?.title || "Michael Stevens Solicitors" }],
    creator: siteSettings?.title || "Michael Stevens Solicitors",
    publisher: siteSettings?.title || "Michael Stevens Solicitors",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://michaelstevenssolicitors.com'),
    icons: {
      icon: metadataFavicon,
      shortcut: metadataFavicon,
      apple: metadataFavicon,
    },
    robots: robotsContent, // This is the default, can be overridden by page.tsx
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: '/',
      siteName: siteSettings?.title || "Michael Stevens Solicitors",
      images: metadataOgImage ? [metadataOgImage] : [],
      type: "website",
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataTitle,
      description: metadataDescription,
      images: metadataOgImage ? [metadataOgImage] : [],
    },
    alternates: {
      canonical: '/',
    },
  }
}

import { ReactNode } from "react"

export default async function RootLayout({ children }: { children: ReactNode }) {
   // Fetch both site settings and services data in parallel
  const [siteSettings, services] = await Promise.all([getSiteSettings(), getServicesData()])

  const googleAnalyticsId = siteSettings?.analytics?.googleAnalyticsId || null
  const googleTagManagerId = siteSettings?.analytics?.googleTagManagerId || null

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://michaelstevenssolicitors.com'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a5f" />
      </head>
      <body className={inter.className}>
        {/* Removed siteSettings prop from Header */}
        {googleTagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        <StructuredData siteSettings={siteSettings} services={services} />
        <Header />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} services={services} />
        <GoogleAnalytics googleAnalyticsId={googleAnalyticsId} googleTagManagerId={googleTagManagerId} />
      </body>
    </html>
  )
}
