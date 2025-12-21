import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, Star, Check, X } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface ProductComparisonTemplateProps {
  post: BlogPost
}

export function ProductComparisonTemplate({ post }: ProductComparisonTemplateProps) {
  const comparisonData = post.typeSpecificData?.productComparison
  const relatedPosts = getRelatedPosts(post.id)

  if (!comparisonData) return null

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              ⚖️ PRODUCT COMPARISON
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
          <div className="mb-12">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Introduction */}
          {comparisonData.introduction && comparisonData.introduction.length > 0 && (
            <div className="prose prose-lg max-w-none mb-12">
              {comparisonData.introduction.map((paragraph, index) => (
                <p key={index} className="text-xl leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Product Sections */}
          {comparisonData.products.map((product, productIndex) => {
            const isLastProduct = productIndex === comparisonData.products.length - 1
            
            return (
              <section key={productIndex} className={`mb-16 ${!isLastProduct ? 'pb-16 border-b border-border' : ''}`}>
                <div className="flex items-start gap-3 mb-6">
                  <Badge className={productIndex === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>
                    {product.badge}
                  </Badge>
                  <div className="flex items-center gap-1.5">
                    <Star className="size-5 fill-primary text-primary" />
                    <span className="font-bold text-lg">{product.rating}/10</span>
                  </div>
                </div>

                <h2 className="font-heading text-3xl font-bold mb-6">{product.name}</h2>

                {product.image && (
                  <div className="aspect-video rounded-lg bg-muted overflow-hidden mb-8">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-full object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                {product.description.map((paragraph, pIndex) => (
                  <p key={pIndex} className={`leading-relaxed mb-6 ${pIndex === 0 ? 'text-lg' : ''}`}>
                    {paragraph}
                  </p>
                ))}

                {/* Specs Grid */}
                {product.specs.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold mb-4">Key Specifications</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {product.specs.map((spec, specIndex) => (
                        <div key={specIndex} className="flex items-center justify-between">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <div className="flex items-center gap-2">
                            <span className={spec.label === 'Price' ? 'font-bold text-lg' : 'font-medium'}>
                              {spec.value}
                            </span>
                            {spec.isPositive !== undefined && (
                              spec.isPositive ? (
                                <Check className="size-4 text-accent" />
                              ) : (
                                <X className="size-4 text-muted-foreground" />
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pros & Cons */}
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  {/* Pros */}
                  <div className="bg-accent/10 rounded-lg p-5">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Check className="size-5 text-accent" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {product.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="flex items-start gap-2">
                          <Check className="size-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="bg-muted/50 rounded-lg p-5">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <X className="size-5 text-muted-foreground" />
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {product.cons.map((con, conIndex) => (
                        <li key={conIndex} className="flex items-start gap-2">
                          <X className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-sm">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Line */}
                <p className="leading-relaxed text-muted-foreground italic">
                  <strong>Bottom line:</strong> {product.bottomLine}
                </p>
              </section>
            )
          })}

          {/* Comparison Table */}
          {comparisonData.comparisonTable.length > 0 && (
            <section className="mb-16">
              <h2 className="font-heading text-3xl font-bold mb-8">Quick Comparison: At a Glance</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold">Feature</th>
                      {comparisonData.products.map((product, index) => (
                        <th key={index} className="text-left p-4 font-semibold">{product.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {comparisonData.comparisonTable.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 1 ? 'bg-muted/30' : ''}>
                        <td className="p-4 font-medium">{row.feature}</td>
                        {row.values.map((value, valueIndex) => (
                          <td key={valueIndex} className="p-4">
                            {row.bestIndex === valueIndex ? `${value} ⭐` : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Winner Section */}
          {comparisonData.winner && (
            <section className="mb-16">
              <h2 className="font-heading text-3xl font-bold mb-6">Our Final Recommendation</h2>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-8 mb-8">
                <h3 className="font-heading text-2xl font-bold mb-4">{comparisonData.winner.title}</h3>
                {comparisonData.winner.paragraphs.map((paragraph, index) => (
                  <p key={index} className={`leading-relaxed ${index < comparisonData.winner.paragraphs.length - 1 ? 'mb-4' : ''} ${index === 0 ? 'text-lg' : ''}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Alternative Recommendations */}
              {comparisonData.alternativeRecommendations && comparisonData.alternativeRecommendations.length > 0 && (
                <div className="space-y-4">
                  {comparisonData.alternativeRecommendations.map((rec, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold mb-2">Choose {rec.productName} if:</h4>
                      <p className="text-muted-foreground">{rec.whenToChoose}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Conclusion */}
          {comparisonData.conclusion && comparisonData.conclusion.length > 0 && (
            <section className="mb-12">
              <h2 className="font-heading text-3xl font-bold mb-6">Final Thoughts</h2>
              {comparisonData.conclusion.map((paragraph, index) => (
                <p key={index} className={`leading-relaxed ${index < comparisonData.conclusion!.length - 1 ? 'mb-4' : ''} ${index === 0 ? 'text-lg' : ''}`}>
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
