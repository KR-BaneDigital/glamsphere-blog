# **Glamsphere Blog Metadata Structure Documentation**

## **Overview**
This document comprehensively outlines the metadata structure requirements for the Glamsphere blog website. The metadata system uses Next.js 13+ App Router with TypeScript interfaces and supports multiple content types with structured data.

## **1. Next.js Metadata Object Structure**

### **File Location**: `app/blog/[slug]/page.tsx`
### **Import Requirements**:
```typescript
import type { Metadata } from "next"
import type { BlogPost } from "@/lib/blog-data"
```

### **Required Metadata Structure**:
```typescript
export const metadata: Metadata = {
  // Basic SEO fields
  "title": string,                    // Post title (max 60 chars for SEO)
  "description": string,              // Post excerpt (max 160 chars for SEO)

  // Open Graph (Facebook/LinkedIn sharing)
  "openGraph": {
    "title": string,                  // Same as title or optimized for social
    "description": string,            // Same as description or optimized
    "type": "article",               // Always "article" for blog posts
    "publishedTime": string,          // ISO 8601 date: "2025-12-23T21:02:06.152Z"
    "authors": [string],              // Array of author names: ["Sophia Ellis"]
    "images": [{                      // REQUIRED for social sharing
      "url": string,                  // "https://glamsphere.org/hero-images/{slug}.jpg"
      "width": 1200,                  // Standard social image width
      "height": 630                   // Standard social image height
    }]
  },

  // Twitter Card (Twitter sharing)
  "twitter": {
    "card": "summary_large_image",  // Always use large image card
    "title": string,                 // Same as title or optimized
    "description": string,           // Same as description or optimized
    "images": string                 // "https://glamsphere.org/hero-images/{slug}.jpg"
  }
}
```

## **2. BlogPost Interface Structure**

### **File Location**: `lib/blog-data.schema.ts`
### **Core Post Fields**:
```typescript
export interface BlogPost {
  // Unique identifiers
  id: string                          // UUID: "1355bd8c-3034-4b25-8473-895cda7ce4b9"
  slug: string                        // URL slug: "cat-eye-nails-unlock-the-secret-to-stunning-daring-manicures"

  // Content basics
  title: string                       // Post title
  excerpt: string                     // Short description (150-160 chars)
  content: string                     // Full post content (usually empty for affiliate posts)
  image: string                       // Product image URL: "https://m.media-amazon.com/images/I/91cMo9mauJL._SL1500_.jpg"

  // Categorization
  category: string                    // Main category: "Acrylic Nails"
  categorySlug: string                // URL-safe: "acrylic-nails"
  subcategory?: string               // Optional sub-category: "Nail Art & Care"
  subcategorySlug?: string           // URL-safe: "nail-art--care"
  tags: string[]                      // Tag array: ["Acrylic Nails", "Nail Art & Care"]

  // Metadata
  date: string                        // Display date: "December 23, 2025"
  readTime: string                    // "1 min read"
  author: Author                      // Author object (see below)

  // Analytics
  featured: boolean                   // Whether post is featured
  views?: number                      // View count

  // Relationships
  relatedPosts?: string[]             // Array of related post slugs

  // Content Type System
  contentType?: ContentType           // "affiliate-product-review" | "faq" | etc.
  typeSpecificData?: TypeSpecificData // Content-type specific structured data
}
```

### **Author Interface**:
```typescript
export interface Author {
  name: string                        // "Sophia Ellis"
  bio: string                         // Detailed bio (200-300 chars)
  image: string                       // Author photo: "/authors/06bbc365-b9aa-46d6-919c-d33ea113e9ff.jpg"
  role: string                        // "Beauty Innovator and Trend Analyst"
}
```

## **3. Content Type System**

### **File Location**: `lib/blog-types/index.ts`
### **Supported Content Types**:
- `"custom"` - Basic blog post
- `"listicle"` - Numbered list articles
- `"faq"` - Question & answer format
- `"product-review"` - Product reviews
- `"affiliate-product-review"` - Affiliate product reviews ⭐ **CURRENTLY USED**
- `"how-to-guide"` - Step-by-step tutorials
- `"competitor-ranking"` - Product comparisons
- `"product-comparison"` - Side-by-side comparisons
- `"case-study"` - Success stories
- `"tutorial"` - Detailed tutorials
- `"industry-analysis"` - Market analysis
- `"thought-leadership"` - Expert opinions
- `"news-trend"` - News and trends
- `"debate"` - Two-sided discussions
- `"minimal-essay"` - Short essays
- `"scorecard"` - Performance ratings
- `"commentary"` - Expert commentary

## **4. Affiliate Product Review Structure**

