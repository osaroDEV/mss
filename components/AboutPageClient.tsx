"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/ContactFormAbout"
import PortableTextRenderer from "@/components/PortableTextRenderer"
import { useState } from "react"

// Define the props interface
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

interface AboutPageClientProps {
  data: AboutPageData
  heroImageUrl: string
}

export default function AboutPageClient({ data, heroImageUrl }: AboutPageClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Desktop Layout - Two Column */}
        <div className="hidden lg:flex h-full">
          {/* Left Side - About Us Text */}
          <div className="w-1/2 bg-slate-900 flex items-center justify-center">
            <h1 className="text-6xl xl:text-7xl font-light text-white animate-fade-in-up">{data.heroTitle}</h1>
          </div>
          {/* Right Side - Image with Left Blur */}
          <div className="w-1/2 relative overflow-hidden">
            {/* Loading placeholder with shimmer effect */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
                <div className="relative z-10 text-gray-500 font-medium"></div>
              </div>
            )}
            <Image
              src={heroImageUrl || "/placeholder.svg"}
              alt={data.heroTitle || "About Us Hero"}
              fill
              className={`object-cover transition-opacity duration-500 ease-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority
              onLoad={() => {
                console.log("Image loaded successfully")
                setImageLoaded(true)
              }}
              onError={(e) => {
                console.error("Image failed to load:", e)
                setImageLoaded(true) // Show content even if image fails
              }}
            />
            {/* Left blur gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent transition-opacity duration-500 delay-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden h-full flex flex-col">
          {/* Top - Image (no blur on mobile) */}
          <div className="flex-1 relative">
            {/* Loading placeholder for mobile */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
                <div className="relative z-10 text-gray-500 font-medium">Loading image...</div>
              </div>
            )}
            <Image
              src={heroImageUrl || "/placeholder.svg"}
              alt={data.heroTitle || "About Us Hero"}
              fill
              className={`object-cover transition-opacity duration-500 ease-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority
              onLoad={() => {
                console.log("Mobile image loaded successfully")
                setImageLoaded(true)
              }}
              onError={(e) => {
                console.error("Mobile image failed to load:", e)
                setImageLoaded(true)
              }}
            />
          </div>
          {/* Bottom - About Us Text */}
          <div className="bg-slate-900 py-12 px-6">
            <h1 className="text-4xl sm:text-5xl font-light text-white text-center animate-fade-in-up">
              {data.heroTitle}
            </h1>
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
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.whoWeAreTitle}</h2>
                <PortableTextRenderer content={data.whoWeAreContent} />
              </div>
              {/* What We Do Section */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.whatWeDoTitle}</h2>
                <PortableTextRenderer content={data.whatWeDoContent} />
              </div>
              {/* Our Location */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{data.ourLocationTitle}</h3>
                <PortableTextRenderer content={data.ourLocationContent} />
              </div>
              {/* Contact Us */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.contactUsTitle}</h2>
                <PortableTextRenderer content={data.contactUsContent} />
              </div>
            </div>
            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <Card
                className="bg-slate-800 text-white border-0 sticky top-8 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
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
