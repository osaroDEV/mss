import { MetadataRoute } from 'next'
import { getSiteSettings, urlFor } from '@/lib/sanity'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const siteSettings = await getSiteSettings()
  
  return {
    name: siteSettings?.title || 'Michael Stevens Solicitors',
    short_name: 'MS Solicitors',
    description: siteSettings?.description || 'Professional legal services in London',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e3a5f',
    icons: [
      {
        src: siteSettings?.favicon ? urlFor(siteSettings.favicon).width(192).height(192).url() : '/favicon.ico',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: siteSettings?.favicon ? urlFor(siteSettings.favicon).width(512).height(512).url() : '/favicon.ico',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}