### **File Location**: `lib/blog-types/affiliate-product-review.types.ts`
### **Current Implementation**:
```typescript
export interface AffiliateProductReviewData {
  // Affiliate Product Info (from AffiliateOffer)
  affiliate: {
    productTitle: string
    productDescription?: string
    price: number                      // Numeric: 18.99
    originalPrice?: number
    currency: string                   // "USD"
    affiliateLink: string              // Amazon affiliate URL
    asin: string                       // Amazon ASIN: "B0DGCWTG74"
    images: string[]                   // Product image URLs
    features?: string[]                // Product feature bullets
  }

  // Hero Stats (4 cards in 2x2 grid)
  stats: Array<{
    value: string                      // e.g., "147%", "82%", "4.3★", "$49.99"
    label: string                      // e.g., "Volume Increase", "Less Shedding"
  }>

  // Trust Badges (below stats)
  trustBadges: string[]                // Array of trust statements with checkmarks

  // Overall Rating & Summary
  overallScore: number                 // 0-100 scale
  starRating: number                   // 1-5 stars
  editorChoice?: boolean

  // Problem Section
  problemSection: {
    title: string                      // e.g., "The Hair Thinning Problem Nobody Talks About"
    statistic: string                  // e.g., "80 million Americans"
    introText: string                  // Paragraph about the problem
    mainText: string                   // Main paragraph about the product
    closingText: string                // Closing paragraph
  }

  // What Makes Different Section (4 cards)
  whatMakesDifferent: Array<{
    icon: string                       // Lucide icon name: "Zap", "Shield", "Heart", "Sparkles"
    title: string
    description: string                // Can include <a> tags
  }>

  // Ingredients Section (6 detailed cards)
  ingredients: Array<{
    name: string
    description: string                // Can include <a> tags
  }>

  // Testing Results (7 performance metrics)
  testingResults: Array<{
    category: string
    score: number                      // out of 10
    result: string                     // e.g., "147% increase (clinical study)"
  }>

  // Methodology Note
  methodologyNote: string

  // Pros & Cons
  pros: string[]
  cons: string[]

  // Who Should Buy (targeting section)
  whoShouldBuy: {
    perfectFor: string[]
    notIdealFor: string[]
  }

  // How to Use (4 steps)
  howToUse: Array<{
    step: string                       // "1", "2", "3", "4"
    title: string
    description: string
  }>

  // Pro Tip
  proTip: string

  // Customer Reviews (3 testimonials)
  customerReviews: Array<{
    name: string
    verifiedPurchase: boolean
    stars: number                      // 1-5
    review: string
  }>

  // Total Reviews Summary
  reviewsSummary: {
    totalReviews: string               // e.g., "7,965+"
    averageRating: number              // e.g., 4.3
  }

  // FAQ Section (6 questions)
  faq: Array<{
    question: string
    answer: string
  }>

  // Final Verdict
  verdict: {
    rating: number                     // e.g., 9.4
    editorChoice: boolean
    summary: string                    // Multiple paragraphs
    finalRecommendation: string        // One sentence
  }

  // CTA Sections (dynamic content throughout page)
  ctaSections?: Array<{
    headline: string                   // e.g., "Ready to See 147% More Volume?"
    location: string                   // 'mid-content' | 'ingredients' | 'testing' | 'verdict' | 'final'
    buttonText: string                 // e.g., "Shop on Amazon - $49.99"
    description: string                // e.g., "Join thousands transforming..."
  }>

  // Testing Duration (for dynamic section title)
  testingDuration?: string             // e.g., "6-Month", "90-Day", "3-Month"

  // CTA Config
  ctaText?: string                     // Default: "Buy Now on Amazon - $49.99"
  ctaStyle?: 'primary' | 'secondary'

  // Disclosure
  disclosure: string                   // Amazon affiliate disclosure
}
```

## **5. Template Integration**

### **File Location**: `app/blog/[slug]/page.tsx`
### **Component Usage**:
```typescript
import { AffiliateProductReviewTemplate } from "@/components/blog-templates/affiliate-product-review-template"

// In component:
return (
  <div className="min-h-screen">
    <BlogHeader />
    <AffiliateProductReviewTemplate post={post as any} />
    <BlogFooter />
  </div>
)
```

## **6. Image Requirements**

### **Hero Images Location**: `public/hero-images/`
### **Naming Convention**: `{slug}.jpg`
### **Required Dimensions**: 1200x630 pixels (social media standard)
### **URL Format**: `https://glamsphere.org/hero-images/{slug}.jpg`

## **7. URL Structure**

### **Post URLs**: `/blog/{slug}`
### **Category URLs**: `/category/{categorySlug}`
### **Author URLs**: `/authors/{authorSlug}` (implied)

## **8. SEO Optimization Rules**

### **Title Length**: 30-60 characters
### **Description Length**: 120-160 characters
### **Slug Format**: Kebab-case, descriptive keywords
### **Meta Images**: Required for all posts (1200x630px)

## **9. Data Validation**

### **Required Fields for All Posts**:
- `id` (UUID format)
- `slug` (URL-safe)
- `title`
- `excerpt` (150-160 chars)
- `category` and `categorySlug`
- `date` (display format)
- `author` (complete object)
- `contentType` as const

### **Social Media Requirements**:
- Open Graph `images` array with width/height
- Twitter `images` string URL
- Both pointing to hero image

## **10. Content Generation Pipeline**

1. **Extract post data** from database/API
2. **Generate metadata object** with title/description/social images
3. **Create BlogPost object** with all required fields
4. **Add typeSpecificData** based on contentType
5. **Render with appropriate template**
6. **Validate social sharing** on Facebook/Twitter

## **References**

### **Files Referenced**:
- `app/blog/[slug]/page.tsx` - Implementation example
- `lib/blog-data.schema.ts` - BlogPost interface
- `lib/blog-types/affiliate-product-review.types.ts` - Content type definition
- `lib/blog-types/index.ts` - Type exports
- `components/blog-templates/affiliate-product-review-template.tsx` - Template component

### **Key Dependencies**:
- Next.js 13+ App Router
- TypeScript 5.0+
- Tailwind CSS (styling)
- Lucide React (icons)

---

## **Implementation Checklist**

### **For Each Blog Post**:
- [ ] Metadata object with title/description
- [ ] Open Graph section with images array (1200x630)
- [ ] Twitter section with images string
- [ ] Complete BlogPost interface fields
- [ ] Type-specific data structure
- [ ] Hero image exists in `public/hero-images/`
- [ ] Template renders correctly
- [ ] Social sharing validated

### **Content Type Validation**:
- [ ] contentType set to appropriate value
- [ ] typeSpecificData matches content type schema
- [ ] All required fields present
- [ ] Data structure validated

This structure ensures consistent, SEO-optimized, and socially shareable blog content across all post types.
