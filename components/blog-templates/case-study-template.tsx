import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, Star, Quote, CheckCircle2 } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface CaseStudyTemplateProps {
  post: BlogPost
}

export function CaseStudyTemplate({ post }: CaseStudyTemplateProps) {
  const caseStudy = post.typeSpecificData?.caseStudy
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              📊 CASE STUDY
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

          {/* Featured Testimonial Card */}
          {caseStudy?.testimonial && (
            <section className="mb-12 border-b border-border pb-12">
              <Card className="overflow-hidden border-2 shadow-xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex flex-col gap-6">
                    {/* Header with Avatar and Info */}
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      <img
                        src={caseStudy.testimonial.image || "/placeholder.svg"}
                        alt={caseStudy.testimonial.name}
                        className="size-24 shrink-0 rounded-full object-cover sm:size-28"
                      />
                      <div className="flex-1">
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{caseStudy.testimonial.name}</h2>
                            <p className="text-base text-muted-foreground">{caseStudy.testimonial.role}</p>
                            <p className="text-base text-muted-foreground">{caseStudy.testimonial.company}</p>
                          </div>
                          {/* Rating */}
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="size-6 fill-foreground text-foreground" />
                            ))}
                          </div>
                        </div>

                        {/* Quote */}
                        <div className="relative">
                          <Quote className="absolute -left-2 -top-2 size-10 text-accent opacity-40" />
                          <blockquote className="pl-8 text-lg leading-relaxed text-foreground sm:text-xl">
                            {caseStudy.testimonial.quote}
                          </blockquote>
                        </div>
                      </div>
                    </div>

                    {/* Key Result Highlight */}
                    {caseStudy.testimonial.keyResult && (
                      <div className="rounded-lg bg-foreground/5 p-6 border-l-4 border-foreground">
                        <div className="flex gap-4">
                          <Star className="size-6 shrink-0 text-foreground mt-0.5 fill-foreground" />
                          <div>
                            <p className="font-semibold text-foreground mb-2 text-lg">Key Result</p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                              {caseStudy.testimonial.keyResult}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timeframe */}
                    {caseStudy.testimonial.timeframe && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-6">
                        <Calendar className="size-4" />
                        <span>{caseStudy.testimonial.timeframe}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Challenge Section */}
          {caseStudy?.challenge && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{caseStudy.challenge.title}</h2>
              {caseStudy.challenge.paragraphs?.map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          )}

          {/* Problem Details */}
          {caseStudy?.problemDetails && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{caseStudy.problemDetails.title}</h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {caseStudy.problemDetails.intro}
              </p>

              <Card className="mb-6 bg-accent/30 border-2">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground">{caseStudy.problemDetails.listTitle}</h3>
                  <ul className="space-y-3">
                    {caseStudy.problemDetails.items?.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-foreground mt-1" />
                        <div>
                          <strong className="text-foreground">{item.name}:</strong>{" "}
                          <span className="text-muted-foreground">{item.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {caseStudy.problemDetails.conclusion && (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {caseStudy.problemDetails.conclusion}
                </p>
              )}
            </section>
          )}

          {/* Solution Section */}
          {caseStudy?.solution && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{caseStudy.solution.title}</h2>
              {caseStudy.solution.paragraphs?.map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}

              {caseStudy.solution.approaches && (
                <div className="space-y-4 mt-6">
                  {caseStudy.solution.approaches.map((approach, index) => (
                    <Card key={index} className="bg-foreground/5">
                      <CardContent className="p-6">
                        <h3 className="mb-2 text-lg font-bold text-foreground">{approach.name}</h3>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {approach.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Results Timeline */}
          {caseStudy?.resultsTimeline && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{caseStudy.resultsTimeline.title}</h2>

              <div className="space-y-6">
                {caseStudy.resultsTimeline.milestones?.map((milestone, index) => (
                  <Card key={index} className="border-l-4 border-foreground">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-foreground">{milestone.timeframe}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Final Results */}
          {caseStudy?.finalResults && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{caseStudy.finalResults.title}</h2>
              {caseStudy.finalResults.paragraphs?.map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
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
