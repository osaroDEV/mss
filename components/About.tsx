import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'

// Define the types for our Sanity data
interface Achievement {
  title: string
  description: string
  icon: string
}

// Block content structure from Sanity
interface BlockContent {
  _type: 'block'
  children: Array<{
    text: string
    _type: 'span'
  }>
  style?: string
}

interface AboutPageData {
  title: string
  subtitle?: string
    teamImage?: {
        asset: any
        alt: string
  }
  introduction: BlockContent[]
  achievements: Achievement[]
  
  successRate?: {
    percentage: number
    label: string
  }
}

// Regulatory bodies configuration
const REGULATORY_BODIES = {
  sra: {
    name: 'Solicitors Regulation Authority',
    url: 'https://www.sra.org.uk/consumers/register/organisation/?sraNumber=625253&prevSearchText=michael%20stevens%20solicitors&prevSearchFilter=',
    logoUrl: '/images/sra-logo.png', // Replace with your actual logo path
    number: '[Your SRA Number]',
  },
  ico: {
    name: "Information Commissioner's Office",
    url: 'https://ico.org.uk/ESDWebPages/Entry/ZA050265',
    logoUrl: '/images/ico-blue.jpg', // Replace with your actual logo path
    number: '[Your ICO Registration Number]',
  },
  lawSociety: {
    name: 'The Law Society of England & Wales',
    url: 'https://solicitors.lawsociety.org.uk/search/results?Pro=True&Type=0&Name=MICHAEL_STEVENS_SOLICITORS',
    logoUrl: '/images/tls-white.png', // Replace with your actual logo path
    number: 'Member of The Law Society',
  },
};

// Function to get the Lucide icon component by name
function getIconComponent(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Award
  return IconComponent
}

// Function to extract text from block content
function extractTextFromBlock(block: BlockContent): string {
  return block.children?.map(child => child.text).join('') || ''
}

async function getAboutPageData(): Promise<AboutPageData | null> {
  const query = `*[_type == "aboutPage"][0]{
    title, achievements, introduction, teamImage, successRate
    }`

  try {
    const data = await client.fetch(query)
    console.log('Raw Sanity data:', JSON.stringify(data, null, 2))
    return data || null
  } catch (error) {
    console.error('Error fetching about page data:', error)
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
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
              No About Page Data Found
            </h2>
            <p className="text-lg text-neutral-600">
              Please create an About Page document in Sanity Studio to see content here.
            </p>
            <div className="mt-8 p-6 bg-neutral-100 rounded-lg">
              <p className="text-sm text-neutral-500">
                Debug: No data returned from Sanity query for aboutPage document type.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              {data.title}
            </h2>
            
            {/* Introduction Paragraphs */}
            {data.introduction?.length > 0 ? (
              data.introduction.map((block, index) => {
                const text = extractTextFromBlock(block)
                const isLarge = index === 0 // Make first paragraph large
                
                return (
                  <p 
                    key={index}
                    className='md:text-xl text-neutral-600 mb-8 leading-relaxed'
                  >
                    {text}
                  </p>
                )
              })
            ) : (
              <p className="text-red-500 mb-8">No introduction paragraphs found in Sanity</p>
            )}
            
            {/* Achievements Grid */}
            {data.achievements?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {data.achievements.map((achievement, index) => {
                  const IconComponent = getIconComponent(achievement.icon)
                  return (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary-100 rounded-lg p-3 mr-4">
                        <IconComponent className="h-6 w-6 text-primary-700" />
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
            ) : (
              <p className="text-red-500 mb-8">No achievements found in Sanity</p>
            )}

            {/* Regulatory Information */}
            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
              <h3 className="font-semibold text-primary-800 mb-6 text-lg">Regulatory Information</h3>
              <div className="space-y-6 text-sm text-neutral-600">
                {/* SRA */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <Link 
                      href={REGULATORY_BODIES.sra.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={REGULATORY_BODIES.sra.logoUrl}
                        alt="SRA Logo"
                        width={60}
                        height={40}
                        className="object-contain"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link 
                      href={REGULATORY_BODIES.sra.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-neutral-800 hover:text-primary-600 transition-colors"
                    >
                      {REGULATORY_BODIES.sra.name}
                    </Link>
                  </div>
                </div>

                {/* ICO */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <Link 
                      href={REGULATORY_BODIES.ico.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={REGULATORY_BODIES.ico.logoUrl}
                        alt="ICO Logo"
                        width={60}
                        height={40}
                        className="object-contain"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link 
                      href={REGULATORY_BODIES.ico.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-neutral-800 hover:text-primary-600 transition-colors"
                    >
                      {REGULATORY_BODIES.ico.name}
                    </Link>
                  </div>
                </div>

                {/* Law Society */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <Link 
                      href={REGULATORY_BODIES.lawSociety.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={REGULATORY_BODIES.lawSociety.logoUrl}
                        alt="Law Society Logo"
                        width={60}
                        height={80}
                        className="object-contain"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link 
                      href={REGULATORY_BODIES.lawSociety.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-neutral-800 hover:text-primary-600 transition-colors"
                    >
                      {REGULATORY_BODIES.lawSociety.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            {data.teamImage?.asset ? (
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={urlFor(data.teamImage.asset._ref).url()}
                  alt={data.teamImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-neutral-500">
                  <LucideIcons.Users className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No Team Image in Sanity</p>
                  <p className="text-sm">Add teamImage field to see content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}