import Link from 'next/link'
import { 
  Building2, 
  Users, 
  Home, 
  Gavel, 
  Heart, 
  FileText,
  ArrowRight 
} from 'lucide-react'

const services = [
  {
    id: 'corporate-law',
    title: 'Corporate Law',
    description: 'Comprehensive business legal services including company formation, mergers, acquisitions, and corporate governance.',
    icon: Building2,
    features: ['Company Formation', 'M&A Advisory', 'Corporate Governance', 'Commercial Contracts']
  },
  {
    id: 'employment-law',
    title: 'Employment Law',
    description: 'Expert guidance on employment matters for both employers and employees, ensuring compliance and protection.',
    icon: Users,
    features: ['Employment Contracts', 'Workplace Disputes', 'HR Compliance', 'Tribunal Representation']
  },
  {
    id: 'commercial-property',
    title: 'Commercial Property',
    description: 'Full-service commercial property law covering acquisitions, disposals, leasing, and development projects.',
    icon: Home,
    features: ['Property Acquisitions', 'Commercial Leasing', 'Development Projects', 'Property Finance']
  },
  {
    id: 'litigation',
    title: 'Litigation & Dispute Resolution',
    description: 'Skilled representation in commercial disputes with a focus on achieving favorable outcomes efficiently.',
    icon: Gavel,
    features: ['Commercial Litigation', 'Arbitration', 'Mediation', 'Debt Recovery']
  },
  {
    id: 'family-law',
    title: 'Family Law',
    description: 'Sensitive and professional handling of family matters including divorce, custody, and financial settlements.',
    icon: Heart,
    features: ['Divorce Proceedings', 'Child Custody', 'Financial Settlements', 'Prenuptial Agreements']
  },
  {
    id: 'regulatory',
    title: 'Regulatory & Compliance',
    description: 'Navigate complex regulatory environments with expert advice on compliance and risk management.',
    icon: FileText,
    features: ['Regulatory Compliance', 'Risk Assessment', 'Licensing', 'Government Relations']
  }
]

export default function Services() {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            Our Practice Areas
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We provide comprehensive legal services across multiple practice areas, 
            delivering expert advice and exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={service.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 group-hover:bg-primary-200 transition-colors duration-300 rounded-lg p-3">
                    <Icon className="h-8 w-8 text-primary-700" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-neutral-500">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/services/${service.id}`}
                  className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium transition-colors duration-200 group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-3 rounded-md font-semibold inline-flex items-center transition-colors duration-200"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}