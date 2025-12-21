import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, TrendingUp, BarChart3, Globe, PieChart, Users } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface IndustryAnalysisTemplateProps {
  post: BlogPost
}

export function IndustryAnalysisTemplate({ post }: IndustryAnalysisTemplateProps) {
  const analysisData = post.typeSpecificData?.industryAnalysis
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              📈 INDUSTRY ANALYSIS
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
          <div className="mb-16">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Introduction */}
          {analysisData?.introduction && analysisData.introduction.length > 0 && (
            <div className="text-lg leading-relaxed space-y-6 mb-20">
              {analysisData.introduction.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-2xl leading-relaxed font-light text-balance" : "text-muted-foreground"}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Key Stats Grid */}
          {analysisData?.keyStats && analysisData.keyStats.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {analysisData.keyStats.map((stat, index) => {
                const IconComponent = 
                  stat.icon === 'TrendingUp' ? TrendingUp :
                  stat.icon === 'BarChart3' ? BarChart3 :
                  stat.icon === 'Globe' ? Globe :
                  stat.icon === 'Users' ? Users :
                  TrendingUp

                return (
                  <div key={index} className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                    <IconComponent className="size-10 text-primary mb-4" />
                    <div className="text-4xl font-bold font-heading mb-2">{stat.value}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Analysis Sections */}
          {analysisData?.sections && analysisData.sections.length > 0 && (
            <div>
              {analysisData.sections.map((section, sectionIndex) => {
                const isLastSection = sectionIndex === analysisData.sections!.length - 1

                return (
                  <div key={sectionIndex}>
                    <section className="mb-20">
                      {/* Section Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="size-2 rounded-full bg-primary" />
                        <h2 className="font-heading text-3xl font-bold tracking-tight">{section.title}</h2>
                      </div>

                      {/* Paragraphs */}
                      <div className="space-y-6 text-foreground/80 leading-relaxed">
                        {section.paragraphs.map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}

                        {/* Pull Quote */}
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
                        {section.comparisonGrid && (
                          <div className="grid md:grid-cols-2 gap-4 my-8">
                            <div className="p-6 bg-muted rounded-xl">
                              <h4 className="font-semibold mb-3">{section.comparisonGrid.leftSide.title}</h4>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {section.comparisonGrid.leftSide.items.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
                              <h4 className="font-semibold mb-3">{section.comparisonGrid.rightSide.title}</h4>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {section.comparisonGrid.rightSide.items.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Data Visualization */}
                        {section.dataVisualization && (
                          <div className="my-8 p-8 bg-gradient-to-br from-accent/40 to-accent/10 rounded-2xl">
                            {section.dataVisualization.icon && (
                              <PieChart className="size-8 text-primary mb-4" />
                            )}
                            <h3 className="font-heading text-xl font-bold mb-3">{section.dataVisualization.title}</h3>
                            {section.dataVisualization.description && (
                              <p className="text-muted-foreground mb-4">{section.dataVisualization.description}</p>
                            )}
                            <div className="space-y-3">
                              {section.dataVisualization.data.map((item, i) => (
                                <div key={i}>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">{item.label}</span>
                                    <span className="text-sm font-medium">{item.value}</span>
                                  </div>
                                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-primary" 
                                      style={{ width: `${item.percentage}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Callout */}
                        {section.callout && (
                          <div className="my-8 p-8 bg-gradient-to-br from-accent/40 to-accent/10 rounded-2xl">
                            {section.callout.icon && (
                              <Users className="size-8 text-primary mb-4" />
                            )}
                            <h3 className="font-heading text-xl font-bold mb-3">{section.callout.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {section.callout.description}
                            </p>
                            {section.callout.metrics && section.callout.metrics.length > 0 && (
                              <div className="grid grid-cols-3 gap-4 text-center">
                                {section.callout.metrics.map((metric, i) => (
                                  <div key={i}>
                                    <div className="text-2xl font-bold">{metric.value}</div>
                                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Decorative Divider (except after last section) */}
                    {!isLastSection && (
                      <div className="flex items-center gap-4 my-10">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                        <div className="size-2 rounded-full bg-primary" />
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Strategic Implications */}
          {analysisData?.strategicImplications && (
            <section className="mb-20">
              <h2 className="font-heading text-3xl font-bold mb-6">
                {analysisData.strategicImplications.title || 'Strategic Implications'}
              </h2>
              <div className="space-y-6">
                {analysisData.strategicImplications.paragraphs.map((paragraph, index) => (
                  <p key={index} className={`leading-relaxed ${index === 0 ? 'text-lg text-foreground/90' : 'text-lg text-foreground/90'}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Conclusion */}
          {analysisData?.conclusion && analysisData.conclusion.length > 0 && (
            <section className="mb-20">
              <div className="space-y-6 text-foreground/80 leading-relaxed">
                {analysisData.conclusion.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "text-xl font-light leading-relaxed" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
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
