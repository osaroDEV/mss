import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { client, urlFor } from "@/lib/sanity"
import ContactForm from "@/components/ContactFormAbout" 
import PortableTextRenderer from "@/components/PortableTextRenderer"
import * as LucideIcons from "lucide-react"
import Link from "next/link"
import SRADigitalBadge from "./SRADigitalBadge"

// Regulatory bodies configuration
const REGULATORY_BODIES = {
  ico: {
    name: "Information Commissioner's Office",
    url: 'https://ico.org.uk/ESDWebPages/Entry/ZA050265',
    logoUrl: '/images/ico-blue.jpg', // Use white version for dark footer
    number: '[Your ICO Number]',
  },
  lawSociety: {
    name: 'The Law Society',
    url: 'https://solicitors.lawsociety.org.uk/search/results?Pro=True&Type=0&Name=MICHAEL_STEVENS_SOLICITORS',
    logoUrl: '/images/tls-white.webp', // Use white version for dark footer
    number: 'England & Wales',
  },
};

// Define the types for our Sanity data
interface Achievement {
  title: string
  description: string
  icon: string
}

interface SuccessRate {
  percentage: number
  label: string
}

interface AboutPageData {
  mainTitle: string
  heroImage?: {
    asset: {
      _ref: string
    }
  }
  whoWeAreTitle: string
  whoWeAreContent: any[]
  whatWeDoTitle: string
  whatWeDoContent: any[]
  ourLocationTitle: string
  ourLocationContent: any[]
  contactUsTitle: string
  contactUsContent: any[]
  achievements?: Achievement[]
  successRate?: SuccessRate
  teamImage?: {
    asset: {
      _ref: string
    }
    alt: string
  }
}

// Function to get the Lucide icon component by name
function getIconComponent(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Award // Default to Award if not found
  return IconComponent
}

async function getAboutPageData(): Promise<AboutPageData | null> {
  const query = `*[_type == "aboutPage"][0]{
    heroTitle,
    heroImage,
    whoWeAreTitle,
    whoWeAreContent,
    whatWeDoTitle,
    whatWeDoContent,
    ourLocationTitle,
    ourLocationContent,
    contactUsTitle,
    contactUsContent
  }`
  try {
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error("Failed to fetch about page data from Sanity:", error)
    return null
  }
}

export default async function About() {
  const data = await getAboutPageData()

  // If no data is found, show a message indicating no content
  if (!data) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">No About Page Data Found</h2>
            <p className="text-lg text-neutral-600">
              Please create an "About Page Content" document in Sanity Studio to see content here.
            </p>
            <div className="mt-8 p-6 bg-neutral-100 rounded-lg">
              <p className="text-sm text-neutral-500">
                Debug: No data returned from Sanity query for 'about' document type.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white px-10">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {/* Left Column - Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Who We Are Section */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.whoWeAreTitle}</h2>
                    <PortableTextRenderer content={data.whoWeAreContent} />
                  </div>
                  {/* What We Do Section */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.whatWeDoTitle}</h2>
                    <PortableTextRenderer content={data.whatWeDoContent} />
                  </div>
                  {/* Our Location */}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">{data.ourLocationTitle}</h3>
                    <PortableTextRenderer content={data.ourLocationContent} />
                  </div>
                  {/* Contact Us */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.contactUsTitle}</h2>
                    <PortableTextRenderer content={data.contactUsContent} />
                  </div>
                  {/* Regulatory Information Section */}
        <div className='border-t border-primary-700 mt-8 pt-8 mb-8'>
          <h3 className='text-2xl font-bold text-gray-900 mb-6'>
            Regulatory Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-sm'>
            {/* SRA */}
            <SRADigitalBadge />
            <SRADigitalBadge />

            {/* ICO */}
            <div className='flex flex-col items-center text-center'>
              <Link
                href={REGULATORY_BODIES.ico.url}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium hover:text-[rgba(0,0,0,0.5)]  transition-colors block mb-1'
              >
                <Image
                  src={REGULATORY_BODIES.ico.logoUrl || "/placeholder.svg"}
                  alt='ICO Logo'
                  width={120}
                  height={50}
                  className='object-contain'
                />
              </Link>
              <div>
                <Link
                  href={REGULATORY_BODIES.ico.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium hover:text-[rgba(0,0,0,0.5)]  transition-colors block mb-1'
                >
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
                  width={160}
                  height={80}
                  className='object-contain'
                />
              </Link>
              <div>
                <Link
                  href={REGULATORY_BODIES.lawSociety.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium hover:text-[rgba(0,0,0,0.5)] transition-colors block mb-1'
                >
                </Link>
              </div>
            </div>
          </div>
        </div>
                </div>
                {/* Right Column - Contact Form */}
                <div className="lg:col-span-1">
                  <Card className="bg-slate-800 text-white border-0 sticky top-8">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">Contact us today</h3>
                        <p className="text-slate-300">To find out more</p>
                      </div>
                      <ContactForm />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
  )
}
