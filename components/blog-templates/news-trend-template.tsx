import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, TrendingUp, Zap, BarChart3, Users } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface NewsTrendTemplateProps {
  post: BlogPost
}

export function NewsTrendTemplate({ post }: NewsTrendTemplateProps) {
  const newsData = post.typeSpecificData?.newsTrend
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                <Calendar className="size-4" />
                <time dateTime={post.date}>{post.date}</time>
                <span className="text-muted-foreground/40">•</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="mb-6 font-heading text-5xl font-bold leading-[1.1] tracking-tight lg:text-6xl xl:text-7xl">
                {post.title}
              </h1>

              <p className="mb-8 text-xl leading-relaxed text-muted-foreground lg:text-2xl">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span>Read the full analysis</span>
                <ArrowRight className="size-4" />
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
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

          {/* Introduction */}
          {newsData?.introduction && newsData.introduction.length > 0 && (
            <div className="mb-16 space-y-6 text-lg leading-relaxed lg:text-xl">
              {newsData.introduction.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-foreground" : "text-muted-foreground"}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Pull Quote */}
          {newsData?.pullQuote && (
            <blockquote className="my-16 border-l-4 border-foreground py-8 pl-8 pr-6">
              <p className="mb-4 text-2xl font-medium leading-snug text-foreground lg:text-3xl">
                "{newsData.pullQuote.text}"
              </p>
              <cite className="text-base text-muted-foreground">
                — {newsData.pullQuote.attribution}
              </cite>
            </blockquote>
          )}

          {/* Key Insights */}
          {newsData?.keyInsights && newsData.keyInsights.length > 0 && (
            <div className="mb-20">
              <h2 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">The Driving Forces</h2>
              <div className="space-y-10 text-lg leading-relaxed">
                {newsData.keyInsights.map((insight, index) => {
                  const IconComponent = 
                    insight.icon === 'Zap' ? Zap :
                    insight.icon === 'BarChart3' ? BarChart3 :
                    insight.icon === 'Users' ? Users :
                    TrendingUp

                  return (
                    <div key={index} className="rounded-xl border border-border/40 bg-muted/30 p-8">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-foreground">
                          <IconComponent className="size-5 text-background" />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground">{insight.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{insight.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Industry Stats */}
          {newsData?.industryStats && newsData.industryStats.length > 0 && (
            <div className="mb-20 rounded-2xl bg-muted/40 p-8 lg:p-12">
              <h3 className="mb-4 text-2xl font-bold text-foreground">Adoption by Industry</h3>
              <p className="mb-10 text-lg text-muted-foreground">
                Adoption rates vary significantly by sector, reflecting differences in data maturity, regulatory environments, and competitive intensity.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {newsData.industryStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-background p-6">
                    <div>
                      <span className="text-lg font-medium text-foreground">{stat.industry}</span>
                      <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                    </div>
                    <span className="text-3xl font-bold text-foreground">{stat.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Case Studies */}
          {newsData?.caseStudies && newsData.caseStudies.length > 0 && (
            <div className="mb-20">
              <h2 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">Real-World Transformation</h2>
              <div className="space-y-8">
                {newsData.caseStudies.map((caseStudy, index) => (
                  <div key={index} className="rounded-xl border border-border/40 p-8">
                    <h4 className="mb-3 text-xl font-semibold text-foreground">
                      {caseStudy.title}
                    </h4>
                    <p className="mb-4 text-muted-foreground">{caseStudy.description}</p>
                    <div className="flex gap-6 text-sm">
                      {caseStudy.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex}>
                          <span className="font-semibold text-foreground">{metric.value}</span>
                          <span className="text-muted-foreground"> {metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Perspectives */}
          {newsData?.expertPerspectives && newsData.expertPerspectives.length > 0 && (
            <div className="mb-20">
              <h2 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">Expert Perspectives</h2>
              <div className="space-y-8">
                {newsData.expertPerspectives.map((expert, index) => (
                  <div key={index} className="rounded-xl bg-muted/30 p-8">
                    <p className="mb-4 text-xl italic leading-relaxed text-foreground">
                      "{expert.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-foreground/10" />
                      <div>
                        <p className="font-semibold text-foreground">{expert.name}</p>
                        <p className="text-sm text-muted-foreground">{expert.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Looking Forward */}
          {newsData?.lookingForward && newsData.lookingForward.length > 0 && (
            <div className="mb-16 space-y-6 text-lg leading-relaxed">
              <h2 className="mb-8 text-3xl font-bold text-foreground lg:text-4xl">What's Next: The Road Ahead</h2>
              {newsData.lookingForward.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">{paragraph}</p>
              ))}
            </div>
          )}

          {/* Key Challenges */}
          {newsData?.keyChallenges && newsData.keyChallenges.length > 0 && (
            <div className="mb-16 rounded-2xl bg-muted/40 p-8 lg:p-12">
              <h3 className="mb-6 text-2xl font-bold text-foreground">Key Challenges Ahead</h3>
              <ul className="space-y-4 text-lg">
                {newsData.keyChallenges.map((challenge, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="mt-1 text-foreground">•</span>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{challenge.title}:</strong> {challenge.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Closing Thoughts */}
          {newsData?.closingThoughts && newsData.closingThoughts.length > 0 && (
            <div className="mt-20 border-t border-border/40 pt-12">
              {newsData.closingThoughts.map((paragraph, index) => (
                <p key={index} className="mb-6 text-xl leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
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
