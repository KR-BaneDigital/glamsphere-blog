import { siteConfig } from "@/lib/config"
import { PostCard } from "@/components/blog/post-card"
import { PostCardHorizontal } from "@/components/blog/post-card-horizontal"
import type { BlogPost } from "@/lib/blog-data"

interface HeroSectionProps {
  featuredPost: BlogPost
  secondaryPosts: BlogPost[]
}

export function HeroSection({ featuredPost, secondaryPosts }: HeroSectionProps) {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Hero Text + Featured Post */}
          <div>
            <div className="mb-6">
              <h1 className="mb-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl text-balance">
                {siteConfig.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {siteConfig.hero.subtitle}
              </p>
            </div>

            <PostCard post={featuredPost} variant="featured" />
          </div>

          {/* Secondary Posts */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {secondaryPosts.map((post) => (
              <PostCardHorizontal key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
