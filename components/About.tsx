import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
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
        {/* Debug info */}
        {/* <div className="mb-8 p-4 bg-green-100 rounded-lg">
          <p className="text-sm text-green-700">
            ✅ Data successfully fetched from Sanity!
          </p>
          <p className="text-xs text-green-600 mt-1">
            Title: {data.title} | Achievements: {data.achievements?.length || 0} | Introduction blocks: {data.introduction?.length || 0}
          </p>
          <p className="text-xs text-green-600 mt-1">
            Team Image: {data.teamImage ? '✅' : '❌'} | Success Rate: {data.successRate ? '✅' : '❌'}
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              {data.title}
            </h2>
            
            {/* {data.subtitle && (
              <p className="text-xl text-neutral-500 mb-6">
                {data.subtitle}
              </p>
            )} */}
            
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <p className="text-red-500">No achievements found in Sanity</p>
            )}
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
            
            {/* Success Rate Badge */}
            {data.successRate ? (
              <div className="absolute -bottom-4 -right-4 bg-gold-500 rounded-lg p-6 shadow-lg">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">{data.successRate.percentage}%</div>
                  <div className="text-sm">{data.successRate.label}</div>
                </div>
              </div>
            ) : (
              <div className="absolute -bottom-4 -right-4 bg-red-500 rounded-lg p-6 shadow-lg">
                <div className="text-white text-center">
                  <div className="text-sm">No Success Rate</div>
                  <div className="text-xs">in Sanity</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}