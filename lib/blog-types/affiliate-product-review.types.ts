/**
 * Affiliate Product Review Content Type
 * 
 * For conversion-optimized product reviews with affiliate links,
 * prominent CTAs, comprehensive sections, and pricing information.
 * 
 * Matches the complete v0 design with all sections.
 */

export interface AffiliateProductReviewData {
  // Affiliate Product Info (from AffiliateOffer)
  affiliate: {
    productTitle: string
    productDescription?: string
    price: number
    originalPrice?: number
    currency: string
    affiliateLink: string
    asin: string
    images: string[]
    features?: string[]
  }
  
  // Hero Stats (4 cards in 2x2 grid)
  stats: Array<{
    value: string                       // e.g., "147%", "82%", "4.3★", "$49.99"
    label: string                       // e.g., "Volume Increase", "Less Shedding"
  }>
  
  // Trust Badges (below stats)
  trustBadges: string[]                 // Array of trust statements with checkmarks
  
  // Overall Rating & Summary
  overallScore: number                  // 0-100 scale
  starRating: number                    // 1-5 stars
  editorChoice?: boolean
  
  // Problem Section
  problemSection: {
    title: string                       // e.g., "The Hair Thinning Problem Nobody Talks About"
    statistic: string                   // e.g., "80 million Americans"
    introText: string                   // Paragraph about the problem
    mainText: string                    // Main paragraph about the product
    closingText: string                 // Closing paragraph
  }
  
  // What Makes Different Section (4 cards)
  whatMakesDifferent: Array<{
    icon: string                        // Lucide icon name: "Zap", "Shield", "Heart", "Sparkles"
    title: string
    description: string                 // Can include <a> tags
  }>
  
  // Ingredients Section (6 detailed cards)
  ingredients: Array<{
    name: string
    description: string                 // Can include <a> tags
  }>
  
  // Testing Results (7 performance metrics)
  testingResults: Array<{
    category: string
    score: number                       // out of 10
    result: string                      // e.g., "147% increase (clinical study)"
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
    step: string                        // "1", "2", "3", "4"
    title: string
    description: string
  }>
  
  // Pro Tip
  proTip: string
  
  // Customer Reviews (3 testimonials)
  customerReviews: Array<{
    name: string
    verifiedPurchase: boolean
    stars: number                       // 1-5
    review: string
  }>
  
  // Total Reviews Summary
  reviewsSummary: {
    totalReviews: string                // e.g., "7,965+"
    averageRating: number               // e.g., 4.3
  }
  
  // FAQ Section (6 questions)
  faq: Array<{
    question: string
    answer: string
  }>
  
  // Final Verdict
  verdict: {
    rating: number                      // e.g., 9.4
    editorChoice: boolean
    summary: string                     // Multiple paragraphs
    finalRecommendation: string         // One sentence
  }
  
  // CTA Sections (dynamic content throughout page)
  ctaSections?: Array<{
    headline: string                    // e.g., "Ready to See 147% More Volume?"
    description: string                 // e.g., "Join thousands transforming..."
    buttonText: string                  // e.g., "Shop on Amazon - $49.99"
    location: string                    // 'mid-content' | 'ingredients' | 'testing' | 'verdict' | 'final'
  }>
  
  // Testing Duration (for dynamic section title)
  testingDuration?: string              // e.g., "6-Month", "90-Day", "3-Month"
  
  // CTA Config
  ctaText?: string                      // Default: "Buy Now on Amazon - $49.99"
  ctaStyle?: 'primary' | 'secondary'
  
  // Disclosure
  disclosure: string
}

/**
 * Helper to convert 0-100 score to 1-5 star rating
 */
export function calculateStarRating(score: number): number {
  if (score >= 90) return 5
  if (score >= 75) return 4
  if (score >= 60) return 3
  if (score >= 40) return 2
  return 1
}

/**
 * Helper to format price with currency
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price)
}

/**
 * Helper to calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

/**
 * Helper to get icon component name from string
 */
export function getIconName(iconName: string): string {
  return iconName
}
