import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { getPostBySlug, getRelatedPosts, blogPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"

export async function generateStaticParams() {
  return blogPosts
    .filter(p => p.contentType === 'listicle')
    .map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | ${siteConfig.brand.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [post.image],
    },
  }
}

export default async function ListiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || post.contentType !== 'listicle') {
    notFound()
  }

  const listItems = post.typeSpecificData?.listItems || []
  const relatedPosts = getRelatedPosts(post.id)
  const currentIndex = blogPosts.findIndex((p) => p.id === post.id)
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <div className="min-h-screen">
      <BlogHeader />

      {/* Hero Banner */}
      <section className="border-b border-border bg-background py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="default" className="mb-4">
            📋 LISTICLE
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl text-balance">
            {post.title}
          </h1>
          <p className="mb-6 text-lg text-muted-foreground">
            {listItems.length > 0 ? `${listItems.length} items ranked and explained` : 'A comprehensive ranked list'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>{post.readTime}</span>
            </div>
            <span>•</span>
            <span>By {post.author.name}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Social Share Buttons */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <img
                src={post.author.image || "/placeholder.svg"}
                alt={post.author.name}
                className="size-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-foreground">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.role}</div>
              </div>
            </div>

            <SocialShareButtons
              url={`${siteConfig.brand.url}/blog/${post.slug}`}
              title={post.title}
              description={post.excerpt}
            />
          </div>

          {/* Introduction */}
          {post.excerpt && (
            <Card className="mb-8 border-l-4 border-primary bg-primary/5">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          )}

          {/* List Items */}
          {listItems.length > 0 ? (
            <div className="space-y-8">
              {listItems.map((item, index) => (
                <Card key={index} className="overflow-hidden border-2 border-primary/20 transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Number Badge */}
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground shadow-lg">
                          {item.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="mb-3 text-2xl font-bold text-foreground">
                          {item.heading}
                        </h2>
                        <p className="mb-4 text-muted-foreground leading-relaxed">
                          {item.content}
                        </p>
                        
                        {/* Item Image */}
                        {item.image && (
                          <div className="mt-4 rounded-lg overflow-hidden border border-border">
                            <img
                              src="/placeholder.svg"
                              alt={item.image}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-2 bg-muted text-xs text-muted-foreground text-center">
                              {item.image}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Fallback to regular content */
            <div className="prose prose-lg max-w-none">
              <div
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          )}

          {/* Tags */}
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
            <span className="text-sm font-medium text-foreground">Tags:</span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author Bio */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={post.author.image || "/placeholder.svg"}
                  alt={post.author.name}
                  className="size-20 shrink-0 rounded-full object-cover"
                />
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">About {post.author.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{post.author.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.author.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-muted py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-foreground">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex flex-col flex-1 p-5">
                      <Badge variant="secondary" className="mb-3 w-fit">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="mb-3 text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {relatedPost.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read Article <ArrowRight className="size-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Previous/Next Navigation */}
      <section className="border-t border-border bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {previousPost ? (
              <Link href={`/blog/${previousPost.slug}`} className="group">
                <Card className="transition-shadow hover:shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronLeft className="size-4" />
                      <span>Previous Article</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {previousPost.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group">
                <Card className="transition-shadow hover:shadow-md h-full">
                  <CardContent className="p-6 text-right">
                    <div className="mb-2 flex items-center justify-end gap-2 text-sm text-muted-foreground">
                      <span>Next Article</span>
                      <ChevronRight className="size-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      <BlogFooter />
    </div>
  )
}
