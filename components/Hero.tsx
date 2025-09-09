import Image from "next/image"
import { client, urlFor } from "@/lib/sanity"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Define the types for our Sanity data
interface HeroData {
  mainHeading: string
  paragraph1: string
  paragraph2: string
  heroImage?: {
    asset: {
      _ref: string
    }
  }
}

async function getHeroData(): Promise<HeroData | null> {
  const query = `*[_type == "heroComponent"][0]{
    mainHeading,
    paragraph1,
    paragraph2,
    heroImage
  }`
  try {
    const data = await client.fetch(query)
    console.log("Raw Sanity hero data:", JSON.stringify(data, null, 2))
    return data || null
  } catch (error) {
    console.error("Error fetching hero data:", error)
    return null
  }
}

export default async function Hero() {
  const data = await getHeroData()

  // If no data is found, show a message indicating no content
  if (!data) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">No Hero Section Data Found</h2>
          <p className="text-lg text-neutral-600">
            Please create a "Hero Section Content" document in Sanity Studio to see content here.
          </p>
          <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
            <p className="text-sm text-neutral-500">
              Debug: No data returned from Sanity query for 'hero' document type.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const heroImageUrl = data.heroImage ? urlFor(data.heroImage).url() : "/placeholder.svg?height=1080&width=1920"

  return (
    <section className="relative h-screen">
      {/* Desktop Layout - Two Column */}
      <div className="hidden lg:flex h-full">
        {/* Left Side - Content */}
        <div className="w-1/2 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 flex items-center justify-center relative overflow-hidden text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent"></div>
          </div>
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
            {/* Content */}
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-6">{data.mainHeading}</h1>
              <p className="md:text-xl text-neutral-200 mb-8 leading-relaxed">{data.paragraph1}</p>
              <p className="md:text-xl text-neutral-200 mb-8 leading-relaxed">{data.paragraph2}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/contact"
                  className="flex-1 bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 rounded-md font-semibold text-lg inline-flex items-center justify-center transition-colors duration-200 group"
                >
                  Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="flex-1 border-2 border-white hover:bg-white hover:text-primary-800 text-white px-8 py-4 rounded-md font-semibold text-lg inline-flex items-center justify-center transition-colors duration-200"
                >
                  Our Services
                </Link>
              </div>
          </div>
        </div>
        {/* Right Side - Image with Left Blur */}
        <div className="w-1/2 relative overflow-hidden">
          <Image
            src={heroImageUrl || "/placeholder.svg"}
            alt={data.mainHeading || "Lawyers in office"}
            fill
            className="object-contain"
            priority
          />
          {/* Left blur gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800/60 via-transparent to-transparent" />
        </div>
      </div>
      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden h-full flex flex-col">
        {/* Top - Image (no blur on mobile) */}
        <div className="flex-1 relative">
          <Image
            src={heroImageUrl || "/placeholder.svg"}
            alt={data.mainHeading || "Lawyers in office"}
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Bottom - Content */}
        <div className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-12 px-6 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-transparent"></div>
          </div>
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-center">{data.mainHeading}</h1>
            <p className="text-lg text-neutral-200 mb-8 leading-relaxed text-center">{data.paragraph1}</p>
            <p className="text-lg text-neutral-200 mb-8 leading-relaxed text-center">{data.paragraph2}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
