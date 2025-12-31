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
import { ListicleTemplate } from "@/components/blog-templates/listicle-template"
import { FAQTemplate } from "@/components/blog-templates/faq-template"
import { HowToGuideTemplate } from "@/components/blog-templates/how-to-guide-template"
import { CaseStudyTemplate } from "@/components/blog-templates/case-study-template"
import { TutorialTemplate } from "@/components/blog-templates/tutorial-template"
import { ThoughtLeadershipTemplate } from "@/components/blog-templates/thought-leadership-template"
import { NewsTrendTemplate } from "@/components/blog-templates/news-trend-template"
import { ProductReviewTemplate } from "@/components/blog-templates/product-review-template"
import { ProductComparisonTemplate } from "@/components/blog-templates/product-comparison-template"
import { IndustryAnalysisTemplate } from "@/components/blog-templates/industry-analysis-template"
import { CompetitorRankingTemplate } from "@/components/blog-templates/competitor-ranking-template"
import { DebateTemplate } from "@/components/blog-templates/debate-template"
import { MinimalEssayTemplate } from "@/components/blog-templates/minimal-essay-template"
import { ScorecardTemplate } from "@/components/blog-templates/scorecard-template"
import { CommentaryTemplate } from "@/components/blog-templates/commentary-template"
import { AffiliateProductReviewTemplate } from "@/components/blog-templates/affiliate-product-review-template"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  // Use post's hero image for social media metadata
  const imageUrl = `${siteConfig.brand.url}${post.image}`

  return {
    title: `${post.title} | ${siteConfig.brand.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ 
        url: imageUrl,
        width: 1200,
        height: 630,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Route to appropriate template based on contentType
  if (post.contentType === 'listicle') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <ListicleTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'faq') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <FAQTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'how-to-guide') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <HowToGuideTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'case-study') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <CaseStudyTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'tutorial') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <TutorialTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'thought-leadership') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <ThoughtLeadershipTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'news-trend') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <NewsTrendTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'product-review') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <ProductReviewTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'product-comparison') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <ProductComparisonTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'industry-analysis') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <IndustryAnalysisTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'competitor-ranking') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <CompetitorRankingTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'debate') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <DebateTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'minimal-essay') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <MinimalEssayTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'scorecard') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <ScorecardTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'commentary') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <CommentaryTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  if (post.contentType === 'affiliate-product-review') {
    return (
      <div className="min-h-screen">
        <BlogHeader />
        <AffiliateProductReviewTemplate post={post} />
        <BlogFooter />
      </div>
    )
  }

  // Default template for all other content types
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
          <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl text-balance">
            {post.title}
          </h1>
          <Badge variant="secondary" className="mb-6">
            {post.category}
          </Badge>
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

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split("\n")
                  .map((line) => {
                    if (line.startsWith("# ")) {
                      return `<h1 class="text-3xl font-bold text-foreground mt-8 mb-4">${line.slice(2)}</h1>`
                    } else if (line.startsWith("## ")) {
                      return `<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">${line.slice(3)}</h2>`
                    } else if (line.startsWith("### ")) {
                      return `<h3 class="text-xl font-semibold text-foreground mt-6 mb-3">${line.slice(4)}</h3>`
                    } else if (line.startsWith("**") && line.endsWith("**")) {
                      return `<p class="font-semibold text-foreground my-4">${line.slice(2, -2)}</p>`
                    } else if (line.startsWith("- ")) {
                      return `<li class="text-muted-foreground ml-6 my-2">${line.slice(2)}</li>`
                    } else if (line.trim() === "") {
                      return ""
                    } else {
                      return `<p class="text-muted-foreground my-4 leading-relaxed">${line}</p>`
                    }
                  })
                  .join(""),
              }}
            />
          </div>

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

          {/* Comments Placeholder */}
          <div className="mt-12 border-t border-border pt-8">
            <h3 className="mb-6 text-2xl font-bold text-foreground">Comments</h3>
            <Card className="bg-muted">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Comments section coming soon. Stay tuned!</p>
              </CardContent>
            </Card>
          </div>
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
