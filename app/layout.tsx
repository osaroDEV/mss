import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/sanity'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  return {
    title: siteSettings?.seo?.metaTitle || siteSettings?.title || 'Michael Stevens Solicitors - Expert Legal Services in London',
    description: siteSettings?.seo?.metaDescription || siteSettings?.description || 'Professional legal services in immigration law, employment law, family law, wills and probate law, and family law. Serving London and beyond for over [] years.',
    keywords: siteSettings?.seo?.keywords?.join(', ') || 'solicitors, legal services, London law firm, corporate law, employment law, commercial property, litigation',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header siteSettings={siteSettings} />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  )
}