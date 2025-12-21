// Blog Data Re-Export & Helper Functions
// 🔒 LOCKED FILE - Do not modify
// This file imports from split files and provides helper functions

// Import types from schema
import type { BlogPost, Author } from "./blog-data.schema"
export type { BlogPost, Author }

// Import data from content file
import { blogPosts as blogPostsData } from "./blog-data.content"
export { blogPostsData as blogPosts }

// Helper function to get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug)
}

// Helper function to get related posts
export function getRelatedPosts(postId: string): BlogPost[] {
  const post = blogPostsData.find((p) => p.id === postId)
  if (!post) return []

  // If manually defined, use those
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    return post.relatedPosts
      .map((id) => blogPostsData.find((p) => p.id === id))
      .filter((p): p is BlogPost => p !== undefined)
      .slice(0, 3)
  }

  // Auto-find with subcategory priority:
  // 1. Same subcategory (if exists)
  // 2. Same parent category
  // 3. Max 3 total
  
  const relatedPosts: BlogPost[] = []
  
  // Priority 1: Same subcategory
  if (post.subcategory) {
    const subcategoryMatches = blogPostsData
      .filter((p) => p.id !== postId && p.subcategory === post.subcategory)
    relatedPosts.push(...subcategoryMatches)
  }
  
  // Priority 2: Same parent category (if we need more)
  if (relatedPosts.length < 3) {
    const categoryMatches = blogPostsData
      .filter((p) => 
        p.id !== postId && 
        p.category === post.category &&
        !relatedPosts.find(r => r.id === p.id)  // Not already added
      )
    relatedPosts.push(...categoryMatches)
  }
  
  return relatedPosts.slice(0, 3)
}

// Helper function to filter posts
// Hierarchical filtering: parent categories include ALL subcategory posts
export function filterPosts(query: string, category?: string): BlogPost[] {
  let filtered = blogPostsData

  if (category && category !== "all") {
    const lowerCategory = category.toLowerCase()
    filtered = filtered.filter((post) => {
      // Match parent category OR subcategory
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

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set(blogPostsData.map((post) => post.category))
  return Array.from(categories).sort()
}
