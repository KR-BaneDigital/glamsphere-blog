// Category Type Definitions
// 🔒 LOCKED FILE - Do not modify
// This file defines the TypeScript interfaces for categories

export interface Subcategory {
  id: string
  name: string
  slug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  showInHeader?: boolean
  showInFooter?: boolean
  subcategories?: Subcategory[]
}
