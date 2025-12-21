import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, CheckCircle2, ChevronRight as ChevronRightIcon } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface ListicleTemplateProps {
  post: BlogPost
}

export function ListicleTemplate({ post }: ListicleTemplateProps) {
  const listItems = post.typeSpecificData?.listItems || []
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section - COMPACT */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              📋 LISTICLE
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              {post.title}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl text-pretty max-w-3xl mx-auto leading-relaxed">
              {post.excerpt}
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
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Author + Social Share */}
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

          {/* Featured Image */}
          <div className="mb-8">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Introduction Section */}
          <div className="mb-12 prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </div>

          {/* List Items - NO IMAGES */}
          {listItems.length > 0 ? (
            <div className="space-y-16">
              {listItems.map((item, index) => (
                <article key={index} className="scroll-mt-24" id={`step-${index + 1}`}>
                  <Card className="overflow-hidden border-2 transition-shadow hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Number Badge - Vertical Sidebar */}
                        <div className="flex items-center justify-center bg-foreground p-8 lg:w-32 lg:flex-col">
                          <span className="text-5xl font-bold text-background lg:text-6xl">
                            {item.number.toString().padStart(2, '0')}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 lg:p-10">
                          <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl text-balance">
                            {item.heading}
                          </h2>
                          <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {item.content}
                          </p>

                          {/* Key Insight Callout */}
                          {item.insight && (
                            <div className="mb-6 rounded-lg bg-accent/50 p-5 border-l-4 border-foreground">
                              <div className="flex gap-3">
                                <CheckCircle2 className="size-5 shrink-0 text-foreground mt-0.5" />
                                <p className="text-sm font-medium text-foreground leading-relaxed">
                                  {item.insight}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Action Steps */}
                          {item.tips && item.tips.length > 0 && (
                            <div>
                              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                                Action Steps
                              </h3>
                              <ul className="space-y-2">
                                {item.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                    <ChevronRightIcon className="size-4 shrink-0 text-foreground mt-0.5" />
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </article>
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

          {/* Conclusion Section */}
          <section className="mt-16 mb-12 border-y border-border bg-accent/30 p-8 rounded-lg">
            <h2 className="mb-4 text-2xl font-bold text-foreground text-balance">
              Your Journey Starts Now
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base leading-relaxed text-muted-foreground">
                Implementing these strategies can transform your approach and drive meaningful results. Start with the steps that resonate most with you, and gradually incorporate others as they become comfortable. The goal isn't perfection—it's progress toward better outcomes.
              </p>
            </div>
          </section>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 border-t border-border pt-6">
            <span className="text-sm font-medium text-foreground">Tags:</span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
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
                      <Badge className="bg-secondary/20 text-foreground border border-secondary/40 mb-3 w-fit text-xs">
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
    </>
  )
}
