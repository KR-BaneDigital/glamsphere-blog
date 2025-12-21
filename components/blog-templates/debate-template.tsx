import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, Zap, ShieldAlert } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface DebateTemplateProps {
  post: BlogPost
}

export function DebateTemplate({ post }: DebateTemplateProps) {
  const debateData = post.typeSpecificData?.debate
  const relatedPosts = getRelatedPosts(post.id)

  if (!debateData) return null

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-foreground border border-primary/40">
              ⚖️ DEBATE
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

          {/* Topic Header */}
          <div className="mb-16 text-center">
            {debateData.topicCategory && (
              <Badge className="mb-6 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                {debateData.topicCategory}
              </Badge>
            )}
            <h2 className="mb-6 font-heading text-4xl font-bold leading-tight text-balance md:text-5xl lg:text-6xl">
              {debateData.topic}
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground text-pretty">
              {debateData.description}
            </p>
          </div>

          {/* Two Perspectives Side-by-Side */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 mb-20">
            {/* PRO Position (Green) */}
            <div className="group relative rounded-2xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-emerald-500/0 p-10 transition-all hover:border-emerald-500/30 hover:shadow-lg">
              <div className="mb-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15">
                    <Zap className="size-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold">Position For</h3>
                    <p className="text-sm text-muted-foreground">{debateData.pro.positionLabel}</p>
                  </div>
                </div>
                <h4 className="mb-6 font-heading text-2xl font-bold leading-tight text-pretty">
                  {debateData.pro.title}
                </h4>
                <div className="mb-6 flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5" />
                  <div>
                    <p className="font-semibold">{debateData.pro.expert.name}</p>
                    <p className="text-sm text-muted-foreground">{debateData.pro.expert.title}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-foreground/95">
                {debateData.pro.paragraphs.map((paragraph, index) => {
                  // Check if this paragraph should be the pull quote
                  if (paragraph === debateData.pro.pullQuote) {
                    return (
                      <blockquote key={index} className="my-8 border-l-4 border-emerald-500 pl-6 text-base italic text-foreground/90">
                        "{paragraph}"
                      </blockquote>
                    )
                  }
                  // Check if this is evidence box marker
                  if (paragraph === '[EVIDENCE_BOX]') {
                    return (
                      <div key={index} className="my-8 rounded-xl bg-emerald-500/10 p-6">
                        <h5 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                          {debateData.pro.evidence.title}
                        </h5>
                        <ul className="space-y-3 text-sm">
                          {debateData.pro.evidence.points.map((point, pIndex) => (
                            <li key={pIndex} className="flex items-start gap-3">
                              <ArrowRight className="mt-1 size-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }
                  return (
                    <p key={index} className="text-pretty">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>

            {/* CON Position (Red/Rose) */}
            <div className="group relative rounded-2xl border-2 border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-rose-500/0 p-10 transition-all hover:border-rose-500/30 hover:shadow-lg">
              <div className="mb-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-rose-500/15">
                    <ShieldAlert className="size-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold">Position Against</h3>
                    <p className="text-sm text-muted-foreground">{debateData.con.positionLabel}</p>
                  </div>
                </div>
                <h4 className="mb-6 font-heading text-2xl font-bold leading-tight text-pretty">
                  {debateData.con.title}
                </h4>
                <div className="mb-6 flex items-center gap-4">
                  <div className="size-12 rounded-full bg-gradient-to-br from-rose-500/20 to-rose-500/5" />
                  <div>
                    <p className="font-semibold">{debateData.con.expert.name}</p>
                    <p className="text-sm text-muted-foreground">{debateData.con.expert.title}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-foreground/95">
                {debateData.con.paragraphs.map((paragraph, index) => {
                  // Check if this paragraph should be the pull quote
                  if (paragraph === debateData.con.pullQuote) {
                    return (
                      <blockquote key={index} className="my-8 border-l-4 border-rose-500 pl-6 text-base italic text-foreground/90">
                        "{paragraph}"
                      </blockquote>
                    )
                  }
                  // Check if this is evidence box marker
                  if (paragraph === '[EVIDENCE_BOX]') {
                    return (
                      <div key={index} className="my-8 rounded-xl bg-rose-500/10 p-6">
                        <h5 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                          {debateData.con.evidence.title}
                        </h5>
                        <ul className="space-y-3 text-sm">
                          {debateData.con.evidence.points.map((point, pIndex) => (
                            <li key={pIndex} className="flex items-start gap-3">
                              <ArrowRight className="mt-1 size-4 flex-shrink-0 text-rose-600 dark:text-rose-400" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }
                  return (
                    <p key={index} className="text-pretty">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>

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
