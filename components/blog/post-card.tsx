import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import { ContentTypeBadge } from "@/lib/content-type-utils"

interface PostCardProps {
  post: BlogPost
  variant?: "default" | "featured"
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
        <div className={`relative ${variant === "featured" ? "aspect-[3/2]" : "aspect-[16/10]"}`}>
          <img
            src={post.image}
            alt={post.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <ContentTypeBadge contentType={post.contentType} />
          </div>
        </div>
        <CardContent className="flex flex-col flex-1 p-5">
          <div className="mb-3 flex items-center gap-3">
            <Badge className="bg-secondary/20 text-foreground border border-secondary/40 text-xs">{post.category}</Badge>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          <h3 className="mb-3 text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
            <span className="text-muted-foreground">{post.readTime}</span>
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              Read More <ChevronRight className="size-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
