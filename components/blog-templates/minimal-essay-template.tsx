import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { SocialShareButtons } from "@/components/blog/social-share-buttons"
import { getRelatedPosts } from "@/lib/blog-data"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface MinimalEssayTemplateProps {
  post: BlogPost
}

export function MinimalEssayTemplate({ post }: MinimalEssayTemplateProps) {
  const essayData = post.typeSpecificData?.minimalEssay
  const relatedPosts = getRelatedPosts(post.id)

  if (!essayData) return null

  return (
    <>
      {/* Article Header - Minimal Style */}
      <article className="max-w-2xl mx-auto px-6 py-16">
        <header className="mb-12 pb-12 border-b border-border">
          <div className="space-y-4">
            {essayData.essayCategory && (
              <div className="text-sm text-muted-foreground">{essayData.essayCategory}</div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
              <span>By {post.author.name}</span>
              <span>·</span>
              <time>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Social Share - Minimal */}
        <div className="mb-12 pb-8 border-b border-border">
          <SocialShareButtons
            url={`${siteConfig.brand.url}/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt}
          />
        </div>

        {/* Essay Content - Pure Prose */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-foreground/80">
            {post.excerpt}
          </p>

          {essayData.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mt-12 mb-4 tracking-tight">{section.title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="leading-relaxed text-foreground/80">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Tags - Minimal */}
        <div className="flex flex-wrap gap-2 border-t border-border pt-6 mt-16">
          <span className="text-sm font-medium text-foreground">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
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
