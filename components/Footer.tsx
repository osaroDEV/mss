import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Linkedin } from 'lucide-react';
import { type SiteSettings, type Service } from '@/lib/sanity'; // Import Service type

interface FooterProps {
  siteSettings?: SiteSettings | null;
  services?: Service[]; // Add services prop
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

export default function Footer({ siteSettings, services }: FooterProps) {
  const contactInfo = siteSettings?.contactInfo;
  const socialMedia = siteSettings?.socialMedia;
  const legalNotices = siteSettings?.legalNotices;
  const navigationLinks = siteSettings?.navigation; // Get navigation links from siteSettings

  return (
    <footer className='bg-primary-800 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col sm:flex-row justify-between items-baseline space-y-8 lg:space-y-0 lg:space-x-12'>         

          {/* Quick Links */}
          <div className='flex-1'>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {navigationLinks && navigationLinks.length > 0 ? (
                navigationLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.url}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className='text-neutral-300 hover:text-white transition-colors'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback for Quick Links if no data from Sanity
                <>
                  <li><Link href='/' className='text-neutral-300 hover:text-white transition-colors'>Home</Link></li>
                  <li><Link href='/about' className='text-neutral-300 hover:text-white transition-colors'>About Us</Link></li>
                  <li><Link href='/services' className='text-neutral-300 hover:text-white transition-colors'>Our Services</Link></li>
                  <li><Link href='/contact' className='text-neutral-300 hover:text-white transition-colors'>Contact Us</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Practice Areas */}
          <div className='flex-1'>
            <h3 className='text-lg font-semibold mb-4'>Practice Areas</h3>
            <ul className='space-y-2'>
              {services && services.length > 0 ? (
                services.map((service) => (
                  <li key={service._id}>
                    <Link
                      href={`/services/${service.slug.current}`}
                      className='text-neutral-300 hover:text-white transition-colors'
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback for Practice Areas if no data from Sanity
                <>
                  <li><Link href='/services/immigration-law' className='text-neutral-300 hover:text-white transition-colors'>Immigration Law</Link></li>
                  <li><Link href='/services/business-migration' className='text-neutral-300 hover:text-white transition-colors'>Business Migration</Link></li>
                  <li><Link href='/services/employment-matters' className='text-neutral-300 hover:text-white transition-colors'>Employment Matters</Link></li>
                  <li><Link href='/services/housing-landlord-and-tenants' className='text-neutral-300 hover:text-white transition-colors'>Housing- Landlord & Tenants</Link></li>
                  <li><Link href='/services/family-law' className='text-neutral-300 hover:text-white transition-colors'>Family Law</Link></li>
                  <li><Link href='/services/wills-and-probate' className='text-neutral-300 hover:text-white transition-colors'>Wills & Probate</Link></li>
                  <li><Link href='/services/document-legalisation' className='text-neutral-300 hover:text-white transition-colors'>Document Legalisation</Link></li>
                  <li><Link href='/services/private-commercial-law' className='text-neutral-300 hover:text-white transition-colors'>Private Commercial Law</Link></li>
                  <li><Link href='/services/charity-law' className='text-neutral-300 hover:text-white transition-colors'>Charity Law</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className='flex-1'>
            <h3 className='text-lg font-semibold mb-4'>Contact Information</h3>
            <div className='space-y-3'>
              <div className='flex items-center'>
                <div className='w-10'><MapPin className='h-5 w-5 mr-3 mt-0.5 text-gold-400' /></div>
                
                <div>
                  <p className='text-neutral-300 text-[15px]'>
                    {contactInfo?.address
                      ? `${contactInfo.address}`
                      : 'Unit D Atrium House 459-463 New Cross Road, London SE14 6AJ, United Kingdom'}
                  </p>
                </div>
              </div>
              <div className='flex items-center'>
                <Phone className='h-5 w-5 mr-3 text-gold-400' />
                <a
                  href={`tel:${contactInfo?.phone}`}
                  className='text-neutral-300 hover:text-gold-400 transition-colors'
                >
                  {contactInfo?.phone || '+44 (0) 20 8469 3714'}
                </a>
              </div>
              <div className='flex items-center'>
                <Mail className='h-5 w-5 mr-3 text-gold-400' />
                <a
                  href='mailto:info@michaelstevenssolicitors.com'
                  className='text-neutral-300 hover:text-gold-400 transition-colors'
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
                  src={REGULATORY_BODIES.sra.logoUrl || "/placeholder.svg"}
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
                  src={REGULATORY_BODIES.ico.logoUrl || "/placeholder.svg"}
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
                  src={REGULATORY_BODIES.lawSociety.logoUrl || "/placeholder.svg"}
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
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-primary-700 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-neutral-300 text-sm'>
              © 2025 Michael Stevens Solicitors. All rights reserved. Website by <a href="https://codeillustrated.com/labs" className='underline' target="_blank" rel="noopener noreferrer">Code Illustrated Labs</a>
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='/privacy-policy'
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
