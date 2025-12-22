import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, Star, Check, X, TrendingUp, Award, ShoppingCart } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface ProductReviewTemplateProps {
  post: BlogPost
}

export function ProductReviewTemplate({ post }: ProductReviewTemplateProps) {
  const reviewData = post.typeSpecificData?.productReview
  const relatedPosts = getRelatedPosts(post.id)

  if (!reviewData) return null

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              ⭐ PRODUCT REVIEW
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

          {/* Overall Rating Card */}
          <Card className="mb-12 p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-6xl font-bold text-primary">{reviewData.overallScore}</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-5 ${star <= reviewData.starRating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-foreground">Outstanding</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {reviewData.quickSummary}
                </p>
              </div>
              {reviewData.editorChoice && (
                <div className="flex items-center gap-2">
                  <Award className="size-12 text-primary" />
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider">Editor's Choice</div>
                    <div className="text-lg font-bold">2025</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Featured Image */}
          <div className="mb-12">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Quick Specs Grid */}
          {reviewData.specs && reviewData.specs.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {reviewData.specs.map((spec, index) => (
                <Card key={index} className="p-4 sm:p-6 text-center">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{spec.label}</div>
                  <div className="text-lg sm:text-2xl font-bold truncate">{spec.value}</div>
                </Card>
              ))}
            </div>
          )}

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-16">
            <div className="relative pl-6 border-l-4 border-primary/30">
              <p className="text-xl leading-relaxed text-foreground/90">
                {post.content}
              </p>
            </div>
          </div>

          {/* Performance Breakdown */}
          {reviewData.performanceScores && reviewData.performanceScores.length > 0 && (
            <section className="mb-16">
              <h2 className="font-heading text-3xl font-bold mb-8 flex items-center gap-3">
                <TrendingUp className="size-8 text-primary" />
                Performance Breakdown
              </h2>
              <div className="space-y-4">
                {reviewData.performanceScores.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{item.category}</span>
                      <span className="text-lg font-bold text-primary">{item.score}/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pros and Cons */}
          {(reviewData.pros.length > 0 || reviewData.cons.length > 0) && (
            <section className="mb-16">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pros */}
                {reviewData.pros.length > 0 && (
                  <Card className="p-8 bg-accent/20 border-accent/40">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="size-10 rounded-full bg-accent flex items-center justify-center">
                        <Check className="size-6 text-accent-foreground" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold">What We Love</h3>
                    </div>
                    <ul className="space-y-3">
                      {reviewData.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-3 text-foreground/90">
                          <Check className="size-5 text-accent shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Cons */}
                {reviewData.cons.length > 0 && (
                  <Card className="p-8 bg-destructive/10 border-destructive/20">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="size-10 rounded-full bg-destructive/20 flex items-center justify-center">
                        <X className="size-6 text-destructive" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold">Room for Improvement</h3>
                    </div>
                    <ul className="space-y-3">
                      {reviewData.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-3 text-foreground/90">
                          <X className="size-5 text-destructive shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            </section>
          )}

          {/* Detailed Review Sections */}
          {reviewData.sections && reviewData.sections.length > 0 && (
            <section className="space-y-12 mb-16">
              {reviewData.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-heading text-3xl font-bold mb-6">{section.title}</h2>
                  <div className="prose prose-lg max-w-none">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-foreground/80 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Verdict */}
          {reviewData.verdict && (
            <section className="mb-16">
              <Card className="p-10 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <h2 className="font-heading text-3xl font-bold mb-6 flex items-center gap-3">
                  <Award className="size-8 text-primary" />
                  {reviewData.verdict.title}
                </h2>
                {reviewData.verdict.paragraphs.map((paragraph, index) => (
                  <p key={index} className={`leading-relaxed mb-6 ${index === 0 ? 'text-xl text-foreground/90' : 'text-foreground/80'}`}>
                    {paragraph}
                  </p>
                ))}
                <p className="text-lg font-semibold text-foreground">
                  {reviewData.verdict.recommendation}
                </p>
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
