import React from 'react'
import ContactForm from '@/components/ContactForm'
import { getSiteSettings } from '@/lib/sanity'
import { Mail, Phone } from 'lucide-react'

const page = async () => {
    const siteSettings = await getSiteSettings()
  const contactInfo = siteSettings?.contactInfo
  return (
    <section className='py-16 lg:py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-primary-800 mb-4'>
            Get Expert Legal Advice
          </h2>
          <p className='text-xl text-neutral-600 max-w-3xl mx-auto'>
            Ready to discuss your legal matter? Contact us for consultations.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Contact Information */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl font-semibold text-primary-800 mb-4'>
                Contact Information
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <Phone className='h-5 w-5 text-gold-600 mr-3' />
                  <div>
                    <p className='font-medium'>Phone</p>
                    <a href='tel:+442084693714' className='text-neutral-600'>
                      {contactInfo?.phone || '+44 (0) 20 8469 3714'}
                    </a>
                  </div>
                </div>
                <div className='flex items-center'>
                  <Mail className='h-5 w-5 text-gold-600 mr-3' />
                  <div>
                    <p className='font-medium'>Email</p>
                    <a
                      href='mailto:info@michaelstevenssolicitors.co.uk'
                      className='text-neutral-600'
                    >
                      {contactInfo?.email ||
                        'info@michaelstevenssolicitors.co.uk'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default page