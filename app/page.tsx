import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { HeroSection } from "@/components/home/hero-section"
import { TopArticlesSection } from "@/components/home/top-articles-section"
import { Sidebar } from "@/components/home/sidebar"
import { blogPosts } from "@/lib/blog-data"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: `Home | ${siteConfig.brand.name}`,
  description: siteConfig.brand.description,
}

export default function HomePage() {
  // Get posts for different sections
  const featuredPost = blogPosts[0]
  const secondaryPosts = blogPosts.slice(1, 4)
  const topArticles = blogPosts.slice(9, 15)  // Posts 9-14 (Featured Articles)
  const recentPosts = blogPosts.slice(4, 8)

  return (
    <div className="min-h-screen">
      <BlogHeader />
      
      <HeroSection 
        featuredPost={featuredPost}
        secondaryPosts={secondaryPosts}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <TopArticlesSection posts={topArticles} />
          <Sidebar recentPosts={recentPosts} />
        </div>
      </div>

      <BlogFooter />
    </div>
  )
}
