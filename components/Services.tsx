import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { client } from "@/lib/sanity"
import ViewAllServicesButton from "./ViewAllServicesBtn"

// Define the types for our Sanity data
interface ProcessStep {
  step: number
  title: string
  description: string
}

interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  detailedDescription: any[] // Rich text blocks from Sanity
  icon: string
  features: string[]
  benefits?: string[]
  processSteps?: ProcessStep[]
  featured: boolean
  order: number
}

// Create a proper icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Building2: LucideIcons.Building2,
  Users: LucideIcons.Users,
  Home: LucideIcons.Home,
  Scroll: LucideIcons.Scroll,
  Heart: LucideIcons.Heart,
  FileText: LucideIcons.FileText,
  Briefcase: LucideIcons.Briefcase,
  Scale: LucideIcons.Scale,
  Plane: LucideIcons.Plane,
  UsersRound: LucideIcons.UsersRound,
  Wrench: LucideIcons.Wrench,
  Globe: LucideIcons.Globe,
  Shield: LucideIcons.Shield,
  Gavel: LucideIcons.Gavel,
  BookOpen: LucideIcons.BookOpen,
  HeartHandshake: LucideIcons.HeartHandshake,
  PenTool: LucideIcons.PenTool,
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
    detailedDescription,
    icon,
    features,
    benefits,
    processSteps[] {
      step,
      title,
      description
    },
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
const fallbackServices: Service[] = [
  {
    _id: "fallback-1",
    title: "Corporate Law",
    slug: { current: "corporate-law" },
    shortDescription:
      "Comprehensive business legal services including company formation, mergers, acquisitions, and corporate governance.",
    detailedDescription: [], // Will be populated with rich text in CMS
    icon: "Building2",
    features: ["Company Formation", "M&A Advisory", "Corporate Governance", "Commercial Contracts"],
    benefits: [
      "Expert guidance through complex business transactions",
      "Comprehensive compliance support",
      "Strategic legal advice for growth",
      "Risk mitigation and protection",
    ],
    processSteps: [
      {
        step: 1,
        title: "Initial Consultation",
        description: "We discuss your business needs and legal requirements in detail.",
      },
      {
        step: 2,
        title: "Legal Analysis",
        description: "Our team conducts thorough research and analysis of your situation.",
      },
      {
        step: 3,
        title: "Strategy Development",
        description: "We develop a tailored legal strategy to meet your objectives.",
      },
      {
        step: 4,
        title: "Implementation",
        description: "We execute the legal work with precision and attention to detail.",
      },
    ],
    featured: true,
    order: 1,
  },
  {
    _id: "fallback-2",
    title: "Employment Law",
    slug: { current: "employment-law" },
    shortDescription:
      "Expert guidance on employment matters for both employers and employees, ensuring compliance and protection.",
    detailedDescription: [],
    icon: "Users",
    features: ["Employment Contracts", "Workplace Disputes", "HR Compliance", "Tribunal Representation"],
    benefits: [
      "Protect your business from employment disputes",
      "Ensure compliance with employment legislation",
      "Expert representation in tribunals",
      "Comprehensive HR policy development",
    ],
    featured: false,
    order: 2,
  },
  {
    _id: "fallback-3",
    title: "Commercial Property",
    slug: { current: "commercial-property" },
    shortDescription:
      "Full-service commercial property law covering acquisitions, disposals, leasing, and development projects.",
    detailedDescription: [],
    icon: "Home",
    features: ["Property Acquisitions", "Commercial Leasing", "Development Projects", "Property Finance"],
    benefits: [
      "Streamlined property transactions",
      "Expert lease negotiations",
      "Development project support",
      "Property finance expertise",
    ],
    featured: false,
    order: 3,
  },
  {
    _id: "fallback-4",
    title: "Litigation & Dispute Resolution",
    slug: { current: "litigation" },
    shortDescription:
      "Skilled representation in commercial disputes with a focus on achieving favorable outcomes efficiently.",
    detailedDescription: [],
    icon: "Scale",
    features: ["Commercial Litigation", "Arbitration", "Mediation", "Debt Recovery"],
    benefits: [
      "Experienced courtroom representation",
      "Alternative dispute resolution expertise",
      "Cost-effective dispute management",
      "Strategic litigation planning",
    ],
    featured: false,
    order: 4,
  },
  {
    _id: "fallback-5",
    title: "Family Law",
    slug: { current: "family-law" },
    shortDescription:
      "Sensitive and professional handling of family matters including divorce, custody, and financial settlements.",
    detailedDescription: [],
    icon: "Heart",
    features: ["Divorce Proceedings", "Child Custody", "Financial Settlements", "Prenuptial Agreements"],
    benefits: [
      "Compassionate and understanding approach",
      "Expert family court representation",
      "Child-focused custody arrangements",
      "Fair financial settlements",
    ],
    featured: false,
    order: 5,
  },
  {
    _id: "fallback-6",
    title: "Regulatory & Compliance",
    slug: { current: "regulatory" },
    shortDescription: "Navigate complex regulatory environments with expert advice on compliance and risk management.",
    detailedDescription: [],
    icon: "FileText",
    features: ["Regulatory Compliance", "Risk Assessment", "Licensing", "Government Relations"],
    benefits: [
      "Stay ahead of regulatory changes",
      "Comprehensive compliance audits",
      "Expert licensing support",
      "Government relations expertise",
    ],
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
                <div className="flex items-center mb-6">
                </div>
                <h3 className="md:text-xl font-semibold text-primary-800 mb-3">{service.title}</h3>
                <p className="text-sm md:text-lg mb-6">{service.shortDescription}</p>
                {/* Features list */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-base">
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
        <ViewAllServicesButton />
      </div>
    </section>
  )
}
