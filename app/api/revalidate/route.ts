// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { _type, slug, _id } = body

    console.log('Webhook received:', { _type, slug, _id })

    // Define revalidation strategy based on document type
    switch (_type) {
      case 'aboutPage':
        revalidatePath('/about')
        revalidateTag('aboutPage')
        break

      case 'homePage':
        revalidatePath('/')
        revalidateTag('homePage')
        break

      case 'page':
        // Handle dynamic pages with slugs
        if (slug?.current) {
          revalidatePath(`/${slug.current}`)
          revalidateTag(`page-${slug.current}`)
        }
        // Also revalidate any pages listing (if you have a pages index)
        revalidatePath('/pages')
        break

      case 'post':
      case 'blogPost':
        // Individual blog post
        if (slug?.current) {
          revalidatePath(`/blog/${slug.current}`)
          revalidateTag(`post-${slug.current}`)
        }
        // Blog listing pages
        revalidatePath('/blog')
        revalidateTag('blog-posts')
        break

      case 'service':
        // Individual service page
        if (slug?.current) {
          revalidatePath(`/services/${slug.current}`)
          revalidateTag(`service-${slug.current}`)
        }
        // Services listing
        revalidatePath('/services')
        revalidateTag('services')
        break

      case 'product':
        if (slug?.current) {
          revalidatePath(`/products/${slug.current}`)
          revalidateTag(`product-${slug.current}`)
        }
        revalidatePath('/products')
        revalidateTag('products')
        break

      case 'team':
      case 'teamMember':
        if (slug?.current) {
          revalidatePath(`/team/${slug.current}`)
        }
        revalidatePath('/team')
        revalidatePath('/about') // If team members appear on about page
        revalidateTag('team')
        break

      case 'testimonial':
        // Testimonials might appear on multiple pages
        revalidatePath('/')
        revalidatePath('/about')
        revalidatePath('/testimonials')
        revalidateTag('testimonials')
        break

      case 'faq':
        revalidatePath('/faq')
        revalidateTag('faq')
        break

      case 'contactInfo':
      case 'companyInfo':
        // Global data that might appear on multiple pages
        revalidatePath('/')
        revalidatePath('/about')
        revalidatePath('/contact')
        revalidateTag('global-data')
        break

      case 'navigation':
      case 'menu':
        // Navigation changes affect all pages
        revalidatePath('/', 'layout') // Revalidate layout
        revalidateTag('navigation')
        break

      case 'siteSettings':
      case 'settings':
        // Site-wide settings affect everything
        revalidatePath('/', 'layout')
        revalidateTag('settings')
        break

      default:
        // Fallback for unknown document types
        console.log(`Unknown document type: ${_type}, revalidating homepage`)
        revalidatePath('/')
        revalidateTag('fallback')
        break
    }

    return NextResponse.json({ 
      revalidated: true, 
      type: _type,
      slug: slug?.current || null,
      timestamp: new Date().toISOString(),
      message: `Successfully revalidated ${_type}`
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { 
        message: 'Error revalidating', 
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}

// Optional: Handle GET requests for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Revalidation webhook endpoint is active',
    timestamp: new Date().toISOString()
  })
}