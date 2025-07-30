'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { HeaderSettings, SiteSettings } from '@/lib/sanity';

interface HeaderProps {
  siteSettings?: SiteSettings | null;
  headerSettings?: HeaderSettings | null; // Optional header settings
}

export default function Header({ siteSettings, headerSettings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fallback navigation if no siteSettings
  const fallbackNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  // Use siteSettings navigation or fallback
  const navigation =
    siteSettings?.navigation?.map((item) => ({
      name: item.title,
      href: item.url,
      external: item.external,
    })) ||
    fallbackNavigation.map((item) => ({
      name: item.name,
      href: item.href,
      external: false,
    }));

  return (
    <header className='bg-white shadow-sm border-b border-neutral-200'>
      {/* Top bar */}
      <div className='bg-primary-800 text-white py-2'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center text-sm'>
            <div className='w-full flex items-center justify-between'>
              <div className='flex items-center'>
                <Phone className='h-4 w-4 mr-2' />
                <a
                  href='tel:+442084693714'
                  className='text-[10px] md:text-base'
                >
                  {headerSettings?.contactInfo?.phone || '+44 (0) 20 8469 3714'}
                </a>
              </div>
              <div className='flex items-center'>
                <Mail className='h-4 w-4 mr-2' />
                <a
                  href='mailto:info@michaelstevenssolicitors.com'
                  className='text-[10px] md:text-base'
                >
                  {headerSettings?.contactInfo?.email ||
                    'info@michaelstevenssolicitors.com'}
                </a>
              </div>
            </div>
            {/* <div className='hidden md:block'>
              <span>Emergency Legal Advice: Available 24/7</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link href='/' className='flex items-center'>
              <div className='text-2xl font-bold text-primary-800'>
                MichaelStevens
                <span className='block text-gold-600 tracking-widest'>
                  Solicitors
                </span>
              </div>
              {/* <Image src={'/images/mss.svg'} alt='Michael Stevens Solicitors Logo' width={80} height={80} className='' /> */}
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className='hidden md:flex items-center justify-center space-x-8'>
            {navigation.map((item, index) => (
              <Link
                key={`${item.name}-${index}`}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className='text-neutral-700 hover:text-primary-800 px-3 py-2 text-sm font-medium transition-colors duration-200'
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className='hidden md:flex items-center justify-end lg:w-0 lg:flex-1'>
            <Link
              href='/contact'
              className='bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200'
            >
              Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              type='button'
              className='bg-white rounded-md p-2 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className='sr-only'>Open main menu</span>
              {mobileMenuOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className='md:hidden border-t border-neutral-200'>
            <div className='px-2 pt-2 pb-3 space-y-1 bg-white'>
              {navigation.map((item, index) => (
                <Link
                  key={`mobile-${item.name}-${index}`}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className='text-neutral-700 hover:text-primary-800 block px-3 py-2 text-sm font-medium'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href='/contact'
                className='bg-gold-600 hover:bg-gold-700 text-white block px-3 py-2 rounded-md text-base font-medium mt-4'
                onClick={() => setMobileMenuOpen(false)}
              >
                Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
