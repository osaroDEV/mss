// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { _type, slug } = await request.json()

    // Log for debugging
    console.log('Webhook received:', { _type, slug })

    switch (_type) {
      case 'aboutPage':
        // Immediate revalidation when about page content changes
        revalidatePath('/about')
        revalidateTag('aboutPage')
        console.log('About page revalidated')
        break
      case 'page':
        revalidatePath(`/${slug?.current || ''}`)
        break
      case 'post':
        revalidatePath(`/blog/${slug?.current}`)
        revalidatePath('/blog')
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({ 
      revalidated: true, 
      type: _type,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating' }, 
      { status: 500 }
    )
  }
}