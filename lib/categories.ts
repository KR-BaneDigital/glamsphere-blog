// Category Re-Export & Helper Functions
// 🔒 LOCKED FILE - Do not modify
// This file imports from split files and provides helper functions

// Import types from schema
import type { Category, Subcategory } from "./categories.schema"
export type { Category, Subcategory }

// Import data from content
import { categories as categoriesData } from "./categories.content"
export { categoriesData as categories }

// Helper function to get all categories
export function getAllCategories(): Category[] {
  return categoriesData
}

// Helper function to get header categories (only those with showInHeader = true)
export function getHeaderCategories(): Category[] {
  return categoriesData.filter((cat) => cat.showInHeader !== false)
}

// Helper function to get footer categories (only those with showInFooter = true)
export function getFooterCategories(): Category[] {
  return categoriesData.filter((cat) => cat.showInFooter !== false)
}

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesData.find((cat) => cat.slug === slug)
}

// Helper function to get subcategory by slug (searches all categories)
export function getSubcategoryBySlug(slug: string): { category: Category; subcategory: Subcategory } | undefined {
  for (const category of categoriesData) {
    if (category.subcategories) {
      const subcategory = category.subcategories.find((sub) => sub.slug === slug)
      if (subcategory) {
        return { category, subcategory }
      }
    }
  }
  return undefined
}

// Helper function to get all category slugs (for static params generation)
export function getAllCategorySlugs(): string[] {
  const slugs: string[] = []
  for (const category of categoriesData) {
    slugs.push(category.slug)
    if (category.subcategories) {
      for (const sub of category.subcategories) {
        slugs.push(sub.slug)
      }
    }
  }
  return slugs
}
