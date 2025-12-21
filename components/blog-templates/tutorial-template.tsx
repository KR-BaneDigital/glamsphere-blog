import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, Star, Quote, CheckCircle2 } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface TutorialTemplateProps {
  post: BlogPost
}

export function TutorialTemplate({ post }: TutorialTemplateProps) {
  const tutorial = post.typeSpecificData?.tutorial
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              💻 COMPLETE TUTORIAL
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
              {tutorial?.difficultyLevel && (
                <>
                  <span>•</span>
                  <span>{tutorial.difficultyLevel}</span>
                </>
              )}
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

          {/* Table of Contents */}
          {tutorial?.tableOfContents && tutorial.tableOfContents.length > 0 && (
            <section className="mb-12">
              <Card className="border-2 shadow-lg">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="mb-6 text-2xl font-bold text-foreground">What You'll Learn</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {tutorial.tableOfContents.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-foreground mt-0.5" />
                        <span className="text-base text-muted-foreground leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Success Story */}
          {tutorial?.successStory && (
            <section className="mb-12 border-b border-border pb-12">
              <Card className="overflow-hidden border-2 shadow-xl">
                <CardContent className="p-7 lg:p-10">
                  <div className="mb-6 text-center">
                    <Badge variant="outline" className="mb-3">
                      Real Results
                    </Badge>
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-2">
                      {tutorial.successStory.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {tutorial.successStory.role} • {tutorial.successStory.company}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      {tutorial.successStory.image && (
                        <img
                          src={tutorial.successStory.image}
                          alt={tutorial.successStory.name}
                          className="size-24 shrink-0 rounded-full object-cover mx-auto sm:mx-0"
                        />
                      )}
                      <div className="flex-1">
                        <div className="relative">
                          <Quote className="absolute -left-2 -top-2 size-10 text-accent opacity-40" />
                          <blockquote className="pl-8 text-lg leading-relaxed text-foreground">
                            {tutorial.successStory.quote}
                          </blockquote>
                        </div>

                        <div className="mt-5 flex items-center gap-2">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="size-5 fill-foreground text-foreground" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {tutorial.successStory.keyResult && (
                      <div className="rounded-lg bg-foreground/5 p-5 border-l-4 border-foreground">
                        <div className="flex gap-3.5">
                          <Star className="size-6 shrink-0 text-foreground mt-0.5 fill-foreground" />
                          <div>
                            <p className="font-semibold text-foreground mb-1.5 text-lg">Key Achievement</p>
                            <p className="text-base text-muted-foreground leading-relaxed">
                              {tutorial.successStory.keyResult}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Tutorial Sections */}
          {tutorial?.sections && tutorial.sections.length > 0 && (
            <div className="space-y-16">
              {tutorial.sections.map((section, sectionIndex) => (
                <section key={sectionIndex} className="mb-16">
                  <div className="mb-8 flex items-start gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background font-bold text-2xl shadow-lg">
                      {sectionIndex + 1}
                    </span>
                    <h2 className="text-3xl font-bold text-foreground m-0 pt-2 leading-tight">
                      {section.title}
                    </h2>
                  </div>

                  {section.intro && (
                    <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                      {section.intro}
                    </p>
                  )}

                  {/* Sub-steps */}
                  {section.steps && section.steps.length > 0 && (
                    <div className="space-y-12">
                      {section.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="mb-12">
                          <div className="mb-5 flex items-start gap-3.5">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-foreground to-foreground/80 text-background font-bold text-lg shadow-md">
                              {String.fromCharCode(97 + stepIndex)}
                            </span>
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-1.5">
                                {step.title}
                              </h3>
                              {step.timeRequired && (
                                <p className="text-base text-muted-foreground italic flex items-center gap-2">
                                  <Clock className="size-4" />
                                  {step.timeRequired}
                                </p>
                              )}
                            </div>
                          </div>

                          {step.content && (
                            <Card className="mb-5 bg-accent/10 border-accent/20">
                              <CardContent className="p-6">
                                {step.contentTitle && (
                                  <h4 className="mb-3 font-semibold text-foreground text-lg">{step.contentTitle}</h4>
                                )}
                                {typeof step.content === 'string' ? (
                                  <p className="text-base leading-relaxed text-muted-foreground">{step.content}</p>
                                ) : (
                                  <ol className="space-y-2.5 text-base text-muted-foreground leading-relaxed">
                                    {step.content.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ol>
                                )}
                              </CardContent>
                            </Card>
                          )}

                          {step.tip && (
                            <Card className="bg-foreground/5 border-foreground/10">
                              <CardContent className="p-6">
                                <h4 className="mb-2.5 font-semibold text-foreground flex items-center gap-2">
                                  <CheckCircle2 className="size-5" />
                                  {step.tipTitle || 'Pro tip:'}
                                </h4>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                  {step.tip}
                                </p>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Section-level content cards */}
                  {section.cards && section.cards.length > 0 && (
                    <div className="space-y-5 mb-8">
                      {section.cards.map((card, cardIndex) => (
                        <Card key={cardIndex} className="border-l-4 border-foreground shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <h3 className="mb-3 text-xl font-bold text-foreground">{card.title}</h3>
                            <p className="text-base leading-relaxed text-muted-foreground">
                              {card.content}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {/* Results Timeline */}
          {tutorial?.resultsTimeline && tutorial.resultsTimeline.milestones && (
            <section className="mb-12 mt-16">
              <h2 className="mb-8 text-3xl font-bold text-foreground">{tutorial.resultsTimeline.title || 'Expected Results Timeline'}</h2>

              <div className="space-y-5">
                {tutorial.resultsTimeline.milestones.map((milestone, index) => (
                  <Card key={index} className="border-l-4 border-foreground">
                    <CardContent className="p-6">
                      <h3 className="mb-2.5 text-xl font-bold text-foreground">{milestone.timeframe}</h3>
                      <ul className="space-y-1.5 text-base text-muted-foreground">
                        {milestone.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex}>• {outcome}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Common Mistakes */}
          {tutorial?.commonMistakes && tutorial.commonMistakes.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-8 text-3xl font-bold text-foreground">Common Mistakes to Avoid</h2>
              {tutorial.mistakesIntro && (
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                  {tutorial.mistakesIntro}
                </p>
              )}

              <div className="space-y-5">
                {tutorial.commonMistakes.map((mistake, index) => (
                  <Card key={index} className="border-l-4 border-destructive/50 bg-destructive/5">
                    <CardContent className="p-6">
                      <h3 className="mb-2.5 text-xl font-bold text-foreground">{mistake.title}</h3>
                      <p className="mb-2.5 text-base leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">The mistake:</strong> {mistake.mistake}
                      </p>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        <strong className="text-foreground">The solution:</strong> {mistake.solution}
                      </p>
                    </CardContent>
                  </Card>
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
