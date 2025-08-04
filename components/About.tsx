import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { client, urlFor } from "@/lib/sanity"
import ContactForm from "@/components/ContactFormAbout" 
import PortableTextRenderer from "@/components/PortableTextRenderer"
import * as LucideIcons from "lucide-react"

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
  const query = `*[_type == "about"][0]{
    mainTitle,
    heroImage,
    whoWeAreTitle,
    whoWeAreContent,
    whatWeDoTitle,
    whatWeDoContent,
    ourLocationTitle,
    ourLocationContent,
    contactUsTitle,
    contactUsContent,
    achievements[]{
      title,
      description,
      icon
    },
  }`
  try {
    const data = await client.fetch(query)
    console.log("Raw Sanity data:", JSON.stringify(data, null, 2))
    return data || null
  } catch (error) {
    console.error("Error fetching about page data:", error)
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
