import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { type SiteSettings } from '@/lib/sanity';

interface FooterProps {
  siteSettings?: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps) {
  const contactInfo = siteSettings?.contactInfo;
  const socialMedia = siteSettings?.socialMedia;
  const legalNotices = siteSettings?.legalNotices;

  return (
    <footer className='bg-primary-800 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <div className='text-2xl font-bold mb-4'>
              Michael Stevens
              <span className='block text-lg font-normal text-gold-400'>
                Solicitors
              </span>
            </div>
            <p className='text-neutral-300 mb-4'>
              {siteSettings?.description ||
                'Providing exceptional legal services with integrity, expertise, and personal attention for over [] years.'}
            </p>
            <div className='flex items-center text-sm text-neutral-300'>
              <Clock className='h-4 w-4 mr-2' />
              <span>
                {legalNotices?.regulatoryInfo ||
                  'Regulated by the Solicitors Regulation Authority'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/services'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href='/team'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Practice Areas</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/services/corporate-law'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Immigration Law
                </Link>
              </li>
              <li>
                <Link
                  href='/services/employment-law'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Employment Matters
                </Link>
              </li>
              <li>
                <Link
                  href='/services/commercial-property'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Family Law
                </Link>
              </li>
              <li>
                <Link
                  href='/services/litigation'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Housing- Landlord & Tenants
                </Link>
              </li>
              <li>
                <Link
                  href='/services/family-law'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Wills & Probate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Information</h3>
            <div className='space-y-3'>
              <div className='flex items-start'>
                <MapPin className='h-5 w-5 mr-3 mt-0.5 text-gold-400' />
                <div>
                  <p className='text-neutral-300'>
                    {contactInfo?.address?.street ||
                      'Unit D Atrium House 459-463 New Cross Road'}
                  </p>
                  <p className='text-neutral-300'>
                    {contactInfo?.address
                      ? `${contactInfo.address.city}, ${contactInfo.address.postalCode}`
                      : 'London SE14 6AJ United Kingdom'}
                  </p>
                </div>
              </div>
              <div className='flex items-center'>
                <Phone className='h-5 w-5 mr-3 text-gold-400' />
                <a
                  href='tel:+442071234567'
                  className='text-neutral-300 hover:text-gold-400 transition-colors'
                >
                  {contactInfo?.phone || '+44 (0) 20 7123 4567'}
                </a>
              </div>
              <div className='flex items-center'>
                <Mail className='h-5 w-5 mr-3 text-gold-400' />
                <a
                  href='mailto:info@michaelstevenssolicitors.co.uk'
                  className='text-neutral-300 hover:text-gold-400 transition-colors'
                >
                 {contactInfo?.email || 'info@michaelstevenssolicitors.co.uk'}
                </a>
              </div>
              <div className='flex items-start'>
                <Clock className='h-5 w-5 mr-3 mt-0.5 text-gold-400' />
                <div>
                  {contactInfo?.hours && contactInfo.hours.length > 0 ? (
                    contactInfo.hours.map((schedule, index) => (
                      <p key={index} className="text-neutral-300">
                        {schedule.days}: {schedule.hours}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="text-neutral-300">Mon-Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-neutral-300">Emergency: 24/7</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-primary-700 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-neutral-300 text-sm'>
              © 2025 Code Illustrated Labs. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='/privacy'
                className='text-neutral-300 hover:text-white text-sm transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-neutral-300 hover:text-white text-sm transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                href='/cookies'
                className='text-neutral-300 hover:text-white text-sm transition-colors'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
