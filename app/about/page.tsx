import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/ContactFormAbout" 
import { client, urlFor } from "@/lib/sanity"
import PortableTextRenderer from "@/components/PortableTextRenderer"

// Define a type for the fetched data
interface AboutPageData {
  heroTitle: string
  heroImage: {
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

export default async function AboutPage() {
  const data = await getAboutPageData()

  if (!data) {
    // Handle case where data is not available, e.g., show a loading state or error message
    return <div className="min-h-screen flex items-center justify-center">Loading or no data available...</div>
  }

  const heroImageUrl = data.heroImage ? urlFor(data.heroImage).url() : "/placeholder.svg?height=1080&width=1920"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Desktop Layout - Two Column */}
        <div className="hidden lg:flex h-full">
          {/* Left Side - About Us Text */}
          <div className="w-1/2 bg-slate-900 flex items-center justify-center">
            <h1 className="text-6xl xl:text-7xl font-light text-white">{data.heroTitle}</h1>
          </div>
          {/* Right Side - Image with Left Blur */}
          <div className="w-1/2 relative overflow-hidden">
            <Image
              src={heroImageUrl || "/placeholder.svg"}
              alt={data.heroTitle || "About Us Hero"}
              fill
              className="object-cover"
              priority
            />
            {/* Left blur gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent" />
          </div>
        </div>
        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden h-full flex flex-col">
          {/* Top - Image (no blur on mobile) */}
          <div className="flex-1 relative">
            <Image
              src={heroImageUrl || "/placeholder.svg"}
              alt={data.heroTitle || "About Us Hero"}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Bottom - About Us Text */}
          <div className="bg-slate-900 py-12 px-6">
            <h1 className="text-4xl sm:text-5xl font-light text-white text-center">{data.heroTitle}</h1>
          </div>
        </div>
      </section>
      {/* Main Content Section - Two Column Layout */}
      <section className="py-16 bg-white px-2 md:px-10 border">
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
    </div>
  )
}
