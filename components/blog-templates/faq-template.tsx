import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface FAQTemplateProps {
  post: BlogPost
}

export function FAQTemplate({ post }: FAQTemplateProps) {
  const faqData = post.typeSpecificData
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section - FAQ Style */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              <HelpCircle className="size-3 mr-1" />
              Frequently Asked Question
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

          {/* Quick Answer Section */}
          {faqData?.quickAnswer && (
            <section className="mb-12">
              <Card className="overflow-hidden border-2 shadow-xl bg-foreground/5">
                <CardContent className="p-8 lg:p-12">
                  <div className="flex gap-4 items-start">
                    <div className="size-12 rounded-full bg-foreground flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-6 text-background" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4 sm:text-3xl">Quick Answer</h2>
                      <p className="text-lg leading-relaxed text-foreground mb-4">
                        <strong>{faqData.quickAnswer.summary}</strong>
                      </p>
                      {faqData.quickAnswer.details && (
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {faqData.quickAnswer.details}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Understanding the Question */}
          {faqData?.understandingSection && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">Understanding the Question</h2>
              <div className="space-y-4">
                {faqData.understandingSection.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* The Problem / Key Issues */}
          {faqData?.problemSection && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{faqData.problemSection.title}</h2>
              {faqData.problemSection.intro && (
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  {faqData.problemSection.intro}
                </p>
              )}

              <Card className="mb-6 bg-accent/30 border-2">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground">{faqData.problemSection.listTitle}</h3>
                  <ul className="space-y-3">
                    {faqData.problemSection.items.map((item, index) => (
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

              {faqData.problemSection.conclusion && (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {faqData.problemSection.conclusion}
                </p>
              )}
            </section>
          )}

          {/* Solution / What Makes It Safe */}
          {faqData?.solutionSection && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{faqData.solutionSection.title}</h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {faqData.solutionSection.intro}
              </p>

              <div className="space-y-4">
                {faqData.solutionSection.features.map((feature, index) => (
                  <Card key={index} className="bg-foreground/5">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-lg font-bold text-foreground">{feature.name}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Evidence / Research */}
          {faqData?.evidenceSection && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{faqData.evidenceSection.title}</h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {faqData.evidenceSection.intro}
              </p>

              <Card className="mb-6 border-l-4 border-foreground bg-accent/20">
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-foreground">{faqData.evidenceSection.listTitle}</h3>
                  <ul className="space-y-3 text-base text-muted-foreground">
                    {faqData.evidenceSection.findings.map((finding, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-foreground mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {faqData.evidenceSection.conclusion && (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {faqData.evidenceSection.conclusion}
                </p>
              )}
            </section>
          )}

          {/* How to Choose / Action Steps */}
          {faqData?.actionSteps && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{faqData.actionSteps.title}</h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {faqData.actionSteps.intro}
              </p>

              <ol className="space-y-4">
                {faqData.actionSteps.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Practical Tips */}
          {faqData?.practicalTips && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{faqData.practicalTips.title}</h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {faqData.practicalTips.intro}
              </p>

              <Card className="mb-6 bg-accent/20 border-2">
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {faqData.practicalTips.tips.map((tip, index) => (
                      <li key={index}>
                        <strong className="text-foreground text-base">{tip.title}:</strong>{" "}
                        <span className="text-muted-foreground text-base">{tip.description}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Final Answer / Bottom Line */}
          {faqData?.finalAnswer && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-foreground">The Bottom Line</h2>
              <Card className="bg-foreground text-background border-2 border-foreground">
                <CardContent className="p-8">
                  <p className="text-lg leading-relaxed mb-4">
                    <strong>{faqData.finalAnswer.summary}</strong>
                  </p>
                  {faqData.finalAnswer.details && (
                    <p className="text-base leading-relaxed opacity-90">
                      {faqData.finalAnswer.details}
                    </p>
                  )}
                </CardContent>
              </Card>
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
