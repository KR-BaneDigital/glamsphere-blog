import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog-data'

export const runtime = 'edge'
export const alt = 'Blog post image'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post?.image) {
    return new Response(null, { status: 404 })
  }
  
  // Redirect to the Amazon hero image (your EXISTING image)
  return Response.redirect(post.image, 307)
}
