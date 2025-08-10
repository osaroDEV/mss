import Link from "next/link"
import { Phone, Mail } from 'lucide-react'
import Image from "next/image"
import { getSiteSettings, urlFor } from "@/lib/sanity"
import MobileMenu from "./MobileMenu" // Import the new MobileMenu Client Component

export default async function Header() {
  const siteSettings = await getSiteSettings() // Fetch site settings

  // Default navigation and site title (will be overridden by Sanity if available)
  let navigation = [
    { name: "Home", href: "/", external: false },
    { name: "About", href: "/about", external: false },
    { name: "Services", href: "/services", external: false },
    { name: "Contact", href: "/contact", external: false },
  ]
  let siteTitle = "Michael Stevens Solicitors"
  let siteLogoUrl: string | null = null

  // Check if site settings and required contact info are available
  if (
    !siteSettings ||
    !siteSettings.contactInfo ||
    !siteSettings.contactInfo.phone ||
    !siteSettings.contactInfo.email
  ) {
    return (
      <header className="bg-red-100 text-red-800 py-4 text-center">
        <p>
          Error: Sanity site settings or contact information is missing or incomplete. Please populate the "Site
          Settings" document in Sanity Studio.
        </p>
      </header>
    )
  }

  // Use data from siteSettings if available
  const { phone, email } = siteSettings.contactInfo
  if (siteSettings.title) {
    siteTitle = siteSettings.title
  }
  if (siteSettings.navigation && siteSettings.navigation.length > 0) {
    navigation = siteSettings.navigation.map((item: { title: string; url: string; external: boolean }) => ({
      name: item.title,
      href: item.url,
      external: item.external,
    }))
  }
  if (siteSettings.logo) {
    siteLogoUrl = urlFor(siteSettings.logo).url()
  }
  

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      {/* Top bar */}
      <div className="bg-primary-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href={`tel:${phone}`} className="text-[10px] md:text-base">
                  {phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${email}`} className="text-[10px] md:text-base">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <Image src={siteLogoUrl || "/placeholder.svg"} alt='Michael Stevens Solicitors Logo' width={400} height={80} className='' />
            </Link>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={`${item.name}-${index}`}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-neutral-700 text-sm lg:text-xl hover:text-primary-800 px-3 py-2 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Mobile menu button and content handled by MobileMenu Client Component */}
          <MobileMenu navigation={navigation} siteTitle={siteTitle} />
        </div>
      </nav>
    </header>
  )
}
