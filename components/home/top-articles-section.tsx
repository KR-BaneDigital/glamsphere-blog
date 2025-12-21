import { PostCard } from "@/components/blog/post-card"
import { siteConfig } from "@/lib/config"
import type { BlogPost } from "@/lib/blog-data"

interface TopArticlesSectionProps {
  posts: BlogPost[]
}

export function TopArticlesSection({ posts }: TopArticlesSectionProps) {
  return (
    <div className="lg:col-span-2">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          {siteConfig.sections.topArticles.title}
        </h2>
        <p className="text-muted-foreground">
          {siteConfig.sections.topArticles.description}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
