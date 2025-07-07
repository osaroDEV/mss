import Link from 'next/link'
import { ArrowRight, Shield, Scale, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Excellence in
              <span className="text-gold-400 block">Legal Services</span>
            </h1>
            <p className="text-xl text-neutral-200 mb-8 leading-relaxed">
              With over [] years of experience, Michael Stevens Solicitors provides comprehensive legal solutions for businesses and individuals across London and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 rounded-md font-semibold text-lg inline-flex items-center justify-center transition-colors duration-200 group"
              >
                Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="border-2 border-white hover:bg-white hover:text-primary-800 text-white px-8 py-4 rounded-md font-semibold text-lg inline-flex items-center justify-center transition-colors duration-200"
              >
                Our Services
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="h-8 w-8 text-gold-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">[]+</div>
                <div className="text-sm text-neutral-300">Years Experience</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-gold-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-neutral-300">Clients Served</div>
              </div>
              <div className="text-center">
                <Scale className="h-8 w-8 text-gold-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-neutral-300">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="animate-slide-up">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gold-400/20 to-primary-600/20 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-center text-neutral-300">
                  <Scale className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Professional Legal Team</p>
                  <p className="text-sm">Image placeholder</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}