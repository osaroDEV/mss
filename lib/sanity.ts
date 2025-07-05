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

export interface PageContent {
  _id: string
  title: string
  content: any[] // Portable Text
}