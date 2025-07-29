import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Linkedin
} from 'lucide-react';
import { type SiteSettings } from '@/lib/sanity';

interface FooterProps {
  siteSettings?: SiteSettings | null;
}

// Regulatory bodies configuration
const REGULATORY_BODIES = {
  sra: {
    name: 'Solicitors Regulation Authority',
    url: 'https://www.sra.org.uk/consumers/register/organisation/?sraNumber=625253&prevSearchText=michael%20stevens%20solicitors&prevSearchFilter=',
    logoUrl: '/images/sra-logo-white.png', // Use white version for dark footer
    number: '[Your SRA Number]',
  },
  ico: {
    name: "Information Commissioner's Office",
    url: 'https://ico.org.uk/ESDWebPages/Entry/ZA050265',
    logoUrl: '/images/ico-white.jpg', // Use white version for dark footer
    number: '[Your ICO Number]',
  },
  lawSociety: {
    name: 'The Law Society',
    url: 'https://solicitors.lawsociety.org.uk/search/results?Pro=True&Type=0&Name=MICHAEL_STEVENS_SOLICITORS',
    logoUrl: '/images/tls-white.webp', // Use white version for dark footer
    number: 'England & Wales',
  },
};

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
            <Link href='/' className='flex items-center'>
              <div className='text-2xl font-bold text-white'>
                MichaelStevens
                <span className='block text-gold-600 tracking-widest'>
                  Solicitors
                </span>
              </div>
              {/* <Image src={'/images/mss.svg'} alt='Michael Stevens Solicitors Logo' width={80} height={80} className='' /> */}
            </Link>
            <p className='text-neutral-300 mb-4'>
              {siteSettings?.description ||
                'Providing exceptional legal services with integrity, expertise, and personal attention.'}
            </p>
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
                  href='/services/immigration-law'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Immigration Law
                </Link>
              </li>
              <li>
                <Link
                  href='/services/business-migration'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Business Migration
                </Link>
              </li>
              <li>
                <Link
                  href='/services/employment-matters'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Employment Matters
                </Link>
              </li>
              <li>
                <Link
                  href='/services/family-law'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Family Law
                </Link>
              </li>
              <li>
                <Link
                  href='/services/housing-landlord-and-tenants'
                  className='text-neutral-300 hover:text-white transition-colors'
                >
                  Housing- Landlord & Tenants
                </Link>
              </li>
              <li>
                <Link
                  href='/services/wills-and-probate'
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
                  href='tel:+447525181825'
                  className='text-neutral-300 hover:text-gold-400 transition-colors'
                >
                  {contactInfo?.phone || '+44 (0) 75 2518 1825'}
                </a>
              </div>
              <div className='flex items-center'>
                <Mail className='h-5 w-5 mr-3 text-gold-400' />
                <a
                  href='mailto:info@michaelstevenssolicitors.com'
                  className='text-[15px] text-neutral-300 hover:text-gold-400 transition-colors'
                >
                  {contactInfo?.email || 'info@michaelstevenssolicitors.com'}
                </a>
              </div>
              <div className='flex items-center'>
                <Linkedin className='h-5 w-5 mr-3 text-gold-400' />
                <a
                  href='https://www.linkedin.com/in/michael-stevens-solicitors-243498103?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
                  className='text-[15px] text-neutral-300 hover:text-gold-400 transition-colors'
                >
                  LinkedIn
                </a>
              </div>
              <div className='flex items-start'>
                <Clock className='h-5 w-5 mr-3 mt-0.5 text-gold-400' />
                <div>
                  {contactInfo?.hours && contactInfo.hours.length > 0 ? (
                    contactInfo.hours.map((schedule, index) => (
                      <p key={index} className='text-neutral-300'>
                        {schedule.days}: {schedule.hours}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className='text-neutral-300'>
                        Mon-Fri: 9:30AM - 6:00PM
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Information Section */}
        <div className='border-t border-primary-700 mt-8 pt-8 mb-8'>
          <h3 className='text-lg font-semibold mb-6 text-gold-400'>
            Regulatory Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-sm'>
            {/* SRA */}
            <div className='flex flex-col items-center text-center'>
              <Link
                href={REGULATORY_BODIES.sra.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block hover:opacity-80 transition-opacity mb-3'
              >
                <Image
                  src={REGULATORY_BODIES.sra.logoUrl}
                  alt='SRA Logo'
                  width={80}
                  height={50}
                  className='object-contain'
                />
              </Link>
              <div>
                <Link
                  href={REGULATORY_BODIES.sra.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium text-white hover:text-gold-400 transition-colors block mb-1'
                >
                  Solicitors Regulation Authority
                </Link>
                {/* <p className='text-neutral-300'>
                  {REGULATORY_BODIES.sra.number}
                </p> */}
                <p className='text-neutral-300 text-xs mt-1'>
                  Regulated by the SRA
                </p>
              </div>
            </div>

            {/* ICO */}
            <div className='flex flex-col items-center text-center'>
              <Link
                href={REGULATORY_BODIES.ico.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block hover:opacity-80 transition-opacity mb-3'
              >
                <Image
                  src={REGULATORY_BODIES.ico.logoUrl}
                  alt='ICO Logo'
                  width={80}
                  height={50}
                  className='object-contain'
                />
              </Link>
              <div>
                <Link
                  href={REGULATORY_BODIES.ico.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium text-white hover:text-gold-400 transition-colors block mb-1'
                >
                  Information Commissioner's Office
                </Link>
                {/* <p className='text-neutral-300'>
                  {REGULATORY_BODIES.ico.number}
                </p> */}
                <p className='text-neutral-300 text-xs mt-1'>
                  Data Protection Registered
                </p>
              </div>
            </div>

            {/* Law Society */}
            <div className='flex flex-col items-center text-center'>
              <Link
                href={REGULATORY_BODIES.lawSociety.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block hover:opacity-80 transition-opacity mb-3'
              >
                <Image
                  src={REGULATORY_BODIES.lawSociety.logoUrl}
                  alt='Law Society Logo'
                  width={100}
                  height={80}
                  className='object-contain'
                />
              </Link>
              <div>
                <Link
                  href={REGULATORY_BODIES.lawSociety.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium text-white hover:text-gold-400 transition-colors block mb-1'
                >
                  The Law Society
                </Link>
                <p className='text-neutral-300 text-xs mt-1'>
                  Professional Membership
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-primary-700 pt-8'>
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
