import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const client = createClient({
  projectId: '79kq4upu',
  dataset: 'production',
  useCdn: false, // This is key - set to false for latest content
  apiVersion: '2025-08-05', // Use current date for API version
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Types for Sanity documents
export interface SanityImage {
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
}

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  description: string
  longDescription: string
  image: SanityImage
  features: string[]
}

export interface NavItem {
  _key: string
  title: string
  url: string
  external: boolean
}

export interface ContactInfo {
  phone: string
  email: string
}

export interface HeaderSettings {
  _id: string
  _type: "headerSettings"
  contactInfo: ContactInfo
}

export interface PageContent {
  _id: string
  title: string
  content: any[] // Portable Text
}

export interface SiteSettings {
  _id: string
  title: string
  description: string
  logo?: SanityImage
  favicon?: SanityImage
  contactInfo: {
    phone: string
    email: string
    address: string
    hours: Array<{
      days: string
      hours: string
    }>
  }
  socialMedia?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
    youtube?: string
  }
  navigation: Array<{
    title: string
    url: string
    external: boolean
  }>
  footerText?: any[] // Portable Text
  legalNotices?: {
    privacyPolicy?: string
    termsOfService?: string
    cookiePolicy?: string
    regulatoryInfo?: string
  }
  analytics?: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: SanityImage
    noIndex?: boolean
  }
}

// Function to get site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0]{
    contactInfo{
      phone,
      email,
      address,
      hours[]{
        days,
        hours
      }
    },
    socialMedia{
      linkedin,
      twitter,
      facebook,
      instagram,
      youtube
    },
    navigation[]{
      title,
      url,
      external
    },
    footerText,
    legalNotices{
      privacyPolicy,
      termsOfService,
      cookiePolicy,
      regulatoryInfo
    },
    analytics{
      googleAnalyticsId,
      googleTagManagerId
    },
    seo{
      metaTitle,
      metaDescription,
      keywords,
      ogImage{
        asset,
        alt
      },
      noIndex
    }
  }`

  try {
    const data = await client.fetch(query)
    return data || null
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
}

// Function to fetch header settings
export async function getHeaderSettings(): Promise<HeaderSettings | null> {
  const query = `*[_type == "headerSettings"][0]{
    contactInfo{
      phone,
      email
    }
  }`
  try {
    const data = await client.fetch(query)
    return data || null
  } catch (error) {
    console.error("Error fetching header settings:", error)
    return null
  }
}

// Merged function to get site and header settings
export async function getSiteAndHeaderSettings(): Promise<{
  site: SiteSettings | null
  header: HeaderSettings | null
}> {
  const siteQuery = `*[_type == "siteSettings"][0]{
    _id,
    title,
    description,
    logo{
      asset,
      alt
    },
    favicon{
      asset,
      alt
    },
    contactInfo{
      phone,
      email,
      emergencyPhone,
      address{
        street,
        city,
        state,
        postalCode,
        country
      },
      hours[]{
        days,
        hours
      }
    },
    socialMedia{
      linkedin,
      twitter,
      facebook,
      instagram,
      youtube
    },
    navigation[]{
      title,
      url,
      external
    },
    footerText,
    legalNotices{
      privacyPolicy,
      termsOfService,
      cookiePolicy,
      regulatoryInfo
    },
    analytics{
      googleAnalyticsId,
      googleTagManagerId
    },
    seo{
      metaTitle,
      metaDescription,
      keywords,
      ogImage{
        asset,
        alt
      },
      noIndex
    }
  }`

  const headerQuery = `*[_type == "headerSettings"]{
    contactInfo{
      phone,
      email
    }
  }`

  try {
    const [site, header] = await Promise.all([client.fetch(siteQuery), client.fetch(headerQuery)])
    return { site: site || null, header: header || null }
  } catch (error) {
    console.error("Error fetching site or header settings:", error)
    return { site: null, header: null }
  }
}
