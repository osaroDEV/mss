import { Star, Quote } from "lucide-react"
import { client } from "@/lib/sanity"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"

interface Testimonial {
  _id: string
  content: string
  author: string
  position: string
  rating: number
  image?: {
    asset: {
      _ref: string
    }
    alt: string
  }
  featured: boolean
  order?: number
}

async function getTestimonials(): Promise<Testimonial[]> {
  const query = `
    *[_type == "testimonial"] | order(order asc, _createdAt desc) {
      _id,
      content,
      author,
      position,
      rating,
      image {
        asset,
        alt
      },
      featured,
      order
    }
  `

  return await client.fetch(query)
}

export default async function Testimonials() {
  const testimonials = await getTestimonials()

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about our legal services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="bg-white rounded-lg shadow-sm p-8 relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-gold-400 mb-4" />

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold-400 fill-current" />
                ))}
              </div>

              <p className="text-neutral-600 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>

              <div className="border-t border-neutral-100 pt-4">
                <div className="flex items-center gap-3">
                  {testimonial.image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(testimonial.image).width(48).height(48).url() || "/placeholder.svg"}
                        alt={testimonial.image.alt || testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-primary-800">{testimonial.author}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
