import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { client } from "@/lib/sanity"

// Define the types for our Sanity data
interface Service {
  _id: string
  title: string
  slug: {
    current: string
  }
  shortDescription: string
  icon: string
  features: string[]
  featured: boolean
  order: number
}

// Create a proper icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Building2: LucideIcons.Building2,
  Users : LucideIcons.Users,
  Home: LucideIcons.Home,
  Skull: LucideIcons.Skull,
  Heart: LucideIcons.Heart,
  FileText: LucideIcons.FileText,
  Briefcase: LucideIcons.Briefcase,
  Scale: LucideIcons.Scale,
  Plane: LucideIcons.Plane,
  UsersRound : LucideIcons.UsersRound,
  Calculator: LucideIcons.Calculator,
  Globe: LucideIcons.Globe,
  // Add more icons as needed
}

// Function to get the Lucide icon component by name
function getIconComponent(iconName: string) {
  if (!iconName) {
    console.log("No icon name provided, using Briefcase fallback")
    return LucideIcons.Briefcase
  }

  console.log("Looking for icon:", iconName)

  // First try the icon map
  if (iconMap[iconName]) {
    console.log("Found icon in map:", iconName)
    return iconMap[iconName]
  }

  // Try direct access as fallback
  const IconComponent = (LucideIcons as any)[iconName]
  if (IconComponent && typeof IconComponent === "function") {
    console.log("Found icon via direct access:", iconName)
    return IconComponent
  }

  console.log("Icon not found, using Briefcase fallback for:", iconName)
  return LucideIcons.Briefcase
}

async function getServicesData(): Promise<Service[]> {
  const query = `*[_type == "service"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    features,
    featured,
    order
  }`

  try {
    const data = await client.fetch(query)
    console.log("Services data fetched:", data?.length || 0, "services")

    // Log each service's icon for debugging
    data?.forEach((service: Service) => {
      console.log(`Service: ${service.title}, Icon: ${service.icon}`)
    })

    return data || []
  } catch (error) {
    console.error("Error fetching services data:", error)
    return []
  }
}

// Fallback services data (only used if no Sanity data exists)
const fallbackServices = [
  {
    _id: "fallback-1",
    title: "Corporate Law",
    slug: { current: "corporate-law" },
    shortDescription:
      "Comprehensive business legal services including company formation, mergers, acquisitions, and corporate governance.",
    icon: "Building2",
    features: ["Company Formation", "M&A Advisory", "Corporate Governance", "Commercial Contracts"],
    featured: true,
    order: 1,
  },
  {
    _id: "fallback-2",
    title: "Employment Law",
    slug: { current: "employment-law" },
    shortDescription:
      "Expert guidance on employment matters for both employers and employees, ensuring compliance and protection.",
    icon: "Users",
    features: ["Employment Contracts", "Workplace Disputes", "HR Compliance", "Tribunal Representation"],
    featured: false,
    order: 2,
  },
  {
    _id: "fallback-3",
    title: "Commercial Property",
    slug: { current: "commercial-property" },
    shortDescription:
      "Full-service commercial property law covering acquisitions, disposals, leasing, and development projects.",
    icon: "Home",
    features: ["Property Acquisitions", "Commercial Leasing", "Development Projects", "Property Finance"],
    featured: false,
    order: 3,
  },
  {
    _id: "fallback-4",
    title: "Litigation & Dispute Resolution",
    slug: { current: "litigation" },
    shortDescription:
      "Skilled representation in commercial disputes with a focus on achieving favorable outcomes efficiently.",
    icon: "Scale", // Changed from 'Gavel' to 'Scale' as it's more commonly available
    features: ["Commercial Litigation", "Arbitration", "Mediation", "Debt Recovery"],
    featured: false,
    order: 4,
  },
  {
    _id: "fallback-5",
    title: "Family Law",
    slug: { current: "family-law" },
    shortDescription:
      "Sensitive and professional handling of family matters including divorce, custody, and financial settlements.",
    icon: "Heart",
    features: ["Divorce Proceedings", "Child Custody", "Financial Settlements", "Prenuptial Agreements"],
    featured: false,
    order: 5,
  },
  {
    _id: "fallback-6",
    title: "Regulatory & Compliance",
    slug: { current: "regulatory" },
    shortDescription: "Navigate complex regulatory environments with expert advice on compliance and risk management.",
    icon: "FileText",
    features: ["Regulatory Compliance", "Risk Assessment", "Licensing", "Government Relations"],
    featured: false,
    order: 6,
  },
]

export default async function Services() {
  const sanityServices = await getServicesData()

  // Use Sanity data if available, otherwise use fallback data
  const services = sanityServices.length > 0 ? sanityServices : fallbackServices
  const isUsingSanityData = sanityServices.length > 0

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Debug info */}
        {/* <div className="mb-8 p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-700">
            {isUsingSanityData
              ? "✅ Using Sanity CMS data"
              : "⚠️ Using fallback data - Create services in Sanity Studio"}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Services found: {services.length} | Data source: {isUsingSanityData ? "Sanity CMS" : "Fallback"}
          </p>
          {!isUsingSanityData && (
            <p className="text-xs text-blue-600 mt-1">
              Go to{" "}
              <a href="http://localhost:3333" target="_blank" className="underline" rel="noreferrer">
                Sanity Studio
              </a>{" "}
              → Services → Create to add your services
            </p>
          )}
        </div> */}

        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4">Our Practice Areas</h2>
          <p className="md:text-xl text-neutral-600 max-w-3xl mx-auto">
            We provide comprehensive legal services across multiple practice areas, delivering expert advice and
            exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon)

            return (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 group animate-fade-in relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Featured badge */}
                {service.featured && (
                  <div className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}

                {/* Debug icon info */}
                {/* <div className="absolute top-2 left-2 bg-gray-100 text-xs px-2 py-1 rounded text-gray-600">
                  Icon: {service.icon || "none"}
                </div> */}

                <div className="flex items-center mb-6">
                  <div className="bg-primary-100 group-hover:bg-primary-200 transition-colors duration-300 rounded-lg p-3">
                    <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-primary-700" />
                  </div>
                </div>

                <h3 className="md:text-xl font-semibold text-primary-800 mb-3">{service.title}</h3>

                <p className="text-sm md:text-lg text-neutral-600 mb-6">{service.shortDescription}</p>

                {/* Features list */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-neutral-500">
                        <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/services/${service.slug.current}`}
                  className="text-xs md:text-base inline-flex items-center text-primary-700 hover:text-primary-800 font-medium transition-colors duration-200 group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* <div className="text-center mt-12">
          <Link
            href="/services"
            className="bg-primary-800 hover:bg-primary-900 text-white px-8 py-3 rounded-md font-semibold inline-flex items-center transition-colors duration-200"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div> */}
      </div>
    </section>
  )
}
