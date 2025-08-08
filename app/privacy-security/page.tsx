import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/ContactFormAbout"
import { getSiteSettings, urlFor } from "@/lib/sanity"
import PortableTextRenderer from "@/components/PortableTextRenderer"

export async function generateMetadata() {
  const siteSettings = await getSiteSettings()
  const privacySecurity = siteSettings?.legalNotices?.privacySecurity

  return {
    title: privacySecurity?.title || "Privacy Policy - Michael Stevens Solicitors",
    description: "Read our privacy policy to understand how we handle your data.",
  }
}

export default async function PrivacySecurityPage() {
  const siteSettings = await getSiteSettings()
  const data = siteSettings?.legalNotices?.privacySecurity

  // If no data is found, show a message indicating no content
  if (!data) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">No Privacy Policy Data Found</h2>
            <p className="text-lg text-neutral-600">
              Please populate the "Privacy Security" section in your "Site Settings" document in Sanity Studio.
            </p>
            <div className="mt-8 p-6 bg-neutral-100 rounded-lg">
              <p className="text-sm text-neutral-500">
                Debug: No data returned from Sanity query for Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const heroImageUrl = data.image ? urlFor(data.image).width(1920).height(1080).url() : "/placeholder.svg?height=1080&width=1920&text=Privacy+Policy+Image"

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Desktop Layout - Two Column */}
        <div className="hidden lg:flex h-full">
          {/* Left Side - Title Text */}
          <div className="w-1/2 bg-slate-900 flex items-center justify-center">
            <h1 className="text-6xl xl:text-7xl font-light text-white">{data.title || "Privacy Policy"}</h1>
          </div>
          {/* Right Side - Image with Left Blur */}
          <div className="w-1/2 relative overflow-hidden">
            <Image
              src={heroImageUrl || "/placeholder.svg"}
              alt={data.title || "Privacy Policy Hero"}
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
              alt={data.title || "Privacy Policy Hero"}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Bottom - Title Text */}
          <div className="bg-slate-900 py-12 px-6">
            <h1 className="text-4xl sm:text-5xl font-light text-white text-center">{data.title || "Privacy Policy"}</h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
       {/* Main Content Section */}
            <section className="min-h-screen bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                  {/* Left Column - Content */}
                  <div className="lg:col-span-2 space-y-12">
                    {data.content && data.content.length > 0 ? (
                      <PortableTextRenderer content={data.content} />
                    ) : (
                      <div className="text-center text-neutral-600">
                        <p className="text-lg mb-4">No content available for Complaints Procedure yet.</p>
                        {data.externalUrl && (
                          <p>
                            You can view the document externally here:{" "}
                            <a href={data.externalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {data.externalUrl}
                            </a>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
    </div>
  )
}
