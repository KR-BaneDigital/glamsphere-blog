import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface HowToGuideTemplateProps {
  post: BlogPost
}

export function HowToGuideTemplate({ post }: HowToGuideTemplateProps) {
  const guideData = post.typeSpecificData?.howToGuide
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              📖 HOW-TO GUIDE
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

          {/* Introduction */}
          {guideData?.introduction && (
            <div className="mb-16">
              <p className="text-xl leading-relaxed text-foreground">
                {guideData.introduction}
              </p>
            </div>
          )}

          {/* Steps */}
          {guideData?.steps && guideData.steps.length > 0 && (
            <div className="space-y-20">
              {guideData.steps.map((step, index) => (
                <section key={index}>
                  <h2 className="mb-6 font-serif text-4xl font-normal text-foreground">
                    {step.title}
                  </h2>
                  <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Grid Layout - Cards */}
                  {step.layout === 'grid' && step.gridItems && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {step.gridItems.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="group rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
                        >
                          <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sequential Layout - Numbered Steps */}
                  {step.layout === 'sequential' && step.sequentialSteps && (
                    <div className="space-y-6">
                      {step.sequentialSteps.map((seqStep, seqIndex) => (
                        <div
                          key={seqIndex}
                          className={`border-l-2 ${
                            seqIndex === 0 ? 'border-primary' : 'border-muted'
                          } pl-6`}
                        >
                          <h3 className="mb-2 font-semibold text-foreground">{seqStep.title}</h3>
                          <p className="leading-relaxed text-muted-foreground">
                            {seqStep.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {/* Conclusion */}
          {guideData?.conclusion && (
            <div className="mt-20 border-t pt-12">
              <h2 className="mb-6 font-serif text-4xl font-normal text-foreground">
                Your Journey Continues
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {guideData.conclusion}
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 border-t border-border pt-6 mt-12">
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
