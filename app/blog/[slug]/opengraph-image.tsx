import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog-data'
import { siteConfig } from '@/lib/config'

export const runtime = 'edge'
export const alt = 'Blog post hero image'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js 15+
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return new Response(null, { status: 404 })
  }

  // Generate image URL - use absolute URL for og:image
  const imageUrl = `${siteConfig.brand.url}${post.image}`

  // Return ImageResponse that renders the image
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
        }}
      >
        <img
          src={imageUrl}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
