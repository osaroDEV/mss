import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getSiteSettings } from "@/lib/sanity"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()

  return {
    title:
      siteSettings?.seo?.metaTitle ||
      siteSettings?.title ||
      "Michael Stevens Solicitors - Expert Legal Services in London",
    description:
      siteSettings?.seo?.metaDescription ||
      siteSettings?.description ||
      "Professional legal services in immigration law, employment law, family law, wills and probate law, and family law.",
    keywords:
      siteSettings?.seo?.keywords?.join(", ") ||
      "solicitors, legal services, London law firm, corporate law, employment law, commercial property, litigation",
  }
}

import { ReactNode } from "react"

export default async function RootLayout({ children }: { children: ReactNode }) {
  const siteSettings = await getSiteSettings()
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Removed siteSettings prop from Header */}
        <Header />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  )
}
