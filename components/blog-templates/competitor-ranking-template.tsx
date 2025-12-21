import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, TrendingUp, BarChart3, Globe, Users, Crown } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface CompetitorRankingTemplateProps {
  post: BlogPost
}

export function CompetitorRankingTemplate({ post }: CompetitorRankingTemplateProps) {
  const rankingData = post.typeSpecificData?.competitorRanking
  const relatedPosts = getRelatedPosts(post.id)

  if (!rankingData) return null

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              🏆 COMPETITOR RANKING
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
          {rankingData.introduction && rankingData.introduction.length > 0 && (
            <div className="text-lg leading-relaxed space-y-6 mb-20">
              {rankingData.introduction.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-2xl leading-relaxed font-light text-balance" : "text-muted-foreground"}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Market Stats */}
          {rankingData.marketStats && rankingData.marketStats.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {rankingData.marketStats.map((stat, index) => {
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

          {/* Market Share Visualization */}
          {rankingData.marketShare && (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-2 rounded-full bg-primary" />
                <h2 className="font-heading text-3xl font-bold tracking-tight">
                  {rankingData.marketShare.title || 'Market Share & Growth Dynamics'}
                </h2>
              </div>

              <div className="my-8 p-8 bg-muted/50 rounded-2xl">
                <h3 className="font-heading text-xl font-bold mb-6">Market Share Distribution</h3>
                <div className="space-y-4">
                  {rankingData.marketShare.providers.map((provider, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="text-sm font-bold">{provider.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{provider.growth}</span>
                        </div>
                        <span className="text-sm font-bold">{provider.percentage}</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${provider.barWidth}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Competitor Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {rankingData.competitors.map((competitor, index) => {
              const getBadgeClass = (color?: string) => {
                if (color === 'blue') return 'bg-blue-600'
                if (color === 'green') return 'bg-green-600'
                return 'bg-primary'
              }

              const getBorderClass = (color?: string) => {
                if (color === 'blue') return 'border-blue-500/20 from-blue-500/10 via-blue-500/5'
                if (color === 'green') return 'border-green-500/20 from-green-500/10 via-green-500/5'
                return 'border-primary/20 from-primary/10 via-primary/5'
              }

              const getTextClass = (color?: string) => {
                if (color === 'blue') return 'text-blue-600'
                if (color === 'green') return 'text-green-600'
                return 'text-primary'
              }

              return (
                <div key={index} className={`rounded-xl border-2 ${getBorderClass(competitor.badgeColor)} to-transparent p-8 bg-gradient-to-br`}>
                  <div className="text-center mb-6">
                    <div className={`text-5xl font-bold mb-2 ${getTextClass(competitor.badgeColor)}`}>{competitor.rating}</div>
                    <h3 className="font-heading text-2xl font-bold mb-3">{competitor.name}</h3>
                    <Badge className={`${getBadgeClass(competitor.badgeColor)} mb-4`}>
                      {competitor.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    {competitor.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    {competitor.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Capability Comparisons */}
          {rankingData.capabilityComparisons && rankingData.capabilityComparisons.length > 0 && (
            <div className="space-y-8 mb-20">
              {rankingData.capabilityComparisons.map((comparison, compIndex) => (
                <div key={compIndex} className="rounded-2xl border border-border bg-gradient-to-br from-background to-muted/20 p-8">
                  <h4 className="font-heading text-xl font-bold mb-6">{comparison.title}</h4>
                  {comparison.description && (
                    <p className="text-muted-foreground mb-6">{comparison.description}</p>
                  )}
                  <div className="grid md:grid-cols-2 gap-8">
                    {comparison.dimensions.map((dimension, dimIndex) => {
                      const getBarColor = (color: string) => {
                        if (color === 'blue-600') return 'bg-blue-600'
                        if (color === 'green-600') return 'bg-green-600'
                        return 'bg-primary'
                      }

                      const getTextColor = (color: string) => {
                        if (color === 'blue-600') return 'text-blue-600'
                        if (color === 'green-600') return 'text-green-600'
                        return 'text-primary'
                      }

                      const getBorderColor = (color?: string) => {
                        if (color === 'blue') return 'bg-blue-600'
                        if (color === 'green') return 'bg-green-600'
                        return 'bg-primary'
                      }

                      return (
                        <div key={dimIndex}>
                          <div className="flex items-center gap-2 mb-4">
                            <div className={`h-8 w-1 ${getBorderColor(dimension.winnerColor)} rounded-full`} />
                            <h5 className="font-semibold">{dimension.dimensionName}</h5>
                          </div>
                          <div className="space-y-3">
                            {dimension.scores.map((score, scoreIndex) => (
                              <div key={scoreIndex} className="flex items-center gap-4">
                                <div className="w-20 text-sm font-medium">{score.provider}</div>
                                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${getBarColor(score.color)} rounded-full`}
                                    style={{ width: `${score.barWidth}%` }}
                                  />
                                </div>
                                <div className={`w-12 text-right font-bold ${getTextColor(score.color)}`}>
                                  {score.score}
                                </div>
                              </div>
                            ))}
                          </div>
                          {dimension.note && (
                            <p className="text-xs text-muted-foreground mt-3">{dimension.note}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Key Takeaways */}
          {rankingData.keyTakeaways && (
            <div className="rounded-xl border border-border bg-muted/30 p-6 mb-20">
              <h4 className="font-heading text-lg font-bold mb-4">
                {rankingData.keyTakeaways.title || 'Competitive Positioning Summary'}
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {rankingData.keyTakeaways.items.map((item, index) => {
                  const getTextColor = (color: string) => {
                    if (color === 'blue-600') return 'text-blue-600'
                    if (color === 'green-600') return 'text-green-600'
                    return 'text-primary'
                  }

                  return (
                    <div key={index}>
                      <span className={`font-bold ${getTextColor(item.color)}`}>{item.provider}:</span> {item.summary}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Detailed Analysis */}
          {rankingData.detailedAnalysis && rankingData.detailedAnalysis.length > 0 && (
            <div className="space-y-12 mb-20">
              {rankingData.detailedAnalysis.map((analysis, index) => (
                <section key={index}>
                  <h2 className="font-heading text-3xl font-bold mb-6">{analysis.title}</h2>
                  <div className="space-y-6 text-foreground/80 leading-relaxed">
                    {analysis.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
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
