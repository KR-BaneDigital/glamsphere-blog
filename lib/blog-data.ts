// Blog Data Re-Export & Helper Functions
// 🔒 LOCKED FILE - Do not modify

import type { BlogPost, Author } from "./blog-data.schema"
export type { BlogPost, Author }

// Import from modular index (not monolithic content file)
import { allPosts as blogPostsData } from "./blog-data/index"
export { blogPostsData as blogPosts }

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug)
}

export function getRelatedPosts(postId: string): BlogPost[] {
  const post = blogPostsData.find((p) => p.id === postId)
  if (!post) return []
  
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    return post.relatedPosts
      .map((id) => blogPostsData.find((p) => p.id === id))
      .filter((p): p is BlogPost => p !== undefined)
      .slice(0, 3)
  }
  
  const relatedPosts: BlogPost[] = []
  
  if (post.subcategory) {
    const subcategoryMatches = blogPostsData
      .filter((p) => p.id !== postId && p.subcategory === post.subcategory)
    relatedPosts.push(...subcategoryMatches)
  }
  
  if (relatedPosts.length < 3) {
    const categoryMatches = blogPostsData
      .filter((p) =>
        p.id !== postId &&
        p.category === post.category &&
        !relatedPosts.find(r => r.id === p.id)
      )
    relatedPosts.push(...categoryMatches)
  }
  
  return relatedPosts.slice(0, 3)
}

export function filterPosts(query: string, category?: string): BlogPost[] {
  let filtered = blogPostsData
  
  if (category && category !== "all") {
    const lowerCategory = category.toLowerCase()
    filtered = filtered.filter((post) => {
      return (
        post.category.toLowerCase() === lowerCategory ||
        post.subcategory?.toLowerCase() === lowerCategory
      )
    })
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase()
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }
  
  return filtered
}

export function getAllCategories(): string[] {
  const categories = new Set(blogPostsData.map((post) => post.category))
  return Array.from(categories).sort()
}
