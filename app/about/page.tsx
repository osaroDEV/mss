import { client, urlFor } from "@/lib/sanity"
import AboutPageClient from "@/components/AboutPageClient"

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
    console.log("Fetching about page data from Sanity...")
    const data = await client.fetch(
      query,
      {},
      {
        cache: "no-store", // Ensure fresh data in production
        next: { revalidate: 0 }, // Disable caching for debugging
      },
    )
    console.log("About page data received:", data ? "Success" : "No data")
    return data
  } catch (error) {
    console.error("Error fetching about page data:", error)
    return null
  }
}

export default async function AboutPage() {
  const data = await getAboutPageData()

  // Debug logging
  console.log("About page render - Data available:", !!data)
  console.log("About page render - Hero title:", data?.heroTitle)
  console.log("About page render - Has hero image:", !!data?.heroImage)

  if (!data) {
    // Show error state instead of loading state
    return (
      <div className="min-h-screen">
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">No About Page Data Found</h2>
              <p className="text-lg text-neutral-600 mb-4">
                Please create an "About Page" document in Sanity Studio to see content here.
              </p>
              <div className="mt-8 p-6 bg-neutral-100 rounded-lg">
                <p className="text-sm text-neutral-500">
                  Debug: No data returned from Sanity query for 'aboutPage' document type.
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  Check your Sanity configuration and ensure the document exists.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const heroImageUrl = data.heroImage ? urlFor(data.heroImage).url() : "/placeholder.svg?height=1080&width=1920"

  // Pass data to client component for animations
  return <AboutPageClient data={data} heroImageUrl={heroImageUrl} />
}
