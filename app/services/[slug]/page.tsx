import type React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { PortableText } from "@portabletext/react"
import { client } from "@/lib/sanity"
import type { Metadata } from "next"

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
  Skull: LucideIcons.Skull,
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
}

// Function to get the Lucide icon component by name
function getIconComponent(iconName: string) {
  if (!iconName) {
    return LucideIcons.Briefcase
  }

  if (iconMap[iconName]) {
    return iconMap[iconName]
  }

  const IconComponent = (LucideIcons as any)[iconName]
  if (IconComponent && typeof IconComponent === "function") {
    return IconComponent
  }

  return LucideIcons.Briefcase
}

// Portable Text components for rich text rendering
const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold text-primary-700 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-semibold text-primary-700 mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => <p className="text-neutral-600 mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gold-500 pl-4 italic text-neutral-700 my-6 bg-neutral-50 py-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-neutral-600">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-neutral-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-2">{children}</li>,
    number: ({ children }: any) => <li className="ml-2">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-primary-800">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-neutral-100 text-primary-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-primary-700 hover:text-primary-800 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
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
    const service = await client.fetch(query, { slug })
    return service || null
  } catch (error) {
    console.error("Error fetching service:", error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  return {
    title: `${service.title} | Legal Services`,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      type: "website",
    },
  }
}

// Generate static params for all services
export async function generateStaticParams() {
  const query = `*[_type == "service"] {
    "slug": slug.current
  }`

  try {
    const services = await client.fetch(query)
    return services.map((service: { slug: string }) => ({
      slug: service.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const IconComponent = getIconComponent(service.icon)

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-primary-50 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            href="/services"
            className="inline-flex items-center text-primary-700 hover:text-primary-800 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>

          {/* Service Header */}
          <div className="flex items-start gap-6">
            <div className="bg-primary-100 rounded-xl p-4 flex-shrink-0">
              <IconComponent className="h-12 w-12 text-primary-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-800">{service.title}</h1>
                {service.featured && (
                  <span className="bg-gold-500 text-white text-sm font-semibold px-3 py-1 rounded-full">Featured</span>
                )}
              </div>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Detailed Description */}
            {service.detailedDescription && service.detailedDescription.length > 0 && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText value={service.detailedDescription} components={portableTextComponents} />
              </div>
            )}

            {/* Process Steps */}
            {service.processSteps && service.processSteps.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-8">Our Process</h2>
                <div className="space-y-6">
                  {service.processSteps
                    .sort((a, b) => a.step - b.step)
                    .map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-700 text-white rounded-full flex items-center justify-center font-semibold">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary-800 mb-2">{step.title}</h3>
                          <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary-700 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary-800 mb-3">Need Expert Advice?</h3>
                <p className="text-neutral-600 mb-4">
                  Contact our experienced team for a consultation about your {service.title.toLowerCase()} needs.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full bg-primary-700 hover:bg-primary-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
