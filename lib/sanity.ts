import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '79kq4upu',
  dataset: 'production',
  useCdn: false, // This is key - set to false for latest content
  apiVersion: '2024-01-01', // Use current date for API version
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Types for Sanity documents
export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface TeamMember {
  _id: string
  name: string
  position: string
  bio: string
  image: SanityImage
  email: string
  phone: string
  specializations: string[]
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

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: any[] // Portable Text
  image: SanityImage
  author: TeamMember
  publishedAt: string
  categories: string[]
}

export interface HeaderSettings {
   contactInfo: {
    phone: string
    email: string}
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
    emergencyPhone?: string
    address: {
      street: string
      city: string
      state?: string
      postalCode: string
      country: string
    }
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

  try {
    const data = await client.fetch(query)
    return data || null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}