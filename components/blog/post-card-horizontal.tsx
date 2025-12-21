import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import { ContentTypeBadge } from "@/lib/content-type-utils"

interface PostCardHorizontalProps {
  post: BlogPost
}

export function PostCardHorizontal({ post }: PostCardHorizontalProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="flex gap-4">
          <div className="relative w-1/3 shrink-0">
            <div className="aspect-square overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute top-2 right-2">
              <ContentTypeBadge contentType={post.contentType} className="shadow-sm text-xs" />
            </div>
          </div>
          <CardContent className="flex flex-1 flex-col justify-center py-4 pr-4 pl-0">
            <Badge className="bg-secondary/20 text-foreground border border-secondary/40 mb-2 w-fit text-xs">
              {post.category}
            </Badge>
            <h3 className="mb-2 text-base font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>{post.readTime}</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
