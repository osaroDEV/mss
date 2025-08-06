'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

interface NavItem {
  name: string
  href: string
  external: boolean
}

interface MobileMenuProps {
  navigation: NavItem[]
  siteTitle: string // Added siteTitle prop
}

export default function MobileMenu({ navigation, siteTitle }: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Hamburger icon when menu is closed */}
      {!mobileMenuOpen && (
        <button
          type="button"
          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="block h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {/* Mobile menu content when open */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          {/* <div className="text-2xl font-bold text-primary-800">{siteTitle}</div> */}
          <Image src={'/images/5.svg'} alt='Michael Stevens Solicitors Logo' width={400} height={80} className='' />
          <button
            type="button"
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close main menu</span>
            <X className="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="px-4 py-6 space-y-1">
          {navigation.map((item, index) => (
            <Link
              key={`mobile-${item.name}-${index}`}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="text-neutral-700 hover:text-primary-800 block px-3 py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4"> {/* Added padding top for separation */}
            <Link
              href="/contact" // Hardcoded link
              className="bg-gold-600 hover:bg-gold-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
