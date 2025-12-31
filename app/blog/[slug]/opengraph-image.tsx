import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog-data'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'Blog post hero image'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post?.image) {
    return new Response(null, { status: 404 })
  }

  try {
    // Read the local hero image file from public directory
    const imagePath = join(process.cwd(), 'public', post.image)
    const imageBuffer = await readFile(imagePath)

    // Serve the actual image file
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving hero image:', error)
    return new Response(null, { status: 404 })
  }
}
