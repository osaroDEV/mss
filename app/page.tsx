import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import { getSiteSettings } from '@/lib/sanity'
import { Phone, Mail } from 'lucide-react'

export default async function Home() {
  const siteSettings = await getSiteSettings()
  const contactInfo = siteSettings?.contactInfo
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      
      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Get Expert Legal Advice
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Ready to discuss your legal matter? Contact us today for a free consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gold-600 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                  href='tel:+442071234567'
                  className='text-neutral-600'
                >{contactInfo?.phone || '+44 (0) 20 7123 4567'}</a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gold-600 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                  href='mailto:info@michaelstevenssolicitors.co.uk'
                  className='text-neutral-600'
                >{contactInfo?.email || 'info@michaelstevenssolicitors.co.uk'}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <h4 className="font-semibold text-primary-800 mb-2">Emergency Legal Advice</h4>
                <p className="text-sm text-neutral-600 mb-3">
                  Need urgent legal assistance? Our emergency hotline is available 24/7.
                </p>
                <a
                  href='tel:+442071234567'
                  className='font-semibold text-primary-800'
                >{contactInfo?.emergencyPhone || contactInfo?.phone || '+44 (0) 20 7123 4567'}</a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}