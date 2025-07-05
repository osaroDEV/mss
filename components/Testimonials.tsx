import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    content: "Michael Stevens Solicitors provided exceptional guidance during our company acquisition. Their expertise in corporate law and attention to detail made a complex process seamless.",
    author: "Sarah Johnson",
    position: "CEO, Johnson & Associates",
    rating: 5
  },
  {
    id: 2,
    content: "The employment law team helped us navigate a difficult workplace dispute with professionalism and skill. Highly recommend their services.",
    author: "David Chen",
    position: "HR Director, TechFlow Ltd",
    rating: 5
  },
  {
    id: 3,
    content: "Outstanding commercial property expertise. They handled our office relocation and lease negotiations flawlessly, saving us significant costs.",
    author: "Emma Thompson",
    position: "Operations Manager, Creative Solutions",
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our legal services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-lg shadow-sm p-8 relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-gold-400 mb-4" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold-400 fill-current" />
                ))}
              </div>
              
              <p className="text-neutral-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-neutral-100 pt-4">
                <div className="font-semibold text-primary-800">
                  {testimonial.author}
                </div>
                <div className="text-sm text-neutral-500">
                  {testimonial.position}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}