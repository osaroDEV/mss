import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Michael Stevens Solicitors - Expert Legal Services in London',
  description: 'Professional legal services in corporate law, employment law, commercial property, litigation, and family law. Serving London and beyond for over 25 years.',
  keywords: 'solicitors, legal services, London law firm, corporate law, employment law, commercial property, litigation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}