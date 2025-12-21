import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, Quote, Target, Lightbulb } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

// Emergency recovery deployment trigger: 2025-11-25 - All template files restored from commit 00897c4

interface ThoughtLeadershipTemplateProps {
  post: BlogPost
}

export function ThoughtLeadershipTemplate({ post }: ThoughtLeadershipTemplateProps) {
  const typeData = post.typeSpecificData
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              💭 Opinion
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

          {/* Opening Paragraph */}
          {typeData?.thoughtLeadership?.opening && (
            <div className="mb-8">
              <p className="text-lg text-foreground leading-relaxed">
                {typeData.thoughtLeadership.opening}
              </p>
            </div>
          )}

          {/* Key Statistics */}
          {typeData?.thoughtLeadership?.stats && typeData.thoughtLeadership.stats.length > 0 && (
            <div className="mb-12">
              <div className="grid gap-4 sm:grid-cols-3">
                {typeData.thoughtLeadership.stats.map((stat, index) => (
                  <div key={index} className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                    <div className="mb-2 text-4xl font-bold text-primary">{stat.value}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Essay Sections */}
          {typeData?.thoughtLeadership?.sections && typeData.thoughtLeadership.sections.length > 0 && (
            <div className="space-y-12 mb-12">
              {typeData.thoughtLeadership.sections.map((section, index) => {
                const isLastSection = index === typeData.thoughtLeadership!.sections!.length - 1
                return (
                <div key={index}>
                  {/* Section Header */}
                  {section.title && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="size-2 rounded-full bg-primary" />
                      <h2 className="font-heading text-3xl font-bold tracking-tight">{section.title}</h2>
                    </div>
                  )}

                  {/* Section Content */}
                  {section.paragraphs && section.paragraphs.length > 0 && (
                    <div className="space-y-6 text-foreground/80 leading-relaxed">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {/* Pull Quote - GREY background */}
                  {section.pullQuote && (
                    <div className="my-8 p-8 bg-muted rounded-xl border-l-4 border-primary">
                      <p className="text-xl italic font-light text-balance leading-relaxed mb-3">
                        "{section.pullQuote.text}"
                      </p>
                      {section.pullQuote.attribution && (
                        <p className="text-sm text-muted-foreground">— {section.pullQuote.attribution}</p>
                      )}
                    </div>
                  )}

                  {/* Comparison Grid */}
                  {section.comparison && (
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                      <div className="p-6 bg-muted rounded-xl">
                        <h4 className="font-semibold mb-3">{section.comparison.before.title}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {section.comparison.before.items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
                        <h4 className="font-semibold mb-3">{section.comparison.after.title}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {section.comparison.after.items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Callout - GREEN gradient */}
                  {section.callout && (
                    <div className="my-8 p-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/30">
                      <Lightbulb className="size-10 text-primary mb-4" />
                      <h3 className="font-heading text-xl font-bold mb-3">{section.callout.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{section.callout.content}</p>
                    </div>
                  )}

                  {/* Decorative Divider (except after last section) */}
                  {!isLastSection && (
                    <div className="flex items-center gap-4 my-10">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                      <div className="size-2 rounded-full bg-primary" />
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>
                  )}
                </div>
              )})}
            </div>
          )}

          {/* Conclusion */}
          {typeData?.thoughtLeadership?.conclusion && (
            <div className="mt-12 border-t border-border pt-8 pb-12">
              <p className="text-lg text-foreground leading-relaxed italic">
                {typeData.thoughtLeadership.conclusion}
              </p>
            </div>
          )}

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
