import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { blogPosts, getAllCategories, filterPosts } from "@/lib/blog-data"
import { PostCard } from "@/components/blog/post-card"
import { NewsletterCard } from "@/components/home/newsletter-card"
import { categories, type Category, type Subcategory } from "@/lib/categories"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${categoryName} Articles | PureWell Living`,
    description: `Explore all articles about ${categoryName.toLowerCase()} and learn how to avoid harmful chemicals.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  // Find category by slug
  const matchedCategory = categories.find(c => 
    c.slug === slug ||
    c.subcategories?.some(sub => sub.slug === slug)
  )

  if (!matchedCategory) {
    return <div>Category not found</div>
  }

  const categoryName = matchedCategory.subcategories?.some(s => s.slug === slug)
    ? matchedCategory.subcategories.find(s => s.slug === slug)!.name
    : matchedCategory.name

  const categoryPosts = filterPosts("", categoryName)

  const allCategories = getAllCategories()

  return (
    <div className="flex min-h-screen flex-col">
      <BlogHeader />
      <main className="flex-1">
        {/* Category Hero */}
        <section className="bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {categoryName} Articles
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
                Discover trusted insights and expert guidance about {categoryName.toLowerCase()}.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Articles Grid */}
              {categoryPosts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-lg text-muted-foreground">No articles found in this category.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Categories Navigation */}
              <Card className="bg-card p-6">
                <h3 className="mb-4 text-lg font-bold text-card-foreground">Browse by Category</h3>
                <div className="flex flex-col gap-1">
                  {categories.map((category: Category) => {
                    const catSlug = category.slug
                    const count = blogPosts.filter((p) => p.category === category.name).length
                    const isActive = catSlug === slug

                    return (
                      <div key={category.name}>
                        {/* Parent Category */}
                        <Link
                          href={`/category/${catSlug}`}
                          className={`flex items-center justify-between rounded-lg px-4 py-2 text-sm transition-colors ${
                            isActive ? "bg-secondary/10 font-semibold" : "hover:bg-muted/50"
                          }`}
                        >
                          <span>{category.name}</span>
                          <Badge className="ml-2 bg-secondary/20 text-foreground border border-secondary/40 text-xs">
                            {count}
                          </Badge>
                        </Link>

                        {/* Subcategories (indented) */}
                        {category.subcategories?.map((sub: Subcategory) => {
                          const subSlug = sub.slug
                          const subCount = blogPosts.filter((p) => 
                            p.category === category.name && p.subcategory === sub.name
                          ).length
                          const isSubActive = subSlug === slug

                          return (
                            <Link
                              key={sub.slug}
                              href={`/category/${subSlug}`}
                              className={`flex items-center justify-between rounded-lg pl-8 pr-4 py-2 text-sm transition-colors ${
                                isSubActive ? "bg-secondary/10 font-semibold" : "hover:bg-muted/50"
                              }`}
                            >
                              <span className="text-xs truncate">{sub.name}</span>
                              <Badge className="ml-2 bg-secondary/20 text-foreground border border-secondary/40 text-xs flex-shrink-0">
                                {subCount}
                              </Badge>
                            </Link>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Newsletter */}
              <NewsletterCard variant="sidebar" />
            </aside>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  )
}
