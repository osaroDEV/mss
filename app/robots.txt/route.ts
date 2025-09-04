import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/lib/sanity'

export async function GET() {
  const siteSettings = await getSiteSettings()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  // Check if site should be indexed
  const shouldIndex = !siteSettings?.seo?.noIndex

  const robotsContent = shouldIndex 
    ? `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /_next/
Disallow: /api/
Disallow: /.well-known/

# Allow important pages
Allow: /
Allow: /about
Allow: /services
Allow: /contact
Allow: /team
Allow: /news`
    : `User-agent: *
Disallow: /`

  return new NextResponse(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}