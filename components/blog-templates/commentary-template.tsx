import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight, MessageCircle, Sparkles } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface CommentaryTemplateProps {
  post: BlogPost
}

export function CommentaryTemplate({ post }: CommentaryTemplateProps) {
  const commentaryData = post.typeSpecificData?.commentary
  const relatedPosts = getRelatedPosts(post.id)

  if (!commentaryData) return null

  const getCommentaryColor = (color?: string) => {
    switch (color) {
      case 'emerald': return { border: 'border-emerald-500/20', bg: 'bg-emerald-500/5', iconBg: 'bg-emerald-600/20', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' }
      case 'rose': return { border: 'border-rose-500/20', bg: 'bg-rose-500/5', iconBg: 'bg-rose-600/20', text: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-500' }
      case 'blue': return { border: 'border-blue-500/20', bg: 'bg-blue-500/5', iconBg: 'bg-blue-600/20', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' }
      case 'orange': return { border: 'border-orange-500/20', bg: 'bg-orange-500/5', iconBg: 'bg-orange-600/20', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500' }
      case 'purple': return { border: 'border-purple-500/20', bg: 'bg-purple-500/5', iconBg: 'bg-purple-600/20', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' }
      case 'amber': return { border: 'border-amber-500/20', bg: 'bg-amber-500/5', iconBg: 'bg-amber-600/20', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' }
      default: return { border: 'border-primary/20', bg: 'bg-primary/5', iconBg: 'bg-primary/20', text: 'text-primary', dot: 'bg-primary' }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border/20 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container mx-auto px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="size-3" />
              Featured Analysis
            </div>
            <h1 className="mb-8 font-heading text-6xl font-bold leading-[1.05] tracking-tight text-balance md:text-7xl lg:text-8xl">
              {post.title}
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground text-pretty">
              {post.excerpt}
            </p>
            
            {/* Metadata */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
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

      {/* Main Article with Commentary */}
      <article className="container mx-auto px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        {/* Author + Social Share */}
        <div className="mx-auto max-w-4xl mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
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

        {/* Topics */}
        {commentaryData.topics && commentaryData.topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="mb-40">
            {/* Topic Header */}
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Badge className="mb-4 bg-foreground text-background">{topic.partLabel}</Badge>
              <h2 className="mb-4 font-heading text-5xl font-bold leading-tight text-balance">
                {topic.title}
              </h2>
              <div className="mx-auto mt-6 h-1 w-24 bg-foreground/20" />
            </div>

            <div className="space-y-8 lg:grid lg:grid-cols-12 lg:gap-16 lg:space-y-0">
              {/* LEFT COMMENTARY */}
              {topic.leftCommentary && topic.leftCommentary.length > 0 && (
                <aside className="lg:col-span-3">
                  <div className="space-y-8 lg:sticky lg:top-8">
                    {topic.leftCommentary.map((comment, cIndex) => {
                      if (comment.type === 'expert-comment' && comment.expert) {
                        const colors = getCommentaryColor(comment.expert.color)
                        return (
                          <div key={cIndex} className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-6`}>
                            <div className="mb-4 flex items-center gap-3">
                              <div className={`flex size-10 items-center justify-center rounded-full ${colors.iconBg}`}>
                                <MessageCircle className={`size-5 ${colors.text}`} />
                              </div>
                              <div>
                                <p className={`text-sm font-bold ${colors.text}`}>{comment.expert.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.expert.title}</p>
                              </div>
                            </div>
                            {comment.comments && comment.comments.map((text, tIndex) => (
                              <p key={tIndex} className={`text-sm leading-relaxed text-foreground/90 ${tIndex > 0 ? 'mt-4' : ''}`}>
                                "{text}"
                              </p>
                            ))}
                            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                              <div className={`size-1.5 rounded-full ${colors.dot}`} />
                              {comment.expert.perspective}
                            </div>
                          </div>
                        )
                      }
                      if (comment.type === 'context') {
                        return (
                          <div key={cIndex} className="rounded-2xl border border-border/40 bg-muted/30 p-6">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {comment.contextTitle || "Context"}
                            </p>
                            <p className="text-sm leading-relaxed text-foreground/80">
                              {comment.contextText}
                            </p>
                          </div>
                        )
                      }
                      if (comment.type === 'data-point') {
                        return (
                          <div key={cIndex} className="rounded-2xl border border-border/40 bg-muted/30 p-6">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Data Point</p>
                            <p className="mb-3 text-2xl font-bold text-foreground">{comment.dataValue}</p>
                            <p className="text-sm leading-relaxed text-foreground/80">
                              {comment.dataDescription}
                            </p>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </aside>
              )}

              {/* CENTER CONTENT */}
              <div className={topic.leftCommentary && topic.rightCommentary ? "lg:col-span-6" : topic.leftCommentary || topic.rightCommentary ? "lg:col-span-9" : "lg:col-span-12"}>
                <div className="space-y-8 font-serif text-lg leading-relaxed text-foreground/90">
                  {topic.content.map((item, index) => {
                    if (item.type === 'drop-cap') {
                      const firstChar = item.text.charAt(0)
                      const restText = item.text.slice(1)
                      return (
                        <div key={index} className="rounded-xl bg-muted/20 p-8">
                          <p className="text-pretty">
                            <span className="float-left mr-4 font-heading text-7xl leading-none text-foreground/90">
                              {firstChar}
                            </span>
                            {restText}
                          </p>
                        </div>
                      )
                    }
                    if (item.type === 'quote') {
                      return (
                        <div key={index} className="my-8 border-l-4 border-foreground/20 pl-8">
                          <p className="font-sans text-base italic leading-relaxed text-muted-foreground">
                            "{item.text}"
                          </p>
                          {item.attribution && (
                            <p className="mt-2 font-sans text-sm text-muted-foreground">
                              — {item.attribution}
                            </p>
                          )}
                        </div>
                      )
                    }
                    if (item.type === 'editorial-callout') {
                      return (
                        <div key={index} className="my-12 rounded-2xl bg-accent/50 p-8">
                          <div className="mb-4 flex items-center gap-2">
                            <div className="size-1.5 rounded-full bg-foreground/40" />
                            <p className="font-sans text-sm font-bold uppercase tracking-wider text-foreground/70">
                              {item.label || "Editorial Analysis"}
                            </p>
                          </div>
                          <p className="font-sans text-base leading-relaxed text-foreground/80 text-pretty">
                            {item.text}
                          </p>
                        </div>
                      )
                    }
                    // Regular paragraph
                    return (
                      <p key={index} className="text-pretty">
                        {item.text}
                      </p>
                    )
                  })}
                </div>
              </div>

              {/* RIGHT COMMENTARY */}
              {topic.rightCommentary && topic.rightCommentary.length > 0 && (
                <aside className="lg:col-span-3">
                  <div className="space-y-8 lg:sticky lg:top-8">
                    {topic.rightCommentary.map((comment, cIndex) => {
                      if (comment.type === 'expert-comment' && comment.expert) {
                        const colors = getCommentaryColor(comment.expert.color)
                        return (
                          <div key={cIndex} className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-6`}>
                            <div className="mb-4 flex items-center gap-3">
                              <div className={`flex size-10 items-center justify-center rounded-full ${colors.iconBg}`}>
                                <MessageCircle className={`size-5 ${colors.text}`} />
                              </div>
                              <div>
                                <p className={`text-sm font-bold ${colors.text}`}>{comment.expert.name}</p>
                                <p className="text-xs text-muted-foreground">{comment.expert.title}</p>
                              </div>
                            </div>
                            {comment.comments && comment.comments.map((text, tIndex) => (
                              <p key={tIndex} className={`text-sm leading-relaxed text-foreground/90 ${tIndex > 0 ? 'mt-4' : ''}`}>
                                "{text}"
                              </p>
                            ))}
                            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                              <div className={`size-1.5 rounded-full ${colors.dot}`} />
                              {comment.expert.perspective}
                            </div>
                          </div>
                        )
                      }
                      if (comment.type === 'social-comment') {
                        const colors = getCommentaryColor(comment.expert?.color || 'purple')
                        return (
                          <div key={cIndex} className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-6`}>
                            <div className="mb-3 flex items-center gap-2">
                              <div className={`flex size-8 items-center justify-center rounded-full ${colors.iconBg}`}>
                                <span className={`text-xs font-bold ${colors.text}`}>
                                  {comment.socialHandle?.substring(1, 3).toUpperCase()}
                                </span>
                              </div>
                              <p className={`text-xs font-semibold ${colors.text}`}>{comment.socialHandle}</p>
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/90">
                              "{comment.socialComment}"
                            </p>
                          </div>
                        )
                      }
                      if (comment.type === 'context') {
                        return (
                          <div key={cIndex} className="rounded-2xl border border-border/40 bg-muted/30 p-6">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {comment.contextTitle || "Context"}
                            </p>
                            <p className="text-sm leading-relaxed text-foreground/80">
                              {comment.contextText}
                            </p>
                          </div>
                        )
                      }
                      if (comment.type === 'data-point') {
                        return (
                          <div key={cIndex} className="rounded-2xl border border-border/40 bg-muted/30 p-6">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {comment.contextTitle || "Data Point"}
                            </p>
                            <p className="mb-3 text-2xl font-bold text-foreground">{comment.dataValue}</p>
                            <p className="text-sm leading-relaxed text-foreground/80">
                              {comment.dataDescription}
                            </p>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </aside>
              )}
            </div>
          </div>
        ))}

        {/* Conclusion */}
        {commentaryData.conclusion && (
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border-2 border-foreground/10 bg-gradient-to-br from-muted/50 to-muted/20 p-12">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="size-6 text-foreground/60" />
                <h3 className="font-heading text-2xl font-bold">
                  {commentaryData.conclusion.title || "Final Thoughts"}
                </h3>
              </div>
              {commentaryData.conclusion.paragraphs.map((paragraph, index) => (
                <p key={index} className={`font-serif text-lg leading-relaxed text-foreground/80 ${index > 0 ? 'mt-6' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mx-auto max-w-4xl mt-20">
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
