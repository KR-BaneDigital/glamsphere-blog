import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface ScorecardTemplateProps {
  post: BlogPost
}

export function ScorecardTemplate({ post }: ScorecardTemplateProps) {
  const scorecardData = post.typeSpecificData?.scorecard
  const relatedPosts = getRelatedPosts(post.id)

  if (!scorecardData) return null

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              📊 SCORECARD
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
          {scorecardData.introduction && (
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-lg leading-relaxed text-foreground/80">
                {scorecardData.introduction}
              </p>
            </div>
          )}

          {/* Methodology Section */}
          {scorecardData.methodology && (
            <section className="mb-20 p-8 bg-muted/50 rounded-xl border border-border">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                {scorecardData.methodology.title || "How This Scorecard Works"}
              </h2>

              <div className="space-y-6 text-foreground/80 leading-relaxed">
                <p>{scorecardData.methodology.description}</p>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Evaluation Criteria:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {scorecardData.methodology.criteria.map((criterion, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{criterion.name}</span>
                          <span className="text-sm text-muted-foreground block">
                            {criterion.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold text-lg mb-3">Scoring Scale:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {scorecardData.methodology.scoringScale.map((scale, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          index === 0 
                            ? 'bg-primary/10 border-primary/20' 
                            : 'bg-background border-border'
                        }`}
                      >
                        <div className={`font-bold text-lg ${index === 0 ? 'text-primary' : ''}`}>
                          {scale.range}
                        </div>
                        <div className="text-sm">{scale.label} – {scale.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {scorecardData.methodology.weightingNote && (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground italic">
                      {scorecardData.methodology.weightingNote}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Top Picks Section */}
          {scorecardData.topPicks && scorecardData.topPicks.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="size-8 text-primary" />
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                  Top Picks at a Glance
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {scorecardData.topPicks.map((pick, index) => (
                  <div
                    key={index}
                    className={`relative p-8 rounded-xl border-2 overflow-hidden ${
                      pick.rank === 1
                        ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30'
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {pick.rank === 1 && '#1 OVERALL'}
                      {pick.rank === 2 && '#2 OVERALL'}
                      {pick.rank === 3 && '#3 OVERALL'}
                      {pick.rank > 3 && pick.badge.toUpperCase()}
                    </div>
                    <div className="mb-4">
                      <h3 className="font-heading text-2xl font-bold mb-2">{pick.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-bold font-heading ${pick.rank === 1 ? 'text-primary' : ''}`}>
                          {pick.overallScore}
                        </span>
                        <span className="text-muted-foreground">/100</span>
                      </div>
                    </div>
                    <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
                      {pick.badge}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                      {pick.description}
                    </p>
                    {pick.price && (
                      <p className="text-xs text-muted-foreground">
                        {pick.price}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Scorecard Table */}
          {scorecardData.scorecardTable && (
            <section className="mb-20">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-8">
                {scorecardData.scorecardTable.title || "Complete Scorecard Overview"}
              </h2>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden border border-border rounded-xl">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50">
                        <tr>
                          {scorecardData.scorecardTable.columns.map((column, index) => (
                            <th
                              key={index}
                              scope="col"
                              className={`px-4 py-4 text-sm font-semibold whitespace-nowrap ${
                                index === 0 
                                  ? 'text-left sticky left-0 bg-muted/50 z-10' 
                                  : index === scorecardData.scorecardTable!.columns.length - 1
                                  ? 'text-left'
                                  : 'text-center'
                              }`}
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        {scorecardData.scorecardTable.rows.map((row, index) => (
                          <tr key={index} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-4 whitespace-nowrap font-medium sticky left-0 bg-background">
                              {row.name}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="inline-flex items-center justify-center font-bold text-lg text-primary">
                                {row.overallScore}
                              </span>
                            </td>
                            {Object.values(row.scores).map((score, scoreIndex) => (
                              <td key={scoreIndex} className="px-4 py-4 text-center text-muted-foreground">
                                {score}
                              </td>
                            ))}
                            <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">
                              {row.bestFor}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {scorecardData.scorecardTable.tableNote && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">
                    {scorecardData.scorecardTable.tableNote}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Detailed Breakdown */}
          {scorecardData.detailedBreakdown && scorecardData.detailedBreakdown.length > 0 && (
            <section className="mb-20">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-8">
                Detailed Breakdown
              </h2>

              <div className="space-y-12">
                {scorecardData.detailedBreakdown.map((item, index) => (
                  <div key={index} className={`border-l-4 pl-6 ${item.rank === 1 ? 'border-primary' : 'border-border'}`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-heading text-2xl font-bold mb-2">
                          {item.rank}. {item.name}
                        </h3>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className={`text-4xl font-bold font-heading ${item.rank === 1 ? 'text-primary' : ''}`}>
                            {item.overallScore}
                          </span>
                          <span className="text-muted-foreground">/100</span>
                          <span className="ml-4 px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="font-medium text-foreground mb-1">{item.price}</div>
                        {item.priceDetails && <div>{item.priceDetails}</div>}
                      </div>
                    </div>

                    <div className="space-y-4 text-foreground/80 leading-relaxed">
                      {item.analysis.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}

                      <div className="grid sm:grid-cols-2 gap-4 my-6">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-primary" />
                            Strengths
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {item.strengths.map((strength, sIndex) => (
                              <li key={sIndex}>• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg border border-border">
                          <h4 className="font-semibold mb-2">Considerations</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {item.considerations.map((consideration, cIndex) => (
                              <li key={cIndex}>• {consideration}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p>
                        <strong>Best for:</strong> {item.bestFor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Takeaways */}
          {scorecardData.keyTakeaways && (
            <section className="mb-20">
              <div className="p-8 bg-primary/10 rounded-xl border border-primary/20">
                <h2 className="font-heading text-2xl font-bold mb-6">
                  {scorecardData.keyTakeaways.title || "Key Takeaways"}
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  {scorecardData.keyTakeaways.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="size-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0 mt-1">
                        {item.number}
                      </div>
                      <p>
                        <strong>{item.recommendation}</strong> {item.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Methodology Details */}
          {scorecardData.methodologyDetails && (
            <section className="mb-20">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                {scorecardData.methodologyDetails.title || "Our Testing Methodology"}
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>{scorecardData.methodologyDetails.description}</p>
                <ul className="space-y-2 ml-6">
                  {scorecardData.methodologyDetails.testingApproach.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-foreground/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
