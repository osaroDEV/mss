import { Award, Users, Globe, Clock } from 'lucide-react'

const achievements = [
  {
    icon: Award,
    title: 'Award-Winning Firm',
    description: 'Recognized by leading legal directories for excellence in multiple practice areas.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our experienced solicitors bring decades of combined expertise to every case.'
  },
  {
    icon: Globe,
    title: 'Comprehensive Service',
    description: 'Full-service legal solutions for businesses and individuals across all sectors.'
  },
  {
    icon: Clock,
    title: '25+ Years',
    description: 'Over two decades of trusted legal advice and successful client outcomes.'
  }
]

export default function About() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              Why Choose Michael Stevens Solicitors?
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Since 1999, we have been providing exceptional legal services to businesses and individuals throughout London and beyond. Our commitment to excellence, combined with our deep understanding of the law and our clients&apos; needs, has made us one of the most trusted law firms in the region.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              We believe that great legal advice should be accessible, understandable, and tailored to your specific circumstances. Our team of experienced solicitors takes the time to understand your unique situation and provides practical, cost-effective solutions that protect your interests and achieve your objectives.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 rounded-lg p-3 mr-4">
                      <Icon className="h-6 w-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-neutral-500">
                <Users className="h-24 w-24 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Professional Team Photo</p>
                <p className="text-sm">Image placeholder</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 bg-gold-500 rounded-lg p-6 shadow-lg">
              <div className="text-white text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